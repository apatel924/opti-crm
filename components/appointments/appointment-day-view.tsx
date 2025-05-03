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

// Define appointment type
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

// Props now reference the typed Appointment[]
interface AppointmentDayViewProps {
  date: Date
  doctor: string
  appointments?: Appointment[]
  onAppointmentUpdate?: (appointments: Appointment[]) => void
}

// Helper: format "HH:MM" → "h:MM AM/PM"
function formatTimeForDisplay(time: string) {
  if (time.includes("AM") || time.includes("PM")) {
    return time
  }
  const [hours, minutes] = time.split(":")
  const hourNum = parseInt(hours, 10)
  const ampm = hourNum >= 12 ? "PM" : "AM"
  const hour12 = hourNum % 12 || 12
  return `${hour12}:${minutes} ${ampm}`
}

// Helper: normalize any "h:MM AM/PM" or "HH:MM" → "HH:MM" (24‑h) 
function normalizeTimeForComparison(time: string) {
  let hour = 0
  let minute = 0
  let isPM = false

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

export function AppointmentDayView({
  date,
  doctor,
  appointments = [],
  onAppointmentUpdate,
}: AppointmentDayViewProps) {
  return (
    <div>
      {/* TODO: implement AppointmentDayView */}
    </div>
  )
}
