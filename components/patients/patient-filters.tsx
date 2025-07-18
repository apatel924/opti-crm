"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export function PatientFilters() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

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
              <Label htmlFor="insurance">Insurance</Label>
              <Select onValueChange={(value) => addFilter(`Insurance: ${value}`)}>
                <SelectTrigger id="insurance">
                  <SelectValue placeholder="Select insurance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Blue Cross">Blue Cross</SelectItem>
                  <SelectItem value="Aetna">Aetna</SelectItem>
                  <SelectItem value="Medicare">Medicare</SelectItem>
                  <SelectItem value="United Healthcare">United Healthcare</SelectItem>
                  <SelectItem value="Cigna">Cigna</SelectItem>
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
              <Label htmlFor="balance">Balance</Label>
              <Select onValueChange={(value) => addFilter(`Balance: ${value}`)}>
                <SelectTrigger id="balance">
                  <SelectValue placeholder="Select balance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Any Balance">Any Balance</SelectItem>
                  <SelectItem value="No Balance">No Balance</SelectItem>
                  <SelectItem value="Balance Due">Balance Due</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastVisit">Last Visit</Label>
              <Select onValueChange={(value) => addFilter(`Last Visit: ${value}`)}>
                <SelectTrigger id="lastVisit">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Last 30 Days">Last 30 Days</SelectItem>
                  <SelectItem value="Last 90 Days">Last 90 Days</SelectItem>
                  <SelectItem value="Last Year">Last Year</SelectItem>
                  <SelectItem value="Over a Year">Over a Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Medical Conditions</Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="diabetes"
                  onCheckedChange={(checked) => {
                    if (checked) addFilter("Condition: Diabetes")
                    else removeFilter("Condition: Diabetes")
                  }}
                />
                <label
                  htmlFor="diabetes"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Diabetes
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="glaucoma"
                  onCheckedChange={(checked) => {
                    if (checked) addFilter("Condition: Glaucoma")
                    else removeFilter("Condition: Glaucoma")
                  }}
                />
                <label
                  htmlFor="glaucoma"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Glaucoma
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cataracts"
                  onCheckedChange={(checked) => {
                    if (checked) addFilter("Condition: Cataracts")
                    else removeFilter("Condition: Cataracts")
                  }}
                />
                <label
                  htmlFor="cataracts"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Cataracts
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hypertension"
                  onCheckedChange={(checked) => {
                    if (checked) addFilter("Condition: Hypertension")
                    else removeFilter("Condition: Hypertension")
                  }}
                />
                <label
                  htmlFor="hypertension"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Hypertension
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setSelectedFilters([])}>
              Reset
            </Button>
            <Button>Apply Filters</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
