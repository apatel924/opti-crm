"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PatientSearchDialog } from "@/components/patient-search/patient-search-dialog"
import { User } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { createAppointment } from "@/lib/actions/appointment-actions"
import { toast } from "@/components/ui/use-toast"

interface AppointmentBookingModalProps {
  isOpen: boolean
  onClose: () => void
  date: Date
  time?: string
  doctor: string
  onBookAppointment: (appointmentData: any) => void
  isOptician?: boolean
}

export type { AppointmentBookingModalProps }

export function AppointmentBookingModal({
  isOpen,
  onClose,
  date,
  time,
  doctor,
  onBookAppointment,
  isOptician,
}: AppointmentBookingModalProps) {
  const [selectedPatient, setSelectedPatient] = useState<{ id: string; name: string } | null>(null)
  const [appointmentType, setAppointmentType] = useState("annual")
  const [duration, setDuration] = useState("30")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [patientSearchOpen, setPatientSearchOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!selectedPatient) {
      toast({
        title: "Missing information",
        description: "Please select a patient.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Create appointment data
      const appointmentData = {
        patientId: selectedPatient.id,
        patientName: selectedPatient.name,
        date: date.toISOString().split("T")[0],
        time,
        appointmentType,
        doctor,
        duration,
        notes,
      }

      // Submit to server action
      const result = await createAppointment(appointmentData)

      if (result.success) {
        setIsSuccess(true)

        // Reset form and close dialog after success
        setTimeout(() => {
          setIsSuccess(false)
          setSelectedPatient(null)
          setAppointmentType("annual")
          setDuration("30")
          setNotes("")
          onClose()
        }, 1500)
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to schedule appointment",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error scheduling appointment:", error)
      toast({
        title: "Error",
        description: "There was an error scheduling the appointment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Book Doctor Appointment</DialogTitle>
        </DialogHeader>
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="mb-4 rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900/20 dark:text-green-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 className="text-lg font-medium">Appointment Scheduled</h3>
            <p className="text-center text-sm text-muted-foreground">
              The appointment has been successfully scheduled.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="patient">Patient</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="patient"
                    value={selectedPatient ? selectedPatient.name : ""}
                    placeholder="Select a patient"
                    readOnly
                    className="flex-1"
                  />
                  <PatientSearchDialog
                    trigger={
                      <Button
                        type="button"
                        variant="outline"
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Find
                      </Button>
                    }
                    onSelect={(patient) => setSelectedPatient(patient)}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="appointment-type">Appointment Type</Label>
                <Select value={appointmentType} onValueChange={setAppointmentType}>
                  <SelectTrigger id="appointment-type">
                    <SelectValue placeholder="Select appointment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annual">Annual Exam</SelectItem>
                    <SelectItem value="contact">Contact Lens Fitting</SelectItem>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                    <SelectItem value="comprehensive">Comprehensive Exam</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="kids">Kids Exam</SelectItem>
                    <SelectItem value="dfe">DFE</SelectItem>
                    <SelectItem value="troubleshooting">Troubleshooting</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={date.toISOString().split("T")[0]}
                  onChange={(e) => {
                    const newDate = new Date(e.target.value)
                    if (!isNaN(newDate.getTime())) {
                      setDate(newDate)
                    }
                  }}
                  className="w-full"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="doctor">Doctor</Label>
                <Select value={doctor} onValueChange={setDoctor}>
                  <SelectTrigger id="doctor">
                    <SelectValue placeholder="Select doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr-williams">Dr. Williams</SelectItem>
                    <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                    <SelectItem value="dr-johnson">Dr. Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger id="duration">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Additional notes or instructions"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={!selectedPatient || !date || !time || isSubmitting}>
                {isSubmitting ? "Booking..." : "Book Appointment"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
