"use client"

import { useState } from "react"
import { Clock, MoreHorizontal } from "lucide-react"

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
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <Card
          key={appointment.id}
          className="overflow-hidden transform transition-all duration-300 hover:translate-y-[-4px]"
        >
          <div className="flex">
            <div
              className={`w-2 ${
                appointment.status === "Checked In"
                  ? "bg-ghibli-yellow"
                  : appointment.status === "In Progress"
                    ? "bg-ghibli-blue"
                    : appointment.status === "Completed"
                      ? "bg-ghibli-green"
                      : "bg-gray-200"
              }`}
            />
            <div className="flex-1">
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg text-ghibli-blue">{appointment.patientName}</CardTitle>
                    <Badge
                      variant={
                        appointment.status === "Checked In"
                          ? "secondary"
                          : appointment.status === "Completed"
                            ? "default"
                            : "outline"
                      }
                      className="text-xs"
                    >
                      {appointment.status}
                    </Badge>
                  </div>
                  <CardDescription>
                    {appointment.patientId} • {appointment.type}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="flex items-center gap-1 font-medium text-ghibli-blue">
                      <Clock className="h-3 w-3" />
                      {appointment.time}
                    </div>
                    <div className="text-xs text-muted-foreground">{appointment.duration}</div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem className="rounded-lg">View Details</DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg">Check In</DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg">Start Exam</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-ghibli-pink rounded-lg">Cancel Appointment</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center gap-4">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                    {appointment.patientName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="text-sm">
                      <span className="font-medium text-ghibli-blue">{appointment.doctor}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{appointment.notes}</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                <div className="text-xs text-muted-foreground">
                  {appointment.status === "Checked In" && <span>Waiting for {appointment.waitTime}</span>}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="ghibli-button">
                    View Chart
                  </Button>
                  <Button
                    variant={
                      appointment.status === "Checked In"
                        ? "secondary"
                        : "default"
                    }
                    size="sm"
                    className="text-xs"
                  >
                    {appointment.status === "Checked In" ? "View" : "Check In"}
                  </Button>
                </div>
              </CardFooter>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
