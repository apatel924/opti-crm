"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

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

  return <div className="space-y-6">{/* Content coming in future commits */}</div>
}
