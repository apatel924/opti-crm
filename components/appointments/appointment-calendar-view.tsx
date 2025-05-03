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
// import { AppointmentDayView } from "./appointment-day-view"

interface AppointmentCalendarViewProps {
  date: Date
  view: "week" | "month"
  onViewPatient?: (patientId: string) => void
  selectedDoctors: string[]
}

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

// Format “HH:MM” → “h:MM AM/PM”
function formatTimeForDisplay(time: string) {
  if (time.includes("AM") || time.includes("PM")) {
    return time
  }
  const [hours, minutes] = time.split(":")
  const hour = parseInt(hours, 10)
  const ampm = hour >= 12 ? "PM" : "AM"
  const hour12 = hour % 12 || 12
  return `${hour12}:${minutes} ${ampm}`
}

// Normalize any time to 24‑hour “HH:MM” for comparisons
function normalizeTimeForComparison(time: string) {
  let hour = 0
  let minute = 0
  let isPM = false

  if (time.includes(":") && !time.match(/AM|PM/)) {
    const [h, m] = time.split(":")
    hour = parseInt(h, 10)
    minute = parseInt(m, 10)
    isPM = hour >= 12
  } else if (time.match(/AM|PM/)) {
    isPM = time.includes("PM")
    const cleaned = time.replace(/AM|PM/, "").trim()
    let [h, m] = cleaned.split(":").map(str => parseInt(str, 10))
    if (isPM && h < 12) h += 12
    if (!isPM && h === 12) h = 0
    hour = h
    minute = m
  }

  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
}

export function AppointmentCalendarView({
  date,
  view,
  onViewPatient,
  selectedDoctors,
}: AppointmentCalendarViewProps) {
  // Multi‑booking slot counts
  const [multiBookSlots, setMultiBookSlots] = useState<Record<string, number>>({})

  // Booking modal state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)

  // Day‑detail dialog state
  const [isDayDetailOpen, setIsDayDetailOpen] = useState(false)
  const [selectedDayForDetail, setSelectedDayForDetail] = useState<Date | null>(null)

  // Appointments data (keyed by "YYYY-MM-DD")
  const [appointments, setAppointments] = useState<Record<string, Appointment[]>>({})
  const appointmentsInitialized = useRef(false)

  useEffect(() => {
    if (appointmentsInitialized.current) return
    appointmentsInitialized.current = true

    const today = new Date()
    const todayStr = format(today, "yyyy-MM-dd")
    const tomorrow = addDays(today, 1)
    const tomorrowStr = format(tomorrow, "yyyy-MM-dd")

    setAppointments({
      [todayStr]: [
        {
          id: "1",
          patientName: "Sarah Johnson",
          patientId: "P-10042",
          time: "09:00",
          duration: 30,
          type: "Annual Exam",
          doctor: "Dr. Williams",
          status: "Checked In",
          room: "Exam 1",
        },
        {
          id: "2",
          patientName: "Michael Chen",
          patientId: "P-10043",
          time: "10:00",
          duration: 45,
          type: "Contact Lens Fitting",
          doctor: "Dr. Williams",
          status: "Scheduled",
          room: "Exam 2",
        },
      ],
      [tomorrowStr]: [
        {
          id: "3",
          patientName: "Robert Garcia",
          patientId: "P-10044",
          time: "11:00",
          duration: 30,
          type: "Follow-up",
          doctor: "Dr. Smith",
          status: "Scheduled",
          room: "Exam 1",
        },
      ],
    })
  }, [])

  return (
    <div>
      {/* TODO: render calendar grid here */}
    </div>
  )
}
