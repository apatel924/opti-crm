"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, FileText, Clipboard, DollarSign } from "lucide-react"

interface PatientOrdersTabProps {
  patient: any
}

export function PatientOrdersTab({ patient }: PatientOrdersTabProps) {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Orders & Purchases</h3>
        <div className="flex gap-2">
          {/* Order dialog triggers will be added later */}
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="glasses">Glasses</TabsTrigger>
          <TabsTrigger value="contacts">Contact Lenses</TabsTrigger>
          <TabsTrigger value="accessories">Accessories</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="space-y-4">
            {patient.orders.map((order: any) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="glasses" className="space-y-4">
          <div className="space-y-4">
            {patient.orders
              .filter((order: any) => order.type.includes("Glasses"))
              .map((order: any) => (
                <OrderCard key={order.id} order={order} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          <div className="space-y-4">
            {patient.orders
              .filter((order: any) => order.type.includes("Contact"))
              .map((order: any) => (
                <OrderCard key={order.id} order={order} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="accessories" className="space-y-4">
          <div className="space-y-4">
            {patient.orders
              .filter((order: any) => order.type.includes("Accessory"))
              .map((order: any) => (
                <OrderCard key={order.id} order={order} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function OrderCard({ order }: { order: any }) {
  return (
    <Card key={order.id}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{order.type}</CardTitle>
            <CardDescription>{order.date}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  Print Receipt
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Clipboard className="mr-2 h-4 w-4" />
                  Copy Order Info
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500">Cancel Order</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
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
              <p className={`text-sm ${Number(order.balance.replace("$", "")) > 0 ? "text-red-500 font-medium" : ""}`}>
                {order.balance}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
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
      </CardFooter>
    </Card>
  )
}
