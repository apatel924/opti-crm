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
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="front-desk">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Front Desk</span>
          </div>
        </SelectItem>
        <SelectItem value="optometrist">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span>Optometrist</span>
          </div>
        </SelectItem>
        <SelectItem value="lab-tech">
          <div className="flex items-center gap-2">
            <Flask className="h-4 w-4" />
            <span>Lab Technician</span>
          </div>
        </SelectItem>
        <SelectItem value="admin">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span>Administration</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
