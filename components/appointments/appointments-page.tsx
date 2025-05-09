"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { addDays, format } from "date-fns"
import { providers } from "@/lib/mock-data"

export function AppointmentsPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedProvider, setSelectedProvider] = useState("all")
  const [currentView, setCurrentView] = useState("day")

  const goToToday = () => setCurrentDate(new Date())
  const goToPrevious = () => setCurrentDate(addDays(currentDate, -1))
  const goToNext = () => setCurrentDate(addDays(currentDate, 1))

  // generate timeSlots
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

  const handleTimeSlotClick = (time: string, providerId: string) => {
    // TODO: Implement appointment creation
    console.log(`Clicked time slot ${time} for provider ${providerId}`)
  }

  // renderDayView skeleton
  const renderDayView = () => {
    const providersToShow = selectedProvider === "all" ? providers : providers.filter((p) => p.id === selectedProvider)

    return (
      <div className="grid grid-cols-[80px_1fr]">
        <div className="border-r">
          {timeSlots.map((slot) => (
            <div key={slot.time} className="h-12 text-xs text-gray-500">
              {slot.displayTime}
            </div>
          ))}
        </div>
        <div className="grid" style={{ gridTemplateColumns: `repeat(${providersToShow.length}, 1fr)` }}>
          {providersToShow.map((provider) => (
            <div key={provider.id}>
              <div className="text-center">{provider.name}</div>
              {timeSlots.map((slot) => (
                <div
                  key={`${provider.id}-${slot.time}`}
                  className="h-12 border-t border-gray-100 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleTimeSlotClick(slot.time, provider.id)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Appointments</h1>
      <p className="text-muted-foreground">Manage and schedule patient appointments</p>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={goToPrevious}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" onClick={goToToday}>
          Today
        </Button>
        <Button variant="outline" size="icon" onClick={goToNext}>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <div className="ml-2 text-lg font-medium">{format(currentDate, "EEEE, MMMM d, yyyy")}</div>
        <select
          className="block rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm"
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
            onClick={() => setCurrentView("day")}
          >
            <Clock className="mr-2 h-4 w-4" />
            Day
          </Button>
          <Button
            variant={currentView === "week" ? "default" : "ghost"}
            size="sm"
            onClick={() => setCurrentView("week")}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Week
          </Button>
          <Button
            variant={currentView === "month" ? "default" : "ghost"}
            size="sm"
            onClick={() => setCurrentView("month")}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Month
          </Button>
        </div>
      </div>
      <Card className="overflow-hidden">
        {currentView === "day" && renderDayView()}
        {currentView === "week" && <div>Week View Placeholder</div>}
        {currentView === "month" && <div>Month View Placeholder</div>}
      </Card>
    </div>
  )
}
