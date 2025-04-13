"use client"

import { useState } from "react"
import { CreditCard, Receipt } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye, DollarSign, CheckCircle, AlertCircle } from "lucide-react"

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
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Transactions</TabsTrigger>
          <TabsTrigger value="due">Due</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Insurance</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patient.billing.map((bill: any) => (
                    <TableRow key={bill.id}>
                      <TableCell>{bill.date}</TableCell>
                      <TableCell>{bill.description}</TableCell>
                      <TableCell>{bill.total}</TableCell>
                      <TableCell>{bill.insurance}</TableCell>
                      <TableCell>{bill.patient}</TableCell>
                      <TableCell>
                        <Badge
                          variant={bill.status === "Paid" ? "success" : "destructive"}
                          className="flex w-16 items-center justify-center gap-1"
                        >
                          {bill.status === "Paid" ? (
                            <>
                              <CheckCircle className="h-3 w-3" />
                              Paid
                            </>
                          ) : (
                            <>
                              <AlertCircle className="h-3 w-3" />
                              Due
                            </>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Button>
                          {bill.status !== "Paid" && (
                            <Button size="sm" onClick={() => handlePayment(bill)}>
                              <DollarSign className="mr-2 h-4 w-4" />
                              Pay
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="due">
          <Card>
            <CardHeader>
              <CardTitle>Outstanding Balances</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patient.billing
                  .filter((bill: any) => bill.status === "Due")
                  .map((bill: any) => (
                    <div
                      key={bill.id}
                      className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{bill.id}</span>
                          <Badge variant="destructive">Due</Badge>
                        </div>
                        <div className="mt-1 text-sm">{bill.description}</div>
                        <div className="mt-2 text-sm">
                          <span className="font-medium">Date:</span> {bill.date}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Total:</span> {bill.total} |{" "}
                          <span className="font-medium">Insurance:</span> {bill.insurance} |{" "}
                          <span className="font-medium text-red-500">Patient: {bill.patient}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                        <Button size="sm" onClick={() => handlePayment(bill)}>
                          <DollarSign className="mr-2 h-4 w-4" />
                          Pay Now
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="paid">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patient.billing
                  .filter((bill: any) => bill.status === "Paid")
                  .map((bill: any) => (
                    <div
                      key={bill.id}
                      className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{bill.id}</span>
                          <Badge variant="success">Paid</Badge>
                        </div>
                        <div className="mt-1 text-sm">{bill.description}</div>
                        <div className="mt-2 text-sm">
                          <span className="font-medium">Date:</span> {bill.date}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Total:</span> {bill.total} |{" "}
                          <span className="font-medium">Insurance:</span> {bill.insurance} |{" "}
                          <span className="font-medium">Patient: {bill.patient}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Receipt className="mr-2 h-4 w-4" />
                          Receipt
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
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