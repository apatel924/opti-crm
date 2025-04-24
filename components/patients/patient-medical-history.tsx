"use client"

import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"

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
    </div>
  )
}
