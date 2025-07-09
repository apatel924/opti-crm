"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search } from "lucide-react"
import { PatientSearchDialog } from "@/components/patient-search/patient-search-dialog"

export function NewBillingDialog() {
  const [open, setOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)
  const [selectedExam, setSelectedExam] = useState<string | null>(null)
  const [selectedLabOrder, setSelectedLabOrder] = useState<string | null>(null)

  // Sample data
  const exams = [
    { id: "E-10042", type: "Annual Exam", date: "05/01/2023", cost: "$150.00" },
    { id: "E-10043", type: "Contact Lens Fitting", date: "05/01/2023", cost: "$75.00" },
    { id: "E-10044", type: "Follow-up", date: "04/30/2023", cost: "$75.00" },
  ]

  const labOrders = [
    { id: "L-10042", type: "Progressive Glasses", date: "05/01/2023", cost: "$450.00" },
    { id: "L-10043", type: "Contact Lenses", date: "05/01/2023", cost: "$320.00" },
    { id: "L-10044", type: "Bifocal Glasses", date: "04/30/2023", cost: "$380.00" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Billing
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Billing</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="patient">Patient</Label>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger id="patient">
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="P-10042">Sarah Johnson (P-10042)</SelectItem>
                    <SelectItem value="P-10043">Michael Chen (P-10043)</SelectItem>
                    <SelectItem value="P-10044">Robert Garcia (P-10044)</SelectItem>
                  </SelectContent>
                </Select>
                <PatientSearchDialog
                  trigger={
                    <Button variant="outline" type="button">
                      <Search className="mr-2 h-4 w-4" />
                      Find
                    </Button>
                  }
                />
              </div>
            </div>

            <Tabs defaultValue="exam">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="exam">Eye Exam</TabsTrigger>
                <TabsTrigger value="lab">Lab Order</TabsTrigger>
                <TabsTrigger value="custom">Custom</TabsTrigger>
              </TabsList>

              <TabsContent value="exam" className="space-y-4 pt-4">
                <div className="grid gap-2">
                  <Label>Select Exam</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select exam" />
                    </SelectTrigger>
                    <SelectContent>
                      {exams.map((exam) => (
                        <SelectItem key={exam.id} value={exam.id}>
                          {exam.id} - {exam.type} ({exam.date}) - {exam.cost}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="examTotal">Total Amount</Label>
                    <Input id="examTotal" defaultValue="$150.00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="examInsurance">Insurance Coverage</Label>
                    <Input id="examInsurance" defaultValue="$120.00" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="examPatient">Patient Responsibility</Label>
                  <Input id="examPatient" defaultValue="$30.00" />
                </div>
              </TabsContent>

              <TabsContent value="lab" className="space-y-4 pt-4">
                <div className="grid gap-2">
                  <Label>Select Lab Order</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select lab order" />
                    </SelectTrigger>
                    <SelectContent>
                      {labOrders.map((order) => (
                        <SelectItem key={order.id} value={order.id}>
                          {order.id} - {order.type} ({order.date}) - {order.cost}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="labTotal">Total Amount</Label>
                    <Input id="labTotal" defaultValue="$450.00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="labInsurance">Insurance Coverage</Label>
                    <Input id="labInsurance" defaultValue="$360.00" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="labPatient">Patient Responsibility</Label>
                  <Input id="labPatient" defaultValue="$90.00" />
                </div>
              </TabsContent>

              <TabsContent value="custom" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" placeholder="Enter description" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customTotal">Total Amount</Label>
                    <Input id="customTotal" placeholder="Enter total amount" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customInsurance">Insurance Coverage</Label>
                    <Input id="customInsurance" placeholder="Enter insurance coverage" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customPatient">Patient Responsibility</Label>
                  <Input id="customPatient" placeholder="Enter patient responsibility" />
                </div>
              </TabsContent>
            </Tabs>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Enter any additional notes" />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Billing</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
