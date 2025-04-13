"use client"

import { useState } from "react"
import { CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

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
      <Card>
        <CardHeader>
          <CardTitle>Account Summary</CardTitle>
          <CardDescription>Current billing status and payment history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-md border p-4">
              <div className="text-sm font-medium text-muted-foreground">Total Balance</div>
              <div className={`text-2xl font-bold ${totalBalance > 0 ? "text-red-500" : "text-green-500"}`}>
                ${totalBalance.toFixed(2)}
              </div>
            </div>
            <div className="rounded-md border p-4">
              <div className="text-sm font-medium text-muted-foreground">Last Payment</div>
              <div className="text-2xl font-bold">$30.00</div>
              <div className="text-xs text-muted-foreground">05/01/2023</div>
            </div>
            <div className="rounded-md border p-4">
              <div className="text-sm font-medium text-muted-foreground">Payment Method</div>
              <div className="text-lg font-medium">Visa •••• 4242</div>
              <div className="text-xs text-muted-foreground">Expires 12/25</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
