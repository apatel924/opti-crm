"use client"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, User, Phone, Mail, AlertCircle, CheckCircle, X } from "lucide-react"
import { mockPatients } from "@/lib/mock-data"

interface AppointmentDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  appointment: any
  onCheckIn: (appointmentId: string) => void
  onComplete: (appointmentId: string) => void
  onCancel: (appointmentId: string) => void
  onReschedule: (appointmentId: string) => void
}

export function AppointmentDetailsDialog({
  isOpen,
  onClose,
  appointment,
  onCheckIn,
  onComplete,
  onCancel,
  onReschedule,
}: AppointmentDetailsDialogProps) {
  if (!appointment) return null

  // Find patient details
  const patient = mockPatients.find((p) => p.id === appointment.patientId)

  // Format appointment time
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours, 10)
    const ampm = hour >= 12 ? "PM" : "AM"
    const hour12 = hour % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
  }

  // Get appointment type description based on appointment type
  const getAppointmentTypeDescription = (type: string) => {
    switch (type) {
      case "Annual Exam":
        return "Complete eye examination including vision, eye health, and prescription check"
      case "Contact Lens Fitting":
        return "Specialized exam for fitting or updating contact lens prescription"
      case "Follow-up":
        return "Brief appointment to check progress after treatment or procedure"
      case "Emergency":
        return "Urgent care for eye injury, pain, or sudden vision changes"
      case "Glaucoma Check":
        return "Specialized testing for glaucoma monitoring and management"
      case "Pediatric Exam":
        return "Comprehensive eye exam tailored for children"
      case "LASIK Consultation":
        return "Evaluation for laser vision correction candidacy"
      case "Retinal Imaging":
        return "Detailed imaging of the back of the eye to assess retinal health"
      case "Optical Services":
        return "Eyeglasses selection, fitting, and adjustments"
      default:
        return "Standard eye care appointment"
    }
  }

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Checked In":
        return <Badge className="bg-amber-500 text-white">Checked In</Badge>
      case "Completed":
        return <Badge className="bg-green-500 text-white">Completed</Badge>
      case "Cancelled":
        return <Badge className="bg-red-500 text-white">Cancelled</Badge>
      case "Block":
        return (
          <Badge variant="outline" className="border-gray-400 text-gray-600">
            Block
          </Badge>
        )
      default:
        return <Badge className="bg-blue-500 text-white">Scheduled</Badge>
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[550px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Appointment Details</span>
            {getStatusBadge(appointment.status)}
          </DialogTitle>
          <DialogDescription>
            {appointment.type === "Lunch" || appointment.type === "Block"
              ? "Time block details"
              : "Patient appointment information"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Appointment Info */}
          <div className="space-y-2">
            <h3 className="font-medium text-gray-900">Appointment Information</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>{format(appointment.date, "MMMM d, yyyy")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>
                  {formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span>{appointment.providerName}</span>
              </div>
              {appointment.room && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{appointment.room}</span>
                </div>
              )}
            </div>
          </div>

          {/* Appointment Type */}
          {appointment.type && appointment.type !== "Lunch" && appointment.type !== "Block" && (
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Visit Type: {appointment.type}</h3>
              <div className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                {getAppointmentTypeDescription(appointment.type)}
              </div>
            </div>
          )}

          {/* Patient Info - only show if not a block appointment */}
          {appointment.patientId && patient && (
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Patient Information</h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span>{patient.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>
                    {patient.dob} ({patient.age})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{patient.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{patient.email}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          {appointment.type !== "Lunch" && appointment.type !== "Block" && (
            <>
              {appointment.status !== "Checked In" && appointment.status !== "Completed" && (
                <Button
                  variant="outline"
                  className="border-amber-500 text-amber-600 hover:bg-amber-50 bg-amber-50/50"
                  onClick={() => onCheckIn(appointment.id)}
                >
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Check In
                </Button>
              )}
              {appointment.status !== "Completed" && (
                <Button
                  variant="outline"
                  className="border-green-500 text-green-600 hover:bg-green-50 bg-green-50/50"
                  onClick={() => onComplete(appointment.id)}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Complete
                </Button>
              )}
              <Button
                variant="outline"
                className="bg-gray-50 border-gray-300 text-gray-700"
                onClick={() => onReschedule(appointment.id)}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Reschedule
              </Button>
              <Button
                variant="outline"
                className="border-red-500 text-red-600 hover:bg-red-50 bg-red-50/50"
                onClick={() => onCancel(appointment.id)}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </>
          )}
          <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
