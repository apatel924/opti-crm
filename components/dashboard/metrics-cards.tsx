"use client"

import { Calendar, Clock, DollarSign, Eye, FileText, Users, AlertCircle, CheckCircle } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"

interface MetricsCardsProps {
  role: string
}

export function MetricsCards({ role }: MetricsCardsProps) {
  // Different metrics based on role
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
        link: "/appointments",
      },
      {
        title: "Waiting Patients",
        value: "3",
        description: "Currently in office",
        icon: Clock,
        change: "",
        changeType: "neutral",
        color: "yellow",
        link: "/examinations?filter=waiting",
      },
      {
        title: "Orders Ready",
        value: "7",
        description: "For pickup",
        icon: CheckCircle,
        change: "+2 new today",
        changeType: "positive",
        color: "green",
        link: "/lab",
      },
      {
        title: "Quick Billing",
        value: "5",
        description: "Pending collection",
        icon: FileText,
        change: "-2 from yesterday",
        changeType: "negative",
        color: "pink",
        link: "/quick-billing",
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
        link: "/appointments",
      },
      {
        title: "Patients Seen",
        value: "5",
        description: "Today",
        icon: Eye,
        change: "42% of schedule",
        changeType: "neutral",
        color: "green",
        link: "/examinations?filter=completed",
      },
      {
        title: "Next Patient",
        value: "John D.",
        description: "Waiting for 5 min",
        icon: Users,
        change: "Annual exam",
        changeType: "neutral",
        color: "yellow",
        link: "/patients/P-10042",
      },
      {
        title: "Prescriptions",
        value: "8",
        description: "Written today",
        icon: FileText,
        change: "+3 from yesterday",
        changeType: "positive",
        color: "pink",
        link: "/examinations?filter=completed",
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
        link: "/lab",
      },
      {
        title: "Orders Completed",
        value: "8",
        description: "Today",
        icon: CheckCircle,
        change: "35% of daily goal",
        changeType: "neutral",
        color: "green",
        link: "/lab?filter=completed",
      },
      {
        title: "Quality Checks",
        value: "6",
        description: "Pending review",
        icon: Eye,
        change: "",
        changeType: "neutral",
        color: "blue",
        link: "/lab?filter=quality-check",
      },
      {
        title: "Low Stock Items",
        value: "3",
        description: "Need reordering",
        icon: AlertCircle,
        change: "Critical: 1",
        changeType: "negative",
        color: "pink",
        link: "/inventory?filter=low-stock",
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
        link: "/quick-billing",
      },
      {
        title: "Quick Billing",
        value: "18",
        description: "Pending submission",
        icon: FileText,
        change: "",
        changeType: "neutral",
        color: "blue",
        link: "/quick-billing",
      },
      {
        title: "Patient Visits",
        value: "24",
        description: "Today's total",
        icon: Users,
        change: "85% show rate",
        changeType: "positive",
        color: "yellow",
        link: "/patients",
      },
      {
        title: "Outstanding Balances",
        value: "$12,450",
        description: "Total receivables",
        icon: AlertCircle,
        change: "+$850 from last week",
        changeType: "negative",
        color: "pink",
        link: "/quick-billing?filter=outstanding",
      },
    ],
  }

  const currentMetrics = metrics[role as keyof typeof metrics] || metrics["front-desk"]

  return (
    <>
      {currentMetrics.map((metric, index) => (
        <Link href={metric.link} key={index} className="block">
          <Card
            className={`shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 border-ghibli-${metric.color}-light bg-white/90`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <h3 className={`text-sm font-medium text-ghibli-${metric.color}`}>{metric.title}</h3>
                <div className={`rounded-full p-2 bg-ghibli-${metric.color}-light`}>
                  <metric.icon className={`h-4 w-4 text-ghibli-${metric.color}`} />
                </div>
              </div>
              <div className="mt-3">
                <div className={`text-2xl font-bold text-ghibli-${metric.color}`}>{metric.value}</div>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </div>
            </CardContent>
            {metric.change && (
              <CardFooter className="p-2 px-6">
                <p
                  className={`text-xs ${
                    metric.changeType === "positive"
                      ? "text-ghibli-green"
                      : metric.changeType === "negative"
                        ? "text-ghibli-pink"
                        : "text-muted-foreground"
                  }`}
                >
                  {metric.change}
                </p>
              </CardFooter>
            )}
          </Card>
        </Link>
      ))}
    </>
  )
}
