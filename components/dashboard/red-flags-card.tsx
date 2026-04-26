"use client"

import { AlertTriangle, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface RedFlag {
  id: string
  title: string
  description: string
  severity: "high" | "medium" | "low"
  timestamp: string
}

const redFlags: RedFlag[] = [
  {
    id: "1",
    title: "Irregular Sleep Pattern",
    description: "Sleep duration has varied significantly over the past week",
    severity: "medium",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    title: "Elevated Resting Heart Rate",
    description: "Average resting heart rate is 8 BPM higher than baseline",
    severity: "low",
    timestamp: "Yesterday",
  },
]

export function RedFlagsCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base font-medium">
          <AlertTriangle className="h-4 w-4 text-warning" />
          Red Flags
        </CardTitle>
      </CardHeader>
      <CardContent>
        {redFlags.length > 0 ? (
          <div className="space-y-3">
            {redFlags.map((flag) => (
              <button
                key={flag.id}
                className="flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-muted"
              >
                <div
                  className={cn(
                    "mt-0.5 h-2 w-2 shrink-0 rounded-full",
                    flag.severity === "high" && "bg-destructive",
                    flag.severity === "medium" && "bg-warning",
                    flag.severity === "low" && "bg-secondary"
                  )}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-card-foreground truncate">
                      {flag.title}
                    </p>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground line-clamp-2">
                    {flag.description}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {flag.timestamp}
                  </p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center py-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <AlertTriangle className="h-6 w-6 text-primary" />
            </div>
            <p className="mt-3 text-sm font-medium text-card-foreground">
              No red flags detected
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Your health metrics look good
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
