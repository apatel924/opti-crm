"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Plus } from "lucide-react"

interface PatientMedicalHistoryProps {
  patient: any
}

export function PatientMedicalHistory({ patient }: PatientMedicalHistoryProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Medical History</h3>
        <Button variant="outline" size="sm">
          <Edit className="mr-2 h-4 w-4" />
          Edit History
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Medical Conditions</CardTitle>
            <CardDescription>Current and past medical conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {patient.medicalHistory.conditions.map((condition: string, index: number) => (
                <li key={index} className="rounded-md border p-2">
                  {condition}
                </li>
              ))}
            </ul>
            <Button variant="ghost" size="sm" className="mt-2">
              <Plus className="mr-2 h-4 w-4" />
              Add Condition
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medications</CardTitle>
            <CardDescription>Current medications and dosages</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {patient.medicalHistory.medications.map((medication: string, index: number) => (
                <li key={index} className="rounded-md border p-2">
                  {medication}
                </li>
              ))}
            </ul>
            <Button variant="ghost" size="sm" className="mt-2">
              <Plus className="mr-2 h-4 w-4" />
              Add Medication
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Allergies</CardTitle>
            <CardDescription>Known allergies and reactions</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {patient.medicalHistory.allergies.map((allergy: string, index: number) => (
                <li key={index} className="rounded-md border p-2">
                  {allergy}
                </li>
              ))}
            </ul>
            <Button variant="ghost" size="sm" className="mt-2">
              <Plus className="mr-2 h-4 w-4" />
              Add Allergy
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Family History</CardTitle>
            <CardDescription>Relevant family medical history</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {patient.medicalHistory.familyHistory.map((history: string, index: number) => (
                <li key={index} className="rounded-md border p-2">
                  {history}
                </li>
              ))}
            </ul>
            <Button variant="ghost" size="sm" className="mt-2">
              <Plus className="mr-2 h-4 w-4" />
              Add Family History
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
