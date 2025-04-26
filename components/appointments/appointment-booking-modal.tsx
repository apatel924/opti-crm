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
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book {isOptician ? "Optician" : "Doctor"} Appointment</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
