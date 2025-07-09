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
  patientId: string
  patientName: string
  time: string
  duration: string | number
  type: string
  status: string
  doctor: string
  room: string
  isOptician?: boolean
}

// Helper function to format time display
function formatTimeForDisplay(time: string) {
  // Handle already formatted times (e.g. "9:00 AM")
  if (time.includes("AM") || time.includes("PM")) {
    return time
  }

  const [hours, minutes] = time.split(":")
  const hour = Number.parseInt(hours, 10)
  const ampm = hour >= 12 ? "PM" : "AM"
  const hour12 = hour % 12 || 12
  return `${hour12}:${minutes} ${ampm}`
}

// Helper function to normalize time for comparison
function normalizeTimeForComparison(time: string) {
  // Convert any time format to a standard format for comparison
  let hour = 0
  let minute = 0
  let isPM = false

  // Handle "HH:MM" format
  if (time.includes(":") && !time.includes("AM") && !time.includes("PM")) {
    const [hours, minutes] = time.split(":")
    hour = Number.parseInt(hours, 10)
    minute = Number.parseInt(minutes, 10)
    isPM = hour >= 12
  }
  // Handle "H:MM AM/PM" format
  else if (time.includes(":") && (time.includes("AM") || time.includes("PM"))) {
    isPM = time.includes("PM")
    const timePart = time.replace("AM", "").replace("PM", "").trim()
    const [hours, minutes] = timePart.split(":")
    hour = Number.parseInt(hours, 10)
    if (isPM && hour < 12) hour += 12
    if (!isPM && hour === 12) hour = 0
    minute = Number.parseInt(minutes, 10)
  }

  // Return in 24-hour format for easy comparison
  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
}

