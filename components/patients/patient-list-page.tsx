"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Search, Filter, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { PatientFilters } from "@/components/patients/patient-filters"
import { getPatients } from "@/lib/db"
import type { Patient } from "@/lib/db"

export function PatientListPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [sortColumn, setSortColumn] = useState("lastName")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPatients() {
      try {
        const patientData = await getPatients()
        setPatients(patientData)
      } catch (err) {
        console.error("Error loading patients:", err)
      } finally {
        setLoading(false)
      }
    }

    loadPatients()
  }, [])

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const filteredPatients = patients.filter(
    (patient) =>
      (patient.firstName + " " + patient.lastName).toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery) ||
      patient.email.toLowerCase().includes(searchQuery),
  )

  const sortedPatients = [...filteredPatients].sort((a, b) => {
    let aValue, bValue

    if (sortColumn === "fullName") {
      aValue = `${a.firstName} ${a.lastName}`
      bValue = `${b.firstName} ${b.lastName}`
    } else if (sortColumn === "lastName") {
      aValue = a.lastName
      bValue = b.lastName
    } else {
      aValue = a[sortColumn as keyof typeof a]
      bValue = b[sortColumn as keyof typeof b]
    }

    if (aValue && bValue && aValue < bValue) {
      return sortDirection === "asc" ? -1 : 1
    }
    if (aValue && bValue && aValue > bValue) {
      return sortDirection === "asc" ? 1 : -1
    }
    return 0
  })

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-muted-foreground">Loading patients...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
          <p className="text-muted-foreground">Manage and view patient records</p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
          <Link href="/patients/new">
            <Plus className="mr-2 h-4 w-4" />
            New Patient
          </Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search patients..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          className="sm:w-auto border-gray-300 text-gray-700"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {showFilters && <PatientFilters />}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <div className="flex items-center cursor-pointer" onClick={() => handleSort("id")}>
                  ID
                  {sortColumn === "id" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center cursor-pointer" onClick={() => handleSort("lastName")}>
                  Name
                  {sortColumn === "lastName" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                </div>
              </TableHead>
              <TableHead>DOB</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead>Next Visit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPatients.map((patient) => (
              <TableRow key={patient.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{patient.id}</TableCell>
                <TableCell>
                  <Link href={`/patients/${patient.id}`} className="cursor-pointer hover:underline">
                    <div className="font-medium text-blue-600">
                      {patient.fullName || `${patient.firstName} ${patient.lastName}`}
                    </div>
                    <div className="text-sm text-gray-500">{patient.email}</div>
                  </Link>
                </TableCell>
                <TableCell className="text-gray-700">
                  {patient.dob} ({patient.age}y)
                </TableCell>
                <TableCell className="text-gray-700">{patient.phone}</TableCell>
                <TableCell className="text-gray-700">{patient.lastVisit || "—"}</TableCell>
                <TableCell className="text-gray-700">{patient.nextVisit || "—"}</TableCell>
                <TableCell>
                  <Badge
                    variant={patient.status === "Active" ? "outline" : "secondary"}
                    className={
                      patient.status === "Active"
                        ? "border-green-500 text-green-600"
                        : patient.status === "New"
                          ? "border-blue-500 text-blue-600"
                          : "text-gray-500"
                    }
                  >
                    {patient.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="border-gray-300 text-gray-700">
                        Actions
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href={`/patients/${patient.id}`}>View Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href={`/appointments/new?patientId=${patient.id}`}>Schedule Appointment</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">Send Message</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
