
"use client"

import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { createAppointment } from "@/lib/actions/appointment-actions"
// import { toast } from "@/components/ui/use-toast"
import { PatientSearchDialog } from "@/components/patient-search/patient-search-dialog"
import { User } from "lucide-react"

export function AppointmentForm({ patientId }: { patientId?: string }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<{ id: string; name: string } | null>(
    patientId ? { id: patientId, name: "" } : null
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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
    // TODO: validate & submit
    setIsSubmitting(false)
  }

  return null
}
