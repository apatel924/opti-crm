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
  },
}

interface PatientProfilePageProps {
  patientId: string
}

export function PatientProfilePage({ patientId }: PatientProfilePageProps) {
  const [activeTab, setActiveTab] = useState("overview")
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
    </div>
  )
}
