import { Button } from "@/components/ui/button"
import { Phone, Mail, MessageSquare, Clock, Send } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

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
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="channel" className="text-sm font-medium">
                  Communication Channel
                </label>
                <Select defaultValue="sms">
                  <SelectTrigger id="channel">
                    <SelectValue placeholder="Select channel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="portal">Patient Portal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="template" className="text-sm font-medium">
                  Template
                </label>
                <Select>
                  <SelectTrigger id="template">
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="appointment">Appointment Reminder</SelectItem>
                    <SelectItem value="order">Order Status Update</SelectItem>
                    <SelectItem value="prescription">Prescription Ready</SelectItem>
                    <SelectItem value="custom">Custom Message</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea id="message" placeholder="Type your message here..." className="min-h-[100px]" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            <Clock className="mr-2 h-4 w-4" />
            Schedule
          </Button>
          <Button>
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
