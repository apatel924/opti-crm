"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

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

  const handlePatientClick = (patientId: string) => {
    router.push(`/patients/${patientId}`)
  }

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
            <li
              key={patient.id}
              onClick={() => handlePatientClick(patient.id)}
              className="cursor-pointer border rounded p-4 hover:bg-muted"
            >
              <p className="font-medium flex items-center gap-2">
                {patient.name}
                <Badge variant="outline">{patient.id}</Badge>
                {patient.status === "Active" ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300">
                    Active
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    Inactive
                  </Badge>
                )}
              </p>
              <p className="text-sm text-muted-foreground">{patient.email}</p>
              <p className="text-sm">{patient.phone}</p>

              <div className="mt-2 grid grid-cols-2 text-sm gap-2">
                <div>
                  <span className="text-muted-foreground">Last Visit: </span>
                  {patient.lastVisit}
                </div>
                <div>
                  <span className="text-muted-foreground">Next Visit: </span>
                  {patient.nextVisit}
                </div>
                <div>
                  <span className="text-muted-foreground">Balance: </span>
                  <span className={Number(patient.balance.replace("$", "")) > 0 ? "text-red-500 font-medium" : ""}>
                    {patient.balance}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
