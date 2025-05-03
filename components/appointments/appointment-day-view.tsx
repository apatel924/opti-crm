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

// Define appointment shape
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

// Props for the Day View
interface AppointmentDayViewProps {
  date: Date
  doctor: string
  appointments?: Appointment[]
  onAppointmentUpdate?: (appointments: Appointment[]) => void
}

// Helper: normalize any "h:MM AM/PM" or "HH:MM" → "HH:MM"
function normalizeTimeForComparison(time: string) {
  let hour = 0,
    minute = 0,
    isPM = false

  if (time.includes(":") && !time.match(/AM|PM/)) {
    const [h, m] = time.split(":")
    hour = parseInt(h, 10)
    minute = parseInt(m, 10)
  } else {
    isPM = time.includes("PM")
    const cleaned = time.replace(/AM|PM/, "").trim()
    let [h, m] = cleaned.split(":").map((v) => parseInt(v, 10))
    if (isPM && h < 12) h += 12
    if (!isPM && h === 12) h = 0
    hour = h
    minute = m
  }

  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
}

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

// Time slots from 7 AM to 5 PM in 15‑minute increments
const timeSlots = Array.from({ length: 41 }, (_, i) => {
  const hr = Math.floor(i / 4) + 7
  const min = (i % 4) * 15
  return `${hr.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`
})

export function AppointmentDayView({
  date,
  doctor,
  appointments = [],
  onAppointmentUpdate,
}: AppointmentDayViewProps) {
  // Local working copy
  const [localAppointments, setLocalAppointments] = useState<Appointment[]>([])
  const [multiBookSlots, setMultiBookSlots] = useState<Record<string, number>>({})
  const [activeTab, setActiveTab] = useState<"doctors" | "opticians">("doctors")

  // Drag‑and‑drop state
  const [draggingAppointment, setDraggingAppointment] = useState<string | null>(null)
  const dragSourceTimeSlot = useRef<string | null>(null)

  // Booking modal state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | undefined>(undefined)
  const [isOpticianBooking, setIsOpticianBooking] = useState(false)

  // Sync refs
  const shouldUpdateParent = useRef(false)
  const prevAppointmentsRef = useRef<Appointment[]>([])

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

  // Commit 7: sync incoming prop → localAppointments
  useEffect(() => {
    if (JSON.stringify(prevAppointmentsRef.current) === JSON.stringify(appointments)) return
    prevAppointmentsRef.current = appointments

    if (appointments.length > 0) {
      const formatted = appointments.map((app) => ({
        ...app,
        time: normalizeTimeForComparison(app.time),
      }))
      shouldUpdateParent.current = false
      setLocalAppointments(formatted)
    } else if (appointments.length === 0 && localAppointments.length > 0) {
      shouldUpdateParent.current = false
      setLocalAppointments([])
    }
  }, [appointments])

  // Commit 8: notify parent on localAppointments change
  useEffect(() => {
    if (onAppointmentUpdate && shouldUpdateParent.current) {
      onAppointmentUpdate(localAppointments)
      shouldUpdateParent.current = false
    }
  }, [localAppointments, onAppointmentUpdate])

  const filteredAppointments = useMemo(() => {
    return localAppointments.filter((appt) => {
      const isOpt = appt.isOptician || appt.doctor === "optician"
      // Filter by tab
      if (activeTab === "doctors" && isOpt) return false
      if (activeTab === "opticians" && !isOpt) return false
      // Filter by selected doctor (only for doctor tab)
      if (activeTab === "doctors" && doctor !== "all" && appt.doctor !== doctor) {
        return false
      }
      return true
    })
  }, [localAppointments, activeTab, doctor])

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

  return (
    <div>
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

              <div className="flex-1 border-l">
                {appointment ? (
                  <Card
                    key={appointment.id}
                    className={`border-l-4 ${getAppointmentTypeColor(appointment.type, appointment.isOptician)} 
                               hover:bg-accent/50 cursor-grab active:cursor-grabbing h-full`}
                    style={{
                      height: `${calculateAppointmentSpan(appointment.duration) * (showTimeLabel ? 64 : 32)}px`,
                      zIndex: 10,
                    }}
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
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="h-full rounded-md border border-dashed p-2">
                    {showTimeLabel && (
                      <div className="flex h-full items-center justify-center text-xs text-gray-500">
                        <span className="text-center">
                          Available
                          <div className="text-[10px] text-gray-400 mt-1">Double-click to book</div>
                        </span>
                      </div>
                    )}
                  </div>
                )}
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
        onBookAppointment={() => {}}
        isOptician={isOpticianBooking}
      />
    </div>
  )
}
