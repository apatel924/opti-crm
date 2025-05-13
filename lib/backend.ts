// mock back end and routes for future implementation

import type { Patient, Appointment, Examination, Order, BillingRecord } from "./db"

// In-memory storage for our data
let patients: Patient[] = []
let appointments: Appointment[] = []
let examinations: Examination[] = []
let orders: Order[] = []
let billingRecords: BillingRecord[] = []

// Initialize with mock data from db.ts
import {
  getPatients as fetchPatients,
  getAppointments as fetchAppointments,
  getExaminations as fetchExaminations,
  getLabOrders as fetchOrders,
} from "./db"

// Initialize data
const initializeData = async () => {
  patients = await fetchPatients()
  appointments = await fetchAppointments()
  examinations = await fetchExaminations()
  orders = await fetchOrders()

  // Extract billing records from patients
  billingRecords = patients.flatMap((patient) => patient.billing || [])
}

// Call initialization
initializeData()

// Patient CRUD operations
export const getAllPatients = async (): Promise<Patient[]> => {
  return patients
}

export const getPatientById = async (id: string): Promise<Patient | null> => {
  return patients.find((p) => p.id === id) || null
}

export const createPatient = async (patientData: Partial<Patient>): Promise<Patient> => {
  const newId = `P-${10000 + patients.length}`
  const fullName = `${patientData.firstName} ${patientData.lastName}`

  const newPatient: Patient = {
    id: newId,
    firstName: patientData.firstName || "",
    lastName: patientData.lastName || "",
    fullName: fullName,
    dob: patientData.dob || "",
    age: patientData.age || 0,
    gender: patientData.gender || "",
    email: patientData.email || "",
    phone: patientData.phone || "",
    address: patientData.address || "",
    city: patientData.city || "",
    state: patientData.state || "",
    zipCode: patientData.zipCode || "",
    occupation: patientData.occupation || "",
    emergencyContact: patientData.emergencyContact || "",
    status: "New",
    lastVisit: "",
    nextVisit: "",
    preferredDoctor: patientData.preferredDoctor || "",
    insurance: {
      primary: patientData.insurance?.primary || "",
      policyNumber: patientData.insurance?.policyNumber || "",
      groupNumber: patientData.insurance?.groupNumber || "",
      effectiveDate: patientData.insurance?.effectiveDate || "",
      expirationDate: patientData.insurance?.expirationDate || "",
      copay: patientData.insurance?.copay || "",
      coverage: patientData.insurance?.coverage || "",
    },
    medicalAlerts: patientData.medicalAlerts || [],
    visionHistory: {
      currentRx: {
        rightEye: {
          sphere: "",
          cylinder: "",
          axis: "",
          add: "",
        },
        leftEye: {
          sphere: "",
          cylinder: "",
          axis: "",
          add: "",
        },
        pd: "",
        notes: "",
      },
      previousRx: [],
    },
    medicalHistory: {
      conditions: [],
      medications: [],
      allergies: [],
      familyHistory: [],
    },
    visits: [],
    orders: [],
    billing: [],
    documents: [],
    communications: [],
    notes: [],
  }

  patients.push(newPatient)
  return newPatient
}

export const updatePatient = async (id: string, patientData: Partial<Patient>): Promise<Patient | null> => {
  const index = patients.findIndex((p) => p.id === id)
  if (index === -1) return null

  patients[index] = { ...patients[index], ...patientData }
  return patients[index]
}

export const deletePatient = async (id: string): Promise<boolean> => {
  const initialLength = patients.length
  patients = patients.filter((p) => p.id !== id)
  return patients.length < initialLength
}

// Appointment CRUD operations
export const getAllAppointments = async (): Promise<Appointment[]> => {
  return appointments
}

export const getAppointmentsByPatientId = async (patientId: string): Promise<Appointment[]> => {
  return appointments.filter((a) => a.patientId === patientId)
}

export const getAppointmentsByDate = async (date: string): Promise<Appointment[]> => {
  return appointments.filter((a) => a.date === date)
}

export const getAppointmentsByDoctor = async (doctor: string): Promise<Appointment[]> => {
  return appointments.filter((a) => a.doctor === doctor)
}

