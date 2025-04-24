"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea" // Assuming Textarea is imported from the correct path
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MoreHorizontal, Eye, FileText, Clipboard, DollarSign, Glasses, Package } from "lucide-react"

interface PatientOrdersTabProps {
  patient: any
}

function NewGlassesOrderDialog({ patient }: { patient: any }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Glasses className="mr-2 h-4 w-4" />
          New Glasses Order
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[750px]">
        <DialogHeader>
          <DialogTitle>New Glasses Order</DialogTitle>
          <DialogDescription>
            Create a new glasses order for {patient.name} ({patient.id})
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="orderType">Order Type</Label>
              <Select defaultValue="single">
                <SelectTrigger id="orderType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single Vision</SelectItem>
                  <SelectItem value="bifocal">Bifocal</SelectItem>
                  <SelectItem value="progressive">Progressive</SelectItem>
                  <SelectItem value="reading">Reading Glasses</SelectItem>
                  <SelectItem value="sunglasses">Sunglasses</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select defaultValue="normal">
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="rush">Rush</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border p-4">
            <h4 className="mb-4 font-medium">Frame Information</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="frameManufacturer">Manufacturer</Label>
                <Input id="frameManufacturer" placeholder="e.g., Ray-Ban, Oakley" />
              </div>
              <div>
                <Label htmlFor="frameModel">Model</Label>
                <Input id="frameModel" placeholder="e.g., RB5154, OX8046" />
              </div>
              <div>
                <Label htmlFor="frameColor">Color</Label>
                <Input id="frameColor" placeholder="e.g., Black, Tortoise" />
              </div>
              <div>
                <Label htmlFor="frameSize">Size</Label>
                <Input id="frameSize" placeholder="e.g., 52-18-140" />
              </div>
              <div>
                <Label htmlFor="frameSource">Frame Source</Label>
                <Select defaultValue="stock">
                  <SelectTrigger id="frameSource">
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stock">Stock</SelectItem>
                    <SelectItem value="order">Order from Manufacturer</SelectItem>
                    <SelectItem value="patient">Patient's Own Frame</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="frameCost">Frame Cost</Label>
                <Input id="frameCost" placeholder="Enter cost" type="number" step="0.01" />
              </div>
            </div>
          </div>
          <div className="rounded-md border p-4">
            <h4 className="mb-4 font-medium">Prescription Information</h4>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Right Eye (OD)</Label>
                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <Label htmlFor="odSphere" className="text-xs">Sphere</Label>
                    <Input id="odSphere" defaultValue={patient.visionHistory?.currentRx?.rightEye?.sphere || ""} />
                  </div>
                  <div>
                    <Label htmlFor="odCylinder" className="text-xs">Cylinder</Label>
                    <Input id="odCylinder" defaultValue={patient.visionHistory?.currentRx?.rightEye?.cylinder || ""} />
                  </div>
                  <div>
                    <Label htmlFor="odAxis" className="text-xs">Axis</Label>
                    <Input id="odAxis" defaultValue={patient.visionHistory?.currentRx?.rightEye?.axis || ""} />
                  </div>
                  <div>
                    <Label htmlFor="odAdd" className="text-xs">Add</Label>
                    <Input id="odAdd" defaultValue={patient.visionHistory?.currentRx?.rightEye?.add || ""} />
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Left Eye (OS)</Label>
                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <Label htmlFor="osSphere" className="text-xs">Sphere</Label>
                    <Input id="osSphere" defaultValue={patient.visionHistory?.currentRx?.leftEye?.sphere || ""} />
                  </div>
                  <div>
                    <Label htmlFor="osCylinder" className="text-xs">Cylinder</Label>
                    <Input id="osCylinder" defaultValue={patient.visionHistory?.currentRx?.leftEye?.cylinder || ""} />
                  </div>
                  <div>
                    <Label htmlFor="osAxis" className="text-xs">Axis</Label>
                    <Input id="osAxis" defaultValue={patient.visionHistory?.currentRx?.leftEye?.axis || ""} />
                  </div>
                  <div>
                    <Label htmlFor="osAdd" className="text-xs">Add</Label>
                    <Input id="osAdd" defaultValue={patient.visionHistory?.currentRx?.leftEye?.add || ""} />
                  </div>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <h4 className="mb-4 font-medium">Pricing & Insurance</h4>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <Label htmlFor="clRetailPrice">Retail Price</Label>
                    <Input id="clRetailPrice" placeholder="Enter retail price" type="number" step="0.01" />
                  </div>
                  <div>
                    <Label htmlFor="clInsuranceCoverage">Insurance Coverage</Label>
                    <Input id="clInsuranceCoverage" placeholder="Enter coverage amount" type="number" step="0.01" />
                  </div>
                  <div>
                    <Label htmlFor="clPatientResponsibility">Patient Responsibility</Label>
                    <Input id="clPatientResponsibility" placeholder="Enter amount" type="number" step="0.01" />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="clNotes">Additional Notes</Label>
                <Textarea id="clNotes" placeholder="Enter any special instructions or notes for this order" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pd">PD (mm)</Label>
                  <Input id="pd" defaultValue={patient.visionHistory?.currentRx?.pd || ""} />
                </div>
                <div>
                  <Label htmlFor="segHeight">Seg Height (mm)</Label>
                  <Input id="segHeight" placeholder="Enter seg height" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-md border p-4">
            <h4 className="mb-4 font-medium">Measurements</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="monoRE">Mono PD - Right Eye</Label>
                <Input id="monoRE" placeholder="Enter in mm" />
              </div>
              <div>
                <Label htmlFor="monoLE">Mono PD - Left Eye</Label>
                <Input id="monoLE" placeholder="Enter in mm" />
              </div>
              <div>
                <Label htmlFor="vertexDistance">Vertex Distance</Label>
                <Input id="vertexDistance" placeholder="Enter in mm" />
              </div>
              <div>
                <Label htmlFor="pantoscopicTilt">Pantoscopic Tilt</Label>
                <Input id="pantoscopicTilt" placeholder="Enter in degrees" />
              </div>
              <div>
                <Label htmlFor="wrapAngle">Wrap Angle</Label>
                <Input id="wrapAngle" placeholder="Enter in degrees" />
              </div>
              <div>
                <Label htmlFor="backVertexPower">Back Vertex Power</Label>
                <Input id="backVertexPower" placeholder="Enter value" />
              </div>
            </div>
          </div>
          <div className="rounded-md border p-4">
            <h4 className="mb-4 font-medium">Pricing & Insurance</h4>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="retailPrice">Retail Price</Label>
                <Input id="retailPrice" placeholder="Enter retail price" type="number" step="0.01" />
              </div>
              <div>
                <Label htmlFor="insuranceCoverage">Insurance Coverage</Label>
                <Input id="insuranceCoverage" placeholder="Enter coverage amount" type="number" step="0.01" />
              </div>
              <div>
                <Label htmlFor="patientResponsibility">Patient Responsibility</Label>
                <Input id="patientResponsibility" placeholder="Enter amount" type="number" step="0.01" />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Create Order</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
function NewContactLensOrderDialog({ patient }: { patient: any }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Package className="mr-2 h-4 w-4" />
          New Contact Lens Order
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>New Contact Lens Order</DialogTitle>
          <DialogDescription>
            Create a new contact lens order for {patient.name} ({patient.id})
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="orderType">Order Type</Label>
              <Select defaultValue="disposable">
                <SelectTrigger id="orderType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="disposable">Disposable</SelectItem>
                  <SelectItem value="daily">Daily Disposable</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="rgp">Rigid Gas Permeable</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="supplyDuration">Supply Duration</Label>
              <Select defaultValue="6month">
                <SelectTrigger id="supplyDuration">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3month">3 Months</SelectItem>
                  <SelectItem value="6month">6 Months</SelectItem>
                  <SelectItem value="12month">12 Months (Annual)</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="rounded-md border p-4">
            <h4 className="mb-4 font-medium">Right Eye (OD)</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="odBrand">Brand</Label>
                <Select defaultValue="acuvue">
                  <SelectTrigger id="odBrand">
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="acuvue">Acuvue</SelectItem>
                    <SelectItem value="biofinity">Biofinity</SelectItem>
                    <SelectItem value="airoptix">Air Optix</SelectItem>
                    <SelectItem value="dailies">Dailies</SelectItem>
                    <SelectItem value="oasys">Acuvue Oasys</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="odProduct">Product Name</Label>
                <Input id="odProduct" placeholder="e.g., Oasys for Astigmatism" />
              </div>
              <div>
                <Label htmlFor="odPower">Power</Label>
                <Input id="odPower" placeholder="e.g., -3.00" />
              </div>
              <div>
                <Label htmlFor="odBC">Base Curve</Label>
                <Input id="odBC" placeholder="e.g., 8.4" />
              </div>
              <div>
                <Label htmlFor="odDIA">Diameter</Label>
                <Input id="odDIA" placeholder="e.g., 14.0" />
              </div>
              <div>
                <Label htmlFor="odCYL">Cylinder (if applicable)</Label>
                <Input id="odCYL" placeholder="e.g., -1.25" />
              </div>
              <div>
                <Label htmlFor="odAXIS">Axis (if applicable)</Label>
                <Input id="odAXIS" placeholder="e.g., 180" />
              </div>
              <div>
                <Label htmlFor="odQuantity">Quantity</Label>
                <Input id="odQuantity" placeholder="e.g., 6" type="number" />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Create Order</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export function PatientOrdersTab({ patient }: PatientOrdersTabProps) {
  const [activeTab, setActiveTab] = useState("all")
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Orders & Purchases</h3>
        <div className="flex gap-2">
          <NewGlassesOrderDialog patient={patient} />
          <NewContactLensOrderDialog patient={patient} />
        </div>
      </div>
      <Tabs defaultValue="all" onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="glasses">Glasses</TabsTrigger>
          <TabsTrigger value="contacts">Contact Lenses</TabsTrigger>
          <TabsTrigger value="accessories">Accessories</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="space-y-4">
            {patient.orders.map((order: any) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="glasses" className="space-y-4">
          <div className="space-y-4">
            {patient.orders
              .filter((order: any) => order.type.includes("Glasses"))
              .map((order: any) => (
                <OrderCard key={order.id} order={order} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="contacts" className="space-y-4">
          <div className="space-y-4">
            {patient.orders
              .filter((order: any) => order.type.includes("Contact"))
              .map((order: any) => (
                <OrderCard key={order.id} order={order} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="accessories" className="space-y-4">
          <div className="space-y-4">
            {patient.orders
              .filter((order: any) => order.type.includes("Accessory"))
              .map((order: any) => (
                <OrderCard key={order.id} order={order} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
function OrderCard({ order }: { order: any }) {
  return (
    <Card key={order.id}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{order.type}</CardTitle>
            <CardDescription>{order.date}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant={
                order.status === "Dispensed"
                  ? "success"
                  : order.status === "Ready for Pickup"
                  ? "success"
                  : order.status === "In Progress"
                  ? "default"
                  : "secondary"
              }
            >
              {order.status}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  Print Receipt
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Clipboard className="mr-2 h-4 w-4" />
                  Copy Order Info
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500">Cancel Order</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="mb-2 text-sm font-medium">Order Details</h4>
            <p className="text-sm">{order.details}</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <h4 className="text-sm font-medium">Price</h4>
              <p className="text-sm">{order.price}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Insurance</h4>
              <p className="text-sm">{order.insurance}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Balance</h4>
              <p className={`text-sm ${Number(order.balance.replace("$", "")) > 0 ? "text-red-500 font-medium" : ""}`}>
                {order.balance}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm">
          <span className="font-medium">Order ID:</span> {order.id}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
          {Number(order.balance.replace("$", "")) > 0 ? (
            <Button size="sm">
              <DollarSign className="mr-2 h-4 w-4" />
              Pay Balance
            </Button>
          ) : (
            <Button size="sm">
              <FileText className="mr-2 h-4 w-4" />
              View Receipt
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
