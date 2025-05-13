"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { format, addDays, startOfWeek, endOfWeek, isSameDay, addWeeks, subWeeks, addMonths, subMonths } from "date-fns"
import { AppointmentBookingModal } from "./appointment-booking-modal"
import { AppointmentDetailsDialog } from "./appointment-details-dialog"
import { Card } from "@/components/ui/card"
import { providers, appointmentTypes, initialAppointments } from "@/lib/mock-data"

// Define appointment interface
interface Appointment {
  id: string
  patientId: string
  patientName: string
  type: string
  date: Date
  startTime: string
  endTime: string
  provider: string
  providerName: string
  status: string
  room: string
  isOptician?: boolean
}

export function AppointmentsPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentView, setCurrentView] = useState("day") // day, week, month
  const [selectedProvider, setSelectedProvider] = useState("all")
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<any>(null)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isAppointmentDetailsOpen, setIsAppointmentDetailsOpen] = useState(false)

  // Drag and drop state
  const [draggingAppointment, setDraggingAppointment] = useState<string | null>(null)
  const dragStartTimeRef = useRef<string | null>(null)
  const dragStartProviderRef = useRef<string | null>(null)
  const dragStartDateRef = useRef<Date | null>(null)

  // Generate time slots from 7 AM to 5 PM in 15-minute increments
  const timeSlots = []
  for (let hour = 7; hour < 18; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      timeSlots.push({
        hour,
        minute,
        time: `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
        displayTime: `${hour > 12 ? hour - 12 : hour}:${minute.toString().padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`,
      })
    }
  }

  // Initialize with sample appointments
  useEffect(() => {
    // Convert date strings to Date objects
    const formattedAppointments = initialAppointments.map((appt) => ({
      ...appt,
      date: new Date(appt.date),
    }))
    setAppointments(formattedAppointments)
  }, [])

  // Filter appointments based on selected provider and current view/date
  const filteredAppointments = appointments.filter((appointment) => {
    // Filter by provider
    if (selectedProvider !== "all" && appointment.provider !== selectedProvider) {
      return false
    }

    // Filter by date based on current view
    if (currentView === "day") {
      return isSameDay(appointment.date, currentDate)
    } else if (currentView === "week") {
      const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 })
      const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 })
      return appointment.date >= weekStart && appointment.date <= weekEnd
    }

    // Month view - check if same month and year
    return (
      appointment.date.getMonth() === currentDate.getMonth() &&
      appointment.date.getFullYear() === currentDate.getFullYear()
    )
  })

  // Navigation functions
  const goToToday = () => setCurrentDate(new Date())

  const goToPrevious = () => {
    if (currentView === "day") {
      setCurrentDate(addDays(currentDate, -1))
    } else if (currentView === "week") {
      setCurrentDate(subWeeks(currentDate, 1))
    } else {
      setCurrentDate(subMonths(currentDate, 1))
    }
  }

  const goToNext = () => {
    if (currentView === "day") {
      setCurrentDate(addDays(currentDate, 1))
    } else if (currentView === "week") {
      setCurrentDate(addWeeks(currentDate, 1))
    } else {
      setCurrentDate(addMonths(currentDate, 1))
    }
  }

  // Handle creating a new appointment
  const handleNewAppointment = () => {
    setSelectedSlot({
      date: currentDate,
      startTime: "09:00",
      provider: selectedProvider === "all" ? "dr-williams" : selectedProvider,
    })
    setIsBookingModalOpen(true)
  }

  // Handle booking appointment
  const handleBookAppointment = (appointmentData: any) => {
    // Create a new appointment
    const newId = `appt-${Date.now()}`
    const isOptician = appointmentData.isOptician || appointmentData.provider === "optician"

    // Calculate end time based on duration
    const [startHour, startMinute] = appointmentData.time.split(":").map(Number)
    const durationMinutes = Number.parseInt(appointmentData.duration, 10)
    let endHour = startHour
    let endMinute = startMinute + durationMinutes

    if (endMinute >= 60) {
      endHour += Math.floor(endMinute / 60)
      endMinute = endMinute % 60
    }

    const endTime = `${endHour.toString().padStart(2, "0")}:${endMinute.toString().padStart(2, "0")}`

    const providerName = providers.find((p) => p.id === appointmentData.provider)?.name || "Unknown"

    const newAppointment = {
      id: newId,
      patientId: appointmentData.patientId,
      patientName: appointmentData.patientName,
      type: appointmentData.type,
      date: new Date(appointmentData.date),
      startTime: appointmentData.time,
      endTime: endTime,
      provider: appointmentData.provider,
      providerName: providerName,
      status: "Scheduled",
      room: isOptician ? "Optical" : `Exam ${Math.floor(1 + Math.random() * 3)}`,
      isOptician,
    }

    // Add the new appointment
    setAppointments((prev) => [...prev, newAppointment])
    setIsBookingModalOpen(false)
  }

  // Handle time slot click
  const handleTimeSlotClick = (time: string, provider = null, date = currentDate) => {
    setSelectedSlot({
      date: date,
      startTime: time,
      provider: provider || (selectedProvider === "all" ? "dr-williams" : selectedProvider),
    })
    setIsBookingModalOpen(true)
  }

  // Handle appointment click
  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsAppointmentDetailsOpen(true)
  }

  // Handle appointment status changes
  const handleCheckIn = (appointmentId: string) => {
    setAppointments((prev) =>
      prev.map((appt) => (appt.id === appointmentId ? { ...appt, status: "Checked In" } : appt)),
    )
    setIsAppointmentDetailsOpen(false)
  }

  const handleComplete = (appointmentId: string) => {
    setAppointments((prev) => prev.map((appt) => (appt.id === appointmentId ? { ...appt, status: "Completed" } : appt)))
    setIsAppointmentDetailsOpen(false)
  }

  const handleCancel = (appointmentId: string) => {
    setAppointments((prev) => prev.map((appt) => (appt.id === appointmentId ? { ...appt, status: "Cancelled" } : appt)))
    setIsAppointmentDetailsOpen(false)
  }

  const handleReschedule = (appointmentId: string) => {
    const appointment = appointments.find((appt) => appt.id === appointmentId)
    if (appointment) {
      setSelectedSlot({
        date: appointment.date,
        startTime: appointment.startTime,
        provider: appointment.provider,
      })
      setIsBookingModalOpen(true)
      // Remove the old appointment
      setAppointments((prev) => prev.filter((appt) => appt.id !== appointmentId))
    }
    setIsAppointmentDetailsOpen(false)
  }

  // Format the current date based on view
  const formattedDate = () => {
    if (currentView === "day") {
      return format(currentDate, "EEEE, MMMM d, yyyy")
    } else if (currentView === "week") {
      const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 })
      const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 })
      return `${format(weekStart, "MMM d")} - ${format(weekEnd, "MMM d, yyyy")}`
    } else {
      return format(currentDate, "MMMM yyyy")
    }
  }

  // Get days for week view
  const weekDays = () => {
    const days = []
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 })

    for (let i = 0; i < 7; i++) {
      days.push(addDays(weekStart, i))
    }

    return days
  }

  // Get days for month view
  const monthDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()

    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDay.getDay()

    // Create array for all days in the month view (including padding days)
    const days = []

    // Add padding days from previous month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, appointment: Appointment) => {
    e.dataTransfer.setData("appointmentId", appointment.id)
    setDraggingAppointment(appointment.id)
    dragStartTimeRef.current = appointment.startTime
    dragStartProviderRef.current = appointment.provider
    dragStartDateRef.current = appointment.date
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, time: string, provider: string, date: Date) => {
    e.preventDefault()
    const appointmentId = e.dataTransfer.getData("appointmentId")

    if (!appointmentId) return

    // Find the appointment
    const appointment = appointments.find((a) => a.id === appointmentId)
    if (!appointment) return

    // Calculate time difference between original and new slot
    const [oldHour, oldMinute] = appointment.startTime.split(":").map(Number)
    const [newHour, newMinute] = time.split(":").map(Number)

    // Calculate duration in minutes
    const [endHour, endMinute] = appointment.endTime.split(":").map(Number)
    const durationMinutes = endHour * 60 + endMinute - (oldHour * 60 + oldMinute)

    // Calculate new end time
    let newEndHour = newHour
    let newEndMinute = newMinute + durationMinutes

    if (newEndMinute >= 60) {
      newEndHour += Math.floor(newEndMinute / 60)
      newEndMinute = newEndMinute % 60
    }

    const newEndTime = `${newEndHour.toString().padStart(2, "0")}:${newEndMinute.toString().padStart(2, "0")}`

    // Update the appointment
    setAppointments((prevAppointments) =>
      prevAppointments.map((a) =>
        a.id === appointmentId
          ? {
              ...a,
              startTime: time,
              endTime: newEndTime,
              provider: provider,
              providerName: providers.find((p) => p.id === provider)?.name || a.providerName,
              date: date,
            }
          : a,
      ),
    )

    // Reset drag state
    setDraggingAppointment(null)
    dragStartTimeRef.current = null
    dragStartProviderRef.current = null
    dragStartDateRef.current = null
  }

  // Render day view
  const renderDayView = () => {
    // If provider is selected, only show that provider
    const providersToShow = selectedProvider === "all" ? providers : providers.filter((p) => p.id === selectedProvider)

    return (
      <div className="grid grid-cols-[80px_1fr] h-[calc(100vh-220px)] overflow-y-auto">
        {/* Time column */}
        <div className="border-r sticky left-0 bg-white z-10">
          {timeSlots.map((slot, index) => (
            <div
              key={slot.time}
              className={`h-12 px-2 py-1 text-xs text-gray-500 ${index % 4 === 0 ? "border-t font-medium" : ""}`}
            >
              {index % 4 === 0 && slot.displayTime}
            </div>
          ))}
        </div>

        {/* Providers columns */}
        <div className="grid" style={{ gridTemplateColumns: `repeat(${providersToShow.length}, 1fr)` }}>
          {providersToShow.map((provider, providerIndex) => (
            <div key={provider.id} className={`${providerIndex < providersToShow.length - 1 ? "border-r" : ""}`}>
              {/* Provider header */}
              <div className="h-10 border-b bg-gray-50 p-2 text-center font-medium sticky top-0 z-10">
                {provider.name}
              </div>

              {/* Time slots */}
              <div className="relative">
                {timeSlots.map((slot, index) => (
                  <div
                    key={`${provider.id}-${slot.time}`}
                    className={`h-12 ${index % 4 === 0 ? "border-t" : "border-t border-gray-100"} hover:bg-gray-50 cursor-pointer`}
                    onClick={() => handleTimeSlotClick(slot.time, provider.id)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, slot.time, provider.id, currentDate)}
                  />
                ))}

                {/* Appointments */}
                {filteredAppointments
                  .filter((appt) => appt.provider === provider.id)
                  .map((appointment) => {
                    const [startHour, startMinute] = appointment.startTime.split(":").map(Number)
                    const [endHour, endMinute] = appointment.endTime.split(":").map(Number)

                    // Calculate position and height
                    const startMinutes = startHour * 60 + startMinute
                    const endMinutes = endHour * 60 + endMinute
                    const startFromDay = startMinutes - 7 * 60 // 7 AM is the start
                    const durationMinutes = endMinutes - startMinutes

                    // Each 15 minutes = 12px height
                    const topPosition = (startFromDay / 15) * 12
                    const height = (durationMinutes / 15) * 12

                    const typeStyle = appointmentTypes[appointment.type] || {
                      color: "bg-gray-500",
                      border: "border-gray-600",
                      textColor: "text-white",
                    }

                    // Status indicator
                    let statusIndicator = null
                    if (appointment.status === "Checked In") {
                      statusIndicator = <div className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full"></div>
                    } else if (appointment.status === "Completed") {
                      statusIndicator = <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                    } else if (appointment.status === "Cancelled") {
                      statusIndicator = <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                    }

                    return (
                      <div
                        key={appointment.id}
                        className={`absolute left-0 right-0 mx-1 rounded border-l-4 ${typeStyle.color} overflow-hidden cursor-pointer hover:brightness-95 active:brightness-90`}
                        style={{
                          top: `${topPosition}px`,
                          height: `${height}px`,
                          minHeight: "24px", // Add minimum height to prevent tiny appointments
                        }}
                        draggable
                        onDragStart={(e) => handleDragStart(e, appointment)}
                        onClick={() => handleAppointmentClick(appointment)}
                      >
                        {statusIndicator}
                        <div className={`font-medium truncate px-1 bg-white/90 text-gray-900`}>
                          {appointment.type === "Lunch" || appointment.type === "Block"
                            ? appointment.type
                            : appointment.patientName}
                        </div>
                        {appointment.type !== "Lunch" && appointment.type !== "Block" && (
                          <>
                            <div className="truncate px-1 text-xs text-gray-700 bg-white/80">{appointment.type}</div>
                            {height > 40 && (
                              <div className="text-xs truncate px-1 text-gray-600 bg-white/70">
                                Room: {appointment.room}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    )
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Render week view
  const renderWeekView = () => {
    const days = weekDays()

    return (
      <div className="grid grid-cols-[80px_1fr] h-[calc(100vh-220px)] overflow-y-auto">
        {/* Time column */}
        <div className="border-r sticky left-0 bg-white z-10">
          {timeSlots.map((slot, index) => (
            <div
              key={slot.time}
              className={`h-12 px-2 py-1 text-xs text-gray-500 ${index % 4 === 0 ? "border-t font-medium" : ""}`}
            >
              {index % 4 === 0 && slot.displayTime}
            </div>
          ))}
        </div>

        {/* Days columns */}
        <div className="grid grid-cols-7">
          {days.map((day, dayIndex) => (
            <div key={day.toISOString()} className={`${dayIndex < 6 ? "border-r" : ""}`}>
              {/* Day header */}
              <div className="h-10 border-b bg-gray-50 p-2 text-center font-medium sticky top-0 z-10">
                {format(day, "EEE d")}
              </div>

              {/* Time slots */}
              <div className="relative">
                {timeSlots.map((slot, index) => (
                  <div
                    key={`${day.toISOString()}-${slot.time}`}
                    className={`h-12 ${index % 4 === 0 ? "border-t" : "border-t border-gray-100"} hover:bg-gray-50 cursor-pointer`}
                    onClick={() => {
                      handleTimeSlotClick(slot.time, selectedProvider === "all" ? "dr-williams" : selectedProvider, day)
                    }}
                    onDragOver={handleDragOver}
                    onDrop={(e) =>
                      handleDrop(e, slot.time, selectedProvider === "all" ? "dr-williams" : selectedProvider, day)
                    }
                  />
                ))}

                {/* Appointments */}
                {filteredAppointments
                  .filter((appt) => isSameDay(appt.date, day))
                  .map((appointment) => {
                    const [startHour, startMinute] = appointment.startTime.split(":").map(Number)
                    const [endHour, endMinute] = appointment.endTime.split(":").map(Number)

                    // Calculate position and height
                    const startMinutes = startHour * 60 + startMinute
                    const endMinutes = endHour * 60 + endMinute
                    const startFromDay = startMinutes - 7 * 60 // 7 AM is the start
                    const durationMinutes = endMinutes - startMinutes

                    // Each 15 minutes = 12px height
                    const topPosition = (startFromDay / 15) * 12
                    const height = (durationMinutes / 15) * 12

                    const typeStyle = appointmentTypes[appointment.type] || {
                      color: "bg-gray-500",
                      border: "border-gray-600",
                      textColor: "text-white",
                    }

                    // Status indicator
                    let statusIndicator = null
                    if (appointment.status === "Checked In") {
                      statusIndicator = <div className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full"></div>
                    } else if (appointment.status === "Completed") {
                      statusIndicator = <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                    } else if (appointment.status === "Cancelled") {
                      statusIndicator = <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                    }

                    return (
                      <div
                        key={appointment.id}
                        className={`absolute left-0 right-0 mx-1 rounded border-l-4 ${typeStyle.color} overflow-hidden cursor-pointer hover:brightness-95 active:brightness-90`}
                        style={{
                          top: `${topPosition}px`,
                          height: `${height}px`,
                          minHeight: "24px",
                        }}
                        draggable
                        onDragStart={(e) => handleDragStart(e, appointment)}
                        onClick={() => handleAppointmentClick(appointment)}
                      >
                        {statusIndicator}
                        <div className="font-medium truncate px-1 bg-white/90 text-gray-900">
                          {appointment.type === "Lunch" || appointment.type === "Block"
                            ? appointment.type
                            : appointment.patientName}
                        </div>
                        {height > 24 && appointment.type !== "Lunch" && appointment.type !== "Block" && (
                          <div className="truncate px-1 text-xs text-gray-700 bg-white/80">
                            {appointmentTypes[appointment.type]?.shortName || appointment.type}
                          </div>
                        )}
                      </div>
                    )
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Render month view
  const renderMonthView = () => {
    const days = monthDays()

    return (
      <div className="grid grid-rows-6 h-[calc(100vh-220px)] border">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b bg-gray-50">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-2 text-center font-medium">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-rows-6 flex-1">
          {Array.from({ length: 6 }).map((_, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-7 border-b">
              {Array.from({ length: 7 }).map((_, colIndex) => {
                const dayIndex = rowIndex * 7 + colIndex
                const day = dayIndex < days.length ? days[dayIndex] : null

                if (!day) return <div key={colIndex} className="border-r p-1 bg-gray-50" />

                const isToday = isSameDay(day, new Date())
                const dayAppointments = filteredAppointments.filter((appt) => isSameDay(appt.date, day))

                return (
                  <div
                    key={colIndex}
                    className={`border-r p-1 overflow-hidden ${isToday ? "bg-blue-50" : ""} hover:bg-gray-50 cursor-pointer`}
                    onClick={() => {
                      setCurrentDate(day)
                      setCurrentView("day")
                    }}
                    onDragOver={handleDragOver}
                    onDrop={(e) => {
                      // When dropping on a month cell, use 9:00 AM as default time
                      handleDrop(e, "09:00", selectedProvider === "all" ? "dr-williams" : selectedProvider, day)
                    }}
                  >
                    <div className={`text-right text-sm ${isToday ? "font-bold text-blue-600" : ""}`}>
                      {day.getDate()}
                    </div>
                    <div className="mt-1 space-y-1">
                      {dayAppointments.slice(0, 5).map((appointment) => {
                        const typeStyle = appointmentTypes[appointment.type] || {
                          color: "bg-gray-500",
                          border: "border-gray-600",
                          textColor: "text-white",
                        }

                        return (
                          <div
                            key={appointment.id}
                            className={`truncate rounded px-1 text-xs ${typeStyle.color} cursor-pointer hover:brightness-95 active:brightness-90`}
                            draggable
                            onDragStart={(e) => handleDragStart(e, appointment)}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleAppointmentClick(appointment)
                            }}
                          >
                            <span className="font-medium text-gray-900 bg-white/90 px-0.5 rounded-sm">
                              {appointment.startTime.substring(0, 5)}{" "}
                              {appointment.type === "Lunch" || appointment.type === "Block"
                                ? appointment.type
                                : appointment.patientName}
                            </span>
                          </div>
                        )
                      })}
                      {dayAppointments.length > 5 && (
                        <div className="text-xs text-gray-500 pl-1">+{dayAppointments.length - 5} more</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">Manage and schedule patient appointments</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleNewAppointment} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="mr-2 h-4 w-4" /> New Appointment
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={goToPrevious} className="border-gray-300 text-gray-700">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={goToToday} className="border-gray-300 text-gray-700">
            Today
          </Button>
          <Button variant="outline" size="icon" onClick={goToNext} className="border-gray-300 text-gray-700">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <div className="ml-2 text-lg font-medium">{formattedDate()}</div>
        </div>
        <div className="flex items-center gap-4">
          <select
            className="block rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
          >
            <option value="all">All Providers</option>
            {providers.map((provider) => (
              <option key={provider.id} value={provider.id}>
                {provider.name}
              </option>
            ))}
          </select>
          <div className="flex rounded-md border">
            <Button
              variant={currentView === "day" ? "default" : "ghost"}
              size="sm"
              className={`rounded-l-md rounded-r-none ${
                currentView === "day" ? "bg-blue-600 text-white" : "text-gray-700"
              }`}
              onClick={() => setCurrentView("day")}
            >
              <Clock className="mr-2 h-4 w-4" />
              Day
            </Button>
            <Button
              variant={currentView === "week" ? "default" : "ghost"}
              size="sm"
              className={`rounded-none border-x ${currentView === "week" ? "bg-blue-600 text-white" : "text-gray-700"}`}
              onClick={() => setCurrentView("week")}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Week
            </Button>
            <Button
              variant={currentView === "month" ? "default" : "ghost"}
              size="sm"
              className={`rounded-l-none rounded-r-md ${
                currentView === "month" ? "bg-blue-600 text-white" : "text-gray-700"
              }`}
              onClick={() => setCurrentView("month")}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Month
            </Button>
          </div>
        </div>
      </div>

      <Card className="overflow-hidden">
        {currentView === "day" && renderDayView()}
        {currentView === "week" && renderWeekView()}
        {currentView === "month" && renderMonthView()}
      </Card>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <AppointmentBookingModal
          isOpen={isBookingModalOpen}
          onClose={() => {
            setIsBookingModalOpen(false)
            setSelectedSlot(null)
          }}
          date={selectedSlot?.date || new Date()}
          time={selectedSlot?.startTime || "09:00"}
          doctor={selectedSlot?.provider || "dr-williams"}
          onBookAppointment={handleBookAppointment}
          isOptician={selectedSlot?.provider === "optician"}
        />
      )}

      {/* Appointment Details Dialog */}
      {selectedAppointment && (
        <AppointmentDetailsDialog
          isOpen={isAppointmentDetailsOpen}
          onClose={() => {
            setIsAppointmentDetailsOpen(false)
            setSelectedAppointment(null)
          }}
          appointment={selectedAppointment}
          onCheckIn={handleCheckIn}
          onComplete={handleComplete}
          onCancel={handleCancel}
          onReschedule={handleReschedule}
        />
      )}
    </div>
  )
}
