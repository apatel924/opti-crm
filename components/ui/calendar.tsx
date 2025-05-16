"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { format, addMonths, subMonths, isToday, isSameDay } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export type CalendarProps = {
  mode?: "single" | "range" | "multiple"
  selected?: Date | Date[] | undefined
  onSelect?: (date: Date | undefined) => void
  disabled?: boolean
  className?: string
  initialFocus?: boolean
}

export function Calendar({
  mode = "single",
  selected,
  onSelect,
  disabled = false,
  className,
  initialFocus = false,
}: CalendarProps) {
  const [viewDate, setViewDate] = React.useState(new Date())

  // Handle selection
  const handleSelect = (day: number) => {
    if (disabled) return

    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day)
    onSelect?.(newDate)
  }

  // Navigate to previous month
  const previousMonth = () => {
    setViewDate(subMonths(viewDate, 1))
  }

  // Navigate to next month
  const nextMonth = () => {
    setViewDate(addMonths(viewDate, 1))
  }

  // Generate calendar grid
  const generateCalendarGrid = () => {
    const year = viewDate.getFullYear()
    const month = viewDate.getMonth()

    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, month, 1).getDay()

    // Generate days of the week
    const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

    // Generate calendar grid
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-9 w-9" />)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const isSelectedDate = selected instanceof Date && isSameDay(date, selected)

      days.push(
        <Button
          key={`day-${day}`}
          type="button"
          onClick={() => handleSelect(day)}
          className={cn(
            "h-9 w-9 p-0 font-normal",
            isToday(date) && "bg-accent text-accent-foreground",
            isSelectedDate && "bg-primary text-primary-foreground",
            !isToday(date) && !isSelectedDate && "hover:bg-accent hover:text-accent-foreground",
          )}
          disabled={disabled}
        >
          {day}
        </Button>,
      )
    }

    return (
      <>
        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          {weekdays.map((day) => (
            <div key={day} className="h-9 w-9 text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}
          {days}
        </div>
      </>
    )
  }

  return (
    <div className={cn("p-3", className)}>
      <div className="flex items-center justify-between">
        <Button
          type="button"
          onClick={previousMonth}
          variant="outline"
          className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          disabled={disabled}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous month</span>
        </Button>
        <div className="font-medium">{format(viewDate, "MMMM yyyy")}</div>
        <Button
          type="button"
          onClick={nextMonth}
          variant="outline"
          className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          disabled={disabled}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next month</span>
        </Button>
      </div>
      <div className="mt-4">{generateCalendarGrid()}</div>
    </div>
  )
}