export const createAppointment = async (appointmentData: Partial<Appointment>): Promise<Appointment> => {
  const newId = `A-${10000 + appointments.length}`

  // Find patient name if only ID is provided
  let patientName = appointmentData.patientName || ""
  if (appointmentData.patientId && !patientName) {
    const patient = await getPatientById(appointmentData.patientId)
    if (patient) {
      patientName = patient.fullName || `${patient.firstName} ${patient.lastName}`
    }
  }

  // Calculate end time based on duration
  let endTime = appointmentData.endTime || ""
  if (!endTime && appointmentData.time && appointmentData.duration) {
    // Simple calculation - in a real app would use a proper date library
    const [hours, minutes] = appointmentData.time.split(":").map(Number)
    const durationMinutes = Number.parseInt(appointmentData.duration)
    const endMinutes = (minutes + durationMinutes) % 60
    const endHours = hours + Math.floor((minutes + durationMinutes) / 60)
    endTime = `${endHours}:${endMinutes.toString().padStart(2, "0")}`
  }

  const newAppointment: Appointment = {
    id: newId,
    patientId: appointmentData.patientId || "",
    patientName: patientName,
    date: appointmentData.date || "",
    time: appointmentData.time || "",
    endTime: endTime,
    duration: appointmentData.duration || "30 min",
    type: appointmentData.type || "",
    doctor: appointmentData.doctor || "",
    status: appointmentData.status || "Scheduled",
    room: appointmentData.room || `Exam ${Math.floor(Math.random() * 3) + 1}`,
    notes: appointmentData.notes || "",
  }

  appointments.push(newAppointment)
  return newAppointment
}

export const updateAppointment = async (
  id: string,
  appointmentData: Partial<Appointment>,
): Promise<Appointment | null> => {
  const index = appointments.findIndex((a) => a.id === id)
  if (index === -1) return null

  appointments[index] = { ...appointments[index], ...appointmentData }
  return appointments[index]
}

export const deleteAppointment = async (id: string): Promise<boolean> => {
  const initialLength = appointments.length
  appointments = appointments.filter((a) => a.id !== id)
  return appointments.length < initialLength
}

// Order CRUD operations
export const getAllOrders = async (): Promise<Order[]> => {
  return orders
}

export const getOrdersByPatientId = async (patientId: string): Promise<Order[]> => {
  return orders.filter((o) => o.patientId === patientId)
}

export const getOrderById = async (id: string): Promise<Order | null> => {
  return orders.find((o) => o.id === id) || null
}

export const createOrder = async (orderData: Partial<Order>): Promise<Order> => {
  const newId = `LO-${10000 + orders.length}`

  const newOrder: Order = {
    id: newId,
    patientId: orderData.patientId || "",
    date: orderData.date || new Date().toLocaleDateString(),
    type: orderData.type || "Glasses",
    status: "Ordered",
    details: orderData.details || "",
    price: orderData.price || "$0.00",
    insurance: orderData.insurance || "$0.00",
    balance: orderData.balance || "$0.00",
    priority: orderData.priority || "Normal",
    dueDate: orderData.dueDate,
    lab: orderData.lab,
    prescription: orderData.prescription,
    frame: orderData.frame,
    lens: orderData.lens,
    contacts: orderData.contacts,
    notes: orderData.notes,
  }

  // Create associated billing record
  const billingId = `B-${10000 + billingRecords.length}`
  const newBilling: BillingRecord = {
    id: billingId,
    patientId: orderData.patientId || "",
    date: new Date().toLocaleDateString(),
    description: `${orderData.type} Order`,
    total: orderData.price || "$0.00",
    insurance: orderData.insurance || "$0.00",
    patient: orderData.balance || "$0.00",
    status: "Due",
    relatedEntityId: newId,
    relatedEntityType: "Order",
  }

  // Link the billing record to the order
  newOrder.billingId = billingId

  // Add to our collections
  orders.push(newOrder)
  billingRecords.push(newBilling)

  // Also add to the patient's orders and billing
  const patientIndex = patients.findIndex((p) => p.patientId === orderData.patientId)
  if (patientIndex !== -1) {
    patients[patientIndex].orders.push(newOrder)
    patients[patientIndex].billing.push(newBilling)
  }

  return newOrder
}

