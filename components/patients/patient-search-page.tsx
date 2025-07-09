"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, Calendar, Eye, FileText, MessageSquare, User, X, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/ui/date-picker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Mock patient data - in a real app, this would come from an API
const patients = [
  {
    id: "P-10042",
    name: "Sarah Johnson",
    dob: "05/12/1981",
    age: 42,
    gender: "Female",
    email: "sarah.j@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, CA 12345",
    status: "Active",
    lastVisit: "05/01/2023",
    nextVisit: "05/01/2024",
    doctor: "Dr. Williams",
    insurance: "Blue Cross",
    healthcareNumber: "HC123456789",
    balance: "$0.00",
    alerts: ["Diabetes", "Allergies"],
  },
  {
    id: "P-10043",
    name: "Michael Chen",
    dob: "09/23/1995",
    age: 28,
    gender: "Male",
    email: "michael.c@example.com",
    phone: "(555) 987-6543",
    address: "456 Oak Ave, Anytown, CA 12345",
    status: "Active",
    lastVisit: "04/15/2023",
    nextVisit: "10/15/2023",
    doctor: "Dr. Williams",
    insurance: "Aetna",
    healthcareNumber: "HC987654321",
    balance: "$75.00",
    alerts: [],
  },
  {
    id: "P-10044",
    name: "Robert Garcia",
    dob: "11/05/1988",
    age: 35,
    gender: "Male",
    email: "robert.g@example.com",
    phone: "(555) 456-7890",
    address: "789 Pine St, Anytown, CA 12345",
    status: "Active",
    lastVisit: "04/30/2023",
    nextVisit: "05/30/2023",
    doctor: "Dr. Smith",
    insurance: "Medicare",
    healthcareNumber: "HC456789123",
    balance: "$0.00",
    alerts: ["Post-LASIK"],
  },
  {
    id: "P-10045",
    name: "Emily Wilson",
    dob: "02/18/1971",
    age: 52,
    gender: "Female",
    email: "emily.w@example.com",
    phone: "(555) 789-0123",
    address: "321 Elm St, Anytown, CA 12345",
    status: "Active",
    lastVisit: "04/28/2023",
    nextVisit: "04/28/2024",
    doctor: "Dr. Williams",
    insurance: "United Healthcare",
    healthcareNumber: "HC789123456",
    balance: "$25.00",
    alerts: ["Glaucoma"],
  },
  {
    id: "P-10046",
    name: "Jessica Martinez",
    dob: "07/14/1992",
    age: 31,
    gender: "Female",
    email: "jessica.m@example.com",
    phone: "(555) 234-5678",
    address: "654 Maple Ave, Anytown, CA 12345",
    status: "Active",
    lastVisit: "04/20/2023",
    nextVisit: "10/20/2023",
    doctor: "Dr. Smith",
    insurance: "Cigna",
    healthcareNumber: "HC234567891",
    balance: "$0.00",
    alerts: [],
  },
  {
    id: "P-10047",
    name: "David Thompson",
    dob: "03/30/1978",
    age: 45,
    gender: "Male",
    email: "david.t@example.com",
    phone: "(555) 345-6789",
    address: "987 Cedar Rd, Anytown, CA 12345",
    status: "Inactive",
    lastVisit: "04/10/2023",
    nextVisit: "04/10/2024",
    doctor: "Dr. Williams",
    insurance: "Blue Shield",
    healthcareNumber: "HC345678912",
    balance: "$150.00",
    alerts: ["High Blood Pressure"],
  },
  {
    id: "P-10048",
    name: "Jennifer Lee",
    dob: "12/05/1994",
    age: 29,
    gender: "Female",
    email: "jennifer.l@example.com",
    phone: "(555) 456-7890",
    address: "654 Birch St, Anytown, CA 12345",
    status: "Active",
    lastVisit: "03/15/2023",
    nextVisit: "09/15/2023",
    doctor: "Dr. Smith",
    insurance: "Kaiser",
    healthcareNumber: "HC567891234",
    balance: "$0.00",
    alerts: [],
  },
]

