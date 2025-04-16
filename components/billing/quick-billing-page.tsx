"use client"

import { useState } from "react"
import { Filter, Receipt, Search, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function QuickBillingPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Quick Billing</h1>
          <p className="text-muted-foreground">Process payments and manage transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm">
            <Receipt className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Quick Payment</CardTitle>
            <CardDescription>Process a payment for a patient</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search patients..."
                  className="pl-8"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <CreditCard className="mr-2 h-4 w-4" />
              Process Payment
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
