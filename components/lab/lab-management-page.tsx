"use client";
import { Input } from "@/components/ui/input"; // assume you have this component

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
];

export function LabManagementPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Lab Management</h1>
      <p className="text-muted-foreground">
        Track and manage lab orders
      </p>

      <table className="min-w-full border">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Patient</th>
            <th>Type</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {labOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>
                <div>
                  <div>{order.patientName}</div>
                  <div className="text-xs text-muted-foreground">
                    {order.patientId}
                  </div>
                </div>
              </td>
              <td>{order.type}</td>
              <td>{order.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
