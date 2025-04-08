"use client"

import { Calendar, Clock, DollarSign, Eye, FileText, Users, AlertCircle, CheckCircle } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface MetricsCardsProps {
  role: string
}

export function MetricsCards({ role }: MetricsCardsProps) {
  const metrics = {
    "front-desk": [
      {
        title: "Total Appointments",
        value: "24",
        description: "Today's schedule",
        icon: Calendar,
        change: "+2 from yesterday",
        changeType: "positive",
        color: "blue",
      },
      {
        title: "Waiting Patients",
        value: "3",
        description: "Currently in office",
        icon: Clock,
        change: "",
        changeType: "neutral",
        color: "yellow",
      },
      {
        title: "Orders Ready",
        value: "7",
        description: "For pickup",
        icon: CheckCircle,
        change: "+2 new today",
        changeType: "positive",
        color: "green",
      },
      {
        title: "Quick Billing",
        value: "5",
        description: "Pending collection",
        icon: FileText,
        change: "-2 from yesterday",
        changeType: "negative",
        color: "pink",
      },
    ],
    optometrist: [
      {
        title: "My Appointments",
        value: "12",
        description: "Today's schedule",
        icon: Calendar,
        change: "",
        changeType: "neutral",
        color: "blue",
      },
      {
        title: "Patients Seen",
        value: "5",
        description: "Today",
        icon: Eye,
        change: "42% of schedule",
        changeType: "neutral",
        color: "green",
      },
      {
        title: "Next Patient",
        value: "John D.",
        description: "Waiting for 5 min",
        icon: Users,
        change: "Annual exam",
        changeType: "neutral",
        color: "yellow",
      },
      {
        title: "Prescriptions",
        value: "8",
        description: "Written today",
        icon: FileText,
        change: "+3 from yesterday",
        changeType: "positive",
        color: "pink",
      },
    ],
    "lab-tech": [
      {
        title: "Orders in Queue",
        value: "15",
        description: "Pending processing",
        icon: Clock,
        change: "+2 from yesterday",
        changeType: "negative",
        color: "yellow",
      },
      {
        title: "Orders Completed",
        value: "8",
        description: "Today",
        icon: CheckCircle,
        change: "35% of daily goal",
        changeType: "neutral",
        color: "green",
      },
      {
        title: "Quality Checks",
        value: "6",
        description: "Pending review",
        icon: Eye,
        change: "",
        changeType: "neutral",
        color: "blue",
      },
      {
        title: "Low Stock Items",
        value: "3",
        description: "Need reordering",
        icon: AlertCircle,
        change: "Critical: 1",
        changeType: "negative",
        color: "pink",
      },
    ],
    admin: [
      {
        title: "Daily Revenue",
        value: "$3,240",
        description: "Today's sales",
        icon: DollarSign,
        change: "+12% from yesterday",
        changeType: "positive",
        color: "green",
      },
      {
        title: "Quick Billing",
        value: "18",
        description: "Pending submission",
        icon: FileText,
        change: "",
        changeType: "neutral",
        color: "blue",
      },
      {
        title: "Patient Visits",
        value: "24",
        description: "Today's total",
        icon: Users,
        change: "85% show rate",
        changeType: "positive",
        color: "yellow",
      },
      {
        title: "Outstanding Balances",
        value: "$12,450",
        description: "Total receivables",
        icon: AlertCircle,
        change: "+$850 from last week",
        changeType: "negative",
        color: "pink",
      },
    ],
  }

  const currentMetrics = metrics[role as keyof typeof metrics] || metrics["front-desk"]

  return (
    <>
      {currentMetrics.map((metric, index) => (
        <Card key={index}>
          <CardContent>
            <div>
              <h3>{metric.title}</h3>
              <div>
                <metric.icon />
              </div>
            </div>
            <div>
              <div>{metric.value}</div>
              <p>{metric.description}</p>
            </div>
          </CardContent>
          {metric.change && (
            <CardFooter>
              <p>{metric.change}</p>
            </CardFooter>
          )}
        </Card>
      ))}
    </>
  )
}
