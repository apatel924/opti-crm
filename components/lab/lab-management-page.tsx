"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  Filter,
  Plus,
  Download,
  MoreHorizontal,
  Eye,
  Clock,
  Package,
  CheckCircle,
  AlertCircle,
  Glasses,
  Truck,
  ArrowUpDown,
  ListFilter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { PatientSearchDialog } from "@/components/patient-search/patient-search-dialog"
import { LabOrderPriorityDialog } from "@/components/lab/lab-order-priority-dialog"

// Sample lab orders data
const labOrders = [
  {
    id: "L-10042",
    patientName: "Sarah Johnson",
    patientId: "P-10042",
    orderDate: "05/01/2023",
    dueDate: "05/05/2023",
    type: "Single Vision",
    status: "In Progress",
    progress: 60,
    priority: "Normal",
    assignedTo: "John Miller",
    frame: "Ray-Ban RB5154",
    lens: "Essilor Crizal",
    notes: "Patient has astigmatism",
    deadline: 4, // days until deadline
  },
  {
    id: "L-10043",
    patientName: "Michael Chen",
    patientId: "P-10043",
    orderDate: "05/01/2023",
    dueDate: "05/03/2023",
    type: "Progressive",
    status: "Ready for Pickup",
    progress: 100,
    priority: "High",
    assignedTo: "Sarah Williams",
    frame: "Oakley OX8046",
    lens: "Varilux Comfort",
    notes: "First time progressive wearer",
    deadline: 2,
  },
  {
    id: "L-10044",
    patientName: "Robert Garcia",
    patientId: "P-10044",
    orderDate: "04/30/2023",
    dueDate: "05/04/2023",
    type: "Bifocal",
    status: "Waiting for Materials",
    progress: 20,
    priority: "Normal",
    assignedTo: "Unassigned",
    frame: "Persol PO3007V",
    lens: "Zeiss",
    notes: "",
    deadline: 3,
  },
  {
    id: "L-10045",
    patientName: "Emily Wilson",
    patientId: "P-10045",
    orderDate: "04/29/2023",
    dueDate: "05/06/2023",
    type: "Contact Lenses",
    status: "Ordered",
    progress: 10,
    priority: "Low",
    assignedTo: "John Miller",
    frame: "N/A",
    lens: "Acuvue Oasys",
    notes: "Annual supply",
    deadline: 5,
  },
  {
    id: "L-10046",
    patientName: "Jessica Martinez",
    patientId: "P-10046",
    orderDate: "04/28/2023",
    dueDate: "05/02/2023",
    type: "Single Vision",
    status: "Quality Check",
    progress: 80,
    priority: "High",
    assignedTo: "Sarah Williams",
    frame: "Gucci GG0027O",
    lens: "Essilor Transitions",
    notes: "Photochromic lenses",
    deadline: 1,
  },
  {
    id: "L-10047",
    patientName: "David Thompson",
    patientId: "P-10047",
    orderDate: "04/27/2023",
    dueDate: "05/01/2023",
    type: "Progressive",
    status: "In Progress",
    progress: 70,
    priority: "Rush",
    assignedTo: "John Miller",
    frame: "Tom Ford FT5634-B",
    lens: "Varilux X",
    notes: "Past deadline",
    deadline: -1, // past deadline
  },
]

