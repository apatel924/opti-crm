"use client"

import { Clock } from "lucide-react"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"

const appointments = [
  {
    id: "1",
    patientName: "Sarah Johnson",
    patientId: "P-10042",
    time: "9:00 AM",
    duration: "30 min",
    type: "Annual Exam",
    doctor: "Dr. Williams",
    status: "Checked In",
    waitTime: "5 min",
    notes: "Patient has diabetes, check for retinopathy",
  },
  {
    id: "2",
    patientName: "Michael Chen",
    patientId: "P-10043",
    time: "9:30 AM",
    duration: "45 min",
    type: "Contact Lens Fitting",
    doctor: "Dr. Williams",
    status: "In Progress",
    waitTime: "0 min",
    notes: "First time contact lens wearer",
  },
  {
    id: "3",
    patientName: "Robert Garcia",
    patientId: "P-10044",
    time: "10:15 AM",
    duration: "30 min",
    type: "Follow-up",
    doctor: "Dr. Williams",
    status: "Scheduled",
    waitTime: "0 min",
    notes: "Post-LASIK follow-up",
  },
  {
    id: "4",
    patientName: "Emily Wilson",
    patientId: "P-10045",
    time: "11:00 AM",
    duration: "60 min",
    type: "Comprehensive Exam",
    doctor: "Dr. Williams",
    status: "Scheduled",
    waitTime: "0 min",
    notes: "New patient",
  },
]

export function AppointmentList() {
  return (
    <div>
      {appointments.map((appointment) => (
        <Card key={appointment.id}>
          <div className="flex">
            <div className={`w-1 ${appointment.status === "Checked In" ? "bg-yellow-400" : 
              appointment.status === "In Progress" ? "bg-blue-500" : 
              appointment.status === "Completed" ? "bg-green-500" : "bg-gray-200"}`} 
            />
            <div className="flex-1">
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle>{appointment.patientName}</CardTitle>
                      <Badge variant={appointment.status === "Checked In" ? "warning" : 
                        appointment.status === "In Progress" ? "default" : 
                        appointment.status === "Completed" ? "success" : "secondary"}>
                        {appointment.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      {appointment.patientId} • {appointment.type}
                    </CardDescription>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {appointment.time}
                    </div>
                    <div className="text-xs">{appointment.duration}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  <div className="text-sm">
                    <span>{appointment.doctor}</span>
                  </div>
                  <div className="text-xs">{appointment.notes}</div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex justify-between w-full">
                  <div className="text-xs">
                    {appointment.status === "Checked In" && <span>Waiting for {appointment.waitTime}</span>}
                  </div>
                  <div className="flex gap-2">
                    <Button className="outline">View Chart</Button>
                    <Button className={appointment.status === "Scheduled" ? "default" : 
                      appointment.status === "Checked In" ? "success" : 
                      appointment.status === "In Progress" ? "secondary" : "default"}>
                      {appointment.status === "Scheduled" ? "Check In" : 
                       appointment.status === "Checked In" ? "Start Exam" : 
                       appointment.status === "In Progress" ? "Complete" : "View Summary"}
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
