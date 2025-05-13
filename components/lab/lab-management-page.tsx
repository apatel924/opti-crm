"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter as FilterIcon, Plus, Clock, Eye, Glasses, Package } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { PatientSearchDialog } from "@/components/patient-search/patient-search-dialog"
import { LabOrderDetails } from "@/components/lab/lab-order-details"

// Mock data for lab orders
const labOrders = [
  {
    id: "LO-10001",
    patient: "Sarah Johnson",
    patientId: "P-10042",
    type: "Single Vision",
    status: "Ready for Pickup",
    priority: "Normal",
    dateOrdered: "2023-04-01",
    dateReceived: "2023-04-05",
    lab: "Vision Labs",
    progress: 100,
    dueDate: "2023-04-10",
    assignedTo: "John Miller",
    frame: "Ray-Ban RB5154",
    lens: "Essilor Single Vision",
    notes: "Patient prefers lightweight frames. Previous issues with progressive adaptation.",
  },
  {
    id: "LO-10002",
    patient: "Michael Chen",
    patientId: "P-10043",
    type: "Progressive",
    status: "In Progress",
    priority: "Rush",
    dateOrdered: "2023-04-02",
    dateReceived: null,
    lab: "EyeTech Optical",
    progress: 65,
    dueDate: "2023-04-08",
    assignedTo: "Sarah Williams",
    frame: "Oakley OX8046",
    lens: "Varilux Progressive",
    notes: "Rush order - patient needs glasses for upcoming trip",
  },
  {
    id: "LO-10003",
    patient: "Robert Garcia",
    patientId: "P-10044",
    type: "Bifocal",
    status: "Ordered",
    priority: "Normal",
    dateOrdered: "2023-04-03",
    dateReceived: null,
    lab: "Vision Labs",
    progress: 25,
    dueDate: "2023-04-15",
    assignedTo: "Unassigned",
    frame: "Warby Parker Harper",
    lens: "Zeiss Bifocal",
    notes: "",
  },
  {
    id: "LO-10004",
    patient: "Emily Wilson",
    patientId: "P-10045",
    type: "Contact Lenses",
    status: "Delayed",
    priority: "High",
    dateOrdered: "2023-03-28",
    dateReceived: null,
    lab: "ContactPro",
    progress: 40,
    dueDate: "2023-04-05",
    assignedTo: "John Miller",
    frame: "N/A",
    lens: "Acuvue Oasys for Astigmatism",
    notes: "Delayed due to backorder from manufacturer",
  },
  {
    id: "LO-10005",
    patient: "David Smith",
    patientId: "P-10046",
    type: "Single Vision",
    status: "Delivered",
    priority: "Normal",
    dateOrdered: "2023-03-25",
    dateReceived: "2023-03-30",
    lab: "EyeTech Optical",
    progress: 100,
    dueDate: "2023-04-01",
    assignedTo: "Sarah Williams",
    frame: "Tom Ford FT5634-B",
    lens: "Hoya Single Vision",
    notes: "",
  },
]