export function LabManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  const filteredOrders = labOrders.filter(
    (order) =>
      order.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Count orders by status
  const orderCounts = {
    toPlace: filteredOrders.filter((o) => o.status === "Ordered").length,
    waitingMaterials: filteredOrders.filter((o) => o.status === "Waiting for Materials").length,
    inProgress: filteredOrders.filter((o) => o.status === "In Progress").length,
    qualityCheck: filteredOrders.filter((o) => o.status === "Quality Check").length,
    readyForPickup: filteredOrders.filter((o) => o.status === "Ready for Pickup").length,
    pastDeadline: filteredOrders.filter((o) => o.deadline < 0).length,
    approaching: filteredOrders.filter((o) => o.deadline > 0 && o.deadline <= 2).length,
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lab Management</h1>
          <p className="text-muted-foreground">Track and manage lab orders, production, and quality control</p>
        </div>
        <div className="flex items-center gap-2">
          <PatientSearchDialog
            trigger={
              <Button variant="outline">
                <Search className="mr-2 h-4 w-4" />
                Find Patient
              </Button>
            }
          />
          <Button asChild>
            <Link href="/lab/orders/new">
              <Plus className="mr-1 h-4 w-4" />
              New Order
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className={orderCounts.toPlace > 0 ? "border-yellow-400" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Orders to Place</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{orderCounts.toPlace}</div>
            <p className="text-sm text-muted-foreground">Need to be ordered</p>
          </CardContent>
        </Card>
        <Card className={orderCounts.waitingMaterials > 0 ? "border-yellow-400" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Waiting for Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{orderCounts.waitingMaterials}</div>
            <p className="text-sm text-muted-foreground">Materials on order</p>
          </CardContent>
        </Card>
        <Card className={orderCounts.pastDeadline > 0 ? "border-red-400" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Past Deadline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">{orderCounts.pastDeadline}</div>
            <p className="text-sm text-muted-foreground">Overdue orders</p>
          </CardContent>
        </Card>
        <Card className={orderCounts.approaching > 0 ? "border-orange-400" : ""}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Approaching Deadline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-500">{orderCounts.approaching}</div>
            <p className="text-sm text-muted-foreground">Due in 2 days or less</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <LabOrderPriorityDialog />
        <Button variant="outline">
          <ListFilter className="mr-2 h-4 w-4" />
          Optician Work Queue
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="toPlace">To Place</TabsTrigger>
            <TabsTrigger value="inProgress">In Progress</TabsTrigger>
            <TabsTrigger value="ready">Ready for Pickup</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <form className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search orders..."
                className="w-full pl-8 md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
              <span className="sr-only">Download</span>
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Button variant="ghost" className="p-0 font-medium">
                        Order ID
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>
                      <Button variant="ghost" className="p-0 font-medium">
                        Due Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>
                      <Button variant="ghost" className="p-0 font-medium">
                        Priority
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow
                      key={order.id}
                      className={selectedOrder === order.id ? "bg-muted/50" : ""}
                      onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                    >
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.patientName}</div>
                          <div className="text-xs text-muted-foreground">{order.patientId}</div>
                        </div>
                      </TableCell>
                      <TableCell>{order.type}</TableCell>
                      <TableCell>
                        <div
                          className={
                            order.deadline < 0
                              ? "text-red-500 font-medium"
                              : order.deadline <= 2
                                ? "text-orange-500 font-medium"
                                : ""
                          }
                        >
                          {order.dueDate}
                          {order.deadline < 0 && <span className="block text-xs">Overdue</span>}
                          {order.deadline > 0 && order.deadline <= 2 && <span className="block text-xs">Soon</span>}
                        </div>
                      </TableCell>
                      <TableCell>
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
                      </TableCell>
                      <TableCell>
                        <div className="flex w-full max-w-xs items-center gap-2">
                          <Progress value={order.progress} className="h-2" />
                          <span className="text-xs text-muted-foreground">{order.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.priority === "Rush"
                              ? "destructive"
                              : order.priority === "High"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {order.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="icon" variant="ghost" asChild>
                            <Link href={`/lab/orders/${order.id}`}>
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Link>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">More</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Clock className="mr-2 h-4 w-4" />
                                Update Status
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Glasses className="mr-2 h-4 w-4" />
                                Quality Check
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Truck className="mr-2 h-4 w-4" />
                                Mark as Shipped
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-500">Cancel Order</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="toPlace" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Orders to Place</CardTitle>
              <CardDescription>New orders that need to be placed with vendors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredOrders
                  .filter((order) => order.status === "Ordered")
                  .map((order) => (
                    <div
                      key={order.id}
                      className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{order.id}</span>
                          <Badge variant="secondary">{order.status}</Badge>
                          {order.priority === "Rush" && <Badge variant="destructive">Rush</Badge>}
                        </div>
                        <div className="mt-1 text-sm">
                          {order.patientName} • {order.type}
                        </div>
                        <div className="mt-2 text-sm">
                          <span className="font-medium">Frame:</span> {order.frame}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Lens:</span> {order.lens}
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          Due: {order.dueDate} • Assigned to: {order.assignedTo}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                        <Button size="sm">
                          <Package className="mr-2 h-4 w-4" />
                          Place Order
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inProgress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>In Progress Orders</CardTitle>
              <CardDescription>Orders currently being processed in the lab</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredOrders
                  .filter((order) => order.status === "In Progress" || order.status === "Quality Check")
                  .map((order) => (
                    <div
                      key={order.id}
                      className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{order.id}</span>
                          <Badge variant={order.status === "Quality Check" ? "outline" : "default"}>
                            {order.status}
                          </Badge>
                          {order.priority !== "Normal" && (
                            <Badge variant={order.priority === "Rush" ? "destructive" : "default"}>
                              {order.priority}
                            </Badge>
                          )}
                        </div>
                        <div className="mt-1 text-sm">
                          {order.patientName} • {order.type}
                        </div>
                        <div className="mt-2 text-sm">
                          <span className="font-medium">Frame:</span> {order.frame}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Lens:</span> {order.lens}
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          Due: {order.dueDate} • Assigned to: {order.assignedTo}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 sm:items-end">
                        <div className="flex w-full max-w-xs items-center gap-2">
                          <Progress value={order.progress} className="h-2 w-40" />
                          <span className="text-xs text-muted-foreground">{order.progress}%</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Clock className="mr-2 h-4 w-4" />
                            Update Status
                          </Button>
                          <Button size="sm">
                            <Glasses className="mr-2 h-4 w-4" />
                            {order.status === "Quality Check" ? "Complete QC" : "Quality Check"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ready" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ready for Pickup</CardTitle>
              <CardDescription>Completed orders ready for patient pickup</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredOrders
                  .filter((order) => order.status === "Ready for Pickup")
                  .map((order) => (
                    <div
                      key={order.id}
                      className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{order.id}</span>
                          <Badge variant="success">{order.status}</Badge>
                        </div>
                        <div className="mt-1 text-sm">
                          {order.patientName} • {order.type}
                        </div>
                        <div className="mt-2 text-sm">
                          <span className="font-medium">Frame:</span> {order.frame}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Lens:</span> {order.lens}
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">Completed on: {order.dueDate}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <AlertCircle className="mr-2 h-4 w-4" />
                          Notify Patient
                        </Button>
                        <Button size="sm">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark as Dispensed
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
