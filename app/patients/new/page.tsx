import type { Metadata } from "next"
import { PatientForm } from "@/components/patients/patient-form"

export const metadata: Metadata = {
  title: "New Patient | OptiVue",
  description: "Create a new patient record",
}

export default function NewPatientPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Patient</h1>
        <p className="text-muted-foreground">Create a new patient record in the system</p>
      </div>

      <PatientForm />
    </div>
  )
}
