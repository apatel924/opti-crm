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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!patientId) return

    const appointmentData = {
      patientId: patientId,
      patientName: "Unknown Patient", // placeholder for now
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
          {/* Form fields will be added next */}
        </form>
      </DialogContent>
    </Dialog>
  )
}
