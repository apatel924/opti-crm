"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  Filter,
  Plus,
  Download,
  MoreHorizontal,
  Eye,
  Calendar,
  FileText,
  Clipboard,
  ClipboardCheck,
  CheckCircle,
  Circle,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExaminationFilters } from "@/components/examinations/examination-filters"

const examinations = [
  {
    id: "E-10042",
    patientName: "Sarah Johnson",
    patientId: "P-10042",
    date: "05/01/2023",
    time: "9:00 AM",
    type: "Annual Exam",
    doctor: "Dr. Williams",
    status: "Completed",
    preTestingStatus: "Completed",
    examStatus: "Completed",
    prescriptionStatus: "Issued",
    notes: "Patient has diabetes, check for retinopathy",
  },
  {
    id: "E-10043",
    patientName: "Michael Chen",
    patientId: "P-10043",
    date: "05/01/2023",
    time: "10:00 AM",
    type: "Contact Lens Fitting",
    doctor: "Dr. Williams",
    status: "In Progress",
    preTestingStatus: "Completed",
    examStatus: "In Progress",
    prescriptionStatus: "Pending",
    notes: "First time contact lens wearer",
  },
  {
    id: "E-10044",
    patientName: "Robert Garcia",
    patientId: "P-10044",
    date: "05/01/2023",
    time: "11:00 AM",
    type: "Follow-up",
    doctor: "Dr. Smith",
    status: "Waiting",
    preTestingStatus: "In Progress",
    examStatus: "Pending",
    prescriptionStatus: "Pending",
    notes: "Post-LASIK follow-up",
  },
  {
    id: "E-10045",
    patientName: "Emily Wilson",
    patientId: "P-10045",
    date: "05/01/2023",
    time: "1:00 PM",
    type: "Comprehensive Exam",
    doctor: "Dr. Williams",
    status: "Scheduled",
    preTestingStatus: "Pending",
    examStatus: "Pending",
    prescriptionStatus: "Pending",
    notes: "New patient",
  },
  {
    id: "E-10046",
    patientName: "Jessica Martinez",
    patientId: "P-10046",
    date: "05/01/2023",
    time: "2:00 PM",
    type: "Annual Exam",
    doctor: "Dr. Smith",
    status: "Scheduled",
    preTestingStatus: "Pending",
    examStatus: "Pending",
    prescriptionStatus: "Pending",
    notes: "",
  },
]

// Component for workflow status indicators
function WorkflowStatus({ status }: { status: string }) {
  if (status === "Completed") {
    return <CheckCircle className="h-5 w-5 text-green-500" />
  } else if (status === "In Progress") {
    return <Clock className="h-5 w-5 text-blue-500" />
  } else {
    return <Circle className="h-5 w-5 text-gray-300" />
  }
}

