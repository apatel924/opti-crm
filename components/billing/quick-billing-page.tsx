"use client"

import { useState } from "react"
import { Filter, Receipt, Search, CreditCard, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const recentTransactions = [
  {
    id: "T12345",
    patient: "Sarah Johnson",
    date: "2023-04-01",
    amount: 125.0,
    type: "Payment",
    method: "Credit Card",
    status: "Completed",
  },
  {
    id: "T12346",
    patient: "Michael Smith",
    date: "2023-04-01",
    amount: 75.5,
    type: "Payment",
    method: "Cash",
    status: "Completed",
  },
  {
    id: "T12347",
    patient: "Emma Davis",
    date: "2023-04-01",
    amount: 250.0,
    type: "Invoice",
    method: "-",
    status: "Pending",
  },
  {
    id: "T12348",
    patient: "James Wilson",
    date: "2023-03-31",
    amount: 180.0,
    type: "Payment",
    method: "Insurance",
    status: "Processing",
  },
  {
    id: "T12349",
    patient: "Olivia Brown",
    date: "2023-03-31",
    amount: 95.0,
    type: "Refund",
    method: "Credit Card",
    status: "Completed",
  },
]

export function QuickBillingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)

  const patients = [
    { id: "P10042", name: "Sarah Johnson" },
    { id: "P10043", name: "Michael Smith" },
    { id: "P10044", name: "Emma Davis" },
    { id: "P10045", name: "James Wilson" },
    { id: "P10046", name: "Olivia Brown" },
  ]

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Quick Billing</h1>
          <p className="text-muted-foreground">Process payments and manage transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm">
            <Receipt className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Quick Payment</CardTitle>
            <CardDescription>Process a payment for a patient</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search patients..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {searchQuery && (
                <div className="max-h-[200px] overflow-y-auto rounded-md border">
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map((patient) => (
                      <button
                        key={patient.id}
                        className="flex w-full items-center justify-between px-4 py-2 text-left hover:bg-accent"
                        onClick={() => {
                          setSelectedPatient(patient.name)
                          setIsPaymentDialogOpen(true)
                        }}
                      >
                        <span className="font-medium">{patient.name}</span>
                        <span className="text-sm text-muted-foreground">{patient.id}</span>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-muted-foreground">No patients found</div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => setIsPaymentDialogOpen(true)}>
              <CreditCard className="mr-2 h-4 w-4" />
              Process Payment
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Today's Summary</CardTitle>
            <CardDescription>Financial overview for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Payments</span>
                <span className="font-medium text-green-600">$475.50</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Invoices</span>
                <span className="font-medium">$250.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Refunds</span>
                <span className="font-medium text-red-600">$95.00</span>
              </div>
              <div className="mt-2 border-t pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Net Total</span>
                  <span className="font-bold">$630.50</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common billing tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <Button variant="outline" className="justify-start">
                <Receipt className="mr-2 h-4 w-4" />
                Create New Invoice
              </Button>
              <Button variant="outline" className="justify-start">
                <DollarSign className="mr-2 h-4 w-4" />
                Record Insurance Payment
              </Button>
              <Button variant="outline" className="justify-start">
                <CreditCard className="mr-2 h-4 w-4" />
                Process Refund
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="recent">
        <TabsList>
          <TabsTrigger value="recent">Recent Transactions</TabsTrigger>
          <TabsTrigger value="pending">Pending Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{transaction.patient}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>{transaction.method}</TableCell>
                      <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            transaction.status === "Completed"
                              ? "success"
                              : transaction.status === "Processing"
                                ? "warning"
                                : "outline"
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">INV-12347</TableCell>
                    <TableCell>Emma Davis</TableCell>
                    <TableCell>2023-04-01</TableCell>
                    <TableCell>$250.00</TableCell>
                    <TableCell>2023-05-01</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        Process
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Process Payment</DialogTitle>
            <DialogDescription>
              {selectedPatient
                ? `Enter payment details for ${selectedPatient}`
                : "Enter payment details for the selected patient"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="payment-method">Payment Method</Label>
              <Select defaultValue="credit-card">
                <SelectTrigger id="payment-method">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit-card">Credit Card</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="insurance">Insurance</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="amount" type="number" step="0.01" min="0" className="pl-8" defaultValue="0.00" />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input id="description" placeholder="Enter payment description" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsPaymentDialogOpen(false)}>
              Process Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
