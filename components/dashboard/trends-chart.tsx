"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const sleepData = [
  { day: "Mon", hours: 7.2, quality: 75 },
  { day: "Tue", hours: 6.5, quality: 68 },
  { day: "Wed", hours: 8.0, quality: 82 },
  { day: "Thu", hours: 5.5, quality: 55 },
  { day: "Fri", hours: 6.8, quality: 70 },
  { day: "Sat", hours: 9.0, quality: 88 },
  { day: "Sun", hours: 7.5, quality: 78 },
]

const heartRateData = [
  { day: "Mon", resting: 68, active: 125 },
  { day: "Tue", resting: 72, active: 132 },
  { day: "Wed", resting: 70, active: 128 },
  { day: "Thu", resting: 75, active: 140 },
  { day: "Fri", resting: 71, active: 130 },
  { day: "Sat", resting: 66, active: 118 },
  { day: "Sun", resting: 69, active: 122 },
]

const stepsData = [
  { day: "Mon", steps: 8500, goal: 10000 },
  { day: "Tue", steps: 12300, goal: 10000 },
  { day: "Wed", steps: 6800, goal: 10000 },
  { day: "Thu", steps: 9200, goal: 10000 },
  { day: "Fri", steps: 10500, goal: 10000 },
  { day: "Sat", steps: 15200, goal: 10000 },
  { day: "Sun", steps: 7800, goal: 10000 },
]

export function TrendsChart() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sleep" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="sleep">Sleep</TabsTrigger>
            <TabsTrigger value="heart">Heart Rate</TabsTrigger>
            <TabsTrigger value="steps">Steps</TabsTrigger>
          </TabsList>

          <TabsContent value="sleep" className="mt-0">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sleepData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="hours"
                    name="Hours"
                    stroke="hsl(var(--secondary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--secondary))" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="quality"
                    name="Quality %"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="heart" className="mt-0">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={heartRateData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="resting"
                    name="Resting BPM"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="active"
                    name="Active BPM"
                    stroke="hsl(var(--destructive))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--destructive))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="steps" className="mt-0">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stepsData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="steps"
                    name="Steps"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="goal"
                    name="Goal"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
