"use client"

import { useState } from "react"
import { Search, Filter, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye, DollarSign, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

const billingData = [
  {
    id: "B-10042",
    date: "05/01/2023",
    patientName: "Sarah Johnson",
    patientId: "P-10042",
    description: "Annual Eye Examination",
    type: "Exam",
    relatedId: "E-10042",
    total: "$150.00",
    insurance: "$120.00",
    patient: "$30.00",
    status: "Paid",
    paymentDate: "05/01/2023",
    paymentMethod: "Credit Card",
  },
  {
    id: "B-10043",
    date: "05/01/2023",
    patientName: "Michael Chen",
    patientId: "P-10043",
    description: "Progressive Glasses",
    type: "Lab Order",
    relatedId: "L-10042",
    total: "$450.00",
    insurance: "$360.00",
    patient: "$90.00",
    status: "Due",
    paymentDate: "",
    paymentMethod: "",
  },
]

export function BillingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const filteredBilling = billingData.filter(
    (bill) =>
      bill.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const totalDue = filteredBilling
    .filter((bill) => bill.status === "Due")
    .reduce((sum, bill) => sum + Number(bill.patient.replace("$", "")), 0)

  const totalCollected = filteredBilling
    .filter((bill) => bill.status === "Paid")
    .reduce((sum, bill) => sum + Number(bill.patient.replace("$", "")), 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
          <p className="text-muted-foreground">Manage patient billing, payments, and insurance claims</p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">${totalDue.toFixed(2)}</div>
            <p className="text-sm text-muted-foreground">
              {filteredBilling.filter((b) => b.status === "Due").length} outstanding invoices
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Collected Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">${totalCollected.toFixed(2)}</div>
            <p className="text-sm text-muted-foreground">
              {filteredBilling.filter((b) => b.status === "Paid").length} paid invoices
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Insurance Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{filteredBilling.length}</div>
            <p className="text-sm text-muted-foreground">
              {filteredBilling.filter((b) => b.status === "Paid").length} processed,{" "}
              {filteredBilling.filter((b) => b.status === "Due").length} pending
            </p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <TabsList>
            <TabsTrigger value="all">All Transactions</TabsTrigger>
            <TabsTrigger value="due">Due</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
            <TabsTrigger value="insurance">Insurance Claims</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <form className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search billing..."
                className="w-full pl-8 md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
              <span className="sr-only">Download</span>
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Insurance</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBilling.map((bill) => (
                    <TableRow key={bill.id}>
                      <TableCell className="font-medium">{bill.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{bill.patientName}</div>
                          <div className="text-xs text-muted-foreground">{bill.patientId}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>{bill.description}</div>
                        <div className="text-xs text-muted-foreground">
                          {bill.type} • {bill.relatedId}
                        </div>
                      </TableCell>
                      <TableCell>{bill.date}</TableCell>
                      <TableCell>{bill.total}</TableCell>
                      <TableCell>{bill.insurance}</TableCell>
                      <TableCell>{bill.patient}</TableCell>
                      <TableCell>
                        <Badge
                          variant={bill.status === "Paid" ? "success" : "destructive"}
                          className="flex w-16 items-center justify-center gap-1"
                        >
                          {bill.status === "Paid" ? (
                            <>
                              <CheckCircle className="h-3 w-3" />
                              Paid
                            </>
                          ) : (
                            <>
                              <AlertCircle className="h-3 w-3" />
                              Due
                            </>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/billing/${bill.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </Button>
                          {bill.status !== "Paid" && (
                            <Button size="sm">
                              <DollarSign className="mr-2 h-4 w-4" />
                              Collect
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
