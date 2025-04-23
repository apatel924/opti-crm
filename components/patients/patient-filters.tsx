"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

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
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0"
                  onClick={() => removeFilter(filter)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {filter} filter</span>
                </Button>
              </Badge>
            ))}
            {selectedFilters.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={() => setSelectedFilters([])}
              >
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
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
