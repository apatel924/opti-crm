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
      </div>
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
        </DialogContent>
      </Dialog>
    </div>
  )
}
