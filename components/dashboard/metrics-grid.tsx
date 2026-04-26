"use client"

import { Heart, Moon, Footprints, Droplets, Link2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Metric {
  id: string
  label: string
  value: string | null
  unit: string
  icon: React.ElementType
  trend?: "up" | "down" | "stable"
  trendValue?: string
  color: string
}

const metrics: Metric[] = [
  {
    id: "heart-rate",
    label: "Heart Rate",
    value: "72",
    unit: "bpm",
    icon: Heart,
    trend: "stable",
    trendValue: "Normal range",
    color: "text-destructive",
  },
  {
    id: "sleep",
    label: "Sleep",
    value: "6.5",
    unit: "hours",
    icon: Moon,
    trend: "down",
    trendValue: "-1.2h avg",
    color: "text-secondary",
  },
  {
    id: "steps",
    label: "Steps",
    value: "8,432",
    unit: "today",
    icon: Footprints,
    trend: "up",
    trendValue: "+12% weekly",
    color: "text-primary",
  },
  {
    id: "weight",
    label: "Weight",
    value: null,
    unit: "lbs",
    icon: Droplets,
    color: "text-warning",
  },
]

export function MetricsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.id}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className={cn("rounded-lg p-2", metric.color, "bg-current/10")}>
                <metric.icon className={cn("h-5 w-5", metric.color)} />
              </div>
              {metric.trend && (
                <span
                  className={cn(
                    "text-xs font-medium",
                    metric.trend === "up" && "text-primary",
                    metric.trend === "down" && "text-destructive",
                    metric.trend === "stable" && "text-muted-foreground"
                  )}
                >
                  {metric.trendValue}
                </span>
              )}
            </div>

            <div className="mt-3">
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              {metric.value ? (
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-semibold text-card-foreground">
                    {metric.value}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {metric.unit}
                  </span>
                </div>
              ) : (
                <Button variant="outline" size="sm" className="mt-1 gap-1.5">
                  <Link2 className="h-3.5 w-3.5" />
                  Connect Device
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
