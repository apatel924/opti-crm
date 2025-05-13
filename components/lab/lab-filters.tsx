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

export function LabFilters() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined)

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
              <Label htmlFor="orderType">Order Type</Label>
              <Select onValueChange={(value) => addFilter(`Type: ${value}`)}>
                <SelectTrigger id="orderType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single Vision">Single Vision</SelectItem>
                  <SelectItem value="Progressive">Progressive</SelectItem>
                  <SelectItem value="Bifocal">Bifocal</SelectItem>
                  <SelectItem value="Contact Lenses">Contact Lenses</SelectItem>
                  <SelectItem value="Sunglasses">Sunglasses</SelectItem>
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
                  <SelectItem value="Ordered">Ordered</SelectItem>
                  <SelectItem value="Waiting for Materials">Waiting for Materials</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Quality Check">Quality Check</SelectItem>
                  <SelectItem value="Ready for Pickup">Ready for Pickup</SelectItem>
                  <SelectItem value="Dispensed">Dispensed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select onValueChange={(value) => addFilter(`Priority: ${value}`)}>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Due Date</Label>
              <DatePicker
                date={dueDate}
                setDate={(newDate) => {
                  setDueDate(newDate)
                  if (newDate) {
                    const formattedDate = newDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                    addFilter(`Due Date: ${formattedDate}`)
                  }
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Additional Filters</Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="overdue"
                  onCheckedChange={(checked) => {
                    if (checked) addFilter("Overdue")
                    else removeFilter("Overdue")
                  }}
                />
                <label
                  htmlFor="overdue"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Overdue
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="unassigned"
                  onCheckedChange={(checked) => {
                    if (checked) addFilter("Unassigned")
                    else removeFilter("Unassigned")
                  }}
                />
                <label
                  htmlFor="unassigned"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Unassigned
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rush"
                  onCheckedChange={(checked) => {
                    if (checked) addFilter("Rush Orders")
                    else removeFilter("Rush Orders")
                  }}
                />
                <label
                  htmlFor="rush"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Rush Orders
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="warranty"
                  onCheckedChange={(checked) => {
                    if (checked) addFilter("Warranty Work")
                    else removeFilter("Warranty Work")
                  }}
                />
                <label
                  htmlFor="warranty"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Warranty Work
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedFilters([])
                setDueDate(undefined)
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
