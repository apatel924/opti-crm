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
  const today = new Date()
  const expirationDate = new Date(insurance.expirationDate)
  const daysUntilExpiration = Math.ceil((expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

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
            {daysUntilExpiration <= 30 ? (
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                Expires in {daysUntilExpiration} days
              </Badge>
            ) : (
              <Badge variant="outline">Active</Badge>
            )}
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}
