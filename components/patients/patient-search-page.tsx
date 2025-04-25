"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, Calendar } from "lucide-react"

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

      <Tabs defaultValue="grid" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Search Results</h2>
            <p className="text-sm text-muted-foreground">
              Found {filteredPatients.length} patient{filteredPatients.length !== 1 ? "s" : ""}
            </p>
          </div>
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="grid" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPatients.map((patient) => (
              <Card
                key={patient.id}
                className="cursor-pointer transition-shadow hover:shadow-md"
                onClick={() => handlePatientClick(patient.id)}
              >
                <CardContent className="p-6">
                  <div className="mb-2">
                    <h3 className="font-medium">{patient.name}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{patient.id}</Badge>
                      <Badge
                        variant="outline"
                        className={
                          patient.status === "Active"
                            ? "bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                            : "bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                        }
                      >
                        {patient.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">DOB</p>
                      <p>
                        {patient.dob} ({patient.age}y)
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Phone</p>
                      <p>{patient.phone}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Visit</p>
                      <p>{patient.lastVisit}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Balance</p>
                      <p className={Number(patient.balance.replace("$", "")) > 0 ? "text-red-500 font-medium" : ""}>
                        {patient.balance}
                      </p>
                    </div>
                  </div>

                  {patient.alerts.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs font-medium text-muted-foreground">ALERTS</p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {patient.alerts.map((alert) => (
                          <Badge key={alert} variant="destructive" className="text-xs">
                            {alert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex justify-between gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/patients/${patient.id}`}>
                        Profile
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/appointments/new?patient=${patient.id}`}>
                        Schedule
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list">
          <div className="rounded-md border">
            <div className="grid grid-cols-7 border-b py-3 px-4 font-medium">
              <div className="col-span-2">Patient</div>
              <div>Contact</div>
              <div>Last Visit</div>
              <div>Insurance</div>
              <div>Balance</div>
              <div className="text-right">Actions</div>
            </div>
            <div className="divide-y">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="grid grid-cols-7 items-center py-3 px-4 hover:bg-muted/50 cursor-pointer"
                  onClick={() => handlePatientClick(patient.id)}
                >
                  <div className="col-span-2">
                    <div className="font-medium">{patient.name}</div>
                    <div className="text-xs text-muted-foreground">{patient.id}</div>
                  </div>
                  <div>
                    <div className="text-sm">{patient.phone}</div>
                    <div className="text-xs text-muted-foreground">{patient.email}</div>
                  </div>
                  <div>
                    <div className="text-sm">{patient.lastVisit}</div>
                    <div className="text-xs text-muted-foreground">Next: {patient.nextVisit}</div>
                  </div>
                  <div className="text-sm">{patient.insurance}</div>
                  <div>
                    <div
                      className={`text-sm ${
                        Number(patient.balance.replace("$", "")) > 0 ? "text-red-500 font-medium" : ""
                      }`}
                    >
                      {patient.balance}
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/patients/${patient.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/appointments/new?patient=${patient.id}`}>
                        <Calendar className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
