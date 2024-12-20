import ThemeNetwork from "../Theme";

import { CardContent, CardTitle, CardHeader, Card } from "../ui/card";

const ThemeAnalysis = ({ themes, topicEvolution }) => {
    const sortedThemes = [...themes].sort((a, b) => b.frequency - a.frequency);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
                {themes.map((theme, index) => (
                    <Card key={index} className="bg-slate-800 border-slate-700">
                        <CardHeader>
                            <CardTitle className="text-slate-100">
                                {theme.theme}
                                <span className="ml-2 text-sm text-slate-400">
                                    Frequency: {theme.frequency}
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ThemeNetwork theme={theme} />
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedThemes.map((theme, index) => (
                    <Card key={index} className="bg-slate-800 border-slate-700">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-slate-100 text-lg">
                                {theme.theme}
                                <span className="ml-2 text-sm text-slate-400">({theme.frequency})</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div>
                                    <div className="text-sm text-slate-400 mb-1">Keywords</div>
                                    <div className="flex flex-wrap gap-1">
                                        {theme.keywords.map((keyword, kidx) => (
                                            <span key={kidx} className="px-2 py-1 bg-slate-700 text-slate-300 rounded-full text-xs">
                                                {keyword}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-slate-400 mb-1">Related Messages</div>
                                    <div className="text-slate-300 text-sm">
                                        {theme.related_messages.length} messages
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                    <CardTitle className="text-slate-100">Topic Evolution</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {topicEvolution.map((evolution, index) => (
                            <div key={index} className="p-4 bg-slate-700 rounded-lg">
                                <div className="text-slate-200 font-medium">{evolution.date}</div>
                                <div className="mt-2">
                                    <div className="text-sm text-slate-400">Dominant Topics</div>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {evolution.dominant_topics.map((topic, tidx) => (
                                            <span key={tidx} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                {evolution.emerging_topics.length > 0 && (
                                    <div className="mt-3">
                                        <div className="text-sm text-slate-400">Emerging Topics</div>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {evolution.emerging_topics.map((topic, tidx) => (
                                                <span key={tidx} className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                                                    {topic}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ThemeAnalysis;