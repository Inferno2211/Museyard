import { GoogleGenerativeAI } from '@google/generative-ai';
import formidable from 'formidable';
import fs from 'fs/promises';
import { Prompt, Schema } from '@/app/components/prompt';

const API_KEY = process.env.GEMINI_API_KEY;

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const form = formidable();

        form.parse(req, async (err, fields, files) => {
            if (err) {
                res.status(500).json({ error: 'Something went wrong during file parsing' });
                return;
            }

            const file = files.file[0];
            const filePath = file.filepath;

            try {
                const data = await fs.readFile(filePath, 'utf8');
                // console.log('File content:', data);

                const genAI = new GoogleGenerativeAI(API_KEY);
                const model = genAI.getGenerativeModel({
                    model: "gemini-1.5-flash",
                    generationConfig: {
                        responseMimeType: "application/json",
                        // responseSchema: Schema,
                    },
                });

                const result = await model.generateContent(`${Prompt}\n\n${data}`);
                console.log(result.response.text());

                const formattedData = parseAndFormatResponse(result.response.text());
                return res.status(200).json(formattedData);
            } catch (err) {
                res.status(500).json({ error: 'Unable to read the file' });
            }
        });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}

const parseAndFormatResponse = (responseText) => {
    try {
        // Remove any extra quotes that might wrap the JSON string
        const cleanedText = responseText.replace(/^"|"$/g, '');
        // Parse the JSON string into an object
        const parsedData = JSON.parse(cleanedText);

        // Format dates in the response
        if (parsedData.metadata?.date_range) {
            parsedData.metadata.date_range.start = new Date(parsedData.metadata.date_range.start);
            parsedData.metadata.date_range.end = new Date(parsedData.metadata.date_range.end);
        }

        // Convert timestamp strings to Date objects
        if (parsedData.time_patterns?.activity_bursts) {
            parsedData.time_patterns.activity_bursts.forEach(burst => {
                burst.start_time = new Date(burst.start_time);
            });
        }

        // Format the hourly distribution data for the chart
        if (parsedData.time_patterns?.hourly_distribution) {
            parsedData.time_patterns.hourly_distribution = Object.entries(
                parsedData.time_patterns.hourly_distribution
            ).map(([hour, count]) => ({
                hour: parseInt(hour),
                count: count,
                label: `${hour}:00`
            })).sort((a, b) => a.hour - b.hour);
        }

        // Ensure arrays are sorted by date/timestamp where applicable
        if (parsedData.growth_analysis?.progress_markers) {
            parsedData.growth_analysis.progress_markers.sort(
                (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
            );
        }

        return parsedData;
    } catch (error) {
        console.error('Error parsing AI response:', error);
        throw new Error('Failed to parse AI response');
    }
};