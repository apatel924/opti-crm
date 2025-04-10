"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface PatientSearchDialogProps {
  trigger: React.ReactNode
  onSelect?: (patient: { id: string; name: string }) => void
}

const patients = [
  {
    id: "P-10042",
    name: "Sarah Johnson",
    dob: "05/12/1981",
    age: 42,
    gender: "Female",
    email: "sarah.j@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, CA 12345",
    status: "Active",
    lastVisit: "05/01/2023",
    nextVisit: "05/01/2024",
    doctor: "Dr. Williams",
    insurance: "Blue Cross",
    balance: "$0.00",
    alerts: ["Diabetes", "Allergies"],
  },
  {
    id: "P-10043",
    name: "Michael Chen",
    dob: "09/23/1995",
    age: 28,
    gender: "Male",
    email: "michael.c@example.com",
    phone: "(555) 987-6543",
    address: "456 Oak Ave, Anytown, CA 12345",
    status: "Active",
    lastVisit: "04/15/2023",
    nextVisit: "10/15/2023",
    doctor: "Dr. Williams",
    insurance: "Aetna",
    balance: "$75.00",
    alerts: [],
  },
  {
    id: "P-10044",
    name: "Robert Garcia",
    dob: "11/05/1988",
    age: 35,
    gender: "Male",
    email: "robert.g@example.com",
    phone: "(555) 456-7890",
    address: "789 Pine St, Anytown, CA 12345",
    status: "Active",
    lastVisit: "04/30/2023",
    nextVisit: "05/30/2023",
    doctor: "Dr. Smith",
    insurance: "Medicare",
    balance: "$0.00",
    alerts: ["Post-LASIK"],
  },
  {
    id: "P-10045",
    name: "Emily Wilson",
    dob: "02/18/1971",
    age: 52,
    gender: "Female",
    email: "emily.w@example.com",
    phone: "(555) 789-0123",
    address: "321 Elm St, Anytown, CA 12345",
    status: "Active",
    lastVisit: "04/28/2023",
    nextVisit: "04/28/2024",
    doctor: "Dr. Williams",
    insurance: "United Healthcare",
    balance: "$25.00",
    alerts: ["Glaucoma"],
  },
  {
    id: "P-10046",
    name: "Jessica Martinez",
    dob: "07/14/1992",
    age: 31,
    gender: "Female",
    email: "jessica.m@example.com",
    phone: "(555) 234-5678",
    address: "654 Maple Ave, Anytown, CA 12345",
    status: "Active",
    lastVisit: "04/20/2023",
    nextVisit: "10/20/2023",
    doctor: "Dr. Smith",
    insurance: "Cigna",
    balance: "$0.00",
    alerts: [],
  },
  {
    id: "P-10047",
    name: "David Thompson",
    dob: "03/30/1978",
    age: 45,
    gender: "Male",
    email: "david.t@example.com",
    phone: "(555) 345-6789",
    address: "987 Cedar Rd, Anytown, CA 12345",
    status: "Inactive",
    lastVisit: "04/10/2023",
    nextVisit: "04/10/2024",
    doctor: "Dr. Williams",
    insurance: "Blue Shield",
    balance: "$150.00",
    alerts: ["High Blood Pressure"],
  },
  {
    id: "P-10048",
    name: "Jennifer Lee",
    dob: "12/05/1994",
    age: 29,
    gender: "Female",
    email: "jennifer.l@example.com",
    phone: "(555) 456-7890",
    address: "654 Birch St, Anytown, CA 12345",
    status: "Active",
    lastVisit: "03/15/2023",
    nextVisit: "09/15/2023",
    doctor: "Dr. Smith",
    insurance: "Kaiser",
    balance: "$0.00",
    alerts: [],
  },
]

export function PatientSearchDialog({ trigger, onSelect }: PatientSearchDialogProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery),
  )

  const handleSelect = (patient: { id: string; name: string }) => {
    if (onSelect) {
      onSelect(patient)
    }
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        {trigger}
      </div>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Find Patient</DialogTitle>
        </DialogHeader>
        <div className="relative mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name, ID, phone, or email..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {filteredPatients.length === 0 ? (
            <div className="flex h-32 items-center justify-center">
              <p className="text-muted-foreground">No patients found</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="flex cursor-pointer items-center justify-between rounded-md border p-3 hover:bg-muted/50"
                  onClick={() => handleSelect({ id: patient.id, name: patient.name })}
                >
                  <div className="flex items-center gap-3">
                    <User className="h-8 w-8 rounded-full bg-primary/10 p-1.5 text-primary" />
                    <div>
                      <div className="font-medium">{patient.name}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{patient.id}</span>
                        <span>•</span>
                        <span>DOB: {patient.dob}</span>
                        <span>•</span>
                        <span>{patient.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {patient.status === "Active" ? (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                      >
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        Inactive
                      </Badge>
                    )}
                    <Button size="sm" variant="ghost">
                      Select
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

