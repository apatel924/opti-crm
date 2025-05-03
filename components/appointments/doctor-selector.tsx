"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Doctor options
const doctors = [
  {
    value: "all",
    label: "All Providers",
  },
  {
    value: "dr-williams",
    label: "Dr. Williams",
  },
  {
    value: "dr-smith",
    label: "Dr. Smith",
  },
  {
    value: "dr-johnson",
    label: "Dr. Johnson",
  },
  {
    value: "optician",
    label: "Optician",
  },
]

interface DoctorSelectorProps {
  selectedDoctors: string[]
  setSelectedDoctors: (doctors: string[]) => void
}

export function DoctorSelector({ selectedDoctors, setSelectedDoctors }: DoctorSelectorProps) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (currentValue: string) => {
    if (currentValue === "all") {
      setSelectedDoctors(["all"])
      return
    }

    // If "all" is currently selected and user selects a specific doctor
    if (selectedDoctors.includes("all")) {
      setSelectedDoctors([currentValue])
      return
    }

    // Toggle selection
    if (selectedDoctors.includes(currentValue)) {
      // Don't allow deselecting the last doctor
      if (selectedDoctors.length === 1) {
        return
      }
      setSelectedDoctors(selectedDoctors.filter((value) => value !== currentValue))
    } else {
      setSelectedDoctors([...selectedDoctors, currentValue])
    }
  }

  // Format the display text based on selection
  const displayText = () => {
    if (selectedDoctors.includes("all")) {
      return "All Providers"
    }

    if (selectedDoctors.length === 1) {
      return doctors.find((doctor) => doctor.value === selectedDoctors[0])?.label
    }

    return `${selectedDoctors.length} providers selected`
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {displayText()}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search provider..." />
          <CommandList>
            <CommandEmpty>No provider found.</CommandEmpty>
            <CommandGroup>
              {doctors.map((doctor) => (
                <CommandItem
                  key={doctor.value}
                  value={doctor.value}
                  onSelect={() => {
                    handleSelect(doctor.value)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn("mr-2 h-4 w-4", selectedDoctors.includes(doctor.value) ? "opacity-100" : "opacity-0")}
                  />
                  {doctor.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
