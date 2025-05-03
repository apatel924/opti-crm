"use client"
import { format } from "date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Calendar, Clock, User, MapPin } from "lucide-react"

interface AppointmentDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  appointment: any
}

export function AppointmentDetailsDialog({
  isOpen,
  onClose,
  appointment,
}: AppointmentDetailsDialogProps) {
  if (!appointment) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Appointment Details</DialogTitle>
          <DialogDescription>View appointment information</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Appointment Information</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>{format(appointment.date, "MMMM d, yyyy")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>{appointment.startTime} - {appointment.endTime}</span>
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
        </div>

        <DialogFooter>
          <button onClick={onClose}>Close</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
