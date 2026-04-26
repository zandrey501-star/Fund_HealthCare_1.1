"use client"

import { useState } from "react"
import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import { Label } from "@/components/ui/label"

interface GenerateReportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onGenerate: (type: string, topic: string) => void
}

const reportTypes = [
  { value: "summary", label: "Health Summary" },
  { value: "detailed", label: "Detailed Analysis" },
  { value: "specialist", label: "Specialist Referral" },
]

const topics = [
  { value: "general", label: "General Health" },
  { value: "cardiovascular", label: "Cardiovascular" },
  { value: "sleep", label: "Sleep Patterns" },
  { value: "mental", label: "Mental Wellness" },
  { value: "fitness", label: "Fitness & Activity" },
]

export function GenerateReportModal({
  open,
  onOpenChange,
  onGenerate,
}: GenerateReportModalProps) {
  const [reportType, setReportType] = useState("")
  const [topic, setTopic] = useState("")

  const handleGenerate = () => {
    if (reportType && topic) {
      onGenerate(reportType, topic)
      onOpenChange(false)
      setReportType("")
      setTopic("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle>Generate Report for Doctor</DialogTitle>
              <DialogDescription>
                Create a structured health report to share with your healthcare provider.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="report-type">Report Type</Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger id="report-type">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                {reportTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger id="topic">
                <SelectValue placeholder="Select topic" />
              </SelectTrigger>
              <SelectContent>
                {topics.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleGenerate} disabled={!reportType || !topic}>
            Generate Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