export function ExaminationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState("today")

  const filteredExaminations = examinations.filter(
    (exam) =>
      exam.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Examinations</h1>
          <p className="text-muted-foreground">Manage patient examinations, testing, and prescriptions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/examinations/new">
              <Plus className="mr-1 h-4 w-4" />
              New Examination
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="today" onValueChange={setActiveTab} className="space-y-4">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="waiting">Waiting</TabsTrigger>
            <TabsTrigger value="inProgress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <form className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search examinations..."
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

        {showFilters && <ExaminationFilters />}

        <TabsContent value="today" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Exam Type</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Workflow</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExaminations.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell>
                        <Link href={`/patients/${exam.patientId}`} className="group">
                          <div>
                            <div className="font-medium text-blue-600 group-hover:text-primary group-hover:underline">
                              {exam.patientName}
                            </div>
                            <div className="text-xs text-muted-foreground">{exam.patientId}</div>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{exam.type}</div>
                        <div className="text-xs text-muted-foreground">{exam.id}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{exam.time}</div>
                        <div className="text-xs text-muted-foreground">{exam.date}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{exam.doctor}</div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            exam.status === "Completed"
                              ? "default"
                              : exam.status === "In Progress"
                                ? "default"
                                : exam.status === "Waiting"
                                  ? "default"
                                  : "secondary"
                          }
                        >
                          {exam.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <div className="flex flex-col items-center">
                            <WorkflowStatus status={exam.preTestingStatus} />
                            <span className="text-xs">Pre-Test</span>
                          </div>
                          <div className="h-[2px] w-3 bg-gray-200" />
                          <div className="flex flex-col items-center">
                            <WorkflowStatus status={exam.examStatus} />
                            <span className="text-xs">Exam</span>
                          </div>
                          <div className="h-[2px] w-3 bg-gray-200" />
                          <div className="flex flex-col items-center">
                            <WorkflowStatus
                              status={exam.prescriptionStatus === "Issued" ? "Completed" : exam.prescriptionStatus}
                            />
                            <span className="text-xs">Rx</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline" asChild className="hover:text-black">
                            <Link href={`/examinations/${exam.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="icon" variant="ghost" className="hover:text-black">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">More</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Clipboard className="mr-2 h-4 w-4" />
                                Start Pre-Testing
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <ClipboardCheck className="mr-2 h-4 w-4" />
                                Start Examination
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" />
                                Issue Prescription
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Calendar className="mr-2 h-4 w-4" />
                                Reschedule
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-500">Cancel Examination</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="waiting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Waiting Patients</CardTitle>
              <CardDescription>Patients who have checked in and are waiting for their examination</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredExaminations
                .filter((exam) => exam.status === "Waiting")
                .map((exam) => (
                  <div key={exam.id} className="mb-4 flex items-center justify-between rounded-lg border p-4">
                    <Link href={`/patients/${exam.patientId}`} className="group">
                      <div>
                        <div className="font-medium text-blue-600 group-hover:text-primary group-hover:underline">
                          {exam.patientName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {exam.type} • {exam.time}
                        </div>
                      </div>
                    </Link>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="hover:text-black">
                        <Clipboard className="mr-2 h-4 w-4" />
                        Start Pre-Testing
                      </Button>
                      <Button size="sm" className="hover:bg-primary-dark">
                        <ClipboardCheck className="mr-2 h-4 w-4" />
                        Start Exam
                      </Button>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inProgress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>In Progress</CardTitle>
              <CardDescription>Examinations that are currently in progress</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredExaminations
                .filter((exam) => exam.status === "In Progress")
                .map((exam) => (
                  <div key={exam.id} className="mb-4 flex items-center justify-between rounded-lg border p-4">
                    <Link href={`/patients/${exam.patientId}`} className="group">
                      <div>
                        <div className="font-medium text-blue-600 group-hover:text-primary group-hover:underline">
                          {exam.patientName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {exam.type} • {exam.time}
                        </div>
                        <div className="mt-1 text-sm">
                          <Badge variant="outline">{exam.doctor}</Badge>
                        </div>
                      </div>
                    </Link>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" asChild className="hover:text-black">
                        <Link href={`/examinations/${exam.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </Button>
                      <Button size="sm" className="hover:bg-primary-dark">
                        <FileText className="mr-2 h-4 w-4" />
                        Complete Exam
                      </Button>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Exam Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Prescription</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExaminations
                    .filter((exam) => exam.status === "Completed")
                    .map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell>
                          <Link href={`/patients/${exam.patientId}`} className="group">
                            <div>
                              <div className="font-medium text-blue-600 group-hover:text-primary group-hover:underline">
                                {exam.patientName}
                              </div>
                              <div className="text-xs text-muted-foreground">{exam.patientId}</div>
                            </div>
                          </Link>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{exam.type}</div>
                          <div className="text-xs text-muted-foreground">{exam.id}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{exam.date}</div>
                          <div className="text-xs text-muted-foreground">{exam.time}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{exam.doctor}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={exam.prescriptionStatus === "Issued" ? "default" : "secondary"}>
                            {exam.prescriptionStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline" asChild className="hover:text-black">
                              <Link href={`/examinations/${exam.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Link>
                            </Button>
                            <Button size="sm" className="hover:bg-primary-dark">
                              <FileText className="mr-2 h-4 w-4" />
                              Print Report
                            </Button>
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
