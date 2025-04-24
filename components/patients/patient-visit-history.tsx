"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Eye, FileText } from "lucide-react"

interface PatientVisitHistoryProps {
  patient: any
}

export function PatientVisitHistory({ patient }: PatientVisitHistoryProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Visit History</h3>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Visit
        </Button>
      </div>

      <div className="space-y-4">
        {patient.visits.map((visit: any) => (
          <Card key={visit.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{visit.type}</CardTitle>
                  <CardDescription>
                    {visit.date} • {visit.doctor}
                  </CardDescription>
                </div>
                <Badge variant="outline">{visit.id}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-sm font-medium">Reason for Visit</h4>
                  <p className="text-sm">{visit.reason}</p>
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-medium">Diagnosis</h4>
                  <p className="text-sm">{visit.diagnosis}</p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="mb-2 text-sm font-medium">Notes</h4>
                  <p className="text-sm">{visit.notes}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm">
                <span className="font-medium">Follow-up:</span> {visit.followUp}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Button>
                <Button size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  View Report
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
