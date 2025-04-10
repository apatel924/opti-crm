"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, ArrowUp, ArrowDown, AlertCircle } from "lucide-react"

const priorityOrders = [
  {
    id: "L-10047",
    patientName: "David Thompson",
    type: "Progressive",
    dueDate: "05/01/2023",
    status: "In Progress",
    priority: "Rush",
    deadline: -1, // past deadline
  },
  {
    id: "L-10046",
    patientName: "Jessica Martinez",
    type: "Single Vision",
    dueDate: "05/02/2023",
    status: "Quality Check",
    priority: "High",
    deadline: 1,
  },
  {
    id: "L-10043",
    patientName: "Michael Chen",
    type: "Progressive",
    dueDate: "05/03/2023",
    status: "Ready for Pickup",
    priority: "High",
    deadline: 2,
  },
  {
    id: "L-10044",
    patientName: "Robert Garcia",
    type: "Bifocal",
    dueDate: "05/04/2023",
    status: "Waiting for Materials",
    priority: "Normal",
    deadline: 3,
  },
  {
    id: "L-10042",
    patientName: "Sarah Johnson",
    type: "Single Vision",
    dueDate: "05/05/2023",
    status: "In Progress",
    priority: "Normal",
    deadline: 4,
  },
  {
    id: "L-10045",
    patientName: "Emily Wilson",
    type: "Contact Lenses",
    dueDate: "05/06/2023",
    status: "Ordered",
    priority: "Low",
    deadline: 5,
  },
]

export function LabOrderPriorityDialog() {
  const [open, setOpen] = useState(false)
  const [orders, setOrders] = useState([...priorityOrders])

  const moveOrderUp = (index: number) => {
    if (index === 0) return
    const newOrders = [...orders]
    const temp = newOrders[index]
    newOrders[index] = newOrders[index - 1]
    newOrders[index - 1] = temp
    setOrders(newOrders)
  }

  const moveOrderDown = (index: number) => {
    if (index === orders.length - 1) return
    const newOrders = [...orders]
    const temp = newOrders[index]
    newOrders[index] = newOrders[index + 1]
    newOrders[index + 1] = temp
    setOrders(newOrders)
  }

  const handleSave = () => {
    // In a real app, you would save the new order to the backend
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Organize Lab Order Priority
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Lab Order Priority Management</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="mb-4 text-sm text-muted-foreground">
            Drag and drop or use the arrows to reorder lab orders based on priority. Orders at the top will be processed
            first.
          </p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.patientName}</TableCell>
                  <TableCell>{order.type}</TableCell>
                  <TableCell>
                    <div
                      className={
                        order.deadline < 0
                          ? "text-red-500 font-medium flex items-center gap-1"
                          : order.deadline <= 2
                            ? "text-orange-500 font-medium flex items-center gap-1"
                            : ""
                      }
                    >
                      {order.dueDate}
                      {order.deadline < 0 && <AlertCircle className="h-4 w-4" />}
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
                    <Badge
                      variant={
                        order.priority === "Rush" ? "destructive" : order.priority === "High" ? "default" : "secondary"
                      }
                    >
                      {order.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => moveOrderUp(index)} disabled={index === 0}>
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => moveOrderDown(index)}
                        disabled={index === orders.length - 1}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Priority Order</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

