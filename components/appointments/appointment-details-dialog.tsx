"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"

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

        {/* Content will be added in next commits */}

        <DialogFooter>
          <button onClick={onClose}>Close</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
