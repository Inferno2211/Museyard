import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { ExternalLink, MessageSquare, CheckSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

const ContentAnalysis = ({ extractedElements }) => {
    const [activeSection, setActiveSection] = useState('urls');
    const DOMAIN_COLORS = ['#93C5FD', '#A5B4FC', '#C4B5FD', '#DDD6FE', '#F5D0FE'];

    const domainData = extractedElements.popular_websites.map(site => ({
        name: site.domain,
        value: site.count
    }));

    const renderContent = () => {
        switch (activeSection) {
            case 'urls':
                return (
                    <div className="space-y-4">
                        {Object.entries(
                            extractedElements.urls.reduce((acc, url) => {
                                acc[url.category] = acc[url.category] || [];
                                acc[url.category].push(url);
                                return acc;
                            }, {})
                        ).map(([category, categoryUrls]) => (
                            <div key={category} className="space-y-2">
                                <div className="font-medium text-slate-200 capitalize">{category}</div>
                                <div className="space-y-2">
                                    {categoryUrls.map((url, index) => (
                                        <div key={index} className="p-3 bg-slate-700 rounded-lg">
                                            <a
                                                href={url.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
                                            >
                                                <ExternalLink size={16} />
                                                {url.context}
                                            </a>
                                            <div className="text-sm text-slate-400 mt-1">
                                                {new Date(url.timestamp).toLocaleString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                );

            case 'quotes':
                return (
                    <div className="space-y-4">
                        {extractedElements.quotes.map((quote, index) => (
                            <div key={index} className="p-4 bg-slate-700 rounded-lg">
                                <div className="text-slate-200 italic">"{quote.text}"</div>
                                <div className="mt-2 text-slate-400">— {quote.author}</div>
                                <div className="mt-1 text-sm text-slate-500">{quote.context}</div>
                                <div className="mt-2 text-xs text-slate-600">
                                    {new Date(quote.timestamp).toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                );

            case 'tasks':
                return (
                    <div className="space-y-4">
                        {extractedElements.tasks.map((task, index) => (
                            <div key={index} className="p-4 bg-slate-700 rounded-lg">
                                <div className="flex items-start justify-between">
                                    <div className="text-slate-200">{task.text}</div>
                                    <div className="flex gap-2">
                                        <span className={`px-2 py-1 rounded text-xs ${task.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                                                task.status === 'in_progress' ? 'bg-blue-500/20 text-blue-300' :
                                                    'bg-yellow-500/20 text-yellow-300'
                                            }`}>
                                            {task.status}
                                        </span>
                                        <span className={`px-2 py-1 rounded text-xs ${task.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                                                task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                                                    'bg-green-500/20 text-green-300'
                                            }`}>
                                            {task.priority}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-2 text-xs text-slate-500">
                                    {new Date(task.timestamp).toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                    <CardTitle className="text-slate-100">Popular Domains</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={domainData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label={({ name, value }) => `${name} (${value})`}
                                >
                                    {domainData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={DOMAIN_COLORS[index % DOMAIN_COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1E293B',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: '#F1F5F9'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                    <div className="flex gap-4 border-b border-slate-700 pb-4">
                        <button
                            onClick={() => setActiveSection('urls')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeSection === 'urls' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            <ExternalLink size={16} />
                            URLs
                        </button>
                        <button
                            onClick={() => setActiveSection('quotes')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeSection === 'quotes' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            <MessageSquare size={16} />
                            Quotes
                        </button>
                        <button
                            onClick={() => setActiveSection('tasks')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeSection === 'tasks' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            <CheckSquare size={16} />
                            Tasks
                        </button>
                    </div>
                </CardHeader>
                <CardContent>
                    {renderContent()}
                </CardContent>
            </Card>
        </div>
    );
};

export default ContentAnalysis;