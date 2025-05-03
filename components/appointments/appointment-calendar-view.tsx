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
import { ScrollArea } from "@/components/ui/scroll-area"
import { AppointmentBookingModal } from "./appointment-booking-modal"
import { AppointmentDayView } from "./appointment-day-view"

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

  if (time.includes(":") && !time.match(/AM|PM/)) {
    const [h, m] = time.split(":")
    hour = parseInt(h, 10)
    minute = parseInt(m, 10)
    isPM = hour >= 12
  } else if (time.match(/AM|PM/)) {
    isPM = time.includes("PM")
    const cleaned = time.replace(/AM|PM/, "").trim()
    let [h, m] = cleaned.split(":").map((n) => parseInt(n, 10))
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
  // State: multi‑booking slots, modals, day detail
  const [multiBookSlots, setMultiBookSlots] = useState<Record<string, number>>({})
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
  const [isDayDetailOpen, setIsDayDetailOpen] = useState(false)
  const [selectedDayForDetail, setSelectedDayForDetail] = useState<Date | null>(null)

  // State: appointments data
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

  // Calendar day generation & date utilities (from Commit 7)
  const calendarDays = useMemo(() => {
    const days: Date[] = []
    const current = new Date(date)
    if (view === "week") {
      const startOfWeek = new Date(current)
      startOfWeek.setDate(current.getDate() - current.getDay())
      for (let i = 0; i < 7; i++) {
        const d = new Date(startOfWeek)
        d.setDate(startOfWeek.getDate() + i)
        days.push(d)
      }
    } else {
      const firstOfMonth = new Date(current.getFullYear(), current.getMonth(), 1)
      const offset = firstOfMonth.getDay()
      const gridStart = new Date(firstOfMonth)
      gridStart.setDate(1 - offset)
      for (let i = 0; i < 42; i++) {
        const d = new Date(gridStart)
        d.setDate(gridStart.getDate() + i)
        days.push(d)
      }
    }
    return days
  }, [date, view])

  const formatDateKey = useCallback((d: Date) => {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
  }, [])

  const isToday = useCallback((d: Date) => {
    const now = new Date()
    return (
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    )
  }, [])

  const isCurrentMonth = useCallback(
    (d: Date) => isSameMonth(d, date),
    [date]
  )

  // Filtering & click handlers (Commit 8)
  const filterAppointmentsByDoctor = useCallback(
    (appts: Appointment[]) => {
      if (selectedDoctors.includes("all")) return appts
      return appts.filter((app) =>
        selectedDoctors.includes(app.doctor.replace("Dr. ", "").toLowerCase())
      )
    },
    [selectedDoctors]
  )

  const handleMultiBook = useCallback((dateKey: string, slots: number) => {
    setMultiBookSlots((prev) => ({ ...prev, [dateKey]: slots }))
  }, [])

  const handleDoubleClick = useCallback((day: Date) => {
    setSelectedDate(day)
    setSelectedTime(undefined)
    setIsBookingModalOpen(true)
  }, [])

  const handleDayClick = useCallback((day: Date) => {
    setSelectedDayForDetail(day)
    setIsDayDetailOpen(true)
  }, [])

  const timeSlots = [
    "07:00","07:15","07:30","07:45","08:00","08:15","08:30","08:45",
    "09:00","09:15","09:30","09:45","10:00","10:15","10:30","10:45",
    "11:00","11:15","11:30","11:45","12:00","12:15","12:30","12:45",
    "13:00","13:15","13:30","13:45","14:00","14:15","14:30","14:45",
    "15:00","15:15","15:30","15:45","16:00","16:15","16:30","16:45","17:00"
  ]

  const getAppointmentDurationSlots = useCallback((duration: string | number) => {
    let mins: number
    if (typeof duration === "number") {
      mins = duration
    } else {
      const match = duration.match(/(\d+)/)
      mins = match ? parseInt(match[1], 10) : 30
    }
    return Math.ceil(mins / 15)
  }, [])

  const isWithinAppointmentDuration = useCallback(
    (day: Date, slot: string, appts: Appointment[]) => {
      for (const app of appts) {
        const appTime = normalizeTimeForComparison(app.time)
        const slotTime = normalizeTimeForComparison(slot)
        const [ah, am] = appTime.split(":").map(Number)
        const [sh, sm] = slotTime.split(":").map(Number)
        const appStart = ah * 60 + am
        const slotStart = sh * 60 + sm
        const duration = getAppointmentDurationSlots(app.duration) * 15
        if (slotStart >= appStart && slotStart < appStart + duration) {
          return true
        }
      }
      return false
    },
    [getAppointmentDurationSlots]
  )

  const getAppointmentForTimeSlot = useCallback(
    (day: Date, slot: string) => {
      const key = formatDateKey(day)
      const dayAppts = appointments[key] || []
      const filtered = filterAppointmentsByDoctor(dayAppts)
      for (const app of filtered) {
        if (normalizeTimeForComparison(app.time) === normalizeTimeForComparison(slot)) {
          return app
        }
      }
      return null
    },
    [appointments, filterAppointmentsByDoctor, formatDateKey]
  )

  return (
    <div>
      {/* TODO: Render calendar using calendarDays, timeSlots, and above helpers */}
    </div>
  )
}
