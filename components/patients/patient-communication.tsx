import { Button } from "@/components/ui/button"
import { Phone, Mail, MessageSquare } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export function PatientCommunication({ patient }: { patient: any }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Communication Log</h3>
        <div className="flex gap-2">
          <Button variant="outline">
            <Phone className="mr-2 h-4 w-4" />
            Call
          </Button>
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Email
          </Button>
          <Button>
            <MessageSquare className="mr-2 h-4 w-4" />
            Text Message
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>New Message</CardTitle>
          <CardDescription>Send a message to the patient</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4"></div>
        </CardContent>
        <CardFooter className="flex justify-between">
        </CardFooter>
      </Card>
    </div>
  )
}
