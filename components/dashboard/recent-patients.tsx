"use client"

import Link from "next/link"
import { Calendar, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample patients data for demo
const recentPatients = [
  {
    id: "P-10042",
    name: "Sarah Johnson",
    dob: "05/12/1981",
    age: 42,
    status: "Active",
    phone: "(555) 123-4567",
    email: "sarah.j@example.com",
    lastVisit: "03/15/2023",
    reason: "Annual Eye Exam",
  },
  {
    id: "P-10043",
    name: "Michael Chen",
    dob: "09/23/1995",
    age: 28,
    status: "Active",
    phone: "(555) 987-6543",
    email: "michael.c@example.com",
    lastVisit: "02/28/2023",
    reason: "Contact Lens Fitting",
  },
  {
    id: "P-10044",
    name: "Robert Garcia",
    dob: "11/05/1988",
    age: 35,
    status: "Active",
    phone: "(555) 456-7890",
    email: "robert.g@example.com",
    lastVisit: "01/10/2023",
    reason: "Eye Irritation",
  },
  {
    id: "P-10045",
    name: "Emily Wilson",
    dob: "02/18/1971",
    age: 52,
    status: "Active",
    phone: "(555) 789-0123",
    email: "emily.w@example.com",
    lastVisit: "03/05/2023",
    reason: "Prescription Update",
  },
  {
    id: "P-10046",
    name: "Jessica Martinez",
    dob: "07/14/1992",
    age: 31,
    status: "Active",
    phone: "(555) 234-5678",
    email: "jessica.m@example.com",
    lastVisit: "02/20/2023",
    reason: "Dry Eye Consultation",
  },
]

export function RecentPatients() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Patients</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentPatients.map((patient) => (
            <div
              key={patient.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4 last:border-0 last:pb-0"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="font-medium">{patient.name}</div>
                  <Badge variant={patient.status === "Active" ? "outline" : "secondary"}>{patient.status}</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {patient.id} • {patient.dob} ({patient.age}y)
                </div>
                <div className="text-sm text-muted-foreground">
                  Last visit: {patient.lastVisit} • Reason: {patient.reason}
                </div>
              </div>
              <div className="flex gap-2 self-end sm:self-center">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/patients/${patient.id}`}>View Profile</Link>
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                  <Link href={`/appointments/new?patient=${patient.id}`}>
                    <Calendar className="h-4 w-4" />
                    <span className="sr-only">Schedule</span>
                  </Link>
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Phone className="h-4 w-4" />
                  <span className="sr-only">Call</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
