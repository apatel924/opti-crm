"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Eye, FileText, DollarSign } from "lucide-react"

interface PatientOrdersProps {
  patient: any
}

export function PatientOrders({ patient }: PatientOrdersProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Orders & Purchases</h3>
        <Button>
          <Package className="mr-2 h-4 w-4" />
          New Order
        </Button>
      </div>

      <div className="space-y-4">
        {patient.orders.map((order: any) => (
          <Card key={order.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium">{order.type}</h3>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
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
              </div>
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
                    <p
                      className={`text-sm ${Number(order.balance.replace("$", "")) > 0 ? "text-red-500 font-medium" : ""}`}
                    >
                      {order.balance}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4">
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
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
