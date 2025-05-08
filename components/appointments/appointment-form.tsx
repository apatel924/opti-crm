"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { createAppointment } from "@/lib/actions/appointment-actions"
import { toast } from "@/components/ui/use-toast"
import { PatientSearchDialog } from "@/components/patient-search/patient-search-dialog"
import { User } from "lucide-react"

export function AppointmentForm({ patientId }: { patientId?: string }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<{ id: string; name: string } | null>(
    patientId ? { id: patientId, name: "" } : null,
  )
  const [formData, setFormData] = useState({
    appointmentType: "annual",
    date: "",
    time: "",
    duration: "30",
    doctor: "dr-williams",
    notes: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [patientSearchOpen, setPatientSearchOpen] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } },
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate form
      const newErrors: Record<string, string> = {}
      if (!selectedPatient) newErrors.patientId = "Patient is required"
      if (!formData.date) newErrors.date = "Date is required"
      if (!formData.time) newErrors.time = "Time is required"

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        setIsSubmitting(false)
        return
      }

      // Submit form with patient data
      const appointmentData = {
        patientId: selectedPatient?.id || "",
        patientName: selectedPatient?.name || "",
        ...formData,
      }

      const result = await createAppointment(appointmentData)

      toast({
        title: "Appointment scheduled",
        description: "The appointment has been successfully scheduled.",
      })

      router.push("/appointments")
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
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Appointment Details</CardTitle>
          <CardDescription>Schedule a new appointment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
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
              {errors.patientId && <p className="text-sm text-red-500">{errors.patientId}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="appointmentType">Appointment Type</Label>
              <Select
                name="appointmentType"
                value={formData.appointmentType}
                onValueChange={(value) => handleChange({ target: { name: "appointmentType", value } })}
              >
                <SelectTrigger id="appointmentType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annual">Annual Exam</SelectItem>
                  <SelectItem value="followUp">Follow-up</SelectItem>
                  <SelectItem value="contactLens">Contact Lens Fitting</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
              {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input id="time" name="time" type="time" value={formData.time} onChange={handleChange} required />
              {errors.time && <p className="text-sm text-red-500">{errors.time}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Select
                name="duration"
                value={formData.duration}
                onValueChange={(value) => handleChange({ target: { name: "duration", value } })}
              >
                <SelectTrigger id="duration">
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
            <div className="space-y-2">
              <Label htmlFor="doctor">Doctor</Label>
              <Select
                name="doctor"
                value={formData.doctor}
                onValueChange={(value) => handleChange({ target: { name: "doctor", value } })}
              >
                <SelectTrigger id="doctor">
                  <SelectValue placeholder="Select doctor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dr-williams">Dr. Williams</SelectItem>
                  <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Enter any notes or special instructions"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Scheduling..." : "Schedule Appointment"}
          </Button>
        </CardFooter>
        {Object.keys(errors).length > 0 && (
          <p className="px-6 pb-4 text-sm text-red-500">Please fix the errors above to continue.</p>
        )}
      </Card>
    </form>
  )
}
