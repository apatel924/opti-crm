"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Eye, FileText, DollarSign, Glasses, Clipboard, MoreHorizontal, Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface PatientOrdersTabProps {
  patient: any
}

export function PatientOrdersTab({ patient }: PatientOrdersTabProps) {
  const [activeTab, setActiveTab] = useState("all")
  const router = useRouter()

  const handleNewOrder = (type: string) => {
    // In a real app, this would navigate to a new order form with the patient pre-selected
    router.push(`/lab/new?patientId=${patient.id}&type=${type}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-ghibli-blue">Orders & Purchases</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-ghibli-blue text-ghibli-blue hover:bg-ghibli-blue-light/20"
            onClick={() => handleNewOrder("glasses")}
          >
            <Glasses className="mr-2 h-4 w-4" />
            New Glasses Order
          </Button>
          <Button className="bg-ghibli-blue hover:bg-ghibli-blue/90" onClick={() => handleNewOrder("contacts")}>
            <Package className="mr-2 h-4 w-4" />
            New Contact Lens Order
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 rounded-xl bg-ghibli-cream">
          <TabsTrigger
            value="all"
            className="rounded-lg data-[state=active]:bg-ghibli-blue data-[state=active]:text-white"
          >
            All Orders
          </TabsTrigger>
          <TabsTrigger
            value="glasses"
            className="rounded-lg data-[state=active]:bg-ghibli-blue data-[state=active]:text-white"
          >
            Glasses
          </TabsTrigger>
          <TabsTrigger
            value="contacts"
            className="rounded-lg data-[state=active]:bg-ghibli-blue data-[state=active]:text-white"
          >
            Contact Lenses
          </TabsTrigger>
          <TabsTrigger
            value="accessories"
            className="rounded-lg data-[state=active]:bg-ghibli-blue data-[state=active]:text-white"
          >
            Accessories
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="space-y-4">
            {patient.orders.length > 0 ? (
              patient.orders.map((order: any) => <OrderCard key={order.id} order={order} />)
            ) : (
              <EmptyOrderState type="all" onNewOrder={handleNewOrder} />
            )}
          </div>
        </TabsContent>

        <TabsContent value="glasses" className="space-y-4">
          <div className="space-y-4">
            {patient.orders.filter((order: any) => order.type.includes("Glasses")).length > 0 ? (
              patient.orders
                .filter((order: any) => order.type.includes("Glasses"))
                .map((order: any) => <OrderCard key={order.id} order={order} />)
            ) : (
              <EmptyOrderState type="glasses" onNewOrder={handleNewOrder} />
            )}
          </div>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          <div className="space-y-4">
            {patient.orders.filter((order: any) => order.type.includes("Contact")).length > 0 ? (
              patient.orders
                .filter((order: any) => order.type.includes("Contact"))
                .map((order: any) => <OrderCard key={order.id} order={order} />)
            ) : (
              <EmptyOrderState type="contacts" onNewOrder={handleNewOrder} />
            )}
          </div>
        </TabsContent>

        <TabsContent value="accessories" className="space-y-4">
          <div className="space-y-4">
            {patient.orders.filter((order: any) => order.type.includes("Accessory")).length > 0 ? (
              patient.orders
                .filter((order: any) => order.type.includes("Accessory"))
                .map((order: any) => <OrderCard key={order.id} order={order} />)
            ) : (
              <EmptyOrderState type="accessories" onNewOrder={() => {}} />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function OrderCard({ order }: { order: any }) {
  return (
    <Card key={order.id} className="ghibli-card border-ghibli-blue-light overflow-hidden">
      <CardHeader className="bg-ghibli-blue-light/10 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-ghibli-blue-light/20 p-1.5">
              {order.type.includes("Glasses") ? (
                <Glasses className="h-4 w-4 text-ghibli-blue" />
              ) : (
                <Package className="h-4 w-4 text-ghibli-blue" />
              )}
            </div>
            <div>
              <CardTitle className="text-base text-ghibli-blue">{order.type}</CardTitle>
              <CardDescription>{order.date}</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={
                order.status === "Dispensed"
                  ? "border-green-500 bg-green-100 text-green-800"
                  : order.status === "Ready for Pickup"
                    ? "border-amber-500 bg-amber-100 text-amber-800"
                    : order.status === "In Progress"
                      ? "border-ghibli-blue bg-ghibli-blue-light/20 text-ghibli-blue"
                      : "border-gray-500 bg-gray-100 text-gray-800"
              }
            >
              {order.status}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-ghibli-blue-light/20">
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
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div>
            <h4 className="mb-2 text-sm font-medium text-ghibli-blue">Order Details</h4>
            <p className="text-sm">{order.details}</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <h4 className="text-sm font-medium text-ghibli-blue">Price</h4>
              <p className="text-sm">{order.price}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-ghibli-blue">Insurance</h4>
              <p className="text-sm">{order.insurance}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-ghibli-blue">Balance</h4>
              <p className={`text-sm ${Number(order.balance.replace("$", "")) > 0 ? "text-rose-500 font-medium" : ""}`}>
                {order.balance}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between bg-ghibli-cream/30 border-t border-ghibli-blue-light/20">
        <div className="text-sm">
          <span className="font-medium">Order ID:</span> {order.id}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-ghibli-blue text-ghibli-blue hover:bg-ghibli-blue-light/20"
          >
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
          {Number(order.balance.replace("$", "")) > 0 ? (
            <Button size="sm" className="bg-ghibli-blue hover:bg-ghibli-blue/90">
              <DollarSign className="mr-2 h-4 w-4" />
              Pay Balance
            </Button>
          ) : (
            <Button size="sm" className="bg-ghibli-green hover:bg-ghibli-green/90">
              <FileText className="mr-2 h-4 w-4" />
              View Receipt
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

function EmptyOrderState({ type, onNewOrder }: { type: string; onNewOrder: (type: string) => void }) {
  return (
    <Card className="ghibli-card border-dashed border-ghibli-blue-light">
      <CardContent className="flex flex-col items-center justify-center py-10">
        <div className="rounded-full bg-ghibli-blue-light/20 p-3 mb-4">
          {type === "glasses" ? (
            <Glasses className="h-8 w-8 text-ghibli-blue" />
          ) : type === "contacts" ? (
            <Package className="h-8 w-8 text-ghibli-blue" />
          ) : (
            <Package className="h-8 w-8 text-ghibli-blue" />
          )}
        </div>
        <h3 className="text-lg font-medium text-ghibli-blue mb-2">No {type} orders yet</h3>
        <p className="text-muted-foreground text-center mb-6">
          {type === "all"
            ? "This patient doesn't have any orders yet."
            : type === "glasses"
              ? "No glasses orders found for this patient."
              : type === "contacts"
                ? "No contact lens orders found for this patient."
                : "No accessories found for this patient."}
        </p>
        {type === "glasses" && (
          <Button className="bg-ghibli-blue hover:bg-ghibli-blue/90" onClick={() => onNewOrder("glasses")}>
            <Plus className="mr-2 h-4 w-4" />
            New Glasses Order
          </Button>
        )}
        {type === "contacts" && (
          <Button className="bg-ghibli-blue hover:bg-ghibli-blue/90" onClick={() => onNewOrder("contacts")}>
            <Plus className="mr-2 h-4 w-4" />
            New Contact Lens Order
          </Button>
        )}
        {type === "all" && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-ghibli-blue text-ghibli-blue hover:bg-ghibli-blue-light/20"
              onClick={() => onNewOrder("glasses")}
            >
              <Glasses className="mr-2 h-4 w-4" />
              New Glasses Order
            </Button>
            <Button className="bg-ghibli-blue hover:bg-ghibli-blue/90" onClick={() => onNewOrder("contacts")}>
              <Package className="mr-2 h-4 w-4" />
              New Contact Lens Order
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
