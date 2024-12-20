import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import TimeInsights from './sections/TimeAnalysis';
import ContentAnalysis from './sections/ContentAnalysis';
import ThemeAnalysis from './sections/ThemeAnalysis';
import GrowthAnalysis from './sections/GrowthAnalysis';
import Overview from './sections/Overview';
import SentimentAnalysis from './sections/SentimentAnalysis';

const COLORS = ['#60A5FA', '#34D399', '#FBBF24', '#818CF8', '#F472B6'];

const AnalysisDashboard = ({ analysis }) => {
    const [activeTab, setActiveTab] = useState('overview');

    if (!analysis) {
        return <div>No analysis data available</div>;
    }

    const hourlyData = Array.from({ length: 24 }, (_, i) => {
        const hourEntry = analysis.time_patterns.hourly_distribution.find(entry => entry.hour === i);
        return {
            hour: `${String(i).padStart(2, '0')}:00`,
            count: hourEntry ? hourEntry.count : 0,
        };
    });

    const sentimentData = Object.entries(analysis.sentiment_analysis.overall_tone).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value
    }));
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 p-4">
            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="space-y-4"
            >
                <div className="sticky top-0 z-10 bg-slate-900 pb-4">
                    <TabsList className="grid w-full grid-cols-6 bg-slate-800">
                        <TabsTrigger
                            value="overview"
                            selected={activeTab === 'overview'}
                            onClick={() => setActiveTab('overview')}
                            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                        >
                            Overview
                        </TabsTrigger>
                        <TabsTrigger
                            value="time"
                            selected={activeTab === 'time'}
                            onClick={() => setActiveTab('time')}
                            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                        >
                            Time
                        </TabsTrigger>
                        <TabsTrigger
                            value="content"
                            selected={activeTab === 'content'}
                            onClick={() => setActiveTab('content')}
                            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                        >
                            Content
                        </TabsTrigger>
                        <TabsTrigger
                            value="themes"
                            selected={activeTab === 'themes'}
                            onClick={() => setActiveTab('themes')}
                            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                        >
                            Themes
                        </TabsTrigger>
                        <TabsTrigger
                            value="sentiment"
                            selected={activeTab === 'sentiment'}
                            onClick={() => setActiveTab('sentiment')}
                            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                        >
                            Sentiment
                        </TabsTrigger>
                        <TabsTrigger
                            value="growth"
                            selected={activeTab === 'growth'}
                            onClick={() => setActiveTab('growth')}
                            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                        >
                            Growth
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="overview" activeTab={activeTab}>
                    <Overview
                        analysis={analysis}
                        sentimentData={sentimentData}
                        COLORS={COLORS}
                    />
                </TabsContent>

                <TabsContent value="time" activeTab={activeTab}>
                    <TimeInsights
                        hourlyData={hourlyData}
                        daily_patterns={analysis.time_patterns.day_count}
                        dayPatterns={analysis.time_patterns.day_patterns}
                        activityBursts={analysis.time_patterns.activity_bursts}
                    />
                </TabsContent>

                <TabsContent value="content" activeTab={activeTab}>
                    <ContentAnalysis
                        extractedElements={analysis.content_analysis.extracted_elements}
                    />
                </TabsContent>

                <TabsContent value="themes" activeTab={activeTab}>
                    <ThemeAnalysis
                        themes={analysis.thematic_analysis.major_themes}
                        topicEvolution={analysis.thematic_analysis.topic_evolution}
                    />
                </TabsContent>

                <TabsContent value="sentiment" activeTab={activeTab} className="space-y-4">
                    <SentimentAnalysis
                        sentimentData={sentimentData}
                        analysis={analysis}
                    />
                </TabsContent>

                <TabsContent value="growth" activeTab={activeTab} className="space-y-4">
                    <GrowthAnalysis
                        analysis={analysis} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AnalysisDashboard;