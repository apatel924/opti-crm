"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { DatePicker } from "@/components/ui/date-picker"

export function ExaminationFilters() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [date, setDate] = useState<Date | undefined>(undefined)

  const addFilter = (filter: string) => {
    if (!selectedFilters.includes(filter)) {
      setSelectedFilters([...selectedFilters, filter])
    }
  }

  const removeFilter = (filter: string) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter))
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {selectedFilters.map((filter) => (
              <Badge key={filter} variant="secondary" className="gap-1">
                {filter}
                <Button variant="ghost" size="icon" className="h-4 w-4 p-0" onClick={() => removeFilter(filter)}>
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {filter} filter</span>
                </Button>
              </Badge>
            ))}
            {selectedFilters.length > 0 && (
              <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setSelectedFilters([])}>
                Clear all
              </Button>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="examType">Exam Type</Label>
              <Select onValueChange={(value) => addFilter(`Type: ${value}`)}>
                <SelectTrigger id="examType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Annual Exam">Annual Exam</SelectItem>
                  <SelectItem value="Comprehensive Exam">Comprehensive Exam</SelectItem>
                  <SelectItem value="Contact Lens Fitting">Contact Lens Fitting</SelectItem>
                  <SelectItem value="Follow-up">Follow-up</SelectItem>
                  <SelectItem value="Emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="doctor">Doctor</Label>
              <Select onValueChange={(value) => addFilter(`Doctor: ${value}`)}>
                <SelectTrigger id="doctor">
                  <SelectValue placeholder="Select doctor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dr. Williams">Dr. Williams</SelectItem>
                  <SelectItem value="Dr. Smith">Dr. Smith</SelectItem>
                  <SelectItem value="Dr. Johnson">Dr. Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select onValueChange={(value) => addFilter(`Status: ${value}`)}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="Waiting">Waiting</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Date</Label>
              <DatePicker
                date={date}
                setDate={(newDate) => {
                  setDate(newDate)
                  if (newDate) {
                    const formattedDate = newDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                    addFilter(`Date: ${formattedDate}`)
                  }
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Workflow Status</Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pretesting"
                  onCheckedChange={(checked) => {
                    if (checked) addFilter("Pre-Testing: Completed")
                    else removeFilter("Pre-Testing: Completed")
                  }}
                />
                <label
                  htmlFor="pretesting"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Pre-Testing Complete
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="exam"
                  onCheckedChange={(checked) => {
                    if (checked) addFilter("Exam: Completed")
                    else removeFilter("Exam: Completed")
                  }}
                />
                <label
                  htmlFor="exam"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Exam Complete
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="prescription"
                  onCheckedChange={(checked) => {
                    if (checked) addFilter("Prescription: Issued")
                    else removeFilter("Prescription: Issued")
                  }}
                />
                <label
                  htmlFor="prescription"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Prescription Issued
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="order"
                  onCheckedChange={(checked) => {
                    if (checked) addFilter("Order: Created")
                    else removeFilter("Order: Created")
                  }}
                />
                <label
                  htmlFor="order"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Order Created
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedFilters([])
                setDate(undefined)
              }}
            >
              Reset
            </Button>
            <Button>Apply Filters</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

