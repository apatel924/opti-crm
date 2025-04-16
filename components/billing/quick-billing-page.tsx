"use client"

import { useState } from "react"
import { Filter, Receipt } from "lucide-react"
import { Button } from "@/components/ui/button"

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
    </div>
  )
}