export function LabManagementPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<(typeof labOrders)[0] | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [patientSearchOpen, setPatientSearchOpen] = useState(false)

  // Filter lab orders based on search query and filters
  const filteredOrders = labOrders.filter((order) => {
    const matchesSearch =
      order.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.patientId.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesPriority = priorityFilter === "all" || order.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleViewDetails = (order: (typeof labOrders)[0]) => {
    setSelectedOrder(order)
    setDetailsOpen(true)
  }

  const handlePatientSelect = (patient: { id: string; name: string }) => {
    // Navigate to patient's order page
    router.push(`/patients/${patient.id}?tab=orders`)
  }

  return (
    <div className="space-y-6">
      {/* Decorative clouds for Ghibli style */}
      <div className="ghibli-cloud ghibli-cloud-1"></div>
      <div className="ghibli-cloud ghibli-cloud-2"></div>
      <div className="ghibli-cloud ghibli-cloud-3"></div>

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ghibli-blue">Lab Management</h1>
          <p className="text-muted-foreground">Track and manage lab orders for glasses and contact lenses</p>
        </div>
        <div className="flex gap-2">
          <PatientSearchDialog
            trigger={
              <Button className="bg-ghibli-blue hover:bg-ghibli-blue/90">
                <Plus className="mr-2 h-4 w-4" />
                New Lab Order
              </Button>
            }
            onSelect={handlePatientSelect}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="ghibli-card overflow-hidden border-ghibli-blue-light">
          <CardHeader className="bg-ghibli-blue-light/30 pb-2">
            <CardTitle className="text-lg text-ghibli-blue">All Orders</CardTitle>
            <CardDescription>Total lab orders</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-bold text-ghibli-blue">{labOrders.length}</div>
          </CardContent>
        </Card>
        <Card className="ghibli-card overflow-hidden border-ghibli-green-light">
          <CardHeader className="bg-ghibli-green-light/30 pb-2">
            <CardTitle className="text-lg text-ghibli-green">In Progress</CardTitle>
            <CardDescription>Orders being processed</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-bold text-ghibli-green">
              {labOrders.filter((o) => o.status === "In Progress").length}
            </div>
          </CardContent>
        </Card>
        <Card className="ghibli-card overflow-hidden border-ghibli-yellow-light">
          <CardHeader className="bg-ghibli-yellow-light/30 pb-2">
            <CardTitle className="text-lg text-amber-600">Ready for Pickup</CardTitle>
            <CardDescription>Orders ready for patients</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-bold text-amber-600">
              {labOrders.filter((o) => o.status === "Ready for Pickup").length}
            </div>
          </CardContent>
        </Card>
        <Card className="ghibli-card overflow-hidden border-ghibli-pink-light">
          <CardHeader className="bg-ghibli-pink-light/30 pb-2">
            <CardTitle className="text-lg text-rose-500">Delayed</CardTitle>
            <CardDescription>Orders with issues</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-bold text-rose-500">
              {labOrders.filter((o) => o.status === "Delayed").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="ghibli-card border-ghibli-blue-light">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search orders by ID, patient name, or patient ID..."
                  className="ghibli-input pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <div className="w-[180px]">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="ghibli-input">
                      <FilterIcon className="mr-2 h-4 w-4" />
                      <span>Status</span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Ordered">Ordered</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Ready for Pickup">Ready for Pickup</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Delayed">Delayed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-[180px]">
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="ghibli-input">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>Priority</span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Rush">Rush</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-xl bg-ghibli-cream">
            <TabsTrigger
              value="active"
              className="rounded-lg data-[state=active]:bg-ghibli-blue data-[state=active]:text-white"
            >
              Active Orders
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="rounded-lg data-[state=active]:bg-ghibli-green data-[state=active]:text-white"
            >
              Completed Orders
            </TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="mt-4">
            <Card className="ghibli-card border-ghibli-blue-light overflow-hidden">
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-ghibli-blue-light/20">
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders
                      .filter((order) => order.status !== "Delivered")
                      .map((order) => (
                        <TableRow
                          key={order.id}
                          className="cursor-pointer hover:bg-ghibli-cream/30"
                          onClick={() => handleViewDetails(order)}
                        >
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div>
                                <div>{order.patient}</div>
                                <div className="text-xs text-muted-foreground">{order.patientId}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {order.type === "Single Vision" && (
                              <div className="flex items-center">
                                <Glasses className="mr-1 h-4 w-4 text-ghibli-blue" />
                                {order.type}
                              </div>
                            )}
                            {order.type === "Progressive" && (
                              <div className="flex items-center">
                                <Glasses className="mr-1 h-4 w-4 text-ghibli-green" />
                                {order.type}
                              </div>
                            )}
                            {order.type === "Bifocal" && (
                              <div className="flex items-center">
                                <Glasses className="mr-1 h-4 w-4 text-amber-600" />
                                {order.type}
                              </div>
                            )}
                            {order.type === "Contact Lenses" && (
                              <div className="flex items-center">
                                <Package className="mr-1 h-4 w-4 text-ghibli-blue" />
                                {order.type}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                order.status === "Ready for Pickup"
                                  ? "border-green-500 bg-green-100 text-green-800"
                                  : order.status === "Delayed"
                                    ? "border-rose-500 bg-rose-100 text-rose-800"
                                    : order.status === "In Progress"
                                      ? "border-amber-500 bg-amber-100 text-amber-800"
                                      : "border-ghibli-blue bg-ghibli-blue-light/20 text-ghibli-blue"
                              }
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                order.priority === "Rush"
                                  ? "border-rose-500 bg-rose-100 text-rose-800"
                                  : order.priority === "High"
                                    ? "border-amber-500 bg-amber-100 text-amber-800"
                                    : "border-ghibli-blue bg-ghibli-blue-light/20 text-ghibli-blue"
                              }
                            >
                              {order.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>{order.dueDate}</TableCell>
                          <TableCell>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                              <div
                                className={`h-2.5 rounded-full ${
                                  order.progress >= 100
                                    ? "bg-green-500"
                                    : order.progress > 60
                                      ? "bg-ghibli-blue"
                                      : order.progress > 30
                                        ? "bg-amber-500"
                                        : "bg-rose-500"
                                }`}
                                style={{ width: `${order.progress}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-right mt-1">{order.progress}%</div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="ghibli-button"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleViewDetails(order)
                              }}
                            >
                              <Eye className="h-4 w-4 text-ghibli-blue" />
                              <span className="sr-only">View details</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    {filteredOrders.filter((order) => order.status !== "Delivered").length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <Package className="h-8 w-8 mb-2" />
                            <p>No active orders found.</p>
                            <Button
                              variant="link"
                              className="mt-2 text-ghibli-blue"
                              onClick={() => setPatientSearchOpen(true)}
                            >
                              Create a new order
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="completed" className="mt-4">
            <Card className="ghibli-card border-ghibli-green-light overflow-hidden">
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-ghibli-green-light/20">
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date Ordered</TableHead>
                      <TableHead>Date Delivered</TableHead>
                      <TableHead>Lab</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders
                      .filter((order) => order.status === "Delivered")
                      .map((order) => (
                        <TableRow
                          key={order.id}
                          className="cursor-pointer hover:bg-ghibli-cream/30"
                          onClick={() => handleViewDetails(order)}
                        >
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div>
                                <div>{order.patient}</div>
                                <div className="text-xs text-muted-foreground">{order.patientId}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {order.type === "Single Vision" && (
                              <div className="flex items-center">
                                <Glasses className="mr-1 h-4 w-4 text-ghibli-blue" />
                                {order.type}
                              </div>
                            )}
                            {order.type === "Progressive" && (
                              <div className="flex items-center">
                                <Glasses className="mr-1 h-4 w-4 text-ghibli-green" />
                                {order.type}
                              </div>
                            )}
                            {order.type === "Bifocal" && (
                              <div className="flex items-center">
                                <Glasses className="mr-1 h-4 w-4 text-amber-600" />
                                {order.type}
                              </div>
                            )}
                            {order.type === "Contact Lenses" && (
                              <div className="flex items-center">
                                <Package className="mr-1 h-4 w-4 text-ghibli-blue" />
                                {order.type}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>{order.dateOrdered}</TableCell>
                          <TableCell>{order.dateReceived}</TableCell>
                          <TableCell>{order.lab}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="ghibli-button"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleViewDetails(order)
                              }}
                            >
                              <Eye className="h-4 w-4 text-ghibli-green" />
                              <span className="sr-only">View details</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    {filteredOrders.filter((order) => order.status === "Delivered").length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <Package className="h-8 w-8 mb-2" />
                            <p>No completed orders found.</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Order Details Dialog */}
      {selectedOrder && (
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <LabOrderDetails 
              order={selectedOrder}
              onClose={() => setDetailsOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Patient Search Dialog */}
      <PatientSearchDialog
        isOpen={patientSearchOpen}
        onOpenChange={setPatientSearchOpen}
        onSelect={handlePatientSelect}
      />
    </div>
  )
}
