"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

// Mock patient data
const patients = [
  { id: "P-10042", name: "Sarah Johnson", dob: "1985-06-15", phone: "(555) 123-4567" },
  { id: "P-10043", name: "Michael Chen", dob: "1978-11-23", phone: "(555) 234-5678" },
  { id: "P-10044", name: "Robert Garcia", dob: "1992-03-08", phone: "(555) 345-6789" },
  { id: "P-10045", name: "Emily Wilson", dob: "1990-09-17", phone: "(555) 456-7890" },
  { id: "P-10046", name: "David Smith", dob: "1982-12-05", phone: "(555) 567-8901" },
  { id: "P-10047", name: "Jennifer Lee", dob: "1975-04-30", phone: "(555) 678-9012" },
  { id: "P-10048", name: "James Brown", dob: "1988-07-22", phone: "(555) 789-0123" },
  { id: "P-10049", name: "Maria Rodriguez", dob: "1995-01-14", phone: "(555) 890-1234" },
  { id: "P-10050", name: "Thomas Wilson", dob: "1970-08-09", phone: "(555) 901-2345" },
]

interface PatientSearchDialogProps {
  trigger?: React.ReactNode
  onSelect: (patient: { id: string; name: string }) => void
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function PatientSearchDialog({ trigger, onSelect, isOpen, onOpenChange }: PatientSearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [internalOpen, setInternalOpen] = useState(false)

  // Sync internal state with external state if provided
  useEffect(() => {
    if (isOpen !== undefined) {
      setInternalOpen(isOpen)
    }
  }, [isOpen])

  const handleOpenChange = (open: boolean) => {
    setInternalOpen(open)
    if (onOpenChange) {
      onOpenChange(open)
    }
  }

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery) ||
      patient.dob.includes(searchQuery),
  )

  const handleSelect = (patient: { id: string; name: string }) => {
    onSelect(patient)
    handleOpenChange(false)
  }

  return (
    <Dialog open={internalOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Search className="mr-2 h-4 w-4" />
            Find Patient
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Find Patient</DialogTitle>
          <DialogDescription>Search for a patient by name, ID, phone number, or date of birth.</DialogDescription>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search patients..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto rounded-md border">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <button
                key={patient.id}
                className="flex w-full items-center justify-between border-b p-3 text-left hover:bg-accent last:border-0"
                onClick={() => handleSelect(patient)}
              >
                <div>
                  <div className="font-medium text-gray-900">{patient.name}</div>
                  <div className="text-sm text-gray-600">DOB: {patient.dob}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-800">{patient.id}</div>
                  <div className="text-sm text-gray-600">{patient.phone}</div>
                </div>
              </button>
            ))
          ) : (
            <div className="p-3 text-center text-sm text-gray-500">No patients found. Try a different search term.</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
