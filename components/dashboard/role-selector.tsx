"use client"

import { Eye, FlaskRoundIcon as Flask, DollarSign, Users } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RoleSelectorProps {
  value: string
  onValueChange: (value: string) => void
}

export function RoleSelector({ value, onValueChange }: RoleSelectorProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="front-desk">
          <Users className="h-4 w-4" />
          <span>Front Desk</span>
        </SelectItem>
        <SelectItem value="optometrist">
          <Eye className="h-4 w-4" />
          <span>Optometrist</span>
        </SelectItem>
        <SelectItem value="lab-tech">
          <Flask className="h-4 w-4" />
          <span>Lab Technician</span>
        </SelectItem>
        <SelectItem value="admin">
          <DollarSign className="h-4 w-4" />
          <span>Administration</span>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
