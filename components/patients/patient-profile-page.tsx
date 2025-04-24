"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Plus, Edit, Phone, Mail, MessageSquare, AlertTriangle, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
    medicalAlerts: [],
    medicalHistory: {
      allergies: ["Penicillin", "Peanuts", "Shellfish"]
    },
    visionHistory: {
      currentRx: {
        rightEye: { sphere: "-2.00", cylinder: "-0.75", axis: "180", add: "+2.00" },
        leftEye: { sphere: "-1.75", cylinder: "-0.50", axis: "175", add: "+2.00" },
        pd: "63",
        notes: "Progressive lenses",
      },
      previousRx: [],
    },
    visits: [],
    orders: [],
    billing: [],
    documents: [],
    communications: [],
    notes: [],
  },
}

interface PatientProfilePageProps {
  patientId: string
}

export function PatientProfilePage({ patientId }: PatientProfilePageProps) {
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
            </Card>
            {/* Right: Medical Alerts Card (next commit) */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
