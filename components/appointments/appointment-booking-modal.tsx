"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { mockPatients, appointmentTypes } from "@/lib/mock-data"

interface AppointmentBookingModalProps {
  isOpen: boolean
  onClose: () => void
  date: Date
  time?: string
  doctor: string
  onBookAppointment: (appointmentData: any) => void
  isOptician?: boolean
}

export function AppointmentBookingModal({
  isOpen,
  onClose,
  date,
  time,
  doctor,
  onBookAppointment,
  isOptician = false,
}: AppointmentBookingModalProps) {
  const [patientId, setPatientId] = useState("")
  const [appointmentType, setAppointmentType] = useState(isOptician ? "Frame Selection" : "Annual Exam")
  const [appointmentDuration, setAppointmentDuration] = useState("30")
  const [appointmentTime, setAppointmentTime] = useState(time || "09:00")

  const availableAppointmentTypes = Object.keys(appointmentTypes).filter((type) => {
    if (isOptician) {
      return ["Frame Selection", "Glasses Fitting", "Glasses Pickup", "Contact Lens Training"].includes(type)
    } else {
      return !["Frame Selection", "Glasses Fitting", "Glasses Pickup", "Contact Lens Training"].includes(type)
    }
  })
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!patientId) return

    const patient = mockPatients.find((p) => p.id === patientId)
    const appointmentData = {
      patientId: patientId,
      patientName: patient?.name || "Unknown Patient",
      date: date,
      time: appointmentTime,
      duration: appointmentDuration,
      type: appointmentType,
      provider: doctor,
      isOptician: isOptician,
    }

    onBookAppointment(appointmentData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book {isOptician ? "Optician" : "Doctor"} Appointment</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="patient">Patient</Label>
            <Select value={patientId} onValueChange={setPatientId}>
              <SelectTrigger id="patient">
                <SelectValue placeholder="Select patient" />
              </SelectTrigger>
              <SelectContent>
                {mockPatients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="appointment-time">Time</Label>
            <Input
              id="appointment-time"
              type="time"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="appointment-type">Appointment Type</Label>
            <Select value={appointmentType} onValueChange={setAppointmentType}>
              <SelectTrigger id="appointment-type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {availableAppointmentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="appointment-duration">Duration</Label>
            <Select value={appointmentDuration} onValueChange={setAppointmentDuration}>
              <SelectTrigger id="appointment-duration">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">60 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!patientId}>
              Book Appointment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