export function PatientSearchPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [advancedSearch, setAdvancedSearch] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  // Advanced search filters
  const [dobFrom, setDobFrom] = useState<Date | undefined>(undefined)
  const [dobTo, setDobTo] = useState<Date | undefined>(undefined)
  const [selectedGender, setSelectedGender] = useState<string | undefined>(undefined)
  const [selectedInsurance, setSelectedInsurance] = useState<string | undefined>(undefined)
  const [selectedDoctor, setSelectedDoctor] = useState<string | undefined>(undefined)
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined)
  const [hasBalance, setHasBalance] = useState<boolean | undefined>(undefined)
  const [healthcareNumber, setHealthcareNumber] = useState<string>("")

  const handlePatientClick = (patientId: string) => {
    router.push(`/patients/${patientId}`)
  }

  const addFilter = (filter: string) => {
    if (!selectedFilters.includes(filter)) {
      setSelectedFilters([...selectedFilters, filter])
    }
  }

  const removeFilter = (filter: string) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter))
  }

  const filterPatients = () => {
    let filtered = patients

    // Apply text search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (patient) =>
          patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          patient.phone.includes(searchQuery) ||
          patient.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          patient.healthcareNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          patient.dob.includes(searchQuery),
      )
    }

    // Apply advanced filters if active
    if (advancedSearch) {
      if (selectedStatus) {
        filtered = filtered.filter((patient) => patient.status === selectedStatus)
      }

      if (selectedGender) {
        filtered = filtered.filter((patient) => patient.gender === selectedGender)
      }

      if (selectedInsurance) {
        filtered = filtered.filter((patient) => patient.insurance === selectedInsurance)
      }

      if (selectedDoctor) {
        filtered = filtered.filter((patient) => patient.doctor === selectedDoctor)
      }

      if (hasBalance !== undefined) {
        filtered = filtered.filter((patient) => {
          const balance = Number.parseFloat(patient.balance.replace("$", ""))
          return hasBalance ? balance > 0 : balance === 0
        })
      }

      if (healthcareNumber) {
        filtered = filtered.filter((patient) =>
          patient.healthcareNumber.toLowerCase().includes(healthcareNumber.toLowerCase()),
        )
      }

      // Date of birth filtering
      if (dobFrom) {
        const fromDate = new Date(dobFrom)
        filtered = filtered.filter((patient) => {
          const patientDob = new Date(patient.dob)
          return patientDob >= fromDate
        })
      }

      if (dobTo) {
        const toDate = new Date(dobTo)
        filtered = filtered.filter((patient) => {
          const patientDob = new Date(patient.dob)
          return patientDob <= toDate
        })
      }
    }

    return filtered
  }

  const filteredPatients = filterPatients()

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patient Search</h1>
          <p className="text-muted-foreground">Search for patients by name, ID, phone, DOB, or healthcare number</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/patients/new">
              <UserPlus className="mr-1 h-4 w-4" />
              New Patient
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <CardTitle>Search Patients</CardTitle>
            <Button variant="outline" onClick={() => setAdvancedSearch(!advancedSearch)}>
              {advancedSearch ? "Simple Search" : "Advanced Search"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by name, ID, phone, DOB, healthcare number, or address..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit">Search</Button>
            </div>

            {advancedSearch && (
              <div className="space-y-4 rounded-md border p-4">
                <div className="flex flex-wrap gap-2">
                  {selectedFilters.map((filter) => (
                    <Badge key={filter} variant="secondary" className="gap-1">
                      {filter}
                      <Button variant="ghost" size="icon" className="h-4 w-4 p-0" onClick={() => removeFilter(filter)}>
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {filter} filter</span>
                      </Button>
                    </Badge>
                  ))}
                  {selectedFilters.length > 0 && (
                    <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setSelectedFilters([])}>
                      Clear all
                    </Button>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      onValueChange={(value) => {
                        setSelectedStatus(value)
                        addFilter(`Status: ${value}`)
                      }}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      onValueChange={(value) => {
                        setSelectedGender(value)
                        addFilter(`Gender: ${value}`)
                      }}
                    >
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="insurance">Insurance</Label>
                    <Select
                      onValueChange={(value) => {
                        setSelectedInsurance(value)
                        addFilter(`Insurance: ${value}`)
                      }}
                    >
                      <SelectTrigger id="insurance">
                        <SelectValue placeholder="Select insurance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Blue Cross">Blue Cross</SelectItem>
                        <SelectItem value="Aetna">Aetna</SelectItem>
                        <SelectItem value="Medicare">Medicare</SelectItem>
                        <SelectItem value="United Healthcare">United Healthcare</SelectItem>
                        <SelectItem value="Cigna">Cigna</SelectItem>
                        <SelectItem value="Blue Shield">Blue Shield</SelectItem>
                        <SelectItem value="Kaiser">Kaiser</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="doctor">Doctor</Label>
                    <Select
                      onValueChange={(value) => {
                        setSelectedDoctor(value)
                        addFilter(`Doctor: ${value}`)
                      }}
                    >
                      <SelectTrigger id="doctor">
                        <SelectValue placeholder="Select doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dr. Williams">Dr. Williams</SelectItem>
                        <SelectItem value="Dr. Smith">Dr. Smith</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="healthcareNumber">Healthcare Number</Label>
                    <Input
                      id="healthcareNumber"
                      placeholder="Enter healthcare number"
                      value={healthcareNumber}
                      onChange={(e) => {
                        setHealthcareNumber(e.target.value)
                        if (e.target.value) {
                          addFilter(`Healthcare #: ${e.target.value}`)
                        }
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Birth Date Range</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <DatePicker
                        date={dobFrom}
                        setDate={(date) => {
                          setDobFrom(date)
                          if (date) {
                            const formattedDate = date.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                            addFilter(`DOB From: ${formattedDate}`)
                          }
                        }}
                      />
                      <DatePicker
                        date={dobTo}
                        setDate={(date) => {
                          setDobTo(date)
                          if (date) {
                            const formattedDate = date.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                            addFilter(`DOB To: ${formattedDate}`)
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Balance Status</Label>
                    <RadioGroup
                      onValueChange={(value) => {
                        const hasBalanceValue = value === "has-balance"
                        setHasBalance(value === "has-balance" ? true : value === "no-balance" ? false : undefined)
                        if (value === "has-balance") {
                          addFilter("Has Balance")
                        } else if (value === "no-balance") {
                          addFilter("No Balance")
                        }
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="has-balance" id="has-balance" />
                        <Label htmlFor="has-balance">Has Balance</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no-balance" id="no-balance" />
                        <Label htmlFor="no-balance">No Balance</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="any" id="any-balance" />
                        <Label htmlFor="any-balance">Any</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedFilters([])
                      setSelectedStatus(undefined)
                      setSelectedGender(undefined)
                      setSelectedInsurance(undefined)
                      setSelectedDoctor(undefined)
                      setHasBalance(undefined)
                      setDobFrom(undefined)
                      setDobTo(undefined)
                      setHealthcareNumber("")
                    }}
                  >
                    Reset Filters
                  </Button>
                  <Button>Apply Filters</Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="grid" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Search Results</h2>
            <p className="text-sm text-muted-foreground">
              Found {filteredPatients.length} patient{filteredPatients.length !== 1 ? "s" : ""}
            </p>
          </div>
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="grid" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPatients.map((patient) => (
              <Card
                key={patient.id}
                className="cursor-pointer transition-shadow hover:shadow-md"
                onClick={() => handlePatientClick(patient.id)}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col gap-2">
                    <div>
                      <h3 className="font-medium">{patient.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{patient.id}</Badge>
                        {patient.status === "Active" ? (
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                          >
                            Active
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                          >
                            Inactive
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">DOB</p>
                        <p>
                          {patient.dob} ({patient.age}y)
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Phone</p>
                        <p>{patient.phone}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Visit</p>
                        <p>{patient.lastVisit}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Balance</p>
                        <p className={Number(patient.balance.replace("$", "")) > 0 ? "text-red-500 font-medium" : ""}>
                          {patient.balance}
                        </p>
                      </div>
                    </div>
                    {patient.alerts.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs font-medium text-muted-foreground">ALERTS</p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {patient.alerts.map((alert) => (
                            <Badge key={alert} variant="destructive" className="text-xs">
                              {alert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="mt-4 flex justify-between gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/patients/${patient.id}`}>
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/appointments/new?patient=${patient.id}`}>
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <div className="rounded-md border">
              <div className="grid grid-cols-7 border-b py-3 px-4 font-medium">
                <div className="col-span-2">Patient</div>
                <div>Contact</div>
                <div>Last Visit</div>
                <div>Insurance</div>
                <div>Balance</div>
                <div className="text-right">Actions</div>
              </div>
              <div className="divide-y">
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="grid grid-cols-7 items-center py-3 px-4 hover:bg-muted/50"
                    onClick={() => handlePatientClick(patient.id)}
                  >
                    <div className="col-span-2 flex items-center gap-3">
                      <div>
                        <div className="font-medium">{patient.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {patient.id} • {patient.age}y {patient.gender.charAt(0)}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm">{patient.phone}</div>
                      <div className="text-xs text-muted-foreground">{patient.email}</div>
                    </div>
                    <div>
                      <div className="text-sm">{patient.lastVisit}</div>
                      <div className="text-xs text-muted-foreground">Next: {patient.nextVisit}</div>
                    </div>
                    <div>
                      <div className="text-sm">{patient.insurance}</div>
                    </div>
                    <div>
                      <div
                        className={`text-sm ${Number(patient.balance.replace("$", "")) > 0 ? "text-red-500 font-medium" : ""}`}
                      >
                        {patient.balance}
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/patients/${patient.id}`}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View Profile</span>
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/appointments/new?patient=${patient.id}`}>
                          <Calendar className="h-4 w-4" />
                          <span className="sr-only">Schedule</span>
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/examinations/new?patient=${patient.id}`}>
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">New Exam</span>
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/communications?patient=${patient.id}`}>
                          <MessageSquare className="h-4 w-4" />
                          <span className="sr-only">Message</span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
