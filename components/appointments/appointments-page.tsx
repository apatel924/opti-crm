"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { addDays, format } from "date-fns"
import { providers } from "@/lib/mock-data"

export function AppointmentsPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedProvider, setSelectedProvider] = useState("all")

  const goToToday = () => setCurrentDate(new Date())
  const goToPrevious = () => setCurrentDate(addDays(currentDate, -1))
  const goToNext = () => setCurrentDate(addDays(currentDate, 1))

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
      </div>
    </div>
  )
}
