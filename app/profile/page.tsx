"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { AppHeader } from "@/components/app-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Stethoscope, 
  Building2, 
  Shield, 
  CreditCard,
  Save,
  Download,
  FileCheck
} from "lucide-react"

export default function ProfilePage() {
  const [consents, setConsents] = useState({
    aiAccess: true,
    clinicAccess: false,
    insuranceAccess: false,
  })

  return (
    <AppShell>
      <div className="flex h-screen flex-col">
        <AppHeader title="Profile" />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-4xl">
            {/* Action Buttons */}
            <div className="mb-6 flex flex-wrap gap-3">
              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Download Profile
              </Button>
              <Button variant="outline" className="gap-2">
                <FileCheck className="h-4 w-4" />
                Request Data Verification
              </Button>
            </div>

            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="personal">Personal Data</TabsTrigger>
                <TabsTrigger value="medical">Medical Data</TabsTrigger>
                <TabsTrigger value="consents">Consents</TabsTrigger>
                <TabsTrigger value="medical-id">Medical ID</TabsTrigger>
              </TabsList>

              {/* Personal Data Tab */}
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>
                      Your personal contact information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Profile Photo */}
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center">
                          <User className="h-16 w-16 text-muted-foreground" />
                        </div>
                        <Button variant="outline" size="sm">
                          Change Photo
                        </Button>
                      </div>

                      {/* Form Fields */}
                      <div className="flex-1 grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="John" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Doe" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">
                            <span className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              Email
                            </span>
                          </Label>
                          <Input id="email" type="email" defaultValue="john.doe@example.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">
                            <span className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              Phone
                            </span>
                          </Label>
                          <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="address">
                            <span className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              Address
                            </span>
                          </Label>
                          <Input id="address" defaultValue="123 Health Street, San Francisco, CA 94102" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Medical Data Tab */}
              <TabsContent value="medical">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Stethoscope className="h-5 w-5 text-primary" />
                      Medical Information
                    </CardTitle>
                    <CardDescription>
                      Your healthcare providers and conditions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Primary Physician</Label>
                        <Input defaultValue="Dr. Sarah Johnson" />
                      </div>
                      <div className="space-y-2">
                        <Label>
                          <span className="flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            Primary Clinic
                          </span>
                        </Label>
                        <Input defaultValue="Bay Area Health Center" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Known Diagnoses</Label>
                      <div className="rounded-lg border p-4">
                        <p className="text-sm text-muted-foreground">
                          No diagnoses on record. Your healthcare provider can update this information.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Allergies</Label>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-destructive/10 px-3 py-1 text-sm text-destructive">
                          Penicillin
                        </span>
                        <span className="rounded-full bg-destructive/10 px-3 py-1 text-sm text-destructive">
                          Peanuts
                        </span>
                        <Button variant="outline" size="sm" className="rounded-full">
                          + Add Allergy
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Consents Tab */}
              <TabsContent value="consents">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Data Access Consents
                    </CardTitle>
                    <CardDescription>
                      Control who can access your health data
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <p className="font-medium">AI Assistant Access</p>
                        <p className="text-sm text-muted-foreground">
                          Allow the AI to access your health data for personalized recommendations
                        </p>
                      </div>
                      <Switch
                        checked={consents.aiAccess}
                        onCheckedChange={(checked) =>
                          setConsents((prev) => ({ ...prev, aiAccess: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <p className="font-medium">Clinic Access</p>
                        <p className="text-sm text-muted-foreground">
                          Share data with Bay Area Health Center
                        </p>
                      </div>
                      <Switch
                        checked={consents.clinicAccess}
                        onCheckedChange={(checked) =>
                          setConsents((prev) => ({ ...prev, clinicAccess: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <p className="font-medium">Insurance Access</p>
                        <p className="text-sm text-muted-foreground">
                          Share data with your insurance provider
                        </p>
                      </div>
                      <Switch
                        checked={consents.insuranceAccess}
                        onCheckedChange={(checked) =>
                          setConsents((prev) => ({ ...prev, insuranceAccess: checked }))
                        }
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline">Revoke All Consents</Button>
                      <Button>Grant All Consents</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Medical ID Tab */}
              <TabsContent value="medical-id">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      Medical ID
                    </CardTitle>
                    <CardDescription>
                      Your medical identifiers and insurance information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Insurance Provider</Label>
                        <Input defaultValue="Blue Cross Blue Shield" />
                      </div>
                      <div className="space-y-2">
                        <Label>Insurance ID</Label>
                        <Input defaultValue="BCBS-12345678" />
                      </div>
                      <div className="space-y-2">
                        <Label>Medical Record Number</Label>
                        <Input defaultValue="MRN-87654321" />
                      </div>
                      <div className="space-y-2">
                        <Label>Health ID</Label>
                        <Input defaultValue="HID-2024-001234" readOnly className="bg-muted" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
