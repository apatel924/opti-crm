"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Mail, Phone, Send, Clock } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PatientCommunicationProps {
  patient: any
}

export function PatientCommunication({ patient }: PatientCommunicationProps) {
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

      <div className="space-y-4">
        <h4 className="font-medium">Communication History</h4>
        {patient.communications.map((communication: any) => (
          <Card key={communication.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">{communication.subject}</CardTitle>
                  <CardDescription>{communication.date}</CardDescription>
                </div>
                <Badge variant="outline">{communication.type}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{communication.content}</p>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">Sent by: {communication.sentBy}</CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