export const updateOrder = async (id: string, orderData: Partial<Order>): Promise<Order | null> => {
  const index = orders.findIndex((o) => o.id === id)
  if (index === -1) return null

  orders[index] = { ...orders[index], ...orderData }
  return orders[index]
}

export const deleteOrder = async (id: string): Promise<boolean> => {
  const initialLength = orders.length
  orders = orders.filter((o) => o.id !== id)
  return orders.length < initialLength
}

// Billing CRUD operations
export const getAllBillingRecords = async (): Promise<BillingRecord[]> => {
  return billingRecords
}

export const getBillingRecordsByPatientId = async (patientId: string): Promise<BillingRecord[]> => {
  return billingRecords.filter((b) => b.patientId === patientId)
}

export const getBillingRecordById = async (id: string): Promise<BillingRecord | null> => {
  return billingRecords.find((b) => b.id === id) || null
}

export const createBillingRecord = async (billingData: Partial<BillingRecord>): Promise<BillingRecord> => {
  const newId = `B-${10000 + billingRecords.length}`

  const newBilling: BillingRecord = {
    id: newId,
    patientId: billingData.patientId || "",
    date: billingData.date || new Date().toLocaleDateString(),
    description: billingData.description || "",
    serviceCode: billingData.serviceCode,
    total: billingData.total || "$0.00",
    insurance: billingData.insurance || "$0.00",
    patient: billingData.patient || "$0.00",
    status: billingData.status || "Due",
    paymentDate: billingData.paymentDate,
    paymentMethod: billingData.paymentMethod,
    relatedEntityId: billingData.relatedEntityId,
    relatedEntityType: billingData.relatedEntityType,
  }

  billingRecords.push(newBilling)

  // Also add to the patient's billing
  const patientIndex = patients.findIndex((p) => p.id === billingData.patientId)
  if (patientIndex !== -1) {
    patients[patientIndex].billing.push(newBilling)
  }

  return newBilling
}

export const updateBillingRecord = async (
  id: string,
  billingData: Partial<BillingRecord>,
): Promise<BillingRecord | null> => {
  const index = billingRecords.findIndex((b) => b.id === id)
  if (index === -1) return null

  billingRecords[index] = { ...billingRecords[index], ...billingData }
  return billingRecords[index]
}

// Examination CRUD operations
export const getAllExaminations = async (): Promise<Examination[]> => {
  return examinations
}

export const getExaminationsByPatientId = async (patientId: string): Promise<Examination[]> => {
  return examinations.filter((e) => e.patientId === patientId)
}

export const createExamination = async (examinationData: Partial<Examination>): Promise<Examination> => {
  const newId = `E-${10000 + examinations.length}`

  // Find patient name if only ID is provided
  let patientName = examinationData.patientName || ""
  if (examinationData.patientId && !patientName) {
    const patient = await getPatientById(examinationData.patientId)
    if (patient) {
      patientName = patient.fullName || `${patient.firstName} ${patient.lastName}`
    }
  }

  const newExamination: Examination = {
    id: newId,
    patientId: examinationData.patientId || "",
    patientName: patientName,
    date: examinationData.date || "",
    time: examinationData.time || "",
    type: examinationData.type || "",
    doctor: examinationData.doctor || "",
    status: examinationData.status || "Scheduled",
    preTestingStatus: examinationData.preTestingStatus || "Pending",
    examStatus: examinationData.examStatus || "Pending",
    prescriptionStatus: examinationData.prescriptionStatus || "Pending",
    notes: examinationData.notes || "",
    prescription: examinationData.prescription,
  }

  examinations.push(newExamination)
  return newExamination
}

// Export all functions
export default {
  // Patient operations
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,

  // Appointment operations
  getAllAppointments,
  getAppointmentsByPatientId,
  getAppointmentsByDate,
  getAppointmentsByDoctor,
  createAppointment,
  updateAppointment,
  deleteAppointment,

  // Order operations
  getAllOrders,
  getOrdersByPatientId,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,

  // Billing operations
  getAllBillingRecords,
  getBillingRecordsByPatientId,
  getBillingRecordById,
  createBillingRecord,
  updateBillingRecord,

  // Examination operations
  getAllExaminations,
  getExaminationsByPatientId,
  createExamination,
}
