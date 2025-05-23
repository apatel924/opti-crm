"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PatientSearchDialog } from "@/components/patient-search/patient-search-dialog"
import { User, Save, Package } from "lucide-react"

export function LabOrderForm() {
  const [selectedPatient, setSelectedPatient] = useState<{ id: string; name: string } | null>(null)
  const [orderType, setOrderType] = useState("glasses")
  const [lensType, setLensType] = useState("single")
  const [priority, setPriority] = useState("normal")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">New Lab Order</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="patient">Patient</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="patient"
                  value={selectedPatient ? selectedPatient.name : ""}
                  placeholder="Select a patient"
                  readOnly
                  className="flex-1"
                />
                <PatientSearchDialog
                  trigger={
                    <Button type="button" variant="outline">
                      <User className="mr-2 h-4 w-4" />
                      Find Patient
                    </Button>
                  }
                  onSelect={(patient) => setSelectedPatient(patient)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="order-date">Order Date</Label>
                <Input id="order-date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="required-date">Required Date</Label>
                <Input id="required-date" type="date" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rush">Rush</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="order-type">Order Type</Label>
                <Select value={orderType} onValueChange={setOrderType}>
                  <SelectTrigger id="order-type">
                    <SelectValue placeholder="Select order type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="glasses">Glasses</SelectItem>
                    <SelectItem value="contacts">Contact Lenses</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {orderType === "glasses" && (
        <Card>
          <CardHeader>
            <CardTitle>Prescription Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="lens" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="lens">Lens Details</TabsTrigger>
                <TabsTrigger value="frame">Frame Details</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
              </TabsList>
              <TabsContent value="lens" className="space-y-4 pt-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="lens-type">Lens Type</Label>
                    <Select value={lensType} onValueChange={setLensType}>
                      <SelectTrigger id="lens-type">
                        <SelectValue placeholder="Select lens type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single Vision</SelectItem>
                        <SelectItem value="bifocal">Bifocal</SelectItem>
                        <SelectItem value="progressive">Progressive</SelectItem>
                        <SelectItem value="reading">Reading</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lens-material">Lens Material</Label>
                    <Select defaultValue="plastic">
                      <SelectTrigger id="lens-material">
                        <SelectValue placeholder="Select lens material" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="plastic">Plastic CR-39</SelectItem>
                        <SelectItem value="polycarbonate">Polycarbonate</SelectItem>
                        <SelectItem value="trivex">Trivex</SelectItem>
                        <SelectItem value="high-index">High-Index 1.67</SelectItem>
                        <SelectItem value="ultra-high-index">Ultra High-Index 1.74</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-4">
                    <Label>Right Eye (OD)</Label>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="grid gap-1">
                        <Label htmlFor="od-sphere" className="text-xs">
                          Sphere
                        </Label>
                        <Input id="od-sphere" placeholder="0.00" />
                      </div>
                      <div className="grid gap-1">
                        <Label htmlFor="od-cylinder" className="text-xs">
                          Cylinder
                        </Label>
                        <Input id="od-cylinder" placeholder="0.00" />
                      </div>
                      <div className="grid gap-1">
                        <Label htmlFor="od-axis" className="text-xs">
                          Axis
                        </Label>
                        <Input id="od-axis" placeholder="0" />
                      </div>
                      <div className="grid gap-1">
                        <Label htmlFor="od-add" className="text-xs">
                          Add
                        </Label>
                        <Input id="od-add" placeholder="0.00" />
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-4">
                    <Label>Left Eye (OS)</Label>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="grid gap-1">
                        <Label htmlFor="os-sphere" className="text-xs">
                          Sphere
                        </Label>
                        <Input id="os-sphere" placeholder="0.00" />
                      </div>
                      <div className="grid gap-1">
                        <Label htmlFor="os-cylinder" className="text-xs">
                          Cylinder
                        </Label>
                        <Input id="os-cylinder" placeholder="0.00" />
                      </div>
                      <div className="grid gap-1">
                        <Label htmlFor="os-axis" className="text-xs">
                          Axis
                        </Label>
                        <Input id="os-axis" placeholder="0" />
                      </div>
                      <div className="grid gap-1">
                        <Label htmlFor="os-add" className="text-xs">
                          Add
                        </Label>
                        <Input id="os-add" placeholder="0.00" />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="pd">PD (mm)</Label>
                      <Input id="pd" placeholder="63" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="seg-height">Seg Height (mm)</Label>
                      <Input id="seg-height" placeholder="0" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lens-treatments">Lens Treatments</Label>
                    <Select defaultValue="ar">
                      <SelectTrigger id="lens-treatments">
                        <SelectValue placeholder="Select lens treatments" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ar">Anti-Reflective</SelectItem>
                        <SelectItem value="blue">Blue Light Filter</SelectItem>
                        <SelectItem value="photochromic">Photochromic</SelectItem>
                        <SelectItem value="polarized">Polarized</SelectItem>
                        <SelectItem value="scratch">Scratch Resistant</SelectItem>
                        <SelectItem value="uv">UV Protection</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="frame" className="space-y-4 pt-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="frame-brand">Frame Brand</Label>
                    <Input id="frame-brand" placeholder="e.g. Ray-Ban, Oakley" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="frame-model">Frame Model</Label>
                    <Input id="frame-model" placeholder="e.g. RB5154, OX8046" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="frame-color">Color</Label>
                      <Input id="frame-color" placeholder="e.g. Black, Tortoise" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="frame-size">Size</Label>
                      <Input id="frame-size" placeholder="e.g. 52-18-140" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="frame-shape">Shape</Label>
                      <Select defaultValue="rectangle">
                        <SelectTrigger id="frame-shape">
                          <SelectValue placeholder="Select shape" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rectangle">Rectangle</SelectItem>
                          <SelectItem value="round">Round</SelectItem>
                          <SelectItem value="square">Square</SelectItem>
                          <SelectItem value="oval">Oval</SelectItem>
                          <SelectItem value="cat-eye">Cat Eye</SelectItem>
                          <SelectItem value="aviator">Aviator</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="frame-notes">Frame Notes</Label>
                    <Textarea id="frame-notes" placeholder="Additional notes about the frame" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="pricing" className="space-y-4 pt-4">
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="frame-cost">Frame Cost</Label>
                      <Input id="frame-cost" type="number" placeholder="0.00" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="lens-cost">Lens Cost</Label>
                      <Input id="lens-cost" type="number" placeholder="0.00" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="treatments-cost">Treatments Cost</Label>
                      <Input id="treatments-cost" type="number" placeholder="0.00" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="other-cost">Other Costs</Label>
                      <Input id="other-cost" type="number" placeholder="0.00" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="total-cost">Total Cost</Label>
                    <Input id="total-cost" type="number" placeholder="0.00" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="insurance-coverage">Insurance Coverage</Label>
                    <Input id="insurance-coverage" type="number" placeholder="0.00" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="patient-responsibility">Patient Responsibility</Label>
                    <Input id="patient-responsibility" type="number" placeholder="0.00" />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {orderType === "contacts" && (
        <Card>
          <CardHeader>
            <CardTitle>Contact Lens Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="contact-brand">Brand</Label>
                <Select defaultValue="acuvue">
                  <SelectTrigger id="contact-brand">
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="acuvue">Acuvue</SelectItem>
                    <SelectItem value="air-optix">Air Optix</SelectItem>
                    <SelectItem value="biofinity">Biofinity</SelectItem>
                    <SelectItem value="dailies">Dailies</SelectItem>
                    <SelectItem value="proclear">Proclear</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-type">Type</Label>
                <Select defaultValue="daily">
                  <SelectTrigger id="contact-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily Disposable</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-4">
                  <Label>Right Eye (OD)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="grid gap-1">
                      <Label htmlFor="od-power" className="text-xs">
                        Power
                      </Label>
                      <Input id="od-power" placeholder="-0.00" />
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="od-bc" className="text-xs">
                        Base Curve
                      </Label>
                      <Input id="od-bc" placeholder="8.6" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="grid gap-1">
                      <Label htmlFor="od-dia" className="text-xs">
                        Diameter
                      </Label>
                      <Input id="od-dia" placeholder="14.2" />
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="od-cyl" className="text-xs">
                        Cylinder
                      </Label>
                      <Input id="od-cyl" placeholder="-0.00" />
                    </div>
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="od-axis" className="text-xs">
                      Axis
                    </Label>
                    <Input id="od-axis" placeholder="0" />
                  </div>
                </div>
                <div className="grid gap-4">
                  <Label>Left Eye (OS)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="grid gap-1">
                      <Label htmlFor="os-power" className="text-xs">
                        Power
                      </Label>
                      <Input id="os-power" placeholder="-0.00" />
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="os-bc" className="text-xs">
                        Base Curve
                      </Label>
                      <Input id="os-bc" placeholder="8.6" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="grid gap-1">
                      <Label htmlFor="os-dia" className="text-xs">
                        Diameter
                      </Label>
                      <Input id="os-dia" placeholder="14.2" />
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="os-cyl" className="text-xs">
                        Cylinder
                      </Label>
                      <Input id="os-cyl" placeholder="-0.00" />
                    </div>
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="os-axis" className="text-xs">
                      Axis
                    </Label>
                    <Input id="os-axis" placeholder="0" />
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-quantity">Quantity</Label>
                <Select defaultValue="annual">
                  <SelectTrigger id="contact-quantity">
                    <SelectValue placeholder="Select quantity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trial">Trial Pair</SelectItem>
                    <SelectItem value="box">1 Box</SelectItem>
                    <SelectItem value="quarterly">3 Month Supply</SelectItem>
                    <SelectItem value="biannual">6 Month Supply</SelectItem>
                    <SelectItem value="annual">Annual Supply</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-cost">Total Cost</Label>
                <Input id="contact-cost" type="number" placeholder="0.00" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-insurance">Insurance Coverage</Label>
                <Input id="contact-insurance" type="number" placeholder="0.00" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-patient">Patient Responsibility</Label>
                <Input id="contact-patient" type="number" placeholder="0.00" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="comments">Comments/Instructions</Label>
              <Textarea id="comments" placeholder="Enter any special instructions or comments for the lab" rows={4} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="assigned-to">Assigned To</Label>
              <Select defaultValue="unassigned">
                <SelectTrigger id="assigned-to">
                  <SelectValue placeholder="Select staff member" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  <SelectItem value="john">John Miller</SelectItem>
                  <SelectItem value="sarah">Sarah Williams</SelectItem>
                  <SelectItem value="michael">Michael Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <div className="flex gap-2">
            <Button variant="outline">
              <Save className="mr-2 h-4 w-4" />
              Save as Draft
            </Button>
            <Button>
              <Package className="mr-2 h-4 w-4" />
              Submit Order
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
