"use client"

import { useState } from "react"
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

const mockPatients = [
  { id: "P10042", name: "Sarah Johnson", dob: "1985-06-15", phone: "(555) 123-4567" },
  { id: "P10043", name: "Michael Smith", dob: "1978-11-22", phone: "(555) 234-5678" },
  { id: "P10044", name: "Emma Davis", dob: "1990-03-08", phone: "(555) 345-6789" },
  { id: "P10045", name: "James Wilson", dob: "1982-09-17", phone: "(555) 456-7890" },
  { id: "P10046", name: "Olivia Brown", dob: "1995-12-30", phone: "(555) 567-8901" },
  { id: "P10047", name: "William Taylor", dob: "1973-04-25", phone: "(555) 678-9012" },
  { id: "P10048", name: "Sophia Martinez", dob: "1988-07-11", phone: "(555) 789-0123" },
  { id: "P10049", name: "Benjamin Anderson", dob: "1965-01-19", phone: "(555) 890-1234" },
  { id: "P10050", name: "Isabella Thomas", dob: "1992-10-05", phone: "(555) 901-2345" },
  { id: "P10051", name: "Ethan Jackson", dob: "1980-08-27", phone: "(555) 012-3456" },
]

export function PatientSearchDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery),
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="bg-white shadow-sm hover:bg-gray-100">
          <Search className="mr-2 h-4 w-4" />
          Find Patient
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Find Patient</DialogTitle>
          <DialogDescription>Search for a patient by name, ID, or phone number</DialogDescription>
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
      </DialogContent>
    </Dialog>
  )
}
