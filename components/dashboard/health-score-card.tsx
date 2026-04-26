"use client"

import { TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function HealthScoreCard() {
  const score = 78
  const trend = 5
  const trendDirection = trend > 0 ? "up" : "down"

  // Calculate the stroke-dashoffset for the circular progress
  const circumference = 2 * Math.PI * 70
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Health Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          {/* Circular Progress */}
          <div className="relative h-44 w-44">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 160 160">
              {/* Background circle */}
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                className="text-muted"
              />
              {/* Progress circle */}
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="text-primary transition-all duration-500"
              />
            </svg>
            {/* Score display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-foreground">{score}</span>
              <span className="text-sm text-muted-foreground">out of 100</span>
            </div>
          </div>

          {/* Trend indicator */}
          <div className="mt-4 flex items-center gap-2">
            <div className={`flex items-center gap-1 ${trendDirection === "up" ? "text-primary" : "text-destructive"}`}>
              <TrendingUp className={`h-4 w-4 ${trendDirection === "down" ? "rotate-180" : ""}`} />
              <span className="text-sm font-medium">{Math.abs(trend)}%</span>
            </div>
            <span className="text-sm text-muted-foreground">from last week</span>
          </div>

          {/* Status text */}
          <p className="mt-3 text-center text-sm text-muted-foreground">
            Your overall health score is <span className="font-medium text-primary">Good</span>. 
            Keep up the healthy habits!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
