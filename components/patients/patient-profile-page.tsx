"use client"

import { useState } from "react"
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
import { PatientMedicalHistory } from "@/components/patients/patient-medical-history"
import { PatientVisitHistory } from "@/components/patients/patient-visit-history"
import { PatientOrdersTab } from "@/components/patients/patient-orders-tab"
import { PatientInsurance } from "@/components/patients/patient-insurance"
import { PatientDocuments } from "@/components/patients/patient-documents"
import { PatientBilling } from "@/components/patients/patient-billing"
import { PatientCommunication } from "@/components/patients/patient-communication"
import { PatientNotes } from "@/components/patients/patient-notes"

// Mock patient data - in a real app, this would come from the database

const patients = {
  "P-10042": {
    id: "P-10042",
    name: "Sarah Johnson",
    dob: "05/12/1981",
    age: 42,
    gender: "Female",
    email: "sarah.j@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, CA 12345",
    occupation: "Teacher",
    emergencyContact: "Michael Johnson (Husband) - (555) 987-6543",
    status: "Active",
    lastVisit: "05/01/2023",
    nextVisit: "05/01/2024",
    doctor: "Dr. Williams",
    insurance: {
      primary: "Blue Cross",
      policyNumber: "BC123456789",
      groupNumber: "GRP987654",
      effectiveDate: "01/01/2023",
      expirationDate: "12/31/2023",
      copay: "$20",
      coverage: "80%",
    },
    medicalAlerts: ["Diabetes", "Allergies to penicillin"],
    visionHistory: {
      currentRx: {
        rightEye: {
          sphere: "-2.00",
          cylinder: "-0.75",
          axis: "180",
          add: "+2.00",
        },
        leftEye: {
          sphere: "-1.75",
          cylinder: "-0.50",
          axis: "175",
          add: "+2.00",
        },
        pd: "63",
        notes: "Progressive lenses",
      },
      previousRx: [
        {
          date: "05/01/2022",
          rightEye: {
            sphere: "-1.75",
            cylinder: "-0.75",
            axis: "180",
            add: "+1.75",
          },
          leftEye: {
            sphere: "-1.50",
            cylinder: "-0.50",
            axis: "175",
            add: "+1.75",
          },
        },
      ],
    },
    medicalHistory: {
      conditions: ["Type 2 Diabetes (diagnosed 2015)", "Hypertension"],
      medications: ["Metformin 500mg twice daily", "Lisinopril 10mg daily"],
      allergies: ["Penicillin", "Sulfa drugs"],
      familyHistory: ["Father: Glaucoma", "Mother: Cataracts"],
    },
    visits: [
      {
        id: "V-10042",
        date: "05/01/2023",
        type: "Annual Exam",
        doctor: "Dr. Williams",
        reason: "Routine eye examination",
        notes: "Patient reports occasional blurry vision when reading. Recommended progressive lenses.",
        diagnosis: "Presbyopia, Mild Astigmatism",
        followUp: "1 year",
      },
      {
        id: "V-10041",
        date: "05/01/2022",
        type: "Annual Exam",
        doctor: "Dr. Williams",
        reason: "Routine eye examination",
        notes: "No significant changes from previous exam.",
        diagnosis: "Presbyopia, Mild Astigmatism",
        followUp: "1 year",
      },
    ],
    orders: [
      {
        id: "O-10042",
        date: "05/01/2023",
        type: "Progressive Glasses",
        status: "In Progress",
        details: "Ray-Ban RB5154 frame with Essilor Varilux progressive lenses",
        price: "$450.00",
        insurance: "$360.00",
        balance: "$90.00",
      },
      {
        id: "O-10041",
        date: "05/01/2022",
        type: "Progressive Glasses",
        status: "Dispensed",
        details: "Oakley OX8046 frame with Essilor Varilux progressive lenses",
        price: "$425.00",
        insurance: "$340.00",
        balance: "$85.00",
      },
    ],
    billing: [
      {
        id: "B-10042",
        date: "05/01/2023",
        description: "Annual Eye Examination",
        total: "$150.00",
        insurance: "$120.00",
        patient: "$30.00",
        status: "Paid",
      },
      {
        id: "B-10041",
        date: "05/01/2022",
        description: "Annual Eye Examination",
        total: "$150.00",
        insurance: "$120.00",
        patient: "$30.00",
        status: "Paid",
      },
      {
        id: "B-10043",
        date: "05/01/2023",
        description: "Progressive Glasses",
        total: "$450.00",
        insurance: "$360.00",
        patient: "$90.00",
        status: "Due",
      },
    ],
    documents: [
      {
        id: "D-10042",
        name: "Insurance Card",
        type: "image/jpeg",
        date: "05/01/2023",
        uploadedBy: "Front Desk",
      },
      {
        id: "D-10041",
        name: "Medical Records Release",
        type: "application/pdf",
        date: "05/01/2023",
        uploadedBy: "Patient",
      },
      {
        id: "D-10043",
        name: "Previous Prescription",
        type: "application/pdf",
        date: "05/01/2022",
        uploadedBy: "Dr. Williams",
      },
    ],
    communications: [
      {
        id: "C-10042",
        date: "05/02/2023",
        type: "Email",
        subject: "Appointment Confirmation",
        content: "Thank you for your visit. Your next appointment is scheduled for May 1, 2024.",
        sentBy: "System",
      },
      {
        id: "C-10041",
        date: "04/25/2023",
        type: "SMS",
        subject: "Appointment Reminder",
        content: "Reminder: You have an appointment with Dr. Williams on May 1, 2023 at 10:00 AM.",
        sentBy: "System",
      },
    ],
    notes: [
      {
        id: "N-10042",
        date: "05/01/2023",
        title: "Patient Preferences",
        content:
          "Patient prefers appointment reminders via text message. Interested in trying contact lenses in the future.",
        author: "Dr. Williams",
      },
      {
        id: "N-10041",
        date: "05/01/2022",
        title: "Frame Selection Notes",
        content: "Patient prefers lightweight frames. Sensitive to pressure on nose bridge.",
        author: "Sarah Williams (Optician)",
      },
    ],
  },
}

