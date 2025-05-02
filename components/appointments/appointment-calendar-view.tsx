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
  const [isDayDetailOpen, setIsDayDetailOpen] = useState(false)
  const [selectedDayForDetail, setSelectedDayForDetail] = useState<Date | null>(null)
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

  const formatDateKey = useCallback((date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
  }, [])

  const isToday = useCallback((date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }, [])

  const isCurrentMonth = useCallback(
    (day: Date) => {
      return isSameMonth(day, date)
    },
    [date],
  )

  const filterAppointmentsByDoctor = useCallback(
    (appts: Appointment[]) => {
      if (selectedDoctors.includes("all")) return appts
      return appts.filter((app) => selectedDoctors.includes(app.doctor.replace("Dr. ", "dr-").toLowerCase()))
    },
    [selectedDoctors],
  )

  const handleDoubleClick = useCallback((day: Date) => {
    setSelectedDate(day)
    setIsBookingModalOpen(true)
  }, [])

  const handleDayClick = useCallback((day: Date) => {
    setSelectedDayForDetail(day)
    setIsDayDetailOpen(true)
  }, [])

  const handleBookAppointment = useCallback(
    (appointmentData: any) => {
      const dateKey = format(new Date(appointmentData.date), "yyyy-MM-dd")
      const newId = `${Math.floor(10000 + Math.random() * 90000)}`

      const newAppointment: Appointment = {
        id: newId,
        patientName: appointmentData.patientName,
        patientId: appointmentData.patientId,
        time: appointmentData.time,
        duration: appointmentData.duration,
        type: appointmentData.type,
        doctor: `Dr. ${appointmentData.doctor.replace("dr-", "").charAt(0).toUpperCase() + appointmentData.doctor.replace("dr-", "").slice(1)}`,
        status: "Scheduled",
        room: appointmentData.isOptician ? "Optical" : `Exam ${Math.floor(1 + Math.random() * 3)}`,
        isOptician: appointmentData.isOptician,
      }

      setAppointments((prev) => {
        const updatedAppointments = { ...prev }
        if (!updatedAppointments[dateKey]) {
          updatedAppointments[dateKey] = []
        }
        updatedAppointments[dateKey] = [...updatedAppointments[dateKey], newAppointment]
        return updatedAppointments
      })

      if (isDayDetailOpen) {
        setIsDayDetailOpen(false)
      }
    },
    [isDayDetailOpen],
  )

  return (
    <>
      <div className="overflow-auto">
        <div className={`grid ${view === "week" ? "grid-cols-7" : "grid-cols-7"} gap-1`}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName, index) => (
            <div key={dayName} className="p-2 text-center font-medium text-gray-700">
              {dayName}
            </div>
          ))}

          {calendarDays.map((day, index) => {
            const dateKey = formatDateKey(day)
            const dayAppointments = appointments[dateKey] || []
            const filteredAppointments = filterAppointmentsByDoctor(dayAppointments)

            return (
    <div>
      <h1>Appointment Calendar View</h1>
      <p>View: {view}</p>
      <button onClick={() => setIsBookingModalOpen(true)}>Open Booking Modal</button>
    </div>
  )
}
