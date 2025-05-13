"use client"

import { useState } from "react"
import { Search, Filter as FilterIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Circle, Clock } from "lucide-react"

const examinations = [
  {
    id: "E-10042",
    patientId: "P-10042",
    patientName: "Sarah Johnson",
    examType: "Annual Exam",
    time: "9:00 AM",
    date: "05/01/2023",
    doctor: "Dr. Williams",
    status: "Completed",
    workflow: {
      preTest: "Completed",
      exam: "Completed",
      rx: "Issued",
    },
  },
  {
    id: "E-10043",
    patientId: "P-10043",
    patientName: "Michael Chen",
    examType: "Contact Lens Fitting",
    time: "10:00 AM",
    date: "05/01/2023",
    doctor: "Dr. Williams",
    status: "In Progress",
    workflow: {
      preTest: "Completed",
      exam: "In Progress",
      rx: "In Progress",
    },
  },
  {
    id: "E-10044",
    patientId: "P-10044",
    patientName: "Robert Garcia",
    examType: "Follow-up",
    time: "11:00 AM",
    date: "05/01/2023",
    doctor: "Dr. Smith",
    status: "Waiting",
    workflow: {
      preTest: "Pending",
      exam: "Pending",
      rx: "Pending",
    },
  },
  {
    id: "E-10045",
    patientId: "P-10045",
    patientName: "Emily Wilson",
    examType: "Comprehensive Exam",
    time: "1:00 PM",
    date: "05/01/2023",
    doctor: "Dr. Williams",
    status: "Scheduled",
    workflow: {
      preTest: "Pending",
      exam: "Pending",
      rx: "Pending",
    },
  },
  {
    id: "E-10046",
    patientId: "P-10046",
    patientName: "Jessica Martinez",
    examType: "Annual Exam",
    time: "2:00 PM",
    date: "05/01/2023",
    doctor: "Dr. Smith",
    status: "Scheduled",
    workflow: {
      preTest: "Pending",
      exam: "Pending",
      rx: "Pending",
    },
  },
]

interface ExaminationWorkflowProps {
  exam: {
    preTestingStatus: string
    examStatus: string
    prescriptionStatus: string
  }
}

function WorkflowStatus({ exam }: { exam: any }) {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex flex-col items-center">
        {exam.workflow.preTest === "Completed" ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : exam.workflow.preTest === "In Progress" ? (
          <Clock className="h-5 w-5 text-blue-500" />
        ) : (
          <Circle className="h-5 w-5 text-gray-300" />
        )}
        <span className="text-xs mt-1">Pre-Test</span>
      </div>
      <div className="flex flex-col items-center">
        {exam.workflow.exam === "Completed" ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : exam.workflow.exam === "In Progress" ? (
          <Clock className="h-5 w-5 text-blue-500" />
        ) : (
          <Circle className="h-5 w-5 text-gray-300" />
        )}
        <span className="text-xs mt-1">Exam</span>
      </div>
      <div className="flex flex-col items-center">
        {exam.workflow.rx === "Issued" ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : exam.workflow.rx === "In Progress" ? (
          <Clock className="h-5 w-5 text-blue-500" />
        ) : (
          <Circle className="h-5 w-5 text-gray-300" />
        )}
        <span className="text-xs mt-1">Rx</span>
      </div>
    </div>
  )
}

export function ExaminationWorkflow() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("today")

  // Filter examinations based on search query
  const filteredExaminations = examinations.filter(
    (exam) =>
      exam.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.examType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.doctor.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Filter examinations based on active tab
  const displayedExaminations = filteredExaminations.filter((exam) => {
    if (activeTab === "today") return true
    if (activeTab === "waiting") return exam.status === "Waiting"
    if (activeTab === "in-progress") return exam.status === "In Progress"
    if (activeTab === "completed") return exam.status === "Completed"
    return true
  })

  // Get status badge variant
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>
      case "In Progress":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">In Progress</Badge>
      case "Waiting":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Waiting</Badge>
      case "Scheduled":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Scheduled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Examinations</h1>
          <p className="text-muted-foreground">Manage patient examinations, testing, and prescriptions</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search examinations..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="sm:w-auto border-gray-300 text-gray-700">
          <FilterIcon className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <Tabs defaultValue="today" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="waiting">Waiting</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="today" className="mt-4">
          <div className="rounded-md border">
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
                {displayedExaminations.map((exam) => (
                  <TableRow key={exam.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="font-medium text-blue-600">{exam.patientName}</div>
                      <div className="text-sm text-gray-500">{exam.patientId}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{exam.examType}</div>
                      <div className="text-sm text-gray-500">{exam.id}</div>
                    </TableCell>
                    <TableCell>
                      <div>{exam.time}</div>
                      <div className="text-sm text-gray-500">{exam.date}</div>
                    </TableCell>
                    <TableCell>{exam.doctor}</TableCell>
                    <TableCell>{getStatusBadge(exam.status)}</TableCell>
                    <TableCell>
                      <WorkflowStatus exam={exam} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="border-gray-300 text-gray-700">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="waiting" className="mt-4">
          <div className="rounded-md border">
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
                {displayedExaminations
                  .filter((exam) => exam.status === "Waiting")
                  .map((exam) => (
                    <TableRow key={exam.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="font-medium text-blue-600">{exam.patientName}</div>
                        <div className="text-sm text-gray-500">{exam.patientId}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{exam.examType}</div>
                        <div className="text-sm text-gray-500">{exam.id}</div>
                      </TableCell>
                      <TableCell>
                        <div>{exam.time}</div>
                        <div className="text-sm text-gray-500">{exam.date}</div>
                      </TableCell>
                      <TableCell>{exam.doctor}</TableCell>
                      <TableCell>{getStatusBadge(exam.status)}</TableCell>
                      <TableCell>
                        <WorkflowStatus exam={exam} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="border-gray-300 text-gray-700">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="in-progress" className="mt-4">
          <div className="rounded-md border">
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
                {displayedExaminations
                  .filter((exam) => exam.status === "In Progress")
                  .map((exam) => (
                    <TableRow key={exam.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="font-medium text-blue-600">{exam.patientName}</div>
                        <div className="text-sm text-gray-500">{exam.patientId}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{exam.examType}</div>
                        <div className="text-sm text-gray-500">{exam.id}</div>
                      </TableCell>
                      <TableCell>
                        <div>{exam.time}</div>
                        <div className="text-sm text-gray-500">{exam.date}</div>
                      </TableCell>
                      <TableCell>{exam.doctor}</TableCell>
                      <TableCell>{getStatusBadge(exam.status)}</TableCell>
                      <TableCell>
                        <WorkflowStatus exam={exam} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="border-gray-300 text-gray-700">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          <div className="rounded-md border">
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
                {displayedExaminations
                  .filter((exam) => exam.status === "Completed")
                  .map((exam) => (
                    <TableRow key={exam.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="font-medium text-blue-600">{exam.patientName}</div>
                        <div className="text-sm text-gray-500">{exam.patientId}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{exam.examType}</div>
                        <div className="text-sm text-gray-500">{exam.id}</div>
                      </TableCell>
                      <TableCell>
                        <div>{exam.time}</div>
                        <div className="text-sm text-gray-500">{exam.date}</div>
                      </TableCell>
                      <TableCell>{exam.doctor}</TableCell>
                      <TableCell>{getStatusBadge(exam.status)}</TableCell>
                      <TableCell>
                        <WorkflowStatus exam={exam} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="border-gray-300 text-gray-700">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