interface PatientProfilePageProps {
  patientId: string
}

export function PatientProfilePage({ patientId }: PatientProfilePageProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // In a real app, you would fetch this data from the database
  const patient = patients[patientId as keyof typeof patients]

  if (!patient) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Patient Not Found</h2>
          <p className="text-muted-foreground">The patient with ID {patientId} could not be found.</p>
          <Button asChild className="mt-4">
            <Link href="/patients">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Patients
            </Link>
          </Button>
        </div>
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
          <h1 className="text-3xl font-bold tracking-tight">{patient.name}</h1>
          <Badge variant="outline">{patient.id}</Badge>
          {patient.status === "Active" ? (
            <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300">
              Active
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              Inactive
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/appointments/new?patient=${patient.id}`}>
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
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                New Examination
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Package className="mr-2 h-4 w-4" />
                New Lab Order
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DollarSign className="mr-2 h-4 w-4" />
                New Billing
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
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="flex flex-col items-center gap-2 sm:w-1/3">
                    <div className="text-center">
                      <div className="font-medium">{patient.name}</div>
                      <div className="text-sm text-muted-foreground">{patient.id}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="icon" variant="outline">
                        <Phone className="h-4 w-4" />
                        <span className="sr-only">Call</span>
                      </Button>
                      <Button size="icon" variant="outline">
                        <Mail className="h-4 w-4" />
                        <span className="sr-only">Email</span>
                      </Button>
                      <Button size="icon" variant="outline">
                        <MessageSquare className="h-4 w-4" />
                        <span className="sr-only">Message</span>
                      </Button>
                    </div>
                  </div>
                  <div className="grid flex-1 gap-4 sm:grid-cols-2">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Date of Birth</div>
                      <div>
                        {patient.dob} ({patient.age} years)
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Gender</div>
                      <div>{patient.gender}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Phone</div>
                      <div>{patient.phone}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Email</div>
                      <div>{patient.email}</div>
                    </div>
                    <div className="sm:col-span-2">
                      <div className="text-sm font-medium text-muted-foreground">Address</div>
                      <div>{patient.address}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Occupation</div>
                      <div>{patient.occupation}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Primary Insurance</div>
                      <div>{patient.insurance.primary}</div>
                    </div>
                    <div className="sm:col-span-2">
                      <div className="text-sm font-medium text-muted-foreground">Emergency Contact</div>
                      <div>{patient.emergencyContact}</div>
                    </div>
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
                  {patient.medicalAlerts.map((alert, index) => (
                    <div key={index} className="flex items-start gap-2 rounded-md bg-red-50 p-3 dark:bg-red-900/20">
                      <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                      <div>
                        <div className="font-medium text-red-800 dark:text-red-300">{alert}</div>
                      </div>
                    </div>
                  ))}
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

          <Card>
            <CardHeader>
              <CardTitle>Current Prescription</CardTitle>
              <CardDescription>Last updated on {patient.visits[0].date}</CardDescription>
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
                      <div className="border-r p-2 text-center">{patient.visionHistory.currentRx.rightEye.sphere}</div>
                      <div className="border-r p-2 text-center">
                        {patient.visionHistory.currentRx.rightEye.cylinder}
                      </div>
                      <div className="border-r p-2 text-center">{patient.visionHistory.currentRx.rightEye.axis}</div>
                      <div className="p-2 text-center">{patient.visionHistory.currentRx.rightEye.add}</div>
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
                      <div className="border-r p-2 text-center">{patient.visionHistory.currentRx.leftEye.sphere}</div>
                      <div className="border-r p-2 text-center">{patient.visionHistory.currentRx.leftEye.cylinder}</div>
                      <div className="border-r p-2 text-center">{patient.visionHistory.currentRx.leftEye.axis}</div>
                      <div className="p-2 text-center">{patient.visionHistory.currentRx.leftEye.add}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <div className="text-sm font-medium">PD</div>
                  <div>{patient.visionHistory.currentRx.pd} mm</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Doctor</div>
                  <div>{patient.doctor}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Expiration</div>
                  <div>
                    {new Date(
                      new Date(patient.visits[0].date).setFullYear(new Date(patient.visits[0].date).getFullYear() + 1),
                    ).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Notes</div>
                  <div>{patient.visionHistory.currentRx.notes}</div>
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
                  <Link href={`/lab/orders/new?patient=${patient.id}`}>
                    <Package className="mr-2 h-4 w-4" />
                    Create Lab Order
                  </Link>
                </Button>
                <Button asChild>
                  <Link href={`/examinations/new?patient=${patient.id}`}>
                    <ClipboardCheck className="mr-2 h-4 w-4" />
                    New Exam
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-4 text-center">
                <p className="text-muted-foreground">Next appointment scheduled for {patient.nextVisit}</p>
                <Button className="mt-2" variant="outline" asChild>
                  <Link href={`/appointments/new?patient=${patient.id}`}>
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