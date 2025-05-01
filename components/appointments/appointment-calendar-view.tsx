"use client"

import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Calendar } from "lucide-react"
import { format, isSameMonth, addDays } from "date-fns"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "@/components/ui/context-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { ScrollArea } from "@/components/ui/scroll-area"
import { AppointmentBookingModal } from "./appointment-booking-modal"

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
  const appointmentsInitialized = useRef(false)

  const calendarDays = useMemo(() => {
    const days = []
    const currentDate = new Date(date)

    if (view === "week") {
      const startOfWeek = new Date(currentDate)
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

      for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek)
        day.setDate(startOfWeek.getDate() + i)
        days.push(day)
      }
    } else if (view === "month") {
      const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
      const firstDayOfWeek = firstDayOfMonth.getDay()
      const startDate = new Date(firstDayOfMonth)
      startDate.setDate(1 - firstDayOfWeek)

      for (let i = 0; i < 42; i++) {
        const day = new Date(startDate)
        day.setDate(startDate.getDate() + i)
        days.push(day)
      }
    }

    return days
  }, [date, view])

  useEffect(() => {
    if (appointmentsInitialized.current) return
    appointmentsInitialized.current = true

    const today = new Date()
    const todayStr = format(today, "yyyy-MM-dd")
    const tomorrow = addDays(today, 1)
    const tomorrowStr = format(tomorrow, "yyyy-MM-dd")

    setAppointments({
      [todayStr]: [
        { id: "1", patientName: "Sarah Johnson", patientId: "P-10042", time: "09:00", duration: 30, type: "Annual Exam", doctor: "Dr. Williams", status: "Checked In", room: "Exam 1" },
        { id: "2", patientName: "Michael Chen", patientId: "P-10043", time: "10:00", duration: 45, type: "Contact Lens Fitting", doctor: "Dr. Williams", status: "Scheduled", room: "Exam 2" },
      ],
      [tomorrowStr]: [
        { id: "3", patientName: "Robert Garcia", patientId: "P-10044", time: "11:00", duration: 30, type: "Follow-up", doctor: "Dr. Smith", status: "Scheduled", room: "Exam 1" },
      ],
    })
  }, [])

  return (
    <div>
      <h1>Appointment Calendar View</h1>
      <p>View: {view}</p>
      <button onClick={() => setIsBookingModalOpen(true)}>Open Booking Modal</button>
    </div>
  )
}
