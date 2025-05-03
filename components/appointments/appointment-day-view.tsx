"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, User, Plus, Calendar, CheckCircle, Clock } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "@/components/ui/context-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { AppointmentBookingModal } from "./appointment-booking-modal"

// Helper function to format time display
function formatTimeForDisplay(time: string) {
  // Handle already formatted times (e.g. "9:00 AM")
  if (time.includes("AM") || time.includes("PM")) {
    return time
  }

  const [hours, minutes] = time.split(":")
  const hour = Number.parseInt(hours)
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

// Define appointment type
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

// Time slots from 7:00 AM to 5:00 PM in 15-minute increments
const timeSlots = Array.from({ length: 41 }, (_, i) => {
  const hour = Math.floor(i / 4) + 7
  const minute = (i % 4) * 15
  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
})

interface AppointmentDayViewProps {
  date: Date
  doctor: string
  appointments: Appointment[]
  onAppointmentUpdate: (appointments: Appointment[]) => void
}

export function AppointmentDayView({ date, doctor, appointments = [], onAppointmentUpdate }: AppointmentDayViewProps) {
  // State for appointments and booking configuration
  const [localAppointments, setLocalAppointments] = useState<Appointment[]>([])
  const [multiBookSlots, setMultiBookSlots] = useState<Record<string, number>>({})
  const [activeTab, setActiveTab] = useState<"doctors" | "opticians">("doctors")

  // State for drag and drop
  const [draggingAppointment, setDraggingAppointment] = useState<string | null>(null)
  const dragSourceTimeSlot = useRef<string | null>(null)

  // State for booking modal
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | undefined>(undefined)
  const [isOpticianBooking, setIsOpticianBooking] = useState(false)

  // Use a ref to track if we should update the parent
  const shouldUpdateParent = useRef(false)

  // Use a ref to track the previous appointments prop for comparison
  const prevAppointmentsRef = useRef<Appointment[]>([])

  // Initialize with provided appointments - only when appointments prop changes
  useEffect(() => {
    // Skip if the appointments are the same as before
    if (JSON.stringify(prevAppointmentsRef.current) === JSON.stringify(appointments)) {
      return
    }

    prevAppointmentsRef.current = appointments

    if (appointments && appointments.length > 0) {
      // Convert time format if needed
      const formattedAppointments = appointments.map((app) => {
        // Ensure time is in HH:MM format for internal use
        let time = app.time
        if (time.includes("AM") || time.includes("PM")) {
          const normalizedTime = normalizeTimeForComparison(time)
          time = normalizedTime
        }

        return {
          ...app,
          time,
        }
      })

      // Set local appointments without triggering an update to the parent
      shouldUpdateParent.current = false
      setLocalAppointments(formattedAppointments)
    } else if (appointments.length === 0 && localAppointments.length > 0) {
      // Clear local appointments if the parent component cleared them
      shouldUpdateParent.current = false
      setLocalAppointments([])
    }
  }, [appointments])

  // Update parent component when local appointments change due to user actions
  useEffect(() => {
    // Only call the update if we have a callback and we should update the parent
    if (onAppointmentUpdate && shouldUpdateParent.current) {
      onAppointmentUpdate(localAppointments)
      // Reset the flag
      shouldUpdateParent.current = false
    }
  }, [localAppointments, onAppointmentUpdate])

  // Filter appointments by doctor if needed and by type (doctor/optician)
  const filteredAppointments = useMemo(() => {
    return localAppointments.filter((appointment) => {
      // Filter by doctor/optician tab
      const isOpticianAppointment = appointment.isOptician || appointment.doctor === "optician"
      if (activeTab === "doctors" && isOpticianAppointment) return false
      if (activeTab === "opticians" && !isOpticianAppointment) return false

      // Filter by selected doctor (only for doctor appointments)
      if (activeTab === "doctors" && doctor !== "all" && appointment.doctor !== doctor) {
        return false
      }

      return true
    })
  }, [localAppointments, activeTab, doctor])

  // Calculate appointment spans (how many 15-min slots an appointment takes)
  const calculateAppointmentSpan = useCallback((duration: string | number) => {
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

  // Get appointment for a specific time slot
  const getAppointmentForTimeSlot = useCallback(
    (time: string) => {
      // First, check if this is the start time of an appointment
      const startAppointment = filteredAppointments.find((app) => app.time === time)
      if (startAppointment) return startAppointment

      // If not, check if this time slot is within the duration of an appointment
      for (const app of filteredAppointments) {
        const [appHour, appMinute] = app.time.split(":").map(Number)
        const appStartMinutes = appHour * 60 + appMinute

        const [slotHour, slotMinute] = time.split(":").map(Number)
        const slotMinutes = slotHour * 60 + slotMinute

        // Get duration in minutes
        const durationMinutes = calculateAppointmentSpan(app.duration) * 15

        // Check if the slot is within the appointment duration
        if (slotMinutes > appStartMinutes && slotMinutes < appStartMinutes + durationMinutes) {
          return app
        }
      }

      return null
    },
    [filteredAppointments, calculateAppointmentSpan],
  )

  // Get appointment type color
  const getAppointmentTypeColor = useCallback((type: string, isOptician = false) => {
    if (isOptician) {
      switch (type) {
        case "Frame Selection":
          return "border-l-teal-500"
        case "Glasses Fitting":
          return "border-l-violet-500"
        case "Glasses Pickup":
          return "border-l-orange-500"
        case "Contact Lens Training":
          return "border-l-pink-500"
        default:
          return "border-l-gray-500"
      }
    } else {
      switch (type) {
        case "Annual Exam":
          return "border-l-blue-500"
        case "Contact Lens Fitting":
          return "border-l-purple-500"
        case "Follow-up":
          return "border-l-green-500"
        case "Comprehensive Exam":
          return "border-l-indigo-500"
        case "Emergency":
          return "border-l-red-500"
        case "Kids Exam":
          return "border-l-pink-500"
        case "DFE":
          return "border-l-amber-500"
        case "Troubleshooting":
          return "border-l-cyan-500"
        default:
          return "border-l-gray-500"
      }
    }
  }, [])

  // Handle drag start
  const handleDragStart = useCallback((e: React.DragEvent, appointmentId: string, timeSlot: string) => {
    setDraggingAppointment(appointmentId)
    dragSourceTimeSlot.current = timeSlot
    e.dataTransfer.setData("appointmentId", appointmentId)
  }, [])

  // Handle drag over
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  // Handle drop
  const handleDrop = useCallback((e: React.DragEvent, targetTimeSlot: string) => {
    e.preventDefault()
    const appointmentId = e.dataTransfer.getData("appointmentId")

    if (!appointmentId || !dragSourceTimeSlot.current) return

    // Set flag to update parent
    shouldUpdateParent.current = true

    // Update the appointment time
    setLocalAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === appointmentId ? { ...appointment, time: targetTimeSlot } : appointment,
      ),
    )

    // Reset drag state
    setDraggingAppointment(null)
    dragSourceTimeSlot.current = null
  }, [])

  // Handle multi-booking (double or triple booking)
  const handleMultiBook = useCallback((timeSlot: string, slots: number) => {
    setMultiBookSlots((prev) => ({
      ...prev,
      [timeSlot]: slots,
    }))
  }, [])

  // Handle double click on empty slot
  const handleDoubleClick = useCallback((timeSlot: string, isOptician = false) => {
    setSelectedTimeSlot(timeSlot)
    setIsOpticianBooking(isOptician)
    setIsBookingModalOpen(true)
  }, [])

  // Handle booking appointment
  const handleBookAppointment = useCallback(
    (appointmentData: any) => {
      // Generate a unique ID for the new appointment
      const newId = `A-${isOpticianBooking ? "2" : "1"}${Math.floor(10000 + Math.random() * 90000)}`

      // Create new appointment object
      const newAppointment: Appointment = {
        id: newId,
        patientId: appointmentData.patientId,
        patientName: appointmentData.patientName,
        time: appointmentData.time,
        duration: appointmentData.duration,
        type: appointmentData.type,
        status: "Scheduled",
        doctor: isOpticianBooking ? "optician" : appointmentData.doctor,
        room: isOpticianBooking ? "Optical" : `Exam ${Math.floor(1 + Math.random() * 3)}`,
        isOptician: isOpticianBooking,
      }

      // Set flag to update parent
      shouldUpdateParent.current = true

      // Add the new appointment to the list
      setLocalAppointments((prev) => [...prev, newAppointment])
    },
    [isOpticianBooking],
  )

  // Handle sign out (mark as completed)
  const handleSignOut = useCallback((appointmentId: string) => {
    // Set flag to update parent
    shouldUpdateParent.current = true

    setLocalAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === appointmentId ? { ...appointment, status: "Completed" } : appointment,
      ),
    )
  }, [])

  // Get the grid class based on number of slots
  const getGridClass = useCallback((slots: number) => {
    switch (slots) {
      case 2:
        return "grid-cols-2"
      case 3:
        return "grid-cols-3"
      default:
        return ""
    }
  }, [])

  // Update the day view to be more compact
  return (
    <>
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "doctors" | "opticians")}
        className="mb-4"
      >
        <TabsList>
          <TabsTrigger value="doctors">Doctors</TabsTrigger>
          <TabsTrigger value="opticians">Opticians</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-0 border rounded-md">
        {timeSlots.map((time, index) => {
          const appointment = getAppointmentForTimeSlot(time)
          const isStart = appointment && appointment.time === time
          const isWithin = appointment && !isStart
          const multiBookCount = multiBookSlots[time] || 1

          // Only show the time label for full and half hours
          const showTimeLabel = time.endsWith(":00") || time.endsWith(":30")

          // Skip rendering slots that are within an appointment's duration
          if (isWithin) return null

          return (
            <div key={time} className={`flex items-start border-b last:border-b-0 ${showTimeLabel ? "h-16" : "h-8"}`}>
              {showTimeLabel && (
                <div className="w-20 py-2 text-right text-sm font-medium text-gray-700 pr-2">
                  {formatTimeForDisplay(time)}
                </div>
              )}
              {!showTimeLabel && <div className="w-20"></div>}

              <div className="flex-1 border-l" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, time)}>
                <ContextMenu>
                  <ContextMenuTrigger>
                    <div className={`grid gap-1 h-full ${multiBookCount > 1 ? getGridClass(multiBookCount) : ""}`}>
                      {appointment ? (
                        <Card
                          key={appointment.id}
                          className={`border-l-4 ${getAppointmentTypeColor(appointment.type, appointment.isOptician)} 
                                     hover:bg-accent/50 cursor-grab active:cursor-grabbing h-full`}
                          style={{
                            height: `${calculateAppointmentSpan(appointment.duration) * (showTimeLabel ? 64 : 32)}px`,
                            zIndex: 10,
                          }}
                          draggable
                          onDragStart={(e) => handleDragStart(e, appointment.id, time)}
                        >
                          <CardContent className="flex p-2 h-full">
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="font-semibold text-gray-900">{appointment.patientName}</div>
                                  <div className="text-xs text-gray-600">{appointment.type}</div>
                                </div>
                                <div className="flex items-center gap-1">
                                  {appointment.status === "Checked In" && (
                                    <Badge
                                      variant="outline"
                                      className="bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400 text-[10px] py-0 h-5"
                                    >
                                      Checked In
                                    </Badge>
                                  )}
                                  {appointment.status === "Completed" && (
                                    <Badge
                                      variant="outline"
                                      className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 text-[10px] py-0 h-5"
                                    >
                                      Completed
                                    </Badge>
                                  )}
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-6 w-6">
                                        <MoreHorizontal className="h-3 w-3" />
                                        <span className="sr-only">More options</span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem asChild>
                                        <Link href={`/patients/${appointment.patientId}`}>View Patient</Link>
                                      </DropdownMenuItem>
                                      {appointment.status !== "Checked In" && (
                                        <DropdownMenuItem>Check In</DropdownMenuItem>
                                      )}
                                      {appointment.status !== "Completed" && (
                                        <DropdownMenuItem onClick={() => handleSignOut(appointment.id)}>
                                          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                          Sign Out
                                        </DropdownMenuItem>
                                      )}
                                      <DropdownMenuItem>Reschedule</DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                              <div className="mt-1 flex items-center justify-between text-xs">
                                <div className="flex items-center gap-1">
                                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/10">
                                    <User className="h-2 w-2 text-primary" />
                                  </div>
                                  <span className="text-gray-700">Room: {appointment.room}</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-600">
                                  <Clock className="h-3 w-3 text-gray-400" />
                                  {typeof appointment.duration === "string"
                                    ? appointment.duration
                                    : `${appointment.duration} min`}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ) : (
                        // Empty slots
                        Array.from({
                          length: Math.max(multiBookCount, 1),
                        }).map((_, index) => (
                          <div
                            key={`empty-${index}`}
                            className="h-full rounded-md border border-dashed p-2 cursor-pointer hover:bg-accent/10 transition-colors"
                            onDoubleClick={() => handleDoubleClick(time, activeTab === "opticians")}
                          >
                            {showTimeLabel && (
                              <div className="flex h-full items-center justify-center text-xs text-gray-500">
                                <span className="text-center">
                                  Available
                                  <div className="text-[10px] text-gray-400 mt-1">Double-click to book</div>
                                </span>
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem onClick={() => handleDoubleClick(time, activeTab === "opticians")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Book Appointment
                    </ContextMenuItem>
                    <ContextMenuItem onClick={() => handleMultiBook(time, 1)}>
                      <Calendar className="mr-2 h-4 w-4" />
                      Single Booking
                    </ContextMenuItem>
                    <ContextMenuItem onClick={() => handleMultiBook(time, 2)}>
                      <Calendar className="mr-2 h-4 w-4" />
                      Double Booking
                    </ContextMenuItem>
                    <ContextMenuItem onClick={() => handleMultiBook(time, 3)}>
                      <Calendar className="mr-2 h-4 w-4" />
                      Triple Booking
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem>Block Time</ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              </div>
            </div>
          )
        })}
      </div>

      {/* Booking Modal */}
      <AppointmentBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false)
          setSelectedTimeSlot(undefined)
        }}
        date={date}
        time={selectedTimeSlot}
        doctor={isOpticianBooking ? "optician" : doctor === "all" ? "dr-williams" : doctor}
        onBookAppointment={handleBookAppointment}
        isOptician={isOpticianBooking}
      />
    </>
  )
}
