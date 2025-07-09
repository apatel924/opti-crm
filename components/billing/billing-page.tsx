"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, Download, DollarSign, FileText, CheckCircle, AlertCircle, Calendar, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PatientSearchDialog } from "@/components/patient-search/patient-search-dialog"
import { NewBillingDialog } from "@/components/billing/new-billing-dialog"

// Sample billing data
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
  {
    id: "B-10044",
    date: "04/30/2023",
    patientName: "Robert Garcia",
    patientId: "P-10044",
    description: "Follow-up Examination",
    type: "Exam",
    relatedId: "E-10044",
    total: "$75.00",
    insurance: "$60.00",
    patient: "$15.00",
    status: "Paid",
    paymentDate: "04/30/2023",
    paymentMethod: "Cash",
  },
  {
    id: "B-10045",
    date: "04/28/2023",
    patientName: "Emily Wilson",
    patientId: "P-10045",
    description: "Contact Lens Annual Supply",
    type: "Lab Order",
    relatedId: "L-10045",
    total: "$320.00",
    insurance: "$250.00",
    patient: "$70.00",
    status: "Due",
    paymentDate: "",
    paymentMethod: "",
  },
  {
    id: "B-10046",
    date: "04/25/2023",
    patientName: "Jessica Martinez",
    patientId: "P-10046",
    description: "Comprehensive Exam",
    type: "Exam",
    relatedId: "E-10046",
    total: "$200.00",
    insurance: "$160.00",
    patient: "$40.00",
    status: "Paid",
    paymentDate: "04/25/2023",
    paymentMethod: "Credit Card",
  },
  {
    id: "B-10047",
    date: "04/20/2023",
    patientName: "David Thompson",
    patientId: "P-10047",
    description: "Bifocal Glasses",
    type: "Lab Order",
    relatedId: "L-10047",
    total: "$380.00",
    insurance: "$230.00",
    patient: "$150.00",
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

  // Calculate totals
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
        <div className="flex items-center gap-2">
          <PatientSearchDialog
            trigger={
              <Button variant="outline">
                <Search className="mr-2 h-4 w-4" />
                Find Patient
              </Button>
            }
          />
          <NewBillingDialog />
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
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={bill.patientName} />
                            <AvatarFallback>
                              {bill.patientName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{bill.patientName}</div>
                            <div className="text-xs text-muted-foreground">{bill.patientId}</div>
                          </div>
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

        <TabsContent value="due" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Outstanding Balances</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredBilling
                  .filter((bill) => bill.status === "Due")
                  .map((bill) => (
                    <div
                      key={bill.id}
                      className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{bill.id}</span>
                          <Badge variant="destructive">Due</Badge>
                        </div>
                        <div className="mt-1 text-sm">
                          {bill.patientName} • {bill.description}
                        </div>
                        <div className="mt-2 text-sm">
                          <span className="font-medium">Total:</span> {bill.total} |{" "}
                          <span className="font-medium">Insurance:</span> {bill.insurance} |{" "}
                          <span className="font-medium text-red-500">Patient: {bill.patient}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/billing/${bill.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </Button>
                        <Button size="sm">
                          <DollarSign className="mr-2 h-4 w-4" />
                          Collect Payment
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="paid" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paid Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredBilling
                  .filter((bill) => bill.status === "Paid")
                  .map((bill) => (
                    <div
                      key={bill.id}
                      className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{bill.id}</span>
                          <Badge variant="success">Paid</Badge>
                        </div>
                        <div className="mt-1 text-sm">
                          {bill.patientName} • {bill.description}
                        </div>
                        <div className="mt-2 text-sm">
                          <span className="font-medium">Total:</span> {bill.total} |{" "}
                          <span className="font-medium">Paid on:</span> {bill.paymentDate} |{" "}
                          <span className="font-medium">Method:</span> {bill.paymentMethod}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/billing/${bill.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="mr-2 h-4 w-4" />
                          Receipt
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insurance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Insurance Claims</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredBilling.map((bill) => (
                  <div
                    key={bill.id}
                    className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{bill.id}</span>
                        <Badge variant={bill.status === "Paid" ? "success" : "secondary"}>
                          {bill.status === "Paid" ? "Processed" : "Pending"}
                        </Badge>
                      </div>
                      <div className="mt-1 text-sm">
                        {bill.patientName} • {bill.description}
                      </div>
                      <div className="mt-2 text-sm">
                        <span className="font-medium">Total:</span> {bill.total} |{" "}
                        <span className="font-medium">Insurance:</span> {bill.insurance} |{" "}
                        <span className="font-medium">Patient:</span> {bill.patient}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Calendar className="mr-2 h-4 w-4" />
                        Claim Status
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        EOB
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
