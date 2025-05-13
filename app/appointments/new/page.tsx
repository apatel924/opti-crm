import type { Metadata } from "next"
import { AppointmentForm } from "@/components/appointments/appointment-form"

export const metadata: Metadata = {
  title: "New Appointment | OptiCRM",
  description: "Schedule a new appointment",
}

export default function NewAppointmentPage({
  searchParams,
}: {
  searchParams: { patient?: string }
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Appointment</h1>
        <p className="text-muted-foreground">Schedule a new appointment for a patient</p>
      </div>

      <AppointmentForm patientId={searchParams.patient} />
    </div>
  )
}
