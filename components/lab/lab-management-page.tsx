"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  Filter,
  Plus,
  Download,
  ListFilter,
  ArrowUpDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { PatientSearchDialog } from "@/components/patient-search/patient-search-dialog"
import { LabOrderPriorityDialog } from "@/components/lab/lab-order-priority-dialog"

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
    deadline: 4,
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
    deadline: -1,
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
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow
                      key={order.id}
                      className={selectedOrder === order.id ? "bg-muted/50" : ""}
                      onClick={() =>
                        setSelectedOrder((prev) => (prev === order.id ? null : order.id))
                      }
                    >
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{order.patientName}</span>
                          <span className="text-xs text-muted-foreground">{order.patientId}</span>
                        </div>
                      </TableCell>
                      <TableCell>{order.type}</TableCell>
                      <TableCell
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
                      </TableCell>
                      <TableCell>
                        <Badge>{order.status}</Badge>
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
                      <TableCell className="text-right text-muted-foreground text-sm">—</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
