"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function PatientForm() {
  const router = useRouter()

  return (
    <form>
      <Card>
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
          <CardDescription>Enter the patient's personal and contact information</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">Create Patient</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
