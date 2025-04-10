"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

const labOrders = [
  {
    id: "L-10042",
    patientName: "Sarah Johnson",
    patientId: "P-10042",
    type: "Single Vision",
    dueDate: "05/05/2023",
  },
  {
    id: "L-10043",
    patientName: "Michael Chen",
    patientId: "P-10043",
    type: "Progressive",
    dueDate: "05/03/2023",
  },
  {
    id: "L-10044",
    patientName: "Robert Garcia",
    patientId: "P-10044",
    type: "Bifocal",
    dueDate: "05/04/2023",
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

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-3xl font-bold">Lab Management</h1>
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
