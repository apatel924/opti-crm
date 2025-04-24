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
      </div>
    </div>
  )
}
