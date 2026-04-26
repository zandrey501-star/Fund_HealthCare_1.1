"use client"

import { useRouter } from "next/navigation"
import { AppShell } from "@/components/app-shell"
import { AppHeader } from "@/components/app-header"
import { HealthScoreCard } from "@/components/dashboard/health-score-card"
import { MetricsGrid } from "@/components/dashboard/metrics-grid"
import { TrendsChart } from "@/components/dashboard/trends-chart"
import { RedFlagsCard } from "@/components/dashboard/red-flags-card"
import { RecommendationsCard } from "@/components/dashboard/recommendations-card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Link2, Download } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()

  return (
    <AppShell>
      <div className="flex h-screen flex-col">
        <AppHeader title="Health Dashboard" />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-7xl">
            {/* Action Buttons */}
            <div className="mb-6 flex flex-wrap gap-3">
              <Button onClick={() => router.push("/")} className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Go to Chat
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/integrations")}
                className="gap-2"
              >
                <Link2 className="h-4 w-4" />
                Connect Device
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/reports?new=true")}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Download Report
              </Button>
            </div>

            {/* Dashboard Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Left Column */}
              <div className="space-y-6">
                <HealthScoreCard />
                <RedFlagsCard />
              </div>

              {/* Middle Column */}
              <div className="lg:col-span-2 space-y-6">
                <MetricsGrid />
                <TrendsChart />
                <RecommendationsCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
