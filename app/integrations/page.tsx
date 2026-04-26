"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { AppHeader } from "@/components/app-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Smartphone,
  Watch,
  Heart,
  Activity,
  Building2,
  FileText,
  RefreshCw,
  Check,
  Link2,
  Unlink
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Integration {
  id: string
  name: string
  description: string
  icon: React.ElementType
  category: "device" | "medical"
  connected: boolean
  lastSync?: string
}

const initialIntegrations: Integration[] = [
  {
    id: "apple-health",
    name: "Apple Health",
    description: "Sync health data from your iPhone and Apple Watch",
    icon: Heart,
    category: "device",
    connected: true,
    lastSync: "5 minutes ago",
  },
  {
    id: "fitness-tracker",
    name: "Fitness Tracker",
    description: "Connect your Fitbit, Garmin, or other fitness bands",
    icon: Activity,
    category: "device",
    connected: true,
    lastSync: "1 hour ago",
  },
  {
    id: "smartwatch",
    name: "Smartwatch",
    description: "Connect Samsung Galaxy Watch, Amazfit, or others",
    icon: Watch,
    category: "device",
    connected: false,
  },
  {
    id: "blood-pressure",
    name: "Blood Pressure Monitor",
    description: "Connect your smart blood pressure monitor",
    icon: Smartphone,
    category: "device",
    connected: false,
  },
  {
    id: "clinic",
    name: "Bay Area Health Center",
    description: "Access your medical records and appointments",
    icon: Building2,
    category: "medical",
    connected: true,
    lastSync: "Yesterday",
  },
  {
    id: "ehr",
    name: "Electronic Health Records",
    description: "Connect to your healthcare provider's EHR system",
    icon: FileText,
    category: "medical",
    connected: false,
  },
]

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState(initialIntegrations)
  const [syncing, setSyncing] = useState<string | null>(null)

  const toggleConnection = (id: string) => {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === id
          ? {
              ...i,
              connected: !i.connected,
              lastSync: !i.connected ? "Just now" : undefined,
            }
          : i
      )
    )
  }

  const syncIntegration = (id: string) => {
    setSyncing(id)
    setTimeout(() => {
      setIntegrations((prev) =>
        prev.map((i) =>
          i.id === id ? { ...i, lastSync: "Just now" } : i
        )
      )
      setSyncing(null)
    }, 2000)
  }

  const deviceIntegrations = integrations.filter((i) => i.category === "device")
  const medicalIntegrations = integrations.filter((i) => i.category === "medical")

  return (
    <AppShell>
      <div className="flex h-screen flex-col">
        <AppHeader title="Integrations" />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-4xl space-y-8">
            {/* Devices Section */}
            <section>
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-foreground">Devices</h2>
                <p className="text-sm text-muted-foreground">
                  Connect your health tracking devices to sync data automatically
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {deviceIntegrations.map((integration) => {
                  const Icon = integration.icon
                  const isSyncing = syncing === integration.id

                  return (
                    <Card key={integration.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div
                            className={cn(
                              "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg",
                              integration.connected
                                ? "bg-primary/10 text-primary"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            <Icon className="h-6 w-6" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-card-foreground">
                                {integration.name}
                              </h3>
                              {integration.connected && (
                                <Badge variant="default" className="bg-primary">
                                  <Check className="h-3 w-3 mr-1" />
                                  Connected
                                </Badge>
                              )}
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {integration.description}
                            </p>
                            {integration.lastSync && (
                              <p className="mt-1 text-xs text-muted-foreground">
                                Last synced: {integration.lastSync}
                              </p>
                            )}

                            <div className="mt-3 flex gap-2">
                              {integration.connected ? (
                                <>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => syncIntegration(integration.id)}
                                    disabled={isSyncing}
                                  >
                                    <RefreshCw
                                      className={cn(
                                        "h-4 w-4 mr-1",
                                        isSyncing && "animate-spin"
                                      )}
                                    />
                                    {isSyncing ? "Syncing..." : "Sync Now"}
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-destructive hover:text-destructive"
                                    onClick={() => toggleConnection(integration.id)}
                                  >
                                    <Unlink className="h-4 w-4 mr-1" />
                                    Disconnect
                                  </Button>
                                </>
                              ) : (
                                <Button
                                  size="sm"
                                  onClick={() => toggleConnection(integration.id)}
                                >
                                  <Link2 className="h-4 w-4 mr-1" />
                                  Connect Device
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </section>

            {/* Medical Systems Section */}
            <section>
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-foreground">Medical Systems</h2>
                <p className="text-sm text-muted-foreground">
                  Connect to healthcare providers and electronic health records
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {medicalIntegrations.map((integration) => {
                  const Icon = integration.icon
                  const isSyncing = syncing === integration.id

                  return (
                    <Card key={integration.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div
                            className={cn(
                              "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg",
                              integration.connected
                                ? "bg-primary/10 text-primary"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            <Icon className="h-6 w-6" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-card-foreground">
                                {integration.name}
                              </h3>
                              {integration.connected && (
                                <Badge variant="default" className="bg-primary">
                                  <Check className="h-3 w-3 mr-1" />
                                  Connected
                                </Badge>
                              )}
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {integration.description}
                            </p>
                            {integration.lastSync && (
                              <p className="mt-1 text-xs text-muted-foreground">
                                Last synced: {integration.lastSync}
                              </p>
                            )}

                            <div className="mt-3 flex gap-2">
                              {integration.connected ? (
                                <>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => syncIntegration(integration.id)}
                                    disabled={isSyncing}
                                  >
                                    <RefreshCw
                                      className={cn(
                                        "h-4 w-4 mr-1",
                                        isSyncing && "animate-spin"
                                      )}
                                    />
                                    Check Status
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-destructive hover:text-destructive"
                                    onClick={() => toggleConnection(integration.id)}
                                  >
                                    <Unlink className="h-4 w-4 mr-1" />
                                    Disconnect
                                  </Button>
                                </>
                              ) : (
                                <Button
                                  size="sm"
                                  onClick={() => toggleConnection(integration.id)}
                                >
                                  <Link2 className="h-4 w-4 mr-1" />
                                  Connect
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </section>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
