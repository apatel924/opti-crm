import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function PatientSearchDialog() {
    const [isOpen, setIsOpen] = useState(false)
  
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="bg-white shadow-sm hover:bg-gray-100">
            <Search className="mr-2 h-4 w-4" />
            Find Patient
          </Button>
        </DialogTrigger>
  
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Find Patient</DialogTitle>
            <DialogDescription>Search for a patient by name, ID, or phone number</DialogDescription>
          </DialogHeader>

        </DialogContent>
      </Dialog>
    )
  }
  