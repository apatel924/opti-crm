"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, FileText, Download, CreditCard, CheckCircle, AlertCircle, Eye, Receipt } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PatientBillingProps {
  patient: any
}

export function PatientBilling({ patient }: PatientBillingProps) {
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)
  const [selectedBill, setSelectedBill] = useState<any>(null)

  // Calculate total balance
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
                          variant={bill.status === "Paid" ? "default" : "destructive"}
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
                          <Badge variant="default">Paid</Badge>
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

      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Make Payment</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {selectedBill && (
              <>
                <div className="grid gap-2">
                  <Label>Invoice Details</Label>
                  <div className="rounded-md border p-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm font-medium">Description:</div>
                      <div className="text-sm">{selectedBill.description}</div>
                      <div className="text-sm font-medium">Total Amount:</div>
                      <div className="text-sm">{selectedBill.total}</div>
                      <div className="text-sm font-medium">Insurance Coverage:</div>
                      <div className="text-sm">{selectedBill.insurance}</div>
                      <div className="text-sm font-medium">Patient Responsibility:</div>
                      <div className="text-sm font-medium text-red-500">{selectedBill.patient}</div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <Select defaultValue="creditCard">
                    <SelectTrigger id="paymentMethod">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="creditCard">Credit Card</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="check">Check</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" defaultValue={selectedBill.patient.replace("$", "")} />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>
              Cancel
            </Button>
            <Button>Process Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Insurance Claims</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patient.billing.map((bill: any) => (
              <div
                key={bill.id}
                className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{bill.id}</span>
                    <Badge variant={bill.status === "Paid" ? "default" : "secondary"}>
                      {bill.status === "Paid" ? "Processed" : "Pending"}
                    </Badge>
                  </div>
                  <div className="mt-1 text-sm">{bill.description}</div>
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Date:</span> {bill.date}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Insurance:</span> {bill.insurance} ({patient.insurance.primary})
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    View Claim
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export History
          </Button>
          {totalBalance > 0 && (
            <Button>
              <DollarSign className="mr-2 h-4 w-4" />
              Pay All ({`$${totalBalance.toFixed(2)}`})
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
