"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload } from "lucide-react"

interface PatientDocumentsProps {
  patient: any
}

export function PatientDocuments({ patient }: PatientDocumentsProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDocuments = patient.documents.filter(
    (doc: any) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Documents & Images</h3>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Input
          type="search"
          placeholder="Search documents..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  )
}
