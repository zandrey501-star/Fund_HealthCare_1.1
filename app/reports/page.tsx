"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { AppShell } from "@/components/app-shell"
import { AppHeader } from "@/components/app-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { 
  FileText, 
  Download, 
  Send, 
  Plus,
  Calendar,
  CheckCircle,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Report {
  id: string
  title: string
  topic: string
  date: string
  status: "completed" | "pending" | "sent"
}

const initialReports: Report[] = [
  {
    id: "1",
    title: "Health Summary Report",
    topic: "General Health",
    date: "April 20, 2026",
    status: "completed",
  },
  {
    id: "2",
    title: "Sleep Analysis Report",
    topic: "Sleep Patterns",
    date: "April 15, 2026",
    status: "sent",
  },
  {
    id: "3",
    title: "Cardiovascular Report",
    topic: "Heart Health",
    date: "April 10, 2026",
    status: "completed",
  },
  {
    id: "4",
    title: "Weekly Health Check",
    topic: "General Health",
    date: "April 5, 2026",
    status: "sent",
  },
]

const statusConfig = {
  completed: {
    label: "Completed",
    icon: CheckCircle,
    color: "bg-primary/10 text-primary",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    color: "bg-warning/10 text-warning",
  },
  sent: {
    label: "Sent to Doctor",
    icon: Send,
    color: "bg-secondary/10 text-secondary",
  },
}

function ReportsContent() {
  const searchParams = useSearchParams()
  const [reports, setReports] = useState(initialReports)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [reportType, setReportType] = useState("")
  const [topic, setTopic] = useState("")
  const [includeMetrics, setIncludeMetrics] = useState(true)
  const [includeRedFlags, setIncludeRedFlags] = useState(true)
  const [includeAiAnalysis, setIncludeAiAnalysis] = useState(true)

  useEffect(() => {
    if (searchParams.get("new") === "true") {
      setShowCreateModal(true)
      // Pre-fill from URL params if available
      const typeParam = searchParams.get("type")
      const topicParam = searchParams.get("topic")
      if (typeParam) setReportType(typeParam)
      if (topicParam) setTopic(topicParam)
    }
  }, [searchParams])

  const handleCreateReport = () => {
    const newReport: Report = {
      id: Date.now().toString(),
      title: `${reportType === "summary" ? "Health Summary" : reportType === "detailed" ? "Detailed Analysis" : "Specialist Referral"} Report`,
      topic: topic.charAt(0).toUpperCase() + topic.slice(1),
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      status: "completed",
    }
    setReports((prev) => [newReport, ...prev])
    setShowCreateModal(false)
    setReportType("")
    setTopic("")
  }

  return (
    <AppShell>
      <div className="flex h-screen flex-col">
        <AppHeader title="Reports for Doctor" />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">
                  Generate and manage health reports for your healthcare provider
                </p>
              </div>
              <Button onClick={() => setShowCreateModal(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Create Report
              </Button>
            </div>

            {/* Reports List */}
            <div className="space-y-4">
              {reports.map((report) => {
                const config = statusConfig[report.status]
                const StatusIcon = config.icon

                return (
                  <Card key={report.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-card-foreground">
                              {report.title}
                            </h3>
                            <Badge variant="outline">{report.topic}</Badge>
                          </div>
                          <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {report.date}
                            </span>
                            <span className={cn("flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium", config.color)}>
                              <StatusIcon className="h-3 w-3" />
                              {config.label}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="gap-1.5">
                            <Download className="h-4 w-4" />
                            Download PDF
                          </Button>
                          {report.status === "completed" && (
                            <Button size="sm" className="gap-1.5">
                              <Send className="h-4 w-4" />
                              Send to Doctor
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Create Report Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Create New Report
            </DialogTitle>
            <DialogDescription>
              Generate a structured health report for your healthcare provider
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summary">Health Summary</SelectItem>
                  <SelectItem value="detailed">Detailed Analysis</SelectItem>
                  <SelectItem value="specialist">Specialist Referral</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Topic</Label>
              <Select value={topic} onValueChange={setTopic}>
                <SelectTrigger>
                  <SelectValue placeholder="Select topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Health</SelectItem>
                  <SelectItem value="cardiovascular">Cardiovascular</SelectItem>
                  <SelectItem value="sleep">Sleep Patterns</SelectItem>
                  <SelectItem value="mental">Mental Wellness</SelectItem>
                  <SelectItem value="fitness">Fitness & Activity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Include in Report</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="metrics"
                    checked={includeMetrics}
                    onCheckedChange={(checked) => setIncludeMetrics(checked as boolean)}
                  />
                  <Label htmlFor="metrics" className="font-normal">
                    Health Metrics & Trends
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="redflags"
                    checked={includeRedFlags}
                    onCheckedChange={(checked) => setIncludeRedFlags(checked as boolean)}
                  />
                  <Label htmlFor="redflags" className="font-normal">
                    Red Flags & Alerts
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="ai"
                    checked={includeAiAnalysis}
                    onCheckedChange={(checked) => setIncludeAiAnalysis(checked as boolean)}
                  />
                  <Label htmlFor="ai" className="font-normal">
                    AI Analysis & Recommendations
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateReport} disabled={!reportType || !topic}>
              Generate Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  )
}

export default function ReportsPage() {
  return (
    <Suspense fallback={
      <AppShell>
        <div className="flex h-screen flex-col">
          <AppHeader title="Reports for Doctor" />
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">Loading...</div>
          </div>
        </div>
      </AppShell>
    }>
      <ReportsContent />
    </Suspense>
  )
}
