"use server"

import { revalidatePath } from "next/cache"

// Mock appointments data
const appointments = [
  {
    id: "A-10001",
    patientId: "P-10042",
    patientName: "Sarah Johnson",
    date: "2025-05-01",
    time: "09:00",
    endTime: "09:30",
    appointmentType: "annual",
    doctor: "dr-williams",
    duration: "30",
    status: "confirmed",
    room: "Exam 1",
    notes: "",
  },
  {
    id: "A-10002",
    patientId: "P-10043",
    patientName: "Michael Chen",
    date: "2025-05-01",
    time: "08:00",
    endTime: "08:45",
    appointmentType: "contact",
    doctor: "dr-williams",
    duration: "45",
    status: "confirmed",
    room: "Exam 2",
    notes: "Contact lens fitting follow-up",
  },
]

export async function createAppointment(data: any) {
  try {
    // Generate a unique ID
    const id = `A-${10000 + appointments.length + 3}`

    // Calculate end time based on duration
    const [hours, minutes] = data.time.split(":").map(Number)
    const startDate = new Date()
    startDate.setHours(hours, minutes, 0)

    const endDate = new Date(startDate)
    endDate.setMinutes(endDate.getMinutes() + Number.parseInt(data.duration))

    const endTime = `${endDate.getHours().toString().padStart(2, "0")}:${endDate.getMinutes().toString().padStart(2, "0")}`

    // Randomly assign an exam room
    const rooms = ["Exam 1", "Exam 2", "Exam 3", "Exam 4"]
    const room = rooms[Math.floor(Math.random() * rooms.length)]

    // Create the appointment
    const appointment = {
      id,
      patientId: data.patientId,
      patientName: data.patientName,
      date: data.date,
      time: data.time,
      endTime,
      appointmentType: data.appointmentType,
      doctor: data.doctor,
      duration: data.duration,
      status: "confirmed",
      room,
      notes: data.notes || "",
    }

    // Add to our mock database
    appointments.push(appointment)

    // Revalidate the appointments page to show the new appointment
    revalidatePath("/appointments")

    return { success: true, appointment }
  } catch (error) {
    console.error("Error creating appointment:", error)
    return { success: false, message: "Failed to create appointment" }
  }
}
