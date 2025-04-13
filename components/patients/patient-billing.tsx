"use client"

import { useState } from "react"
import { CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PatientBillingProps {
  patient: any
}

export function PatientBilling({ patient }: PatientBillingProps) {
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)
  const [selectedBill, setSelectedBill] = useState<any>(null)

  const totalBalance = patient.billing
    .filter((bill: any) => bill.status !== "Paid")
    .reduce((total: number, bill: any) => total + Number(bill.patient.replace("$", "")), 0)

  const handlePayment = (bill: any) => {
    setSelectedBill(bill)
    setPaymentDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Billing & Payments</h3>
        <Button>
          <CreditCard className="mr-2 h-4 w-4" />
          Make Payment
        </Button>
      </div>
    </div>
  )
}
