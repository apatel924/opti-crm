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
  // State and refs
  const [multiBookSlots, setMultiBookSlots] = useState<Record<string, number>>({})
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
  const [isDayDetailOpen, setIsDayDetailOpen] = useState(false)
  const [selectedDayForDetail, setSelectedDayForDetail] = useState<Date | null>(null)
  const [appointments, setAppointments] = useState<Record<string, Appointment[]>>({})
  const appointmentsInitialized = useRef(false)

  // Sample data init
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

  // Calendar days
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

  const formatDateKey = useCallback((d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
    []
  )

  // Utility callbacks
  const isToday = useCallback((d: Date) => {
    const now = new Date()
    return (
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    )
  }, [])

  const isCurrentMonth = useCallback((d: Date) => isSameMonth(d, date), [date])

  const filterAppointmentsByDoctor = useCallback(
    (appts: Appointment[]) => {
      if (selectedDoctors.includes("all")) return appts
      return appts.filter((app) =>
        selectedDoctors.includes(app.doctor.replace("Dr. ", "").toLowerCase())
      )
    },
    [selectedDoctors]
  )

  const handleDoubleClick = useCallback((day: Date) => {
    setSelectedDate(day)
    setSelectedTime(undefined)
    setIsBookingModalOpen(true)
  }, [])

  const handleDayClick = useCallback((day: Date) => {
    setSelectedDayForDetail(day)
    setIsDayDetailOpen(true)
  }, [])

  // Time slots & helpers
  const timeSlots = [
    "07:00","07:15","07:30","07:45","08:00","08:15","08:30","08:45",
    "09:00","09:15","09:30","09:45","10:00","10:15","10:30","10:45",
    "11:00","11:15","11:30","11:45","12:00","12:15","12:30","12:45",
    "13:00","13:15","13:30","13:45","14:00","14:15","14:30","14:45",
    "15:00","15:15","15:30","15:45","16:00","16:15","16:30","16:45","17:00"
  ]

  const getAppointmentDurationSlots = useCallback((duration: string | number) => {
    let mins = typeof duration === "number"
      ? duration
      : Number(duration.toString().match(/(\d+)/)?.[0] || 30)
    return Math.ceil(mins / 15)
  }, [])

  const isWithinAppointmentDuration = useCallback(
    (day: Date, slot: string, appts: Appointment[]) => {
      for (const app of appts) {
        const appTime = normalizeTimeForComparison(app.time)
        const slotTime = normalizeTimeForComparison(slot)
        const [ah, am] = appTime.split(":").map(Number)
        const [sh, sm] = slotTime.split(":").map(Number)
        const start = ah * 60 + am
        const minutes = getAppointmentDurationSlots(app.duration) * 15
        if (sh * 60 + sm >= start && sh * 60 + sm < start + minutes) {
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
      return filtered.find(
        (app) =>
          normalizeTimeForComparison(app.time) === normalizeTimeForComparison(slot)
      ) || null
    },
    [appointments, filterAppointmentsByDoctor, formatDateKey]
  )

  const getAppointmentStatusColor = useCallback((status: string) => {
    switch (status) {
      case "Checked In":
        return "border-l-yellow-500"
      case "In Progress":
        return "border-l-blue-500"
      case "Completed":
        return "border-l-green-500"
      default:
        return "border-l-gray-200"
    }
  }, [])

  const getMaxAppointmentsToShow = useCallback(() => (view === "week" ? 3 : 2), [view])

  return (
    <>
      <div className="overflow-auto">
        <div className="grid grid-cols-7 gap-1">
          {/* Day headers */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName) => (
            <div key={dayName} className="p-2 text-center font-medium text-gray-700">
              {dayName}
            </div>
          ))}

          {/* Calendar cells */}
          {calendarDays.map((day, idx) => {
            const dateKey = formatDateKey(day)
            const dayAppts = appointments[dateKey] || []
            const filteredAppts = filterAppointmentsByDoctor(dayAppts)

            return (
              <ContextMenu key={idx}>
                <ContextMenuTrigger>
                  <div
                    className={`border ${
                      isToday(day) ? "bg-primary/5 border-primary" : ""
                    } ${
                      !isCurrentMonth(day) && view === "month"
                        ? "text-muted-foreground bg-muted/50"
                        : ""
                    }`}
                    onClick={() => handleDayClick(day)}
                  >
                    <div className="sticky top-0 z-10 flex items-center justify-between p-1 bg-background border-b">
                      <div className="text-sm font-medium text-gray-900">
                        {format(day, "E")}, {day.getDate()}
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-5 w-5"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDoubleClick(day)
                        }}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    {view === "week" && (
                      <div className="divide-y">
                        {timeSlots
                          .filter((t) => t.endsWith(":00") || t.endsWith(":30"))
                          .map((t) => {
                            const appt = getAppointmentForTimeSlot(day, t)
                            const within = isWithinAppointmentDuration(day, t, filteredAppts)

                            return (
                              <div
                                key={t}
                                className="flex py-1 px-1 min-h-[24px] hover:bg-accent/10 text-xs"
                              >
                                <div className="w-10 text-muted-foreground mr-1">
                                  {t.endsWith(":00") ? `${parseInt(t) % 12 || 12}${t.includes("13") ? "1PM" : t.endsWith(":00") && formatTimeForDisplay(t).includes("PM") ? "PM" : ""}` : ""}
                                </div>
                                {appt ? (
                                  <div
                                    className={`flex-1 flex gap-1 rounded-sm text-xs border-l-2 px-1 truncate ${getAppointmentStatusColor(
                                      appt.status
                                    )} bg-white`}
                                  >
                                    <span className="font-medium truncate">
                                      {appt.patientName}
                                    </span>
                                  </div>
                                ) : within ? (
                                  <div className="flex-1 bg-gray-100 opacity-50"></div>
                                ) : (
                                  <div className="flex-1 text-gray-400 text-[9px]">
                                    Available
                                  </div>
                                )}
                              </div>
                            )
                          })}
                      </div>
                    )}

                    {view === "month" && (
                      <div className="min-h-[100px] p-1">
                        <div className="mt-1 space-y-1">
                          {filteredAppts.slice(0, getMaxAppointmentsToShow()).map((appt) => (
                            <div
                              key={appt.id}
                              className={`border-l-4 ${getAppointmentStatusColor(
                                appt.status
                              )} p-1 text-xs bg-white rounded-sm shadow-sm`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="font-medium text-gray-900 truncate">
                                  {formatTimeForDisplay(appt.time)}
                                </div>
                                <Badge variant="outline" className="text-[8px] px-1 py-0 text-gray-700">
                                  {appt.doctor.replace("Dr. ", "")}
                                </Badge>
                              </div>
                              <div className="truncate text-gray-800">
                                {appt.patientName}
                              </div>
                            </div>
                          ))}

                          {filteredAppts.length > getMaxAppointmentsToShow() && (
                            <div className="text-xs text-center font-medium text-primary">
                              +{filteredAppts.length - getMaxAppointmentsToShow()} more
                            </div>
                          )}

                          {filteredAppts.length === 0 && (
                            <div className="flex h-full items-center justify-center text-xs text-gray-400 mt-8">
                              Click to view
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem onClick={() => handleDoubleClick(day)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Book Appointment
                  </ContextMenuItem>
                  <ContextMenuItem onClick={() => handleDayClick(day)}>
                    <Calendar className="mr-2 h-4 w-4" />
                    View Day
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem>Block Day</ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            )
          })}
        </div>
      </div>
    </>
  )
}
