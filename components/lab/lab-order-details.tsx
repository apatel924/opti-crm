"use client"

import { useState } from "react"
import {
  X,
  Clock,
  Package,
  Glasses,
  User,
  FileText,
  Calendar,
  CheckCircle,
  AlertCircle,
  Truck,
  Printer,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface LabOrderDetailsProps {
  order: {
    id: string
    patient: string
    patientId: string
    type: string
    status: string
    priority: string
    dateOrdered: string
    dateReceived: string | null
    lab: string
    progress: number
    dueDate: string
    assignedTo: string
    frame: string
    lens: string
    notes: string
  }
  onClose: () => void
}

export function LabOrderDetails({ order, onClose }: LabOrderDetailsProps) {
  const [status, setStatus] = useState(order.status)
  const [notes, setNotes] = useState(order.notes)
  const [assignedTo, setAssignedTo] = useState(order.assignedTo)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready for Pickup":
        return "border-green-500 bg-green-100 text-green-800"
      case "Delayed":
        return "border-rose-500 bg-rose-100 text-rose-800"
      case "In Progress":
        return "border-amber-500 bg-amber-100 text-amber-800"
      case "Delivered":
        return "border-ghibli-green bg-ghibli-green-light/20 text-ghibli-green"
      default:
        return "border-ghibli-blue bg-ghibli-blue-light/20 text-ghibli-blue"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Rush":
        return "border-rose-500 bg-rose-100 text-rose-800"
      case "High":
        return "border-amber-500 bg-amber-100 text-amber-800"
      default:
        return "border-ghibli-blue bg-ghibli-blue-light/20 text-ghibli-blue"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Ready for Pickup":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "Delayed":
        return <AlertCircle className="h-5 w-5 text-rose-600" />
      case "In Progress":
        return <Clock className="h-5 w-5 text-amber-600" />
      case "Delivered":
        return <Truck className="h-5 w-5 text-ghibli-green" />
      default:
        return <Package className="h-5 w-5 text-ghibli-blue" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-ghibli-blue-light/20 p-2">
            {order.type.includes("Contact") ? (
              <Package className="h-6 w-6 text-ghibli-blue" />
            ) : (
              <Glasses className="h-6 w-6 text-ghibli-blue" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-ghibli-blue">{order.id}</h2>
            <p className="text-muted-foreground">
              {order.type} • Ordered on {order.dateOrdered}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-ghibli-blue-light/20">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="ghibli-card border-ghibli-blue-light md:col-span-2">
          <CardHeader className="bg-ghibli-blue-light/20 pb-2">
            <CardTitle className="text-lg text-ghibli-blue">Order Information</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div>
                    <div className="font-medium">{order.patient}</div>
                    <div className="text-sm text-muted-foreground">{order.patientId}</div>
                  </div>
                </div>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getStatusColor(status)}>
                    <span className="flex items-center gap-1">
                      {getStatusIcon(status)}
                      {status}
                    </span>
                  </Badge>
                  <Badge variant="outline" className={getPriorityColor(order.priority)}>
                    {order.priority}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <Progress value={order.progress} className="h-2 w-40" />
                  <span className="text-xs text-muted-foreground">{order.progress}%</span>
                </div>
                <div className="pt-1 flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  Due: {order.dueDate}
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3 rounded-xl bg-ghibli-cream">
                <TabsTrigger
                  value="details"
                  className="rounded-lg data-[state=active]:bg-ghibli-blue data-[state=active]:text-white"
                >
                  Order Details
                </TabsTrigger>
                <TabsTrigger
                  value="prescription"
                  className="rounded-lg data-[state=active]:bg-ghibli-blue data-[state=active]:text-white"
                >
                  Prescription
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="rounded-lg data-[state=active]:bg-ghibli-blue data-[state=active]:text-white"
                >
                  History
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4 pt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-ghibli-blue">Frame Details</h3>
                    <div className="rounded-md border border-ghibli-blue-light/50 bg-ghibli-blue-light/10 p-3">
                      <div className="text-sm">{order.frame}</div>
                      <div className="text-xs text-muted-foreground">Color: Black • Size: 52-18-140</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-ghibli-blue">Lens Details</h3>
                    <div className="rounded-md border border-ghibli-blue-light/50 bg-ghibli-blue-light/10 p-3">
                      <div className="text-sm">{order.lens}</div>
                      <div className="text-xs text-muted-foreground">Material: Polycarbonate • AR Coating</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-ghibli-blue">Production Information</h3>
                  <div className="rounded-md border border-ghibli-blue-light/50 bg-ghibli-blue-light/10 p-3">
                    <div className="grid gap-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Assigned To:</span>
                        <span className="text-sm">{assignedTo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Current Stage:</span>
                        <span className="text-sm">{status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Estimated Completion:</span>
                        <span className="text-sm">{order.dueDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Lab:</span>
                        <span className="text-sm">{order.lab}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {notes && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-ghibli-blue">Notes</h3>
                    <div className="rounded-md border border-ghibli-blue-light/50 bg-ghibli-blue-light/10 p-3">
                      <p className="text-sm">{notes}</p>
                    </div>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="prescription" className="space-y-4 pt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-ghibli-blue">Right Eye (OD)</h3>
                    <div className="rounded-md border border-ghibli-blue-light/50 bg-ghibli-blue-light/10 p-3">
                      <div className="grid grid-cols-4 gap-2 text-sm">
                        <div className="font-medium">SPH</div>
                        <div className="font-medium">CYL</div>
                        <div className="font-medium">AXIS</div>
                        <div className="font-medium">ADD</div>
                        <div>-2.00</div>
                        <div>-0.75</div>
                        <div>180</div>
                        <div>+2.00</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-ghibli-blue">Left Eye (OS)</h3>
                    <div className="rounded-md border border-ghibli-blue-light/50 bg-ghibli-blue-light/10 p-3">
                      <div className="grid grid-cols-4 gap-2 text-sm">
                        <div className="font-medium">SPH</div>
                        <div className="font-medium">CYL</div>
                        <div className="font-medium">AXIS</div>
                        <div className="font-medium">ADD</div>
                        <div>-1.75</div>
                        <div>-0.50</div>
                        <div>175</div>
                        <div>+2.00</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-ghibli-blue">Additional Measurements</h3>
                  <div className="rounded-md border border-ghibli-blue-light/50 bg-ghibli-blue-light/10 p-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium">PD (mm)</div>
                        <div>63</div>
                      </div>
                      <div>
                        <div className="font-medium">Seg Height (mm)</div>
                        <div>18</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-ghibli-blue">Prescribing Doctor</h3>
                  <div className="rounded-md border border-ghibli-blue-light/50 bg-ghibli-blue-light/10 p-3">
                    <div className="text-sm">Dr. Williams</div>
                    <div className="text-xs text-muted-foreground">Prescribed on: 04/30/2023</div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="history" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ghibli-blue-light/30">
                      <Package className="h-4 w-4 text-ghibli-blue" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Order Created</div>
                      <div className="text-xs text-muted-foreground">05/01/2023 at 10:30 AM by John Smith</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ghibli-yellow-light/30">
                      <Clock className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Status Updated: Waiting for Materials</div>
                      <div className="text-xs text-muted-foreground">05/01/2023 at 2:15 PM by System</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ghibli-green-light/30">
                      <User className="h-4 w-4 text-ghibli-green" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Assigned to John Miller</div>
                      <div className="text-xs text-muted-foreground">05/02/2023 at 9:00 AM by Sarah Williams</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ghibli-pink-light/30">
                      <Glasses className="h-4 w-4 text-rose-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Status Updated: In Progress</div>
                      <div className="text-xs text-muted-foreground">05/02/2023 at 10:45 AM by John Miller</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="ghibli-card border-ghibli-blue-light">
          <CardHeader className="bg-ghibli-blue-light/20 pb-2">
            <CardTitle className="text-lg text-ghibli-blue">Update Order</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-ghibli-blue">Status</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="ghibli-input">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ordered">Ordered</SelectItem>
                  <SelectItem value="Waiting for Materials">Waiting for Materials</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Quality Check">Quality Check</SelectItem>
                  <SelectItem value="Ready for Pickup">Ready for Pickup</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Delayed">Delayed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-ghibli-blue">Assigned To</label>
              <Select value={assignedTo} onValueChange={setAssignedTo}>
                <SelectTrigger className="ghibli-input">
                  <SelectValue placeholder="Select staff member" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Unassigned">Unassigned</SelectItem>
                  <SelectItem value="John Miller">John Miller</SelectItem>
                  <SelectItem value="Sarah Williams">Sarah Williams</SelectItem>
                  <SelectItem value="Michael Johnson">Michael Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-ghibli-blue">Notes</label>
              <Textarea
                className="ghibli-input min-h-[100px]"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about this order..."
              />
            </div>

            <Button className="w-full bg-ghibli-blue hover:bg-ghibli-blue/90">Update Order</Button>

            <div className="pt-4">
              <div className="rounded-md border border-ghibli-blue-light/50 bg-ghibli-blue-light/10 p-3">
                <h4 className="text-sm font-medium text-ghibli-blue mb-2">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    <Printer className="mr-1 h-3 w-3" />
                    Print Work Order
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    <FileText className="mr-1 h-3 w-3" />
                    Print Receipt
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    <User className="mr-1 h-3 w-3" />
                    Contact Patient
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    <Truck className="mr-1 h-3 w-3" />
                    Contact Lab
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
