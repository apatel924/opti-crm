"use client"

import { useState } from "react"
import { Search, Filter, ArrowUpDown, CheckCircle, Clock, Package, AlertCircle, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data for optician work queue
const workItems = [
  {
    id: "W-10042",
    orderId: "L-10042",
    patientName: "Sarah Johnson",
    patientId: "P-10042",
    type: "Frame Selection",
    status: "Pending",
    priority: "High",
    dueDate: "05/05/2023",
    deadline: 2,
    assignedTo: "Unassigned",
    notes: "Patient needs help selecting frames that complement their face shape.",
  },
  {
    id: "W-10043",
    orderId: "L-10043",
    patientName: "Michael Chen",
    patientId: "P-10043",
    type: "Dispensing",
    status: "Ready",
    priority: "Normal",
    dueDate: "05/03/2023",
    deadline: 0,
    assignedTo: "Sarah Williams",
    notes: "Progressive lenses - first time wearer. Needs detailed instructions.",
  },
  {
    id: "W-10044",
    orderId: "L-10044",
    patientName: "Robert Garcia",
    patientId: "P-10044",
    type: "Measurements",
    status: "In Progress",
    priority: "Normal",
    dueDate: "05/04/2023",
    deadline: 1,
    assignedTo: "John Miller",
    notes: "Need to take PD and seg height measurements for bifocals.",
  },
  {
    id: "W-10045",
    orderId: "L-10045",
    patientName: "Emily Wilson",
    patientId: "P-10045",
    type: "Contact Lens Training",
    status: "Pending",
    priority: "Low",
    dueDate: "05/06/2023",
    deadline: 3,
    assignedTo: "Unassigned",
    notes: "First-time contact lens wearer. Needs insertion and removal training.",
  },
  {
    id: "W-10046",
    orderId: "L-10046",
    patientName: "Jessica Martinez",
    patientId: "P-10046",
    type: "Troubleshooting",
    status: "In Progress",
    priority: "High",
    dueDate: "05/02/2023",
    deadline: -1,
    assignedTo: "Sarah Williams",
    notes: "Patient experiencing discomfort with new progressive lenses. Needs adjustment.",
  },
  {
    id: "W-10047",
    orderId: "L-10047",
    patientName: "David Thompson",
    patientId: "P-10047",
    type: "Repair",
    status: "Pending",
    priority: "Rush",
    dueDate: "05/01/2023",
    deadline: -2,
    assignedTo: "John Miller",
    notes: "Broken temple piece needs repair. Patient's only pair of glasses.",
  },
]

export function OpticianWorkQueue() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [selectedAssignee, setSelectedAssignee] = useState("all")

  // Filter work items based on search query and filters
  const filteredWorkItems = workItems.filter((item) => {
    // Search filter
    const matchesSearch =
      item.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase())

    // Status filter
    const matchesStatus = selectedStatus === "all" || item.status.toLowerCase() === selectedStatus.toLowerCase()

    // Priority filter
    const matchesPriority = selectedPriority === "all" || item.priority.toLowerCase() === selectedPriority.toLowerCase()

    // Assignee filter
    const matchesAssignee =
      selectedAssignee === "all" ||
      (selectedAssignee === "unassigned" && item.assignedTo === "Unassigned") ||
      item.assignedTo.toLowerCase().includes(selectedAssignee.toLowerCase())

    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Optician Work Queue</h1>
          <p className="text-muted-foreground">
            Manage frame selections, measurements, dispensing, and troubleshooting
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <CheckCircle className="mr-2 h-4 w-4" />
            Complete Selected
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-red-400">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Past Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">
              {filteredWorkItems.filter((item) => item.deadline < 0).length}
            </div>
            <p className="text-sm text-muted-foreground">Overdue tasks</p>
          </CardContent>
        </Card>
        <Card className="border-orange-400">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Due Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-500">
              {filteredWorkItems.filter((item) => item.deadline === 0).length}
            </div>
            <p className="text-sm text-muted-foreground">Tasks due today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {filteredWorkItems.filter((item) => item.status === "Pending").length}
            </div>
            <p className="text-sm text-muted-foreground">Tasks awaiting action</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {filteredWorkItems.filter((item) => item.status === "In Progress").length}
            </div>
            <p className="text-sm text-muted-foreground">Tasks being worked on</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <TabsList>
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="ready">Ready</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <form className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tasks..."
                className="w-full pl-8 md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </div>

        {showFilters && (
          <Card className="p-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in progress">In Progress</SelectItem>
                    <SelectItem value="ready">Ready</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="rush">Rush</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="assignee">Assigned To</Label>
                <Select value={selectedAssignee} onValueChange={setSelectedAssignee}>
                  <SelectTrigger id="assignee">
                    <SelectValue placeholder="Filter by assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Staff</SelectItem>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    <SelectItem value="john">John Miller</SelectItem>
                    <SelectItem value="sarah">Sarah Williams</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        )}

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Button variant="ghost" className="p-0 font-medium">
                        Task ID
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
                    <TableHead>
                      <Button variant="ghost" className="p-0 font-medium">
                        Priority
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredWorkItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                            {item.patientName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <div className="font-medium">{item.patientName}</div>
                            <div className="text-xs text-muted-foreground">
                              {item.patientId} • {item.orderId}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>
                        <div
                          className={
                            item.deadline < 0
                              ? "text-red-500 font-medium"
                              : item.deadline === 0
                                ? "text-orange-500 font-medium"
                                : ""
                          }
                        >
                          {item.dueDate}
                          {item.deadline < 0 && <span className="block text-xs">Overdue</span>}
                          {item.deadline === 0 && <span className="block text-xs">Today</span>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item.status === "In Progress"
                              ? "secondary"
                              : item.status === "Completed"
                                ? "default"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item.priority === "Rush"
                              ? "destructive"
                              : item.priority === "High"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {item.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {item.assignedTo === "Unassigned" ? (
                          <Select defaultValue="unassigned">
                            <SelectTrigger className="h-8 w-[130px]">
                              <SelectValue placeholder="Assign to" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="unassigned">Unassigned</SelectItem>
                              <SelectItem value="john">John Miller</SelectItem>
                              <SelectItem value="sarah">Sarah Williams</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          item.assignedTo
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Button>
                          <Button size="sm">
                            {item.status === "Pending"
                              ? "Start"
                              : item.status === "In Progress"
                                ? "Complete"
                                : "Dispense"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredWorkItems
                  .filter((item) => item.status === "Pending")
                  .map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.id}</span>
                          <Badge variant="secondary">{item.status}</Badge>
                          {item.priority !== "Normal" && (
                            <Badge variant={item.priority === "Rush" ? "destructive" : "default"}>
                              {item.priority}
                            </Badge>
                          )}
                        </div>
                        <div className="mt-1 text-sm">
                          {item.patientName} • {item.type}
                        </div>
                        <div className="mt-2 text-sm">
                          <span className="font-medium">Order:</span> {item.orderId}
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          <span className="font-medium">Notes:</span> {item.notes}
                        </div>
                        <div
                          className={`mt-2 text-sm ${
                            item.deadline < 0
                              ? "text-red-500 font-medium"
                              : item.deadline === 0
                                ? "text-orange-500 font-medium"
                                : "text-muted-foreground"
                          }`}
                        >
                          Due: {item.dueDate}
                          {item.deadline < 0 && " (Overdue)"}
                          {item.deadline === 0 && " (Today)"}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                        <Button size="sm">
                          <Clock className="mr-2 h-4 w-4" />
                          Start Task
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>In Progress Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredWorkItems
                  .filter((item) => item.status === "In Progress")
                  .map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.id}</span>
                          <Badge variant="default">{item.status}</Badge>
                          {item.priority !== "Normal" && (
                            <Badge variant={item.priority === "Rush" ? "destructive" : "default"}>
                              {item.priority}
                            </Badge>
                          )}
                        </div>
                        <div className="mt-1 text-sm">
                          {item.patientName} • {item.type}
                        </div>
                        <div className="mt-2 text-sm">
                          <span className="font-medium">Order:</span> {item.orderId}
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          <span className="font-medium">Notes:</span> {item.notes}
                        </div>
                        <div
                          className={`mt-2 text-sm ${
                            item.deadline < 0
                              ? "text-red-500 font-medium"
                              : item.deadline === 0
                                ? "text-orange-500 font-medium"
                                : "text-muted-foreground"
                          }`}
                        >
                          Due: {item.dueDate}
                          {item.deadline < 0 && " (Overdue)"}
                          {item.deadline === 0 && " (Today)"}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <AlertCircle className="mr-2 h-4 w-4" />
                          Report Issue
                        </Button>
                        <Button size="sm">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Complete
                        </Button>
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
              <CardTitle>Ready for Dispensing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredWorkItems
                  .filter((item) => item.status === "Ready")
                  .map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.id}</span>
                          <Badge variant="default">{item.status}</Badge>
                          {item.priority !== "Normal" && (
                            <Badge variant={item.priority === "Rush" ? "destructive" : "default"}>
                              {item.priority}
                            </Badge>
                          )}
                        </div>
                        <div className="mt-1 text-sm">
                          {item.patientName} • {item.type}
                        </div>
                        <div className="mt-2 text-sm">
                          <span className="font-medium">Order:</span> {item.orderId}
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          <span className="font-medium">Notes:</span> {item.notes}
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">Ready since: {item.dueDate}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                        <Button size="sm">
                          <Package className="mr-2 h-4 w-4" />
                          Dispense
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
