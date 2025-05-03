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

// Appointment type
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

// Props for the day view
interface AppointmentDayViewProps {
  date: Date
  doctor: string
  appointments?: Appointment[]
  onAppointmentUpdate?: (appointments: Appointment[]) => void
}

// Normalize "h:MM AM/PM" or "HH:MM" → "HH:MM"
function normalizeTimeForComparison(time: string) {
  let hour = 0, minute = 0, isPM = false
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

// Time slots (7 AM–5 PM in 15‑min increments)
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
  // Local state
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

  // Refs for syncing updates
  const shouldUpdateParent = useRef(false)
  const prevAppointmentsRef = useRef<Appointment[]>([])

  // Commit 7: Sync incoming prop → local state
  useEffect(() => {
    if (JSON.stringify(prevAppointmentsRef.current) === JSON.stringify(appointments)) {
      return
    }
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

  useEffect(() => {
    if (onAppointmentUpdate && shouldUpdateParent.current) {
      onAppointmentUpdate(localAppointments)
      shouldUpdateParent.current = false
    }
  }, [localAppointments, onAppointmentUpdate])

  return (
    <div>
      {/* TODO: render tabs, grid, and booking modal */}
    </div>
  )
}
