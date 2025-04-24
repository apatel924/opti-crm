"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
        <CardTitle>{order.type}</CardTitle>
        <CardDescription>{order.date}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{order.details}</p>
      </CardContent>
      <CardFooter>
        <div className="text-sm">
          <span className="font-medium">Order ID:</span> {order.id}
        </div>
      </CardFooter>
    </Card>
  )
}
