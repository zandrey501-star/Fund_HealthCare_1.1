"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AppShell } from "@/components/app-shell"
import { AppHeader } from "@/components/app-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  AlertTriangle, 
  Bell, 
  Smartphone,
  Stethoscope,
  Clock,
  Check,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: "health_risk" | "reminder" | "device" | "doctor"
  title: string
  description: string
  timestamp: string
  read: boolean
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "health_risk",
    title: "Elevated Heart Rate Detected",
    description: "Your resting heart rate has been higher than usual for the past 3 days. Consider reducing stress and monitoring closely.",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    type: "reminder",
    title: "Weekly Health Check Reminder",
    description: "It's time for your weekly health check-in. Review your dashboard and update any changes.",
    timestamp: "5 hours ago",
    read: false,
  },
  {
    id: "3",
    type: "device",
    title: "Fitness Tracker Sync Complete",
    description: "Your fitness tracker has synced 7 days of data. New insights are available on your dashboard.",
    timestamp: "Yesterday",
    read: true,
  },
  {
    id: "4",
    type: "doctor",
    title: "Message from Dr. Johnson",
    description: "Your recent lab results have been reviewed. Everything looks good. Schedule a follow-up in 6 months.",
    timestamp: "2 days ago",
    read: true,
  },
  {
    id: "5",
    type: "health_risk",
    title: "Sleep Pattern Alert",
    description: "Your sleep schedule has been irregular this week. Consistent sleep times can improve overall health.",
    timestamp: "3 days ago",
    read: true,
  },
]

const typeConfig = {
  health_risk: {
    icon: AlertTriangle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    badge: "Health Alert",
    badgeVariant: "destructive" as const,
  },
  reminder: {
    icon: Clock,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    badge: "Reminder",
    badgeVariant: "secondary" as const,
  },
  device: {
    icon: Smartphone,
    color: "text-primary",
    bgColor: "bg-primary/10",
    badge: "Device",
    badgeVariant: "default" as const,
  },
  doctor: {
    icon: Stethoscope,
    color: "text-warning",
    bgColor: "bg-warning/10",
    badge: "Doctor",
    badgeVariant: "outline" as const,
  },
}

export default function NotificationsPage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState(initialNotifications)

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <AppShell>
      <div className="flex h-screen flex-col">
        <AppHeader title="Notifications" />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-3xl">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setNotifications((prev) =>
                    prev.map((n) => ({ ...n, read: true }))
                  )
                }
              >
                Mark All as Read
              </Button>
            </div>

            {/* Notifications List */}
            <div className="space-y-3">
              {notifications.map((notification) => {
                const config = typeConfig[notification.type]
                const Icon = config.icon

                return (
                  <Card
                    key={notification.id}
                    className={cn(
                      "transition-colors",
                      !notification.read && "border-primary/30 bg-primary/5"
                    )}
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div
                          className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                            config.bgColor
                          )}
                        >
                          <Icon className={cn("h-5 w-5", config.color)} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-card-foreground">
                                {notification.title}
                              </h3>
                              <Badge variant={config.badgeVariant}>
                                {config.badge}
                              </Badge>
                            </div>
                            <span className="text-xs text-muted-foreground shrink-0">
                              {notification.timestamp}
                            </span>
                          </div>

                          <p className="mt-1 text-sm text-muted-foreground">
                            {notification.description}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                if (notification.type === "health_risk") {
                                  router.push("/dashboard")
                                } else if (notification.type === "doctor") {
                                  router.push("/")
                                }
                              }}
                            >
                              Open
                            </Button>
                            {notification.type === "health_risk" && (
                              <Button size="sm" onClick={() => router.push("/reports?new=true")}>
                                Contact Doctor
                              </Button>
                            )}
                            {!notification.read && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Mark Read
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => dismissNotification(notification.id)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Dismiss
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}

              {notifications.length === 0 && (
                <Card>
                  <CardContent className="flex flex-col items-center py-12">
                    <Bell className="h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium text-card-foreground">
                      No notifications
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      You&apos;re all caught up!
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
