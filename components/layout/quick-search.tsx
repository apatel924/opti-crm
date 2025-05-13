"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, User, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

// Sample patients data for demo
const patients = [
  {
    id: "P-10042",
    name: "Sarah Johnson",
    dob: "05/12/1981",
    age: 42,
    status: "Active",
    phone: "(555) 123-4567",
    email: "sarah.j@example.com",
    address: "123 Main St, Anytown, CA 12345",
    healthcareNumber: "HC123456789",
  },
  {
    id: "P-10043",
    name: "Michael Chen",
    dob: "09/23/1995",
    age: 28,
    status: "Active",
    phone: "(555) 987-6543",
    email: "michael.c@example.com",
    address: "456 Oak Ave, Anytown, CA 12345",
    healthcareNumber: "HC987654321",
  },
  {
    id: "P-10044",
    name: "Robert Garcia",
    dob: "11/05/1988",
    age: 35,
    status: "Active",
    phone: "(555) 456-7890",
    email: "robert.g@example.com",
    address: "789 Pine St, Anytown, CA 12345",
    healthcareNumber: "HC456789123",
  },
  {
    id: "P-10045",
    name: "Emily Wilson",
    dob: "02/18/1971",
    age: 52,
    status: "Active",
    phone: "(555) 789-0123",
    email: "emily.w@example.com",
    address: "321 Elm St, Anytown, CA 12345",
    healthcareNumber: "HC789123456",
  },
  {
    id: "P-10046",
    name: "Jessica Martinez",
    dob: "07/14/1992",
    age: 31,
    status: "Active",
    phone: "(555) 234-5678",
    email: "jessica.m@example.com",
    address: "654 Maple Ave, Anytown, CA 12345",
    healthcareNumber: "HC234567891",
  },
  {
    id: "P-10047",
    name: "David Thompson",
    dob: "03/30/1978",
    age: 45,
    status: "Inactive",
    phone: "(555) 345-6789",
    email: "david.t@example.com",
    address: "987 Cedar Rd, Anytown, CA 12345",
    healthcareNumber: "HC345678912",
  },
  {
    id: "P-10048",
    name: "Jennifer Lee",
    dob: "12/05/1994",
    age: 29,
    status: "Active",
    phone: "(555) 456-7890",
    email: "jennifer.l@example.com",
    address: "654 Birch St, Anytown, CA 12345",
    healthcareNumber: "HC567891234",
  },
]

export function QuickSearch() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  const handlePatientSelect = (patientId: string) => {
    setOpen(false)
    router.push(`/patients/${patientId}`)
  }

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.id.toLowerCase().includes(search.toLowerCase()) ||
      patient.dob.includes(search) ||
      patient.phone.includes(search) ||
      patient.email.toLowerCase().includes(search.toLowerCase()) ||
      patient.address.toLowerCase().includes(search.toLowerCase()) ||
      patient.healthcareNumber.toLowerCase().includes(search.toLowerCase()),
  )

  // Add keyboard shortcut (Alt+S or Option+S) to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "s") {
        e.preventDefault()
        setOpen(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Focus the input when the dialog opens
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-between text-muted-foreground">
          <Search className="mr-2 h-4 w-4" />
          <span>Quick Patient Search</span>
          <span className="ml-2 rounded bg-muted px-1.5 text-xs">Alt+S</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Patient Search</DialogTitle>
          <DialogDescription>
            Search for patients by name, ID, phone, DOB, healthcare number, or address
          </DialogDescription>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search patients..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {filteredPatients.length === 0 ? (
            <div className="py-6 text-center text-muted-foreground">
              No patients found. Try a different search term.
            </div>
          ) : (
            <div className="space-y-2">
              {filteredPatients.map((patient) => (
                <Card
                  key={patient.id}
                  className="cursor-pointer hover:bg-accent/50"
                  onClick={() => handlePatientSelect(patient.id)}
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex flex-col">
                      <div className="font-medium">{patient.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {patient.id} • {patient.dob} ({patient.age}y)
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {patient.phone} • {patient.healthcareNumber}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={patient.status === "Active" ? "outline" : "secondary"}>{patient.status}</Badge>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                          <Link href={`/patients/${patient.id}`}>
                            <User className="h-4 w-4" />
                            <span className="sr-only">View Profile</span>
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                          <Link href={`/appointments/new?patient=${patient.id}`}>
                            <Calendar className="h-4 w-4" />
                            <span className="sr-only">Schedule</span>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button asChild>
            <Link href="/patients/search">
              <Search className="mr-2 h-4 w-4" />
              Advanced Search
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
