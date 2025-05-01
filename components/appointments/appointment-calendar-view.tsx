"use client"
import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { format, isSameMonth, addDays } from "date-fns"

interface Appointment {
  id: string
  patientName: string
  patientId: string
  time: string
  duration: string | number
  type: string
  doctor: string
  status: string
  room?: string
  isOptician?: boolean
}

interface AppointmentCalendarViewProps {
  date: Date
  view: "week" | "month"
  onViewPatient?: (patientId: string) => void
  selectedDoctors: string[]
}

function formatTimeForDisplay(time: string) {
  if (time.includes("AM") || time.includes("PM")) return time
  const [hours, minutes] = time.split(":")
  const hour = parseInt(hours, 10)
  const ampm = hour >= 12 ? "PM" : "AM"
  const hour12 = hour % 12 || 12
  return `${hour12}:${minutes} ${ampm}`
}

function normalizeTimeForComparison(time: string) {
  let hour = 0
  let minute = 0
  let isPM = false

  if (time.includes(":") && !time.includes("AM") && !time.includes("PM")) {
    const [hours, minutes] = time.split(":")
    hour = parseInt(hours, 10)
    minute = parseInt(minutes, 10)
    isPM = hour >= 12
  } else if (time.includes("AM") || time.includes("PM")) {
    isPM = time.includes("PM")
    const [h, m] = time.replace("AM", "").replace("PM", "").trim().split(":")
    hour = parseInt(h, 10)
    if (isPM && hour < 12) hour += 12
    if (!isPM && hour === 12) hour = 0
    minute = parseInt(m, 10)
  }

  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
}

export function AppointmentCalendarView({ date, view, onViewPatient, selectedDoctors }: AppointmentCalendarViewProps) {
  const [appointments, setAppointments] = useState<Record<string, Appointment[]>>({})
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  return (
    <div>
      <h1>Appointment Calendar View</h1>
      <p>View: {view}</p>
      <button onClick={() => setIsBookingModalOpen(true)}>Open Booking Modal</button>
    </div>
  )
}
