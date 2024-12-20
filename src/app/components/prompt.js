import { SchemaType } from "@google/generative-ai";

export const Prompt = `You are a text analysis expert. Your task is to analyze the provided chat export and extract detailed insights, patterns, and metrics. Return your analysis in a structured JSON format.

For each message in the text:
1. Parse the timestamp and content
2. Analyze the content deeply for patterns, sentiment, intent, and context
3. Extract any URLs, quotes, tasks, or structured items
4. Identify themes, emotions, and personal growth indicators
5. Connect related entries across time

Consider these specific aspects:
- Content classification (goals, reflections, tasks, research)
- Emotional undertones and motivation levels
- Theme patterns and topic relationships
- Planning vs reflection vs research activities
- Progress indicators and setbacks
- Technical or tool-related discussions
- Learning patterns and knowledge acquisition

Structure your response as a JSON object with the following schema:
{
  "metadata": {
    "total_messages": <number>,
    "date_range": {
      "start": "YYYY-MM-DD",
      "end": "YYYY-MM-DD"
    },
    "analysis_timestamp": "YYYY-MM-DD HH:MM:SS"
  },
  
  "time_patterns": {
    "hourly_distribution": {
      "<hour>": <count>,
      ...
    },
    "day_count": {
      "<day>": <count>,
      ...
    },
    "activity_bursts": [
      {
        "start_time": "YYYY-MM-DD HH:MM:SS",
        "duration_minutes": <number>,
        "message_count": <number>,
        "theme": <string>
      }
    ],
    "day_patterns": [
        "day": <string>,
        "common_topic_or_work": <string>,
    ]
  },

  "content_analysis": {
    "message_types": {
      "goals": <count>,
      "reflections": <count>,
      "tasks": <count>,
      "research": <count>,
      "general": <count>
    },
    "extracted_elements": {
      "urls": [
        {
          "url": <string>,
          "context": <string>,
          "category": <string>,
          "timestamp": "YYYY-MM-DD HH:MM:SS"
        }
      ],
      "quotes": [
        {
          "text": <string>,
          "author": <string>,
          "context": <string>,
          "timestamp": "YYYY-MM-DD HH:MM:SS"
        }
      ],
      "tasks": [
        {
          "text": <string>,
          "status": <string>,
          "priority": <string>,
          "timestamp": "YYYY-MM-DD HH:MM:SS"
        }
      ],
      "popular_websites": [{
        "domain": <string>,
        "count": <number>,
        }
      ]
    }
  },

  "thematic_analysis": {
    "major_themes": [
      {
        "theme": <string>,
        "frequency": <number>,
        "related_messages": [<message_ids>],
        "keywords": [<strings>]
      }
    ],
    "topic_evolution": [
      {
        "date": "YYYY-MM-DD",
        "dominant_topics": [<strings>],
        "emerging_topics": [<strings>]
      }
    ]
  },

  "sentiment_analysis": {
    "overall_tone": {
      "positive": <percentage>,
      "neutral": <percentage>,
      "negative": <percentage>
    },
    "motivation_indicators": [
      {
        "timestamp": "YYYY-MM-DD HH:MM:SS",
        "level": <number>,
        "context": <string>
      }
    ],
    "emotional_patterns": {
      "daily": {
        "<day>": <emotion>,
        ...
      }
    }
  },

  "growth_analysis": {
    "progress_markers": [
      {
        "timestamp": "YYYY-MM-DD HH:MM:SS",
        "type": <string>,
        "description": <string>,
        "impact_level": <number>
      }
    ],
    "skill_development": {
      "technologies": [<strings>],
      "concepts": [<strings>],
      "tools": [<strings>]
    },
    "learning_patterns": {
      "research_phases": [
        {
          "start_date": "YYYY-MM-DD",
          "end_date": "YYYY-MM-DD",
          "focus_area": <string>,
          "resources_used": [<strings>]
        },
        ...
      ]
    }
  },

  "statistical_metrics": {
    "message_lengths": {
      "average": <number>,
      "distribution": {
        "short": <count>,
        "medium": <count>,
        "long": <count>
      }
    },
    "word_frequency": {
      "<word>": <count>,
      ...
    },
    "topic_cooccurrence": [
      {
        "topic1": <string>,
        "topic2": <string>,
        "frequency": <number>
      }
    ],
    "anomalies": [
      {
        "timestamp": "YYYY-MM-DD HH:MM:SS",
        "type": <string>,
        "description": <string>
      }
    ]
  }
}

Analyze the following chat export and provide insights in the specified JSON format. Be thorough in your analysis and ensure all metrics and patterns are accurately captured. Pay special attention to personal growth indicators, learning patterns, and topic evolution over time.

Here's the chat export to analyze:
`

