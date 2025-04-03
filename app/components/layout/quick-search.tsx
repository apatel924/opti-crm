"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { ChevronsUpDown, Search, User } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/app/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover"
import { Badge } from "@/app/components/ui/badge"

// Sample patients data for demo
const patients = [
  {
    id: "P-10042",
    name: "Sarah Johnson",
    dob: "05/12/1981",
    age: 42,
    status: "Active",
  },
  {
    id: "P-10043",
    name: "Michael Chen",
    dob: "09/23/1995",
    age: 28,
    status: "Active",
  },
  {
    id: "P-10044",
    name: "Robert Garcia",
    dob: "11/05/1988",
    age: 35,
    status: "Active",
  },
  {
    id: "P-10045",
    name: "Emily Wilson",
    dob: "02/18/1971",
    age: 52,
    status: "Active",
  },
  {
    id: "P-10046",
    name: "Jessica Martinez",
    dob: "07/14/1992",
    age: 31,
    status: "Active",
  },
  {
    id: "P-10047",
    name: "David Thompson",
    dob: "03/30/1978",
    age: 45,
    status: "Inactive",
  },
  {
    id: "P-10048",
    name: "Jennifer Lee",
    dob: "12/05/1994",
    age: 29,
    status: "Active",
  },
]

export function QuickSearch() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const router = useRouter()

  const handlePatientSelect = (patientId: string) => {
    setOpen(false)
    router.push(`/patients/${patientId}`)
  }

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.id.toLowerCase().includes(search.toLowerCase()) ||
      patient.dob.includes(search),
  )

  const inputRef = useRef<HTMLInputElement>(null)

  // Add keyboard shortcut (Alt+S or Option+S) to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "s") {
        e.preventDefault()
        setOpen(true)
        setTimeout(() => {
          inputRef.current?.focus()
        }, 100)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[240px] justify-between text-muted-foreground"
        >
          <Search className="mr-2 h-4 w-4" />
          <span>Quick Patient Search</span>
          <span className="ml-2 rounded bg-muted px-1.5 text-xs">Alt+S</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[400px]">
        <Command>
          <CommandInput ref={inputRef} placeholder="Search patients..." value={search} onValueChange={setSearch} />
          <CommandList>
            <CommandEmpty>No patients found.</CommandEmpty>
            <CommandGroup heading="Patients">
              {filteredPatients.map((patient) => (
                <CommandItem
                  key={patient.id}
                  value={`${patient.id} ${patient.name}`}
                  onSelect={() => handlePatientSelect(patient.id)}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{patient.name}</span>
                    <span className="text-muted-foreground text-xs">
                      {patient.dob} ({patient.age}y)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Badge variant={patient.status === "Active" ? "outline" : "secondary"} className="ml-2">
                      {patient.status}
                    </Badge>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup className="border-t pt-2">
              <CommandItem
                onSelect={() => router.push("/patients/search")}
                className="justify-center text-sm font-medium"
              >
                <Search className="mr-2 h-4 w-4" />
                Advanced Search
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

