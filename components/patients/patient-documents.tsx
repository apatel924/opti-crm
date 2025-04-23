"use client"

import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

interface PatientDocumentsProps {
  patient: any
}

export function PatientDocuments({ patient }: PatientDocumentsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Documents & Images</h3>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>
    </div>
  )
}
