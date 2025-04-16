"use client"

import { useState } from "react"
import { Search, Filter, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"

const billingData = [
  {
    id: "B-10042",
    date: "05/01/2023",
    patientName: "Sarah Johnson",
    patientId: "P-10042",
    description: "Annual Eye Examination",
    type: "Exam",
    relatedId: "E-10042",
    total: "$150.00",
    insurance: "$120.00",
    patient: "$30.00",
    status: "Paid",
    paymentDate: "05/01/2023",
    paymentMethod: "Credit Card",
  },
  {
    id: "B-10043",
    date: "05/01/2023",
    patientName: "Michael Chen",
    patientId: "P-10043",
    description: "Progressive Glasses",
    type: "Lab Order",
    relatedId: "L-10042",
    total: "$450.00",
    insurance: "$360.00",
    patient: "$90.00",
    status: "Due",
    paymentDate: "",
    paymentMethod: "",
  },
]

export function BillingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const filteredBilling = billingData.filter(
    (bill) =>
      bill.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const totalDue = filteredBilling
    .filter((bill) => bill.status === "Due")
    .reduce((sum, bill) => sum + Number(bill.patient.replace("$", "")), 0)

  const totalCollected = filteredBilling
    .filter((bill) => bill.status === "Paid")
    .reduce((sum, bill) => sum + Number(bill.patient.replace("$", "")), 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
          <p className="text-muted-foreground">Manage patient billing, payments, and insurance claims</p>
        </div>
      </div>
    </div>
  )
}
