"use client"

import { useState } from "react"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const workItems = [
  {
    id: "W-10042",
    orderId: "L-10042",
    patientName: "Sarah Johnson",
    patientId: "P-10042",
    type: "Frame Selection",
    status: "Pending",
    priority: "High",
    dueDate: "05/05/2023",
    deadline: 2,
    assignedTo: "Unassigned",
    notes: "Patient needs help selecting frames that complement their face shape.",
  },
  {
    id: "W-10043",
    orderId: "L-10043",
    patientName: "Michael Chen",
    patientId: "P-10043",
    type: "Dispensing",
    status: "Ready",
    priority: "Normal",
    dueDate: "05/03/2023",
    deadline: 0,
    assignedTo: "Sarah Williams",
    notes: "Progressive lenses - first time wearer. Needs detailed instructions.",
  },
]

export function OpticianWorkQueue() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [selectedAssignee, setSelectedAssignee] = useState("all")

  const filteredWorkItems = workItems // filters will be added in a future commit

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Optician Work Queue</h1>
          <p className="text-muted-foreground">
            Manage frame selections, measurements, dispensing, and troubleshooting
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <CheckCircle className="mr-2 h-4 w-4" />
            Complete Selected
          </Button>
        </div>
      </div>
    </div>
  )
}
