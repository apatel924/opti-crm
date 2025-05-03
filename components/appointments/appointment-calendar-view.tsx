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
  const [multiBookSlots, setMultiBookSlots] = useState<Record<string, number>>({})
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
  const [isDayDetailOpen, setIsDayDetailOpen] = useState(false)
  const [selectedDayForDetail, setSelectedDayForDetail] = useState<Date | null>(null)
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
        const span = getAppointmentDurationSlots(app.duration) * 15
        if (sh * 60 + sm >= start && sh * 60 + sm < start + span) {
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
      return (
        filtered.find(
          (app) =>
            normalizeTimeForComparison(app.time) === normalizeTimeForComparison(slot)
        ) || null
      )
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

  const handleAppointmentUpdate = useCallback(
    (updated: Appointment[], day: Date) => {
      const key = formatDateKey(day)
      setAppointments((prev) => {
        const prevList = prev[key] || []
        if (JSON.stringify(prevList) === JSON.stringify(updated)) {
          return prev
        }
        return { ...prev, [key]: updated }
      })
    },
    [formatDateKey]
  )

  const handleBookAppointment = useCallback(() => {
    // Placeholder for booking logic
  }, [])

  return (
    <>
      <div className="overflow-auto">
        <div className={`grid ${view === "week" ? "grid-cols-7" : "grid-cols-7"} gap-1`}>
          {/* Day headers */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName, index) => (
            <div key={dayName} className="p-2 text-center font-medium text-gray-700">
              {dayName}
            </div>
          ))}

          {/* Calendar cells */}
          {calendarDays.map((day, index) => {
            const dateKey = formatDateKey(day)
            const dayAppointments = appointments[dateKey] || []
            const filteredAppointments = filterAppointmentsByDoctor(dayAppointments)

            return (
              <ContextMenu key={index}>
                <ContextMenuTrigger>
                  <div
                    className={`border ${isToday(day) ? "bg-primary/5 border-primary" : ""} ${
                      !isCurrentMonth(day) && view === "month" ? "text-muted-foreground bg-muted/50" : ""
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

                    {/* Compact view with all time slots visible */}
                    {view === "week" && (
                      <div className="divide-y">
                        {/* Only show hour and half-hour slots for cleaner UI */}
                        {timeSlots
                          .filter((time) => time.endsWith(":00") || time.endsWith(":30"))
                          .map((time) => {
                            const appointment = getAppointmentForTimeSlot(day, time)
                            const isWithinDuration =
                              isWithinAppointmentDuration(day, time, filteredAppointments) && !appointment

                            return (
                              <div key={time} className="flex py-1 px-1 min-h-[24px] hover:bg-accent/10 text-xs">
                                {time === "07:00" && <div className="w-10 text-muted-foreground mr-1">7AM</div>}
                                {time === "07:30" && <div className="w-10 text-muted-foreground mr-1"></div>}
                                {time === "08:00" && <div className="w-10 text-muted-foreground mr-1">8AM</div>}
                                {time === "08:30" && <div className="w-10 text-muted-foreground mr-1"></div>}
                                {time === "09:00" && <div className="w-10 text-muted-foreground mr-1">9AM</div>}
                                {time === "09:30" && <div className="w-10 text-muted-foreground mr-1"></div>}
                                {time === "10:00" && <div className="w-10 text-muted-foreground mr-1">10AM</div>}
                                {time === "10:30" && <div className="w-10 text-muted-foreground mr-1"></div>}
                                {time === "11:00" && <div className="w-10 text-muted-foreground mr-1">11AM</div>}
                                {time === "11:30" && <div className="w-10 text-muted-foreground mr-1"></div>}
                                {time === "12:00" && <div className="w-10 text-muted-foreground mr-1">12PM</div>}
                                {time === "12:30" && <div className="w-10 text-muted-foreground mr-1"></div>}
                                {time === "13:00" && <div className="w-10 text-muted-foreground mr-1">1PM</div>}
                                {time === "13:30" && <div className="w-10 text-muted-foreground mr-1"></div>}
                                {time === "14:00" && <div className="w-10 text-muted-foreground mr-1">2PM</div>}
                                {time === "14:30" && <div className="w-10 text-muted-foreground mr-1"></div>}
                                {time === "15:00" && <div className="w-10 text-muted-foreground mr-1">3PM</div>}
                                {time === "15:30" && <div className="w-10 text-muted-foreground mr-1"></div>}
                                {time === "16:00" && <div className="w-10 text-muted-foreground mr-1">4PM</div>}
                                {time === "16:30" && <div className="w-10 text-muted-foreground mr-1"></div>}
                                {time === "17:00" && <div className="w-10 text-muted-foreground mr-1">5PM</div>}

                                {appointment ? (
                                  <div className="flex-1 flex gap-1">
                                    <div
                                      className={`flex-1 rounded-sm text-xs border-l-2 px-1 truncate ${getAppointmentStatusColor(appointment.status)} bg-white`}
                                    >
                                      <span className="font-medium truncate">{appointment.patientName}</span>
                                    </div>
                                  </div>
                                ) : isWithinDuration ? (
                                  <div className="flex-1 bg-gray-100 opacity-50"></div>
                                ) : (
                                  <div className="flex-1 text-gray-400 text-[9px]">Available</div>
                                )}
                              </div>
                            )
                          })}
                      </div>
                    )}

                    {/* Month view keeps the compact card style */}
                    {view === "month" && (
                      <div className="min-h-[100px] p-1">
                        <div className="mt-1 space-y-1">
                          {filteredAppointments.slice(0, getMaxAppointmentsToShow()).map((appointment) => (
                            <div
                              key={appointment.id}
                              className={`border-l-4 ${getAppointmentStatusColor(appointment.status)} p-1 text-xs bg-white rounded-sm shadow-sm`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="font-medium text-gray-900 truncate">
                                  {formatTimeForDisplay(appointment.time)}
                                </div>
                                <Badge variant="outline" className="text-[8px] px-1 py-0 text-gray-700">
                                  {appointment.doctor.replace("Dr. ", "")}
                                </Badge>
                              </div>
                              <div className="truncate text-gray-800">{appointment.patientName}</div>
                            </div>
                          ))}

                          {/* Show count of additional appointments */}
                          {filteredAppointments.length > getMaxAppointmentsToShow() && (
                            <div className="text-xs text-center font-medium text-primary">
                              +{filteredAppointments.length - getMaxAppointmentsToShow()} more
                            </div>
                          )}

                          {/* Show hint if no appointments */}
                          {filteredAppointments.length === 0 && (
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

      {/* Day Detail Dialog */}
      <Dialog open={isDayDetailOpen} onOpenChange={setIsDayDetailOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>{selectedDayForDetail && format(selectedDayForDetail, "EEEE, MMMM d, yyyy")}</DialogTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (selectedDayForDetail) {
                    handleDoubleClick(selectedDayForDetail)
                  }
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Book Appointment
              </Button>
            </div>
          </DialogHeader>
          <ScrollArea className="flex-1 pr-4 h-[70vh]">
            {selectedDayForDetail && (
              <AppointmentDayView
                date={selectedDayForDetail}
                doctor={selectedDoctors.includes("all") ? "all" : selectedDoctors[0]}
                appointments={appointments[formatDateKey(selectedDayForDetail)] || []}
                onAppointmentUpdate={(updatedAppointments) =>
                  handleAppointmentUpdate(updatedAppointments, selectedDayForDetail)
                }
              />
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Booking Modal */}
      {selectedDate && (
        <AppointmentBookingModal
          isOpen={isBookingModalOpen}
          onClose={() => {
            setIsBookingModalOpen(false)
            setSelectedDate(null)
          }}
          date={selectedDate}
          time={selectedTime}
          doctor={selectedDoctors.includes("all") ? "dr-williams" : selectedDoctors[0]}
          onBookAppointment={handleBookAppointment}
        />
      )}
    </>
  )
}