export const Schema = {
    description: "User activity and content analysis",
    type: SchemaType.OBJECT,
    properties: {
        metadata: {
            type: SchemaType.OBJECT,
            properties: {
                total_messages: {
                    type: SchemaType.NUMBER,
                    description: "Total number of messages",
                    nullable: false,
                },
                date_range: {
                    type: SchemaType.OBJECT,
                    properties: {
                        start: { type: SchemaType.STRING, description: "Start date of the range", nullable: false },
                        end: { type: SchemaType.STRING, description: "End date of the range", nullable: false },
                    },
                    required: ["start", "end"],
                },
                analysis_timestamp: {
                    type: SchemaType.STRING,
                    description: "Timestamp of the analysis",
                    nullable: false,
                },
            },
            required: ["total_messages", "date_range", "analysis_timestamp"],
        },
        time_patterns: {
            type: SchemaType.OBJECT,
            properties: {
                hourly_distribution: {
                    type: SchemaType.OBJECT,
                    additionalProperties: { type: SchemaType.NUMBER },
                    description: "Hourly distribution of messages",
                    nullable: false,
                },
                daily_patterns: {
                    type: SchemaType.OBJECT,
                    additionalProperties: { type: SchemaType.NUMBER },
                    description: "Daily message patterns",
                    nullable: false,
                },
                activity_bursts: {
                    type: SchemaType.ARRAY,
                    items: {
                        type: SchemaType.OBJECT,
                        properties: {
                            start_time: { type: SchemaType.STRING, description: "Start time of activity burst", nullable: false },
                            duration_minutes: { type: SchemaType.NUMBER, description: "Duration of activity burst in minutes", nullable: false },
                            message_count: { type: SchemaType.NUMBER, description: "Number of messages in burst", nullable: false },
                        },
                        required: ["start_time", "duration_minutes", "message_count"],
                    },
                },
                time_gaps: {
                    type: SchemaType.OBJECT,
                    properties: {
                        average_gap_hours: { type: SchemaType.NUMBER, description: "Average time gap between messages in hours", nullable: false },
                        longest_gaps: {
                            type: SchemaType.ARRAY,
                            items: {
                                type: SchemaType.OBJECT,
                                properties: {
                                    start: { type: SchemaType.STRING, description: "Start time of the gap", nullable: false },
                                    duration_hours: { type: SchemaType.NUMBER, description: "Duration of the gap in hours", nullable: false },
                                },
                                required: ["start", "duration_hours"],
                            },
                        },
                    },
                    required: ["average_gap_hours", "longest_gaps"],
                },
            },
            required: ["hourly_distribution", "daily_patterns", "activity_bursts", "time_gaps"],
        },
        content_analysis: {
            type: SchemaType.OBJECT,
            properties: {
                message_types: {
                    type: SchemaType.OBJECT,
                    properties: {
                        goals: { type: SchemaType.NUMBER, description: "Count of goals messages", nullable: false },
                        reflections: { type: SchemaType.NUMBER, description: "Count of reflections messages", nullable: false },
                        tasks: { type: SchemaType.NUMBER, description: "Count of tasks messages", nullable: false },
                        research: { type: SchemaType.NUMBER, description: "Count of research messages", nullable: false },
                        general: { type: SchemaType.NUMBER, description: "Count of general messages", nullable: false },
                    },
                    required: ["goals", "reflections", "tasks", "research", "general"],
                },
                extracted_elements: {
                    type: SchemaType.OBJECT,
                    properties: {
                        urls: {
                            type: SchemaType.ARRAY,
                            items: {
                                type: SchemaType.OBJECT,
                                properties: {
                                    url: { type: SchemaType.STRING, description: "URL extracted from the message", nullable: false },
                                    context: { type: SchemaType.STRING, description: "Context of the URL", nullable: false },
                                    category: { type: SchemaType.STRING, description: "Category of the URL", nullable: false },
                                    timestamp: { type: SchemaType.STRING, description: "Timestamp of the URL extraction", nullable: false },
                                },
                                required: ["url", "context", "category", "timestamp"],
                            },
                        },
                        quotes: {
                            type: SchemaType.ARRAY,
                            items: {
                                type: SchemaType.OBJECT,
                                properties: {
                                    text: { type: SchemaType.STRING, description: "Quote text", nullable: false },
                                    author: { type: SchemaType.STRING, description: "Author of the quote", nullable: false },
                                    context: { type: SchemaType.STRING, description: "Context of the quote", nullable: false },
                                    timestamp: { type: SchemaType.STRING, description: "Timestamp of the quote", nullable: false },
                                },
                                required: ["text", "author", "context", "timestamp"],
                            },
                        },
                        tasks: {
                            type: SchemaType.ARRAY,
                            items: {
                                type: SchemaType.OBJECT,
                                properties: {
                                    text: { type: SchemaType.STRING, description: "Task description", nullable: false },
                                    status: { type: SchemaType.STRING, description: "Task status", nullable: false },
                                    priority: { type: SchemaType.STRING, description: "Task priority", nullable: false },
                                    timestamp: { type: SchemaType.STRING, description: "Timestamp of the task", nullable: false },
                                },
                                required: ["text", "status", "priority", "timestamp"],
                            },
                        },
                    },
                    required: ["urls", "quotes", "tasks"],
                },
            },
            required: ["message_types", "extracted_elements"],
        },
        // Additional sections can be similarly defined...
    },
    required: ["metadata", "time_patterns", "content_analysis"],
};