"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"

// Add FormState interface
interface FormState {
  message: string
  errors: Record<string, string[]>
  success: boolean
}

// Define validation schema
const PatientSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["female", "male", "other"], {
    required_error: "Gender is required",
  }),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  insurance: z.enum(["blueCross", "aetna", "medicare", "unitedHealthcare", "cigna"], {
    required_error: "Insurance is required",
  }),
  policyNumber: z.string().optional(),
  medicalNotes: z.string().optional(),
})

export async function createPatient(state: FormState, formData: FormData) {
  // Convert FormData to object
  const rawFormData = Object.fromEntries(formData.entries())

  // Validate form data
  const validationResult = PatientSchema.safeParse(rawFormData)

  if (!validationResult.success) {
    return {
      message: "Validation failed. Please check the form for errors.",
      errors: validationResult.error.flatten().fieldErrors,
      success: false,
    }
  }

  try {
    // In a real app, you would save to a database here
    // For demo purposes, we'll just simulate a successful save
    console.log("Patient data:", validationResult.data)

    // Wait for a moment to simulate server processing
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Revalidate the patients list page
    revalidatePath("/patients")

    return {
      message: "Patient created successfully!",
      errors: {},
      success: true,
    }
  } catch (error) {
    console.error("Error creating patient:", error)
    return {
      message: "Failed to create patient. Please try again.",
      errors: {},
      success: false,
    }
  }
}

