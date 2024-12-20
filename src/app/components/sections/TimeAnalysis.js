const { Calendar, Clock } = require("lucide-react");
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const TimeInsights = ({ hourlyData, daily_patterns, dayPatterns, activityBursts }) => {
    const dayData = Object.entries(daily_patterns).map(([day, count]) => ({
        day,
        count,
    }));

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Hourly Activity Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={hourlyData}>
                                <XAxis dataKey="hour" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#8884d8"
                                    strokeWidth={2}
                                    dot={{ r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
            {/* Daily Message Distribution */}
            <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                    <CardTitle className="text-slate-100 flex items-center gap-2">
                        <Calendar size={20} /> Daily Message Distribution
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dayData}>
                                <XAxis dataKey="day" stroke="#94A3B8" />
                                <YAxis stroke="#94A3B8" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1E293B',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: '#F1F5F9',
                                    }}
                                />
                                <Bar dataKey="count" fill="#93C5FD" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Activity Bursts */}
            <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                    <CardTitle className="text-slate-100 flex items-center gap-2">
                        <Clock size={20} /> Activity Bursts
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {activityBursts.map((burst, index) => (
                            <div key={index} className="p-4 bg-slate-700 rounded-lg">
                                <div className="flex justify-between">
                                    <div className="text-slate-200">
                                        {new Date(burst.start_time).toLocaleString()}
                                    </div>
                                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                                        {burst.message_count} messages
                                    </span>
                                </div>
                                <div className="mt-2 text-slate-300">
                                    <span className="text-slate-400">Duration:</span> {burst.duration_minutes} minutes
                                </div>
                                <div className="mt-1 text-slate-300">
                                    <span className="text-slate-400">Theme:</span> {burst.theme}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Day Patterns */}
            <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                    <CardTitle className="text-slate-100">Day Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {dayPatterns.map((pattern, index) => (
                            <div key={index} className="p-4 bg-slate-700 rounded-lg">
                                <div className="font-medium text-slate-200">{pattern.day}</div>
                                <div className="mt-2 text-slate-300">{pattern.common_topic_or_work}</div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default TimeInsights;