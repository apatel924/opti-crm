"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PatientSearchDialog } from "@/components/patient-search/patient-search-dialog"
import { DollarSign, CreditCard, Receipt, User, CheckCircle, Search, Plus, FileText, Printer } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function QuickBillingPage() {
  const [selectedPatient, setSelectedPatient] = useState<{ id: string; name: string } | null>(null)
  const [paymentMethod, setPaymentMethod] = useState("credit")
  const [amount, setAmount] = useState("")
  const [paymentProcessed, setPaymentProcessed] = useState(false)
  const [receiptNumber, setReceiptNumber] = useState("")
  const [newInvoiceDialogOpen, setNewInvoiceDialogOpen] = useState(false)
  const [invoicePatient, setInvoicePatient] = useState<{ id: string; name: string } | null>(null)

  const handleProcessPayment = () => {
    setPaymentProcessed(true)
    setReceiptNumber(`R-${Math.floor(Math.random() * 100000)}`)
  }

  const handleNewPayment = () => {
    setSelectedPatient(null)
    setAmount("")
    setPaymentProcessed(false)
    setReceiptNumber("")
  }

  const handleCreateInvoice = () => {
    // In a real app, this would call an API to create the invoice
    setNewInvoiceDialogOpen(false)
    // Show success message or redirect to invoice details
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quick Billing</h1>
          <p className="text-muted-foreground">Process payments and manage billing quickly</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setNewInvoiceDialogOpen(true)}>
            <FileText className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
          <Button>
            <DollarSign className="mr-2 h-4 w-4" />
            New Payment
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Process Payment</CardTitle>
          </CardHeader>
          <CardContent>
            {paymentProcessed ? (
              <div className="space-y-6">
                <div className="rounded-lg bg-green-50 p-6 text-center dark:bg-green-900/20">
                  <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-500" />
                  <h3 className="text-xl font-medium text-green-800 dark:text-green-300">
                    Payment Processed Successfully
                  </h3>
                  <p className="mt-2 text-green-600 dark:text-green-400">Receipt #{receiptNumber} has been generated</p>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="mb-4 text-center">
                    <h4 className="text-lg font-medium">Receipt Details</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Patient:</span>
                      <span className="font-medium">{selectedPatient?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Patient ID:</span>
                      <span>{selectedPatient?.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount:</span>
                      <span className="font-medium">${amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment Method:</span>
                      <span>
                        {paymentMethod === "credit" && "Credit Card"}
                        {paymentMethod === "cash" && "Cash"}
                        {paymentMethod === "check" && "Check"}
                        {paymentMethod === "insurance" && "Insurance"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time:</span>
                      <span>{new Date().toLocaleTimeString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Receipt #:</span>
                      <span>{receiptNumber}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleNewPayment}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Payment
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Printer className="mr-2 h-4 w-4" />
                      Print Receipt
                    </Button>
                    <Button variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      Email Receipt
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Patient</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      value={selectedPatient ? selectedPatient.name : ""}
                      placeholder="Select a patient"
                      readOnly
                      className="flex-1"
                    />
                    <PatientSearchDialog
                      trigger={
                        <Button
                          type="button"
                          variant="outline"
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          <Search className="mr-2 h-4 w-4" />
                          Find Patient
                        </Button>
                      }
                      onSelect={(patient) => setSelectedPatient(patient)}
                    />
                  </div>
                </div>

                <Tabs defaultValue="payment" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="payment">Payment</TabsTrigger>
                    <TabsTrigger value="invoice">Invoice</TabsTrigger>
                  </TabsList>
                  <TabsContent value="payment" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="payment-method">Payment Method</Label>
                      <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                        <SelectTrigger id="payment-method">
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="credit">Credit Card</SelectItem>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="check">Check</SelectItem>
                          <SelectItem value="insurance">Insurance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {paymentMethod === "credit" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="card-number">Card Number</Label>
                          <Input id="card-number" placeholder="•••• •••• •••• ••••" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="•••" />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "check" && (
                      <div className="space-y-2">
                        <Label htmlFor="check-number">Check Number</Label>
                        <Input id="check-number" placeholder="Enter check number" />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="amount"
                          placeholder="0.00"
                          className="pl-9"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Payment for services..." />
                    </div>
                  </TabsContent>
                  <TabsContent value="invoice" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="invoice-number">Invoice Number</Label>
                      <Input id="invoice-number" placeholder="Enter invoice number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="invoice-amount">Amount</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="invoice-amount" placeholder="0.00" className="pl-9" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="invoice-date">Invoice Date</Label>
                        <Input id="invoice-date" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="due-date">Due Date</Label>
                        <Input id="due-date" type="date" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="invoice-description">Description</Label>
                      <Textarea id="invoice-description" placeholder="Invoice for services..." />
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-end">
                  <Button onClick={handleProcessPayment} disabled={!selectedPatient || !amount}>
                    <DollarSign className="mr-2 h-4 w-4" />
                    Process Payment
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" variant="outline">
                <Receipt className="mr-2 h-4 w-4" />
                View Recent Transactions
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <User className="mr-2 h-4 w-4" />
                Patient Balances
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <CreditCard className="mr-2 h-4 w-4" />
                Saved Payment Methods
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Generate Reports
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Today's Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Total Collected</div>
                <div className="text-2xl font-bold text-green-600">$1,245.00</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Transactions</div>
                <div className="text-2xl font-bold">12</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Outstanding Balances</div>
                <div className="text-2xl font-bold text-red-500">$3,450.00</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* New Invoice Dialog */}
      <Dialog open={newInvoiceDialogOpen} onOpenChange={setNewInvoiceDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Invoice</DialogTitle>
            <DialogDescription>Create a new invoice for a patient or organization.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Patient</Label>
              <div className="flex items-center gap-2">
                <Input
                  value={invoicePatient ? invoicePatient.name : ""}
                  placeholder="Select a patient"
                  readOnly
                  className="flex-1"
                />
                <PatientSearchDialog
                  trigger={
                    <Button
                      type="button"
                      variant="outline"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Search className="mr-2 h-4 w-4" />
                      Find Patient
                    </Button>
                  }
                  onSelect={(patient) => setInvoicePatient(patient)}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="invoice-number">Invoice Number</Label>
              <Input id="invoice-number" placeholder="Auto-generated" readOnly />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="invoice-date">Invoice Date</Label>
                <Input id="invoice-date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="due-date">Due Date</Label>
                <Input
                  id="due-date"
                  type="date"
                  defaultValue={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Line Items</Label>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-2 border-b p-3 font-medium">
                  <div className="col-span-6">Description</div>
                  <div className="col-span-2">Quantity</div>
                  <div className="col-span-2">Price</div>
                  <div className="col-span-2">Total</div>
                </div>
                <div className="grid grid-cols-12 gap-2 p-3">
                  <div className="col-span-6">
                    <Input placeholder="Item description" />
                  </div>
                  <div className="col-span-2">
                    <Input type="number" min="1" defaultValue="1" />
                  </div>
                  <div className="col-span-2">
                    <Input placeholder="0.00" />
                  </div>
                  <div className="col-span-2">
                    <Input placeholder="0.00" readOnly />
                  </div>
                </div>
                <div className="border-t p-3">
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Item
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Additional notes for the invoice" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (7%):</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-bold">
                  <span>Total:</span>
                  <span>$0.00</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewInvoiceDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateInvoice}>Create Invoice</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}