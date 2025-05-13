import { PatientProfilePage } from "@/components/patients/patient-profile-page"

export default function PatientProfile({ params }: { params: { id: string } }) {
  return <PatientProfilePage patientId={params.id} />
}
