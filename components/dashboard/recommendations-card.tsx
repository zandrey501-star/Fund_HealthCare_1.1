"use client"

import { Lightbulb, Moon, Footprints, Heart, Coffee } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Recommendation {
  id: string
  title: string
  description: string
  icon: React.ElementType
  priority: "high" | "medium" | "low"
}

const recommendations: Recommendation[] = [
  {
    id: "1",
    title: "Improve Sleep Consistency",
    description: "Try to maintain a consistent bedtime. Your sleep schedule has varied by 2+ hours recently.",
    icon: Moon,
    priority: "high",
  },
  {
    id: "2",
    title: "Increase Daily Steps",
    description: "You're averaging 7,500 steps. Try to hit your 10,000 step goal more consistently.",
    icon: Footprints,
    priority: "medium",
  },
  {
    id: "3",
    title: "Monitor Heart Rate",
    description: "Your resting heart rate has been slightly elevated. Consider stress-reducing activities.",
    icon: Heart,
    priority: "medium",
  },
  {
    id: "4",
    title: "Reduce Afternoon Caffeine",
    description: "Based on your sleep patterns, limiting caffeine after 2 PM may improve sleep quality.",
    icon: Coffee,
    priority: "low",
  },
]

const priorityColors = {
  high: "bg-destructive/10 text-destructive",
  medium: "bg-warning/10 text-warning",
  low: "bg-primary/10 text-primary",
}

export function RecommendationsCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base font-medium">
          <Lightbulb className="h-4 w-4 text-warning" />
          AI Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="flex gap-3 rounded-lg border p-3 transition-colors hover:bg-muted"
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${priorityColors[rec.priority]}`}>
                <rec.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-card-foreground">{rec.title}</p>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {rec.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