export function AppointmentCalendarView({ date, view, onViewPatient, selectedDoctors }: AppointmentCalendarViewProps) {
  // State for multi-booking
  const [multiBookSlots, setMultiBookSlots] = useState<Record<string, number>>({})

  // State for booking modal
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)

  // State for day detail view
  const [isDayDetailOpen, setIsDayDetailOpen] = useState(false)
  const [selectedDayForDetail, setSelectedDayForDetail] = useState<Date | null>(null)

  // Sample data - in a real app, this would come from an API
  const [appointments, setAppointments] = useState<Record<string, Appointment[]>>({})

  // Use a ref to track if appointments have been initialized
  const appointmentsInitialized = useRef(false)

  // Initialize with sample appointments only once
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

  // Generate calendar days based on view
  const calendarDays = useMemo(() => {
    const days = []
    const currentDate = new Date(date)

    if (view === "week") {
      // Set to the beginning of the week (Sunday)
      const startOfWeek = new Date(currentDate)
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

      // Generate 7 days (Sunday to Saturday)
      for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek)
        day.setDate(startOfWeek.getDate() + i)
        days.push(day)
      }
    } else if (view === "month") {
      // Set to the first day of the month
      const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)

      // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
      const firstDayOfWeek = firstDayOfMonth.getDay()

      // Calculate the date for the first cell in the calendar (might be from the previous month)
      const startDate = new Date(firstDayOfMonth)
      startDate.setDate(1 - firstDayOfWeek)

      // Generate 42 days (6 weeks * 7 days) to ensure we cover the entire month
      for (let i = 0; i < 42; i++) {
        const day = new Date(startDate)
        day.setDate(startDate.getDate() + i)
        days.push(day)
      }
    }

    return days
  }, [date, view])

  // Format date as YYYY-MM-DD for lookup in appointments object
  const formatDateKey = useCallback((date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
  }, [])

  // Check if a date is today
  const isToday = useCallback((date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }, [])

  // Check if a date is in the current month
  const isCurrentMonth = useCallback(
    (day: Date) => {
      return isSameMonth(day, date)
    },
    [date],
  )

  // Filter appointments by selected doctors
  const filterAppointmentsByDoctor = useCallback(
    (appts: Appointment[]) => {
      if (selectedDoctors.includes("all")) return appts
      return appts.filter((app) => selectedDoctors.includes(app.doctor.replace("Dr. ", "dr-").toLowerCase()))
    },
    [selectedDoctors],
  )

  // Handle multi-booking
  const handleMultiBook = useCallback((dateKey: string, slots: number) => {
    setMultiBookSlots((prev) => ({
      ...prev,
      [dateKey]: slots,
    }))
  }, [])

  // Handle double click on a day
  const handleDoubleClick = useCallback((day: Date) => {
    setSelectedDate(day)
    setSelectedTime(undefined)
    setIsBookingModalOpen(true)
  }, [])

  // Handle click on a day to show detail view
  const handleDayClick = useCallback((day: Date) => {
    setSelectedDayForDetail(day)
    setIsDayDetailOpen(true)
  }, [])

  // Handle booking appointment
  const handleBookAppointment = useCallback(
    (appointmentData: any) => {
      const dateKey = format(new Date(appointmentData.date), "yyyy-MM-dd")

      // Generate a unique ID for the new appointment
      const newId = `${Math.floor(10000 + Math.random() * 90000)}`

      // Create new appointment object
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

      // Add the new appointment to the list
      setAppointments((prev) => {
        const updatedAppointments = { ...prev }
        if (!updatedAppointments[dateKey]) {
          updatedAppointments[dateKey] = []
        }
        updatedAppointments[dateKey] = [...updatedAppointments[dateKey], newAppointment]
        return updatedAppointments
      })

      // Close the day detail view if it's open
      if (isDayDetailOpen) {
        setIsDayDetailOpen(false)
      }
    },
    [isDayDetailOpen],
  )

  // Get appointment status color
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

  // Get the maximum number of appointments to show in compact view
  const getMaxAppointmentsToShow = useCallback(() => {
    return view === "week" ? 3 : 2
  }, [view])

  // Time slots for week view (15-minute increments)
  const timeSlots = [
    "07:00",
    "07:15",
    "07:30",
    "07:45",
    "08:00",
    "08:15",
    "08:30",
    "08:45",
    "09:00",
    "09:15",
    "09:30",
    "09:45",
    "10:00",
    "10:15",
    "10:30",
    "10:45",
    "11:00",
    "11:15",
    "11:30",
    "11:45",
    "12:00",
    "12:15",
    "12:30",
    "12:45",
    "13:00",
    "13:15",
    "13:30",
    "13:45",
    "14:00",
    "14:15",
    "14:30",
    "14:45",
    "15:00",
    "15:15",
    "15:30",
    "15:45",
    "16:00",
    "16:15",
    "16:30",
    "16:45",
    "17:00",
  ]

  // Get appointment duration in number of 15-minute slots
  const getAppointmentDurationSlots = useCallback((duration: string | number) => {
    // Handle both string and number duration types
    let durationMinutes: number

    if (typeof duration === "number") {
      durationMinutes = duration
    } else if (typeof duration === "string") {
      // Extract the number from strings like "30 min"
      const match = duration.match(/(\d+)/)
      durationMinutes = match ? Number.parseInt(match[1], 10) : 30 // Default to 30 if parsing fails
    } else {
      durationMinutes = 30 // Default duration
    }

    return Math.ceil(durationMinutes / 15)
  }, [])

  // Check if a time slot is within an appointment's duration
  const isWithinAppointmentDuration = useCallback(
    (day: Date, timeSlot: string, appointments: Appointment[]) => {
      for (const app of appointments) {
        const appTime = normalizeTimeForComparison(app.time)
        const slotTime = normalizeTimeForComparison(timeSlot)

        // Convert times to minutes for easier comparison
        const [appHour, appMinute] = appTime.split(":").map(Number)
        const [slotHour, slotMinute] = slotTime.split(":").map(Number)

        const appTimeInMinutes = appHour * 60 + appMinute
        const slotTimeInMinutes = slotHour * 60 + slotMinute

        // Get duration in minutes
        const durationInMinutes = getAppointmentDurationSlots(app.duration) * 15

        // Check if the slot time is within the appointment duration
        if (slotTimeInMinutes >= appTimeInMinutes && slotTimeInMinutes < appTimeInMinutes + durationInMinutes) {
          return true
        }
      }
      return false
    },
    [getAppointmentDurationSlots],
  )

  // Get appointment for a specific time slot
  const getAppointmentForTimeSlot = useCallback(
    (day: Date, timeSlot: string) => {
      const dateKey = formatDateKey(day)
      const dayAppointments = appointments[dateKey] || []
      const filteredAppointments = filterAppointmentsByDoctor(dayAppointments)

      for (const app of filteredAppointments) {
        const appTime = normalizeTimeForComparison(app.time)
        const slotTime = normalizeTimeForComparison(timeSlot)

        if (appTime === slotTime) {
          return app
        }
      }
      return null
    },
    [appointments, filterAppointmentsByDoctor, formatDateKey],
  )

  // Handle appointment updates from day view
  const handleAppointmentUpdate = useCallback(
    (updatedAppointments: Appointment[], date: Date) => {
      const dateKey = formatDateKey(date)

      // Use a functional update to avoid dependency on the current state
      setAppointments((prev) => {
        // Skip update if nothing changed
        if (JSON.stringify(prev[dateKey]) === JSON.stringify(updatedAppointments)) {
          return prev
        }

        return {
          ...prev,
          [dateKey]: updatedAppointments,
        }
      })
    },
    [formatDateKey],
  )

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
          defaultDate={selectedDate}
          defaultTime={selectedTime}
          defaultDoctor={selectedDoctors.includes("all") ? "dr-williams" : selectedDoctors[0]}
          onBookAppointment={handleBookAppointment}
        />
      )}
    </>
  )
}
