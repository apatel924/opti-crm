"use client"
import { Calendar, FileText, MessageSquare, Package, CheckCircle } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"

const activities = [
  {
    id: "1",
    type: "appointment",
    title: "New appointment scheduled",
    description: "Sarah Johnson scheduled for Annual Exam on May 15, 2023 at 10:00 AM",
    timestamp: "10 minutes ago",
    icon: Calendar,
    user: "Sarah Johnson",
    priority: "normal",
  },
  {
    id: "2",
    type: "order",
    title: "Order ready for pickup",
    description: "Michael Chen's contact lenses are ready for pickup",
    timestamp: "25 minutes ago",
    icon: Package,
    user: "Michael Chen",
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
    priority: "high",
  },
  {
    id: "4",
    type: "message",
    title: "New message received",
    description: "Robert Garcia sent a message about his upcoming appointment",
    timestamp: "2 hours ago",
    icon: MessageSquare,
    user: "Robert Garcia",
    priority: "normal",
  },
  {
    id: "5",
    type: "exam",
    title: "Exam completed",
    description: "Dr. Williams completed comprehensive exam for Jessica Martinez",
    timestamp: "3 hours ago",
    icon: CheckCircle,
    user: "Jessica Martinez",
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
            className="flex items-start gap-4 rounded-lg border p-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
              <activity.icon className="h-5 w-5" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">{activity.title}</p>
                {activity.priority === "high" && (
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                )}
              </div>
              <p className="text-sm text-gray-600">{activity.description}</p>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs text-gray-500">{activity.timestamp}</span>
              </div>
            </div>
            <Button className="h-8 w-8">
              <FileText className="h-4 w-4" />
              <span className="sr-only">View details</span>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
