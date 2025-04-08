"use client"

import { MoreHorizontal, Eye, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const patients = [
  {
    id: "P-10042",
    name: "Sarah Johnson",
    age: 42,
    lastVisit: "Today, 9:30 AM",
    reason: "Annual Exam",
    doctor: "Dr. Williams",
    status: "Active",
    insurance: "Blue Cross",
    balance: "$0.00",
    alerts: ["Diabetes", "Allergies"],
  },
  {
    id: "P-10043",
    name: "Michael Chen",
    age: 28,
    lastVisit: "Today, 10:15 AM",
    reason: "Contact Lens Fitting",
    doctor: "Dr. Williams",
    status: "Active",
    insurance: "Aetna",
    balance: "$75.00",
    alerts: [],
  },
  {
    id: "P-10044",
    name: "Robert Garcia",
    age: 35,
    lastVisit: "Yesterday, 2:00 PM",
    reason: "Follow-up",
    doctor: "Dr. Smith",
    status: "Active",
    insurance: "Medicare",
    balance: "$0.00",
    alerts: ["Post-LASIK"],
  },
  {
    id: "P-10045",
    name: "Emily Wilson",
    age: 52,
    lastVisit: "Yesterday, 11:30 AM",
    reason: "Comprehensive Exam",
    doctor: "Dr. Williams",
    status: "Active",
    insurance: "United Healthcare",
    balance: "$25.00",
    alerts: ["Glaucoma"],
  },
]

export function RecentPatients() {
  return (
    <div className="space-y-4">
      {patients.map((patient) => (
        <Card key={patient.id}>
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">{patient.name}</CardTitle>
                <Badge variant="outline">{patient.id}</Badge>
              </div>
              <CardDescription>
                {patient.age} years • {patient.insurance}
              </CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>View Profile</DropdownMenuItem>
                <DropdownMenuItem>Schedule Appointment</DropdownMenuItem>
                <DropdownMenuItem>View Medical History</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Send Message</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="grid gap-1">
              <div className="text-sm">
                <span className="font-medium">Last Visit:</span> {patient.lastVisit}
              </div>
              <div className="text-sm">
                <span className="font-medium">Reason:</span> {patient.reason}
              </div>
              {patient.alerts.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {patient.alerts.map((alert) => (
                    <Badge key={alert} variant="destructive" className="text-xs">
                      {alert}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-0">
            <div className="text-sm">
              {Number(patient.balance.replace("$", "")) > 0 ? (
                <span className="font-medium text-red-500">Balance: {patient.balance}</span>
              ) : (
                <span className="text-green-500">No Balance</span>
              )}
            </div>
            <div className="flex gap-2">
              <Button className="text-sm">
                <Eye className="mr-1 h-3 w-3" />
                View Chart
              </Button>
              <Button className="text-sm">
                <FileText className="mr-1 h-3 w-3" />
                New Exam
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
