import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
};
const COLORS = ["#4CAF50", "#FFC107", "#F44336"];

const SentimentAnalysis = ({ sentimentData, analysis }) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Overall Sentiment</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={sentimentData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        label
                                    >
                                        {sentimentData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Motivation Levels</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {analysis.sentiment_analysis.motivation_indicators.map((indicator, index) => (
                                <div key={index} className="p-4 bg-gray-800 rounded-lg">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="font-medium">{indicator.context}</div>
                                        <div className="text-sm">Level: {indicator.level}/10</div>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full"
                                            style={{ width: `${(indicator.level / 10) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Daily Emotional Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                        {Object.entries(analysis.sentiment_analysis.emotional_patterns.daily).map(([date, emotion]) => (
                            <div key={date} className="p-4 bg-gray-700 rounded-lg text-center">
                                <div className="text-sm text-gray-50">{formatDate(date)}</div>
                                <div className={`mt-2 font-medium ${emotion === 'positive' ? 'text-green-600' :
                                    emotion === 'negative' ? 'text-red-600' :
                                        'text-yellow-400'
                                    }`}>
                                    {emotion}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SentimentAnalysis;