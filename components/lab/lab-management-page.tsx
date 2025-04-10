"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const labOrders = [
  {
    id: "L-10042",
    patientName: "Sarah Johnson",
    patientId: "P-10042",
    type: "Single Vision",
    dueDate: "05/05/2023",
    status: "In Progress",
    deadline: 4,
  },
  {
    id: "L-10043",
    patientName: "Michael Chen",
    patientId: "P-10043",
    type: "Progressive",
    dueDate: "05/03/2023",
    status: "Ready for Pickup",
    deadline: 2,
  },
  {
    id: "L-10044",
    patientName: "Robert Garcia",
    patientId: "P-10044",
    type: "Bifocal",
    dueDate: "05/04/2023",
    status: "Waiting for Materials",
    deadline: 3,
  },
];

export function LabManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = labOrders.filter(
    (order) =>
      order.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const orderCounts = {
    toPlace: filteredOrders.filter((o) => o.status === "Ordered").length,
    waitingMaterials: filteredOrders.filter((o) => o.status === "Waiting for Materials").length,
    pastDeadline: filteredOrders.filter((o) => o.deadline < 0).length,
    approaching: filteredOrders.filter((o) => o.deadline > 0 && o.deadline <= 2).length,
  };

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-3xl font-bold">Lab Management</h1>
      <div className="grid gap-6 md:grid-cols-4">
        <Card className={orderCounts.toPlace > 0 ? "border-yellow-400" : ""}>
          <CardHeader className="pb-2">
            <CardTitle>Orders to Place</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{orderCounts.toPlace}</div>
            <p className="text-sm text-muted-foreground">Need to be ordered</p>
          </CardContent>
        </Card>
        <Card className={orderCounts.waitingMaterials > 0 ? "border-yellow-400" : ""}>
          <CardHeader className="pb-2">
            <CardTitle>Waiting for Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{orderCounts.waitingMaterials}</div>
            <p className="text-sm text-muted-foreground">Materials on order</p>
          </CardContent>
        </Card>
        <Card className={orderCounts.pastDeadline > 0 ? "border-red-400" : ""}>
          <CardHeader className="pb-2">
            <CardTitle>Past Deadline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">{orderCounts.pastDeadline}</div>
            <p className="text-sm text-muted-foreground">Overdue orders</p>
          </CardContent>
        </Card>
        <Card className={orderCounts.approaching > 0 ? "border-orange-400" : ""}>
          <CardHeader className="pb-2">
            <CardTitle>Approaching Deadline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-500">{orderCounts.approaching}</div>
            <p className="text-sm text-muted-foreground">Due in 2 days or less</p>
          </CardContent>
        </Card>
      </div>

      <Input
        type="search"
        placeholder="Search orders..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full md:w-[300px]"
      />

      <table className="min-w-full mt-4 border">
        <thead>
          <tr>
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">Patient</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id} className="border-t">
              <td className="px-4 py-2">{order.id}</td>
              <td className="px-4 py-2">
                {order.patientName}
                <br />
                <span className="text-xs text-muted-foreground">
                  {order.patientId}
                </span>
              </td>
              <td className="px-4 py-2">{order.type}</td>
              <td className="px-4 py-2">{order.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
