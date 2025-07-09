"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Eye, FileText, DollarSign } from "lucide-react"

const activities = [
  {
    id: "1",
    type: "appointment",
    title: "New appointment scheduled",
    description: "Sarah Johnson scheduled for Annual Exam on May 15, 2023 at 10:00 AM",
    timestamp: "10 minutes ago",
    icon: Calendar,
    user: "Sarah Johnson",
    userAvatar: "/placeholder.svg?height=32&width=32",
    priority: "normal",
  },
  {
    id: "2",
    type: "order",
    title: "Order ready for pickup",
    description: "Michael Chen's contact lenses are ready for pickup",
    timestamp: "25 minutes ago",
    icon: FileText,
    user: "Michael Chen",
    userAvatar: "/placeholder.svg?height=32&width=32",
    priority: "high",
  },
  {
    id: "3",
    type: "insurance",
    title: "Insurance verification needed",
    description: "Emily Wilson's insurance information needs verification before appointment",
    timestamp: "1 hour ago",
    icon: FileText,
    user: "Emily Wilson",
    userAvatar: "/placeholder.svg?height=32&width=32",
    priority: "high",
  },
  {
    id: "4",
    type: "message",
    title: "New message received",
    description: "Robert Garcia sent a message about his upcoming appointment",
    timestamp: "2 hours ago",
    icon: FileText,
    user: "Robert Garcia",
    userAvatar: "/placeholder.svg?height=32&width=32",
    priority: "normal",
  },
  {
    id: "5",
    type: "exam",
    title: "Exam completed",
    description: "Dr. Williams completed comprehensive exam for Jessica Martinez",
    timestamp: "3 hours ago",
    icon: FileText,
    user: "Jessica Martinez",
    userAvatar: "/placeholder.svg?height=32&width=32",
    priority: "normal",
  },
]

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-4 rounded-lg border p-3 transition-colors hover:bg-muted/50"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <activity.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium leading-none">{activity.title}</p>
                {activity.priority === "high" && <span className="flex h-2 w-2 rounded-full bg-red-500" />}
              </div>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
              <div className="flex items-center gap-2 pt-1">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-primary/10 p-1">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.user}</span>
                </div>
                <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
              </div>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <FileText className="h-4 w-4 text-primary" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
