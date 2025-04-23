"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, FileText, Calendar, AlertTriangle } from "lucide-react"

interface PatientInsuranceProps {
  patient: any
}

export function PatientInsurance({ patient }: PatientInsuranceProps) {
  const insurance = patient.insurance

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Insurance Information</h3>
        <Button variant="outline">
          <Edit className="mr-2 h-4 w-4" />
          Update Insurance
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{insurance.primary}</CardTitle>
              <CardDescription>Primary Insurance</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}
