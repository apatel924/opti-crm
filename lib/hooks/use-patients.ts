"use client"

import { useState, useEffect } from "react"

// Sample patients data - in a real app, this would come from an API
const patientsData = [
  {
    id: "P-10042",
    name: "Sarah Johnson",
    age: 42,
    dob: "05/12/1981",
    phone: "(555) 123-4567",
    email: "sarah.j@example.com",
    lastVisit: "05/01/2023",
    nextVisit: "05/01/2024",
    doctor: "Dr. Williams",
    status: "Active",
    insurance: "Blue Cross",
    balance: "$0.00",
    alerts: ["Diabetes", "Allergies"],
  },
  {
    id: "P-10043",
    name: "Michael Chen",
    age: 28,
    dob: "09/23/1995",
    phone: "(555) 987-6543",
    email: "michael.c@example.com",
    lastVisit: "04/15/2023",
    nextVisit: "10/15/2023",
    doctor: "Dr. Williams",
    status: "Active",
    insurance: "Aetna",
    balance: "$75.00",
    alerts: [],
  },
  {
    id: "P-10044",
    name: "Robert Garcia",
    age: 35,
    dob: "11/05/1988",
    phone: "(555) 456-7890",
    email: "robert.g@example.com",
    lastVisit: "04/30/2023",
    nextVisit: "05/30/2023",
    doctor: "Dr. Smith",
    status: "Active",
    insurance: "Medicare",
    balance: "$0.00",
    alerts: ["Post-LASIK"],
  },
  {
    id: "P-10045",
    name: "Emily Wilson",
    age: 52,
    dob: "02/18/1971",
    phone: "(555) 789-0123",
    email: "emily.w@example.com",
    lastVisit: "04/28/2023",
    nextVisit: "04/28/2024",
    doctor: "Dr. Williams",
    status: "Active",
    insurance: "United Healthcare",
    balance: "$25.00",
    alerts: ["Glaucoma"],
  },
  {
    id: "P-10046",
    name: "Jessica Martinez",
    age: 31,
    dob: "07/14/1992",
    phone: "(555) 234-5678",
    email: "jessica.m@example.com",
    lastVisit: "04/20/2023",
    nextVisit: "10/20/2023",
    doctor: "Dr. Smith",
    status: "Active",
    insurance: "Cigna",
    balance: "$0.00",
    alerts: [],
  },
  {
    id: "P-10047",
    name: "David Thompson",
    age: 45,
    dob: "03/30/1978",
    phone: "(555) 345-6789",
    email: "david.t@example.com",
    lastVisit: "04/10/2023",
    nextVisit: "04/10/2024",
    doctor: "Dr. Williams",
    status: "Inactive",
    insurance: "Blue Shield",
    balance: "$150.00",
    alerts: ["High Blood Pressure"],
  },
  {
    id: "P-10048",
    name: "Jennifer Lee",
    age: 29,
    dob: "12/05/1994",
    phone: "(555) 456-7890",
    email: "jennifer.l@example.com",
    lastVisit: "03/15/2023",
    nextVisit: "09/15/2023",
    doctor: "Dr. Smith",
    status: "Active",
    insurance: "Kaiser",
    balance: "$0.00",
    alerts: [],
  },
]

export function usePatients() {
  const [patients, setPatients] = useState<typeof patientsData>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call
    const fetchPatients = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setPatients(patientsData)
        setIsLoading(false)
      } catch (err) {
        setError("Failed to load patients")
        setIsLoading(false)
      }
    }

    fetchPatients()
  }, [])

  return { patients, isLoading, error }
}
