import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
};

const GrowthAnalysis = ( {analysis} ) => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-gray-900 text-gray-100">
                    <CardHeader>
                        <CardTitle>Progress Markers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {analysis.growth_analysis.progress_markers.map((marker, index) => (
                                <div key={index} className="p-4 bg-gray-800 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`px-2 py-1 rounded ${marker.type === 'product breakthrough' ? 'bg-green-500 text-white' :
                                            marker.type === 'feedback integration' ? 'bg-blue-500 text-white' :
                                                'bg-purple-500 text-white'
                                            }`}>
                                            {marker.type}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-300">{marker.description}</p>
                                    <div className="mt-2">
                                        <div className="text-sm text-gray-400">Impact Level: {marker.impact_level}/10</div>
                                        <div className="w-full bg-gray-600 rounded-full h-2 mt-1">
                                            <div
                                                className="bg-blue-400 h-2 rounded-full"
                                                style={{ width: `${(marker.impact_level / 10) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-400 mt-2">
                                        {new Date(marker.timestamp).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gray-900 text-gray-100">
                    <CardHeader>
                        <CardTitle>Skill Development</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-medium mb-2 text-gray-200">Technologies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {analysis.growth_analysis.skill_development.technologies.map((tech, index) => (
                                        <span key={index} className="px-3 py-1 bg-blue-500 text-white rounded-full">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium mb-2 text-gray-200">Concepts</h3>
                                <div className="flex flex-wrap gap-2">
                                    {analysis.growth_analysis.skill_development.concepts.map((concept, index) => (
                                        <span key={index} className="px-3 py-1 bg-purple-500 text-white rounded-full">
                                            {concept}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium mb-2 text-gray-200">Tools</h3>
                                <div className="flex flex-wrap gap-2">
                                    {analysis.growth_analysis.skill_development.tools.map((tool, index) => (
                                        <span key={index} className="px-3 py-1 bg-green-500 text-white rounded-full">
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-gray-900 text-gray-100">
                <CardHeader>
                    <CardTitle>Learning Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {analysis.growth_analysis.learning_patterns.research_phases.map((phase, index) => (
                            <div key={index} className="p-4 bg-gray-800 rounded-lg">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="font-medium text-gray-200">{phase.focus_area}</h3>
                                        <p className="text-sm text-gray-400">
                                            {formatDate(phase.start_date)} - {formatDate(phase.end_date)}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium mb-2 text-gray-200">Resources Used:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {phase.resources_used.map((resource, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-gray-600 rounded text-sm text-gray-300">
                                                {resource}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gray-900 text-gray-100">
                <CardHeader>
                    <CardTitle>Statistical Insights</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-sm font-medium mb-3 text-gray-200">Message Length Distribution</h3>
                            <div className="space-y-2">
                                {Object.entries(analysis.statistical_metrics.message_lengths.distribution).map(([type, count]) => (
                                    <div key={type} className="flex items-center justify-between">
                                        <span className="capitalize text-gray-300">{type}</span>
                                        <span className="px-2 py-1 bg-gray-600 rounded text-gray-300">{count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium mb-3 text-gray-200">Common Words</h3>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(analysis.statistical_metrics.word_frequency)
                                    .sort(([, a], [, b]) => b - a)
                                    .map(([word, count], index) => (
                                        <span key={word} className="px-2 py-1 bg-gray-600 rounded text-sm text-gray-300">
                                            {word} ({count})
                                        </span>
                                    ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default GrowthAnalysis