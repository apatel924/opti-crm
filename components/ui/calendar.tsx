"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface CalendarProps {
  mode?: "single" | "range" | "multiple"
  selected?: Date | Date[] | undefined
  onSelect?: (date: Date | undefined) => void
  disabled?: boolean
  initialFocus?: boolean
  className?: string
}

export function Calendar({
  mode = "single",
  selected,
  onSelect,
  disabled = false,
  initialFocus = false,
  className,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(selected instanceof Date ? selected : new Date())

  const days = React.useMemo(() => {
    const start = startOfMonth(currentMonth)
    const end = endOfMonth(currentMonth)
    return eachDayOfInterval({ start, end })
  }, [currentMonth])

  // Get day names for the header
  const dayNames = React.useMemo(() => {
    const date = new Date()
    const dayNames = []
    for (let i = 0; i < 7; i++) {
      date.setDate(date.getDate() - date.getDay() + i)
      dayNames.push(format(date, "EEE"))
    }
    return dayNames
  }, [])

  // Handle date selection
  const handleDateSelect = (day: Date) => {
    if (disabled) return
    onSelect?.(day)
  }

  // Check if a date is selected
  const isDateSelected = (day: Date) => {
    if (!selected) return false
    if (selected instanceof Date) {
      return isSameDay(day, selected)
    }
    return false
  }

  return (
    <div className={cn("p-3", className)}>
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          disabled={disabled}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="font-medium">{format(currentMonth, "MMMM yyyy")}</div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          disabled={disabled}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-muted-foreground">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() }).map(
          (_, i) => (
            <div key={`empty-${i}`} className="h-9" />
          ),
        )}
        {days.map((day) => {
          const isSelected = isDateSelected(day)
          const isCurrentMonth = isSameMonth(day, currentMonth)
          const isCurrentDay = isToday(day)

          return (
            <Button
              key={day.toString()}
              variant="ghost"
              size="icon"
              className={cn(
                "h-9 w-9 p-0 font-normal",
                isSelected && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                !isSelected && isCurrentDay && "border border-primary",
                !isCurrentMonth && "text-muted-foreground opacity-50",
              )}
              disabled={disabled || !isCurrentMonth}
              onClick={() => handleDateSelect(day)}
            >
              {format(day, "d")}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
