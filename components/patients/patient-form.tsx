"use client"

import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { createPatient } from "@/lib/actions/patient-actions"
import { useEffect } from "react"

interface FormState {
  message: string
  errors: Record<string, string[]>
  success: boolean
}

// Initial state for the form
const initialState: FormState = {
  message: "",
  errors: {},
  success: false,
}

export function PatientForm() {
  const router = useRouter()
  const [state, formAction] = useActionState<FormState, FormData>(createPatient, initialState)

  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        router.push("/patients")
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [state.success, router])

  return (
    <form action={formAction}>
      <Card>
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
          <CardDescription>Enter the patient's personal and contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="firstName" required />
              {state.errors?.firstName?.[0] && <p className="text-sm text-red-500">{state.errors.firstName[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" required />
              {state.errors?.lastName?.[0] && <p className="text-sm text-red-500">{state.errors.lastName[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" name="dob" type="date" required />
              {state.errors?.dob?.[0] && <p className="text-sm text-red-500">{state.errors.dob[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select name="gender" defaultValue="female">
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {state.errors?.gender?.[0] && <p className="text-sm text-red-500">{state.errors.gender[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
              {state.errors?.email?.[0] && <p className="text-sm text-red-500">{state.errors.email[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" required />
              {state.errors?.phone?.[0] && <p className="text-sm text-red-500">{state.errors.phone[0]}</p>}
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" name="address" required />
              {state.errors?.address?.[0] && <p className="text-sm text-red-500">{state.errors.address[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="insurance">Primary Insurance</Label>
              <Select name="insurance" defaultValue="blueCross">
                <SelectTrigger id="insurance">
                  <SelectValue placeholder="Select insurance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blueCross">Blue Cross</SelectItem>
                  <SelectItem value="aetna">Aetna</SelectItem>
                  <SelectItem value="medicare">Medicare</SelectItem>
                  <SelectItem value="unitedHealthcare">United Healthcare</SelectItem>
                  <SelectItem value="cigna">Cigna</SelectItem>
                </SelectContent>
              </Select>
              {state.errors?.insurance?.[0] && <p className="text-sm text-red-500">{state.errors.insurance[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="policyNumber">Policy Number</Label>
              <Input id="policyNumber" name="policyNumber" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="medicalNotes">Medical Notes</Label>
            <Textarea
              id="medicalNotes"
              name="medicalNotes"
              placeholder="Enter any relevant medical history or conditions"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">Create Patient</Button>
        </CardFooter>
        {state.message && (
          <p className={`px-6 pb-4 text-sm ${state.success ? "text-green-500" : "text-red-500"}`}>{state.message}</p>
        )}
      </Card>
    </form>
  )
}
