"use client"

import { X, Clock, Package, Glasses, User, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface LabOrderDetailsProps {
  order: {
    id: string
    patientName: string
    patientId: string
    orderDate: string
    dueDate: string
    type: string
    status: string
    progress: number
    priority: string
    assignedTo: string
    frame: string
    lens: string
    notes: string
  }
  onClose: () => void
}

export function LabOrderDetails({ order, onClose }: LabOrderDetailsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-xl">Order {order.id}</CardTitle>
          <CardDescription>
            {order.type} • Ordered on {order.orderDate}
          </CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div>
                <div className="font-medium">{order.patientName}</div>
                <div className="text-sm text-muted-foreground">{order.patientId}</div>
              </div>
            </div>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <Badge
                variant={
                  order.status === "Ready for Pickup"
                    ? "success"
                    : order.status === "In Progress"
                      ? "default"
                      : order.status === "Waiting for Materials"
                        ? "warning"
                        : order.status === "Quality Check"
                          ? "outline"
                          : "secondary"
                }
              >
                {order.status}
              </Badge>
              <Badge
                variant={
                  order.priority === "High" ? "destructive" : order.priority === "Normal" ? "default" : "secondary"
                }
              >
                {order.priority}
              </Badge>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Progress value={order.progress} className="h-2 w-40" />
              <span className="text-xs text-muted-foreground">{order.progress}%</span>
            </div>
            <div className="pt-1 text-muted-foreground">Due: {order.dueDate}</div>
          </div>
        </div>

        <Separator />

        <Tabs defaultValue="details">
          <TabsList>
            <TabsTrigger value="details">Order Details</TabsTrigger>
            <TabsTrigger value="prescription">Prescription</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Frame Details</h3>
                <div className="rounded-md border p-3">
                  <div className="text-sm">{order.frame}</div>
                  <div className="text-xs text-muted-foreground">Color: Black • Size: 52-18-140</div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Lens Details</h3>
                <div className="rounded-md border p-3">
                  <div className="text-sm">{order.lens}</div>
                  <div className="text-xs text-muted-foreground">Material: Polycarbonate • AR Coating</div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Production Information</h3>
              <div className="rounded-md border p-3">
                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Assigned To:</span>
                    <span className="text-sm">{order.assignedTo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Current Stage:</span>
                    <span className="text-sm">{order.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Estimated Completion:</span>
                    <span className="text-sm">{order.dueDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {order.notes && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Notes</h3>
                <div className="rounded-md border p-3">
                  <p className="text-sm">{order.notes}</p>
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="prescription" className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Right Eye (OD)</h3>
                <div className="rounded-md border p-3">
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
                <h3 className="text-sm font-medium">Left Eye (OS)</h3>
                <div className="rounded-md border p-3">
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
              <h3 className="text-sm font-medium">Additional Measurements</h3>
              <div className="rounded-md border p-3">
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
              <h3 className="text-sm font-medium">Prescribing Doctor</h3>
              <div className="rounded-md border p-3">
                <div className="text-sm">Dr. Williams</div>
                <div className="text-xs text-muted-foreground">Prescribed on: 04/30/2023</div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="history" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <Package className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">Order Created</div>
                  <div className="text-xs text-muted-foreground">05/01/2023 at 10:30 AM by John Smith</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
                  <Clock className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">Status Updated: Waiting for Materials</div>
                  <div className="text-xs text-muted-foreground">05/01/2023 at 2:15 PM by System</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <User className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">Assigned to John Miller</div>
                  <div className="text-xs text-muted-foreground">05/02/2023 at 9:00 AM by Sarah Williams</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                  <Glasses className="h-4 w-4 text-purple-600" />
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
      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          Print Work Order
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">
            <Clock className="mr-2 h-4 w-4" />
            Update Status
          </Button>
          <Button>
            <Glasses className="mr-2 h-4 w-4" />
            Quality Check
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
