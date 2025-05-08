"use client"

import { useState } from "react"

export function AppointmentsPage() {
  const [currentDate, setCurrentDate] = useState(new Date())

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Appointments</h1>
      <p className="text-muted-foreground">Manage and schedule patient appointments</p>
    </div>
  )
}
