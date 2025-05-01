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
