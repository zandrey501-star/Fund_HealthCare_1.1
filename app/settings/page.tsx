"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { AppHeader } from "@/components/app-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  Globe, 
  Bell, 
  Shield, 
  FileText,
  Trash2,
  Save,
  AlertTriangle
} from "lucide-react"

export default function SettingsPage() {
  const [language, setLanguage] = useState("en")
  const [notifications, setNotifications] = useState({
    healthAlerts: true,
    reminders: true,
    deviceSync: false,
    doctorMessages: true,
  })
  const [privacy, setPrivacy] = useState({
    shareAnonymousData: false,
    allowAnalytics: true,
  })
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  return (
    <AppShell>
      <div className="flex h-screen flex-col">
        <AppHeader title="Settings" />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-2xl space-y-6">
            {/* Language */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Globe className="h-5 w-5 text-primary" />
                  Language
                </CardTitle>
                <CardDescription>
                  Choose your preferred language for the application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-full max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English (US)</SelectItem>
                    <SelectItem value="es">Espa&#241;ol</SelectItem>
                    <SelectItem value="fr">Fran&#231;ais</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="zh">&#20013;&#25991;</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Bell className="h-5 w-5 text-primary" />
                  Notifications
                </CardTitle>
                <CardDescription>
                  Configure how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Health Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about important health signals
                    </p>
                  </div>
                  <Switch
                    checked={notifications.healthAlerts}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({ ...prev, healthAlerts: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive health check-in reminders
                    </p>
                  </div>
                  <Switch
                    checked={notifications.reminders}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({ ...prev, reminders: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Device Sync Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when devices sync new data
                    </p>
                  </div>
                  <Switch
                    checked={notifications.deviceSync}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({ ...prev, deviceSync: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Doctor Messages</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive messages from your healthcare providers
                    </p>
                  </div>
                  <Switch
                    checked={notifications.doctorMessages}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({ ...prev, doctorMessages: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Shield className="h-5 w-5 text-primary" />
                  Privacy
                </CardTitle>
                <CardDescription>
                  Control how your data is used
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Share Anonymous Data</Label>
                    <p className="text-sm text-muted-foreground">
                      Help improve the app by sharing anonymized usage data
                    </p>
                  </div>
                  <Switch
                    checked={privacy.shareAnonymousData}
                    onCheckedChange={(checked) =>
                      setPrivacy((prev) => ({ ...prev, shareAnonymousData: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Allow Analytics</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable analytics to improve your experience
                    </p>
                  </div>
                  <Switch
                    checked={privacy.allowAnalytics}
                    onCheckedChange={(checked) =>
                      setPrivacy((prev) => ({ ...prev, allowAnalytics: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Data & Agreements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="h-5 w-5 text-primary" />
                  Data & Agreements
                </CardTitle>
                <CardDescription>
                  Review and manage your data agreements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  View Terms of Service
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  View Privacy Policy
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Download My Data
                </Button>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-destructive/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription>
                  Irreversible actions for your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="destructive"
                  onClick={() => setShowDeleteDialog(true)}
                  className="gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Delete Account
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. All your health data, reports, and
              settings will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive">
              Yes, Delete My Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  )
}
