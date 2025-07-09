"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Calendar,
  Edit,
  Eye,
  FileText,
  MessageSquare,
  Package,
  Phone,
  Plus,
  Mail,
  AlertTriangle,
  ShieldAlert,
  DollarSign,
  FileUp,
  ClipboardCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getPatientById } from "@/lib/db"
import type { Patient } from "@/lib/db"
import { PatientMedicalHistory } from "./patient-medical-history"
import { PatientVisitHistory } from "./patient-visit-history"
import { PatientOrdersTab } from "./patient-orders-tab"
import { PatientInsurance } from "./patient-insurance"
import { PatientDocuments } from "./patient-documents"
import { PatientBilling } from "./patient-billing"
import { PatientCommunication } from "./patient-communication"
import { PatientNotes } from "./patient-notes"

interface PatientProfilePageProps {
  patientId: string
}

export function PatientProfilePage({ patientId }: PatientProfilePageProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [patient, setPatient] = useState<Patient | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadPatient() {
      try {
        const patientData = await getPatientById(patientId)
        setPatient(patientData)
      } catch (err) {
        console.error("Error loading patient:", err)
        setError("Failed to load patient data")
      } finally {
        setLoading(false)
      }
    }

    loadPatient()
  }, [patientId])

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-muted-foreground">Loading patient data...</p>
      </div>
    )
  }

  if (error || !patient) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-red-500">{error || "Patient not found"}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/patients">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">
            {patient.fullName || `${patient.firstName} ${patient.lastName}`}
          </h1>
          <Badge variant="outline">{patient.id}</Badge>
          {patient.status === "Active" ? (
            <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300">
              Active
            </Badge>
          ) : patient.status === "Inactive" ? (
            <Badge variant="outline" className="bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              Inactive
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              New
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/appointments/new?patientId=${patient.id}`}>
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Appointment
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Patient Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href={`/examinations/new?patientId=${patient.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  New Examination
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/lab/orders/new?patientId=${patient.id}`}>
                  <Package className="mr-2 h-4 w-4" />
                  New Lab Order
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/billing/new?patientId=${patient.id}`}>
                  <DollarSign className="mr-2 h-4 w-4" />
                  New Billing
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileUp className="mr-2 h-4 w-4" />
                Upload Document
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Message
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit Patient
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500">Deactivate Patient</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start border-b pb-px">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="medical">Medical</TabsTrigger>
          <TabsTrigger value="visits">Visits</TabsTrigger>
          <TabsTrigger value="orders">Lab Orders</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Patient Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Date of Birth</div>
                    <div>
                      {patient.dob || "Not recorded"} {patient.age ? `(${patient.age} years)` : ""}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Gender</div>
                    <div>{patient.gender || "Not recorded"}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Phone</div>
                    <div>{patient.phone || "Not recorded"}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Email</div>
                    <div>{patient.email || "Not recorded"}</div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="text-sm font-medium text-muted-foreground">Address</div>
                    <div>
                      {patient.address ? (
                        <>
                          {patient.address}
                          {patient.city && patient.state
                            ? `, ${patient.city}, ${patient.state} ${patient.zipCode}`
                            : ""}
                        </>
                      ) : (
                        "Not recorded"
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Occupation</div>
                    <div>{patient.occupation || "Not recorded"}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Primary Insurance</div>
                    <div>{patient.insurance?.primary || "Not recorded"}</div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="text-sm font-medium text-muted-foreground">Emergency Contact</div>
                    <div>{patient.emergencyContact || "Not recorded"}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Phone className="mr-2 h-4 w-4" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline">
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Medical Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patient.medicalAlerts && patient.medicalAlerts.length > 0 ? (
                    patient.medicalAlerts.map((alert, index) => (
                      <div key={index} className="flex items-start gap-2 rounded-md bg-red-50 p-3 dark:bg-red-900/20">
                        <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        <div>
                          <div className="font-medium text-red-800 dark:text-red-300">{alert}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-md bg-gray-50 p-3 dark:bg-gray-900/20">
                      <div className="text-center text-muted-foreground">No medical alerts recorded</div>
                    </div>
                  )}

                  {patient.medicalHistory?.allergies && patient.medicalHistory.allergies.length > 0 ? (
                    <div className="rounded-md bg-yellow-50 p-3 dark:bg-yellow-900/20">
                      <div className="flex items-start gap-2">
                        <ShieldAlert className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                        <div>
                          <div className="font-medium text-yellow-800 dark:text-yellow-300">Allergies</div>
                          <div className="text-sm text-yellow-700 dark:text-yellow-400">
                            {patient.medicalHistory.allergies.join(", ")}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Edit className="mr-2 h-4 w-4" />
                  Update Alerts
                </Button>
              </CardFooter>
            </Card>
          </div>

          {patient.visionHistory?.currentRx ? (
            <Card>
              <CardHeader>
                <CardTitle>Current Prescription</CardTitle>
                <CardDescription>
                  {patient.visits && patient.visits.length > 0
                    ? `Last updated on ${patient.visits[0].date}`
                    : "No exam date recorded"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-2 text-sm font-medium">Right Eye (OD)</h3>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-4 border-b">
                        <div className="border-r p-2 text-center font-medium">SPH</div>
                        <div className="border-r p-2 text-center font-medium">CYL</div>
                        <div className="border-r p-2 text-center font-medium">AXIS</div>
                        <div className="p-2 text-center font-medium">ADD</div>
                      </div>
                      <div className="grid grid-cols-4">
                        <div className="border-r p-2 text-center">
                          {patient.visionHistory.currentRx.rightEye?.sphere || "-"}
                        </div>
                        <div className="border-r p-2 text-center">
                          {patient.visionHistory.currentRx.rightEye?.cylinder || "-"}
                        </div>
                        <div className="border-r p-2 text-center">
                          {patient.visionHistory.currentRx.rightEye?.axis || "-"}
                        </div>
                        <div className="p-2 text-center">{patient.visionHistory.currentRx.rightEye?.add || "-"}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-medium">Left Eye (OS)</h3>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-4 border-b">
                        <div className="border-r p-2 text-center font-medium">SPH</div>
                        <div className="border-r p-2 text-center font-medium">CYL</div>
                        <div className="border-r p-2 text-center font-medium">AXIS</div>
                        <div className="p-2 text-center font-medium">ADD</div>
                      </div>
                      <div className="grid grid-cols-4">
                        <div className="border-r p-2 text-center">
                          {patient.visionHistory.currentRx.leftEye?.sphere || "-"}
                        </div>
                        <div className="border-r p-2 text-center">
                          {patient.visionHistory.currentRx.leftEye?.cylinder || "-"}
                        </div>
                        <div className="border-r p-2 text-center">
                          {patient.visionHistory.currentRx.leftEye?.axis || "-"}
                        </div>
                        <div className="p-2 text-center">{patient.visionHistory.currentRx.leftEye?.add || "-"}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div>
                    <div className="text-sm font-medium">PD</div>
                    <div>{patient.visionHistory.currentRx.pd || "Not recorded"}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Doctor</div>
                    <div>{patient.preferredDoctor || "Not recorded"}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Expiration</div>
                    <div>
                      {patient.visionHistory.currentRx.expirationDate ||
                        (patient.visits && patient.visits.length > 0
                          ? new Date(
                              new Date(patient.visits[0].date).setFullYear(
                                new Date(patient.visits[0].date).getFullYear() + 1,
                              ),
                            ).toLocaleDateString()
                          : "Not applicable")}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Notes</div>
                    <div>{patient.visionHistory.currentRx.notes || "None"}</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Print Prescription
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" asChild>
                    <Link href={`/lab/orders/new?patientId=${patient.id}`}>
                      <Package className="mr-2 h-4 w-4" />
                      Create Lab Order
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href={`/examinations/new?patientId=${patient.id}`}>
                      <ClipboardCheck className="mr-2 h-4 w-4" />
                      New Exam
                    </Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Prescription Available</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-4">This patient does not have any prescription records.</p>
                  <Button asChild>
                    <Link href={`/examinations/new?patientId=${patient.id}`}>
                      <ClipboardCheck className="mr-2 h-4 w-4" />
                      Create New Examination
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-4 text-center">
                <p className="text-muted-foreground">
                  {patient.nextVisit
                    ? `Next appointment scheduled for ${patient.nextVisit}`
                    : "No upcoming appointments scheduled"}
                </p>
                <Button className="mt-2" variant="outline" asChild>
                  <Link href={`/appointments/new?patientId=${patient.id}`}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule New Appointment
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medical" className="mt-6">
          <PatientMedicalHistory patient={patient} />
        </TabsContent>

        <TabsContent value="visits" className="mt-6">
          <PatientVisitHistory patient={patient} />
        </TabsContent>

        <TabsContent value="orders" className="mt-6">
          <PatientOrdersTab patient={patient} />
        </TabsContent>

        <TabsContent value="insurance" className="mt-6">
          <PatientInsurance patient={patient} />
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <PatientDocuments patient={patient} />
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          <PatientBilling patient={patient} />
        </TabsContent>

        <TabsContent value="communication" className="mt-6">
          <PatientCommunication patient={patient} />
        </TabsContent>

        <TabsContent value="notes" className="mt-6">
          <PatientNotes patient={patient} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
