"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
]

export function PatientSearchPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery) ||
      patient.address.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patient Search</h1>
          <p className="text-muted-foreground">Search for patients by name, ID, phone, or email</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Input
          type="search"
          placeholder="Search patients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button>Search</Button>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Search Results</h2>
        <p className="text-sm text-muted-foreground">
          Found {filteredPatients.length} patient{filteredPatients.length !== 1 ? "s" : ""}
        </p>
        <ul className="mt-4 space-y-2">
          {filteredPatients.map((patient) => (
            <li key={patient.id} className="border rounded p-4">
              <p className="font-medium">{patient.name}</p>
              <p className="text-sm text-muted-foreground">{patient.id}</p>
              <p className="text-sm">{patient.email} • {patient.phone}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
