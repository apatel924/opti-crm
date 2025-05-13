// This file serves as our mock database implementation
// In a real application, this would connect to a real database

// Define comprehensive types for our data model
export type Patient = {
    id: string
    firstName: string
    lastName: string
    fullName?: string // Computed field
    dob: string
    age: number
    gender: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zipCode: string
    occupation: string
    emergencyContact: string
    status: "Active" | "Inactive" | "New"
    lastVisit: string
    nextVisit: string
    preferredDoctor: string
    insurance: Insurance
    medicalAlerts: string[]
    visionHistory: VisionHistory
    medicalHistory: MedicalHistory
    visits: Visit[]
    orders: Order[]
    billing: BillingRecord[]
    documents: Document[]
    communications: Communication[]
    notes: Note[]
  }
  
  export type Insurance = {
    primary: string
    policyNumber: string
    groupNumber: string
    effectiveDate: string
    expirationDate: string
    copay: string
    coverage: string
    secondaryInsurance?: {
      provider: string
      policyNumber: string
      groupNumber: string
    }
  }
  
  export type VisionHistory = {
    currentRx: Prescription
    previousRx: Prescription[]
  }
  
  export type Prescription = {
    date?: string
    rightEye: {
      sphere: string
      cylinder: string
      axis: string
      add: string
    }
    leftEye: {
      sphere: string
      cylinder: string
      axis: string
      add: string
    }
    pd: string
    notes: string
    expirationDate?: string
  }
  
  export type MedicalHistory = {
    conditions: string[]
    medications: string[]
    allergies: string[]
    familyHistory: string[]
  }
  
  export type Visit = {
    id: string
    date: string
    type: string
    doctor: string
    reason: string
    notes: string
    diagnosis: string
    followUp: string
    billingId?: string // Reference to associated billing record
  }
  
  export type Order = {
    id: string
    patientId: string
    date: string
    type: "Glasses" | "Contact Lenses" | "Accessories" | "Other"
    status: "Ordered" | "In Progress" | "Ready for Pickup" | "Dispensed" | "Delayed"
    details: string
    price: string
    insurance: string
    balance: string
    priority: "Normal" | "Rush" | "High"
    dueDate?: string
    receivedDate?: string
    lab?: string
    prescription?: Prescription
    billingId?: string // Reference to associated billing record
    notes?: string
    // Specific fields for glasses
    frame?: {
      manufacturer: string
      model: string
      color: string
      size: string
      source: "Stock" | "Order" | "Patient"
      cost: string
    }
    lens?: {
      type: string
      coating: string[]
      brand: string
      cost: string
    }
    // Specific fields for contact lenses
    contacts?: {
      brand: string
      rightEye: {
        power: string
        baseCurve: string
        diameter: string
        cylinder?: string
        axis?: string
        quantity: number
      }
      leftEye: {
        power: string
        baseCurve: string
        diameter: string
        cylinder?: string
        axis?: string
        quantity: number
      }
      supplyDuration: string
    }
  }
  
  export type BillingRecord = {
    id: string
    patientId: string
    date: string
    description: string
    serviceCode?: string // Healthcare billing code
    total: string
    insurance: string
    patient: string
    status: "Due" | "Paid" | "Partial" | "Insurance Pending"
    paymentDate?: string
    paymentMethod?: string
    relatedEntityId?: string // Can reference an order, visit, or examination
    relatedEntityType?: "Order" | "Visit" | "Examination"
  }
  
  export type Document = {
    id: string
    name: string
    type: string
    date: string
    uploadedBy: string
    url?: string
  }
  
  export type Communication = {
    id: string
    date: string
    type: "Email" | "SMS" | "Phone" | "Letter"
    subject: string
    content: string
    sentBy: string
    status?: "Sent" | "Delivered" | "Read" | "Failed"
  }
  
  export type Note = {
    id: string
    date: string
    title: string
    content: string
    author: string
  }
  
  export type Appointment = {
    id: string
    patientId: string
    patientName: string
    date: string
    time: string
    endTime: string
    duration: string
    type: string
    doctor: string
    status: "Scheduled" | "Checked In" | "In Progress" | "Completed" | "Cancelled" | "No Show"
    room?: string
    notes?: string
    billingId?: string // Reference to associated billing record
  }
  
  export type Examination = {
    id: string
    patientId: string
    patientName: string
    date: string
    time: string
    type: string
    doctor: string
    status: "Scheduled" | "Waiting" | "In Progress" | "Completed" | "Cancelled"
    preTestingStatus: "Pending" | "In Progress" | "Completed"
    examStatus: "Pending" | "In Progress" | "Completed"
    prescriptionStatus: "Pending" | "Issued"
    notes: string
    prescription?: Prescription
    billingId?: string // Reference to associated billing record
  }
  
  export type User = {
    id: string
    username: string
    password: string
    name: string
    role: string
    email: string
  }
  
  // Mock data - in a real app, this would come from a database
  const mockPatients: Patient[] = [
    {
      id: "P-10042",
      firstName: "Sarah",
      lastName: "Johnson",
      fullName: "Sarah Johnson",
      dob: "05/12/1981",
      age: 42,
      gender: "Female",
      email: "sarah.j@example.com",
      phone: "(555) 123-4567",
      address: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      occupation: "Teacher",
      emergencyContact: "Michael Johnson (Husband) - (555) 987-6543",
      status: "Active",
      lastVisit: "05/01/2023",
      nextVisit: "05/01/2024",
      preferredDoctor: "Dr. Williams",
      insurance: {
        primary: "Blue Cross",
        policyNumber: "BC123456789",
        groupNumber: "GRP987654",
        effectiveDate: "01/01/2023",
        expirationDate: "12/31/2023",
        copay: "$20",
        coverage: "80%",
      },
      medicalAlerts: ["Diabetes", "Allergies to penicillin"],
      visionHistory: {
        currentRx: {
          date: "05/01/2023",
          rightEye: {
            sphere: "-2.00",
            cylinder: "-0.75",
            axis: "180",
            add: "+2.00",
          },
          leftEye: {
            sphere: "-1.75",
            cylinder: "-0.50",
            axis: "175",
            add: "+2.00",
          },
          pd: "63",
          notes: "Progressive lenses",
          expirationDate: "05/01/2024",
        },
        previousRx: [
          {
            date: "05/01/2022",
            rightEye: {
              sphere: "-1.75",
              cylinder: "-0.75",
              axis: "180",
              add: "+1.75",
            },
            leftEye: {
              sphere: "-1.50",
              cylinder: "-0.50",
              axis: "175",
              add: "+1.75",
            },
            pd: "63",
            notes: "",
          },
        ],
      },
      medicalHistory: {
        conditions: ["Type 2 Diabetes (diagnosed 2015)", "Hypertension"],
        medications: ["Metformin 500mg twice daily", "Lisinopril 10mg daily"],
        allergies: ["Penicillin", "Sulfa drugs"],
        familyHistory: ["Father: Glaucoma", "Mother: Cataracts"],
      },
      visits: [
        {
          id: "V-10042",
          date: "05/01/2023",
          type: "Annual Exam",
          doctor: "Dr. Williams",
          reason: "Routine eye examination",
          notes: "Patient reports occasional blurry vision when reading. Recommended progressive lenses.",
          diagnosis: "Presbyopia, Mild Astigmatism",
          followUp: "1 year",
          billingId: "B-10042",
        },
        {
          id: "V-10041",
          date: "05/01/2022",
          type: "Annual Exam",
          doctor: "Dr. Williams",
          reason: "Routine eye examination",
          notes: "No significant changes from previous exam.",
          diagnosis: "Presbyopia, Mild Astigmatism",
          followUp: "1 year",
          billingId: "B-10041",
        },
      ],
      orders: [
        {
          id: "O-10042",
          patientId: "P-10042",
          date: "05/01/2023",
          type: "Glasses",
          status: "In Progress",
          details: "Ray-Ban RB5154 frame with Essilor Varilux progressive lenses",
          price: "$450.00",
          insurance: "$360.00",
          balance: "$90.00",
          priority: "Normal",
          lab: "Vision Labs",
          billingId: "B-10043",
          prescription: {
            rightEye: {
              sphere: "-2.00",
              cylinder: "-0.75",
              axis: "180",
              add: "+2.00",
            },
            leftEye: {
              sphere: "-1.75",
              cylinder: "-0.50",
              axis: "175",
              add: "+2.00",
            },
            pd: "63",
            notes: "Progressive lenses",
          },
          frame: {
            manufacturer: "Ray-Ban",
            model: "RB5154",
            color: "Black",
            size: "52-18-140",
            source: "Stock",
            cost: "$150.00",
          },
          lens: {
            type: "Progressive",
            coating: ["Anti-Reflective", "Scratch Resistant", "UV Protection"],
            brand: "Essilor Varilux",
            cost: "$300.00",
          },
        },
        {
          id: "O-10041",
          patientId: "P-10042",
          date: "05/01/2022",
          type: "Glasses",
          status: "Dispensed",
          details: "Oakley OX8046 frame with Essilor Varilux progressive lenses",
          price: "$425.00",
          insurance: "$340.00",
          balance: "$85.00",
          priority: "Normal",
          lab: "Vision Labs",
          receivedDate: "05/15/2022",
          billingId: "B-10044",
        },
      ],
      billing: [
        {
          id: "B-10042",
          patientId: "P-10042",
          date: "05/01/2023",
          description: "Annual Eye Examination",
          serviceCode: "92004",
          total: "$150.00",
          insurance: "$120.00",
          patient: "$30.00",
          status: "Paid",
          paymentDate: "05/01/2023",
          paymentMethod: "Credit Card",
          relatedEntityId: "V-10042",
          relatedEntityType: "Visit",
        },
        {
          id: "B-10041",
          patientId: "P-10042",
          date: "05/01/2022",
          description: "Annual Eye Examination",
          serviceCode: "92004",
          total: "$150.00",
          insurance: "$120.00",
          patient: "$30.00",
          status: "Paid",
          relatedEntityId: "V-10041",
          relatedEntityType: "Visit",
        },
        {
          id: "B-10043",
          patientId: "P-10042",
          date: "05/01/2023",
          description: "Progressive Glasses",
          total: "$450.00",
          insurance: "$360.00",
          patient: "$90.00",
          status: "Due",
          relatedEntityId: "O-10042",
          relatedEntityType: "Order",
        },
        {
          id: "B-10044",
          patientId: "P-10042",
          date: "05/01/2022",
          description: "Progressive Glasses",
          total: "$425.00",
          insurance: "$340.00",
          patient: "$85.00",
          status: "Paid",
          paymentDate: "05/15/2022",
          paymentMethod: "Credit Card",
          relatedEntityId: "O-10041",
          relatedEntityType: "Order",
        },
      ],
      documents: [
        {
          id: "D-10042",
          name: "Insurance Card",
          type: "image/jpeg",
          date: "05/01/2023",
          uploadedBy: "Front Desk",
        },
        {
          id: "D-10041",
          name: "Medical Records Release",
          type: "application/pdf",
          date: "05/01/2023",
          uploadedBy: "Patient",
        },
        {
          id: "D-10043",
          name: "Previous Prescription",
          type: "application/pdf",
          date: "05/01/2022",
          uploadedBy: "Dr. Williams",
        },
      ],
      communications: [
        {
          id: "C-10042",
          date: "05/02/2023",
          type: "Email",
          subject: "Appointment Confirmation",
          content: "Thank you for your visit. Your next appointment is scheduled for May 1, 2024.",
          sentBy: "System",
        },
        {
          id: "C-10041",
          date: "04/25/2023",
          type: "SMS",
          subject: "Appointment Reminder",
          content: "Reminder: You have an appointment with Dr. Williams on May 1, 2023 at 10:00 AM.",
          sentBy: "System",
        },
      ],
      notes: [
        {
          id: "N-10042",
          date: "05/01/2023",
          title: "Patient Preferences",
          content:
            "Patient prefers appointment reminders via text message. Interested in trying contact lenses in the future.",
          author: "Dr. Williams",
        },
        {
          id: "N-10041",
          date: "05/01/2022",
          title: "Frame Selection Notes",
          content: "Patient prefers lightweight frames. Sensitive to pressure on nose bridge.",
          author: "Sarah Williams (Optician)",
        },
      ],
    },
    {
      id: "P-10043",
      firstName: "Michael",
      lastName: "Chen",
      fullName: "Michael Chen",
      dob: "09/23/1995",
      age: 28,
      gender: "Male",
      email: "michael.c@example.com",
      phone: "(555) 987-6543",
      address: "456 Oak Ave",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      occupation: "Software Developer",
      emergencyContact: "Lisa Chen (Sister) - (555) 234-5678",
      status: "Active",
      lastVisit: "04/15/2023",
      nextVisit: "10/15/2023",
      preferredDoctor: "Dr. Williams",
      insurance: {
        primary: "Aetna",
        policyNumber: "AET987654321",
        groupNumber: "GRP123456",
        effectiveDate: "01/01/2023",
        expirationDate: "12/31/2023",
        copay: "$25",
        coverage: "75%",
      },
      medicalAlerts: [],
      visionHistory: {
        currentRx: {
          date: "04/15/2023",
          rightEye: {
            sphere: "-3.25",
            cylinder: "-0.50",
            axis: "90",
            add: "",
          },
          leftEye: {
            sphere: "-3.00",
            cylinder: "-0.75",
            axis: "85",
            add: "",
          },
          pd: "62",
          notes: "Contact lens wearer",
          expirationDate: "04/15/2024",
        },
        previousRx: [],
      },
      medicalHistory: {
        conditions: [],
        medications: [],
        allergies: [],
        familyHistory: ["Father: Myopia", "Mother: Astigmatism"],
      },
      visits: [
        {
          id: "V-10043",
          date: "04/15/2023",
          type: "Contact Lens Fitting",
          doctor: "Dr. Williams",
          reason: "Contact lens update",
          notes: "Patient interested in daily disposable lenses.",
          diagnosis: "Myopia, Mild Astigmatism",
          followUp: "6 months",
          billingId: "B-10045",
        },
      ],
      orders: [
        {
          id: "O-10043",
          patientId: "P-10043",
          date: "04/15/2023",
          type: "Contact Lenses",
          status: "Dispensed",
          details: "Acuvue Oasis for Astigmatism - 6 month supply",
          price: "$240.00",
          insurance: "$180.00",
          balance: "$60.00",
          priority: "Normal",
          billingId: "B-10046",
          contacts: {
            brand: "Acuvue Oasis",
            rightEye: {
              power: "-3.25",
              baseCurve: "8.4",
              diameter: "14.0",
              cylinder: "-0.50",
              axis: "90",
              quantity: 6,
            },
            leftEye: {
              power: "-3.00",
              baseCurve: "8.4",
              diameter: "14.0",
              cylinder: "-0.75",
              axis: "85",
              quantity: 6,
            },
            supplyDuration: "6 months",
          },
        },
      ],
      billing: [
        {
          id: "B-10045",
          patientId: "P-10043",
          date: "04/15/2023",
          description: "Contact Lens Fitting",
          serviceCode: "92310",
          total: "$120.00",
          insurance: "$90.00",
          patient: "$30.00",
          status: "Paid",
          relatedEntityId: "V-10043",
          relatedEntityType: "Visit",
        },
        {
          id: "B-10046",
          patientId: "P-10043",
          date: "04/15/2023",
          description: "Contact Lenses - 6 month supply",
          total: "$240.00",
          insurance: "$180.00",
          patient: "$60.00",
          status: "Paid",
          relatedEntityId: "O-10043",
          relatedEntityType: "Order",
        },
      ],
      documents: [],
      communications: [],
      notes: [],
    },
    // Add more mock patients as needed
  ]
  
  // Mock examinations data
  const mockExaminations: Examination[] = [
    {
      id: "E-10042",
      patientId: "P-10042",
      patientName: "Sarah Johnson",
      date: "05/01/2023",
      time: "9:00 AM",
      type: "Annual Exam",
      doctor: "Dr. Williams",
      status: "Completed",
      preTestingStatus: "Completed",
      examStatus: "Completed",
      prescriptionStatus: "Issued",
      notes: "Patient has diabetes, check for retinopathy",
      billingId: "B-10042",
    },
    {
      id: "E-10043",
      patientId: "P-10043",
      patientName: "Michael Chen",
      date: "05/01/2023",
      time: "10:00 AM",
      type: "Contact Lens Fitting",
      doctor: "Dr. Williams",
      status: "In Progress",
      preTestingStatus: "Completed",
      examStatus: "In Progress",
      prescriptionStatus: "Pending",
      notes: "First time contact lens wearer",
      billingId: "B-10045",
    },
    // Add more mock examinations as needed
  ]
  
  // Mock appointments data
  const mockAppointments: Appointment[] = [
    {
      id: "A-10042",
      patientId: "P-10042",
      patientName: "Sarah Johnson",
      date: "05/01/2023",
      time: "9:00 AM",
      endTime: "9:30 AM",
      duration: "30 min",
      type: "Annual Exam",
      doctor: "Dr. Williams",
      status: "Completed",
      room: "Exam 1",
    },
    {
      id: "A-10043",
      patientId: "P-10043",
      patientName: "Michael Chen",
      date: "05/01/2023",
      time: "10:00 AM",
      endTime: "10:45 AM",
      duration: "45 min",
      type: "Contact Lens Fitting",
      doctor: "Dr. Williams",
      status: "Completed",
      room: "Exam 2",
    },
    // Add more mock appointments as needed
  ]
  
  // Mock lab orders data
  const mockLabOrders: Order[] = [
    {
      id: "LO-10001",
      patientId: "P-10042",
      date: "04/01/2023",
      type: "Glasses",
      status: "Ready for Pickup",
      details: "Single Vision Glasses",
      price: "$350.00",
      insurance: "$280.00",
      balance: "$70.00",
      priority: "Normal",
      dueDate: "04/15/2023",
      receivedDate: "04/05/2023",
      lab: "Vision Labs",
      prescription: {
        rightEye: {
          sphere: "-2.00",
          cylinder: "-0.75",
          axis: "180",
          add: "+1.50",
        },
        leftEye: {
          sphere: "-1.75",
          cylinder: "-0.50",
          axis: "175",
          add: "+1.50",
        },
        pd: "63",
        notes: "Patient prefers lightweight frames. Previous issues with progressive adaptation.",
      },
      billingId: "B-10047",
      notes: "Patient prefers lightweight frames. Previous issues with progressive adaptation.",
    },
    // Add more mock lab orders as needed
  ]
  
  // Export data access functions
  export async function getPatients(): Promise<Patient[]> {
    return mockPatients
  }
  
  export async function getPatientById(id: string): Promise<Patient | null> {
    return mockPatients.find((p) => p.id === id) || null
  }
  
  export async function getExaminations(): Promise<Examination[]> {
    return mockExaminations
  }
  
  export async function getExaminationsByPatientId(patientId: string): Promise<Examination[]> {
    return mockExaminations.filter((e) => e.patientId === patientId)
  }
  
  export async function getAppointments(): Promise<Appointment[]> {
    return mockAppointments
  }
  
  export async function getAppointmentsByPatientId(patientId: string): Promise<Appointment[]> {
    return mockAppointments.filter((a) => a.patientId === patientId)
  }
  
  export async function getLabOrders(): Promise<Order[]> {
    return mockLabOrders
  }
  
  export async function getLabOrdersByPatientId(patientId: string): Promise<Order[]> {
    return mockLabOrders.filter((o) => o.patientId === patientId)
  }
  
  export async function getLabOrderById(id: string): Promise<Order | null> {
    return mockLabOrders.find((o) => o.id === id) || null
  }
  
  export async function createPatient(data: Partial<Patient>): Promise<Patient> {
    // In a real app, this would insert into a database
    const newId = `P-${10000 + mockPatients.length}`
    const fullName = `${data.firstName} ${data.lastName}`
  
    const newPatient: Patient = {
      id: newId,
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      fullName: fullName,
      dob: data.dob || "",
      age: data.age || 0,
      gender: data.gender || "",
      email: data.email || "",
      phone: data.phone || "",
      address: data.address || "",
      city: data.city || "",
      state: data.state || "",
      zipCode: data.zipCode || "",
      occupation: data.occupation || "",
      emergencyContact: data.emergencyContact || "",
      status: "New",
      lastVisit: "",
      nextVisit: "",
      preferredDoctor: data.preferredDoctor || "",
      insurance: {
        primary: data.insurance?.primary || "",
        policyNumber: data.insurance?.policyNumber || "",
        groupNumber: data.insurance?.groupNumber || "",
        effectiveDate: data.insurance?.effectiveDate || "",
        expirationDate: data.insurance?.expirationDate || "",
        copay: data.insurance?.copay || "",
        coverage: data.insurance?.coverage || "",
      },
      medicalAlerts: data.medicalAlerts || [],
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
  
    // In a real app, we would add this to the database
    // For now, we'll just return the new patient
    return newPatient
  }
  
  export async function createAppointment(data: Partial<Appointment>): Promise<Appointment> {
    // In a real app, this would insert into a database
    const newId = `A-${10000 + mockAppointments.length}`
  
    const newAppointment: Appointment = {
      id: newId,
      patientId: data.patientId || "",
      patientName: data.patientName || "",
      date: data.date || "",
      time: data.time || "",
      endTime: data.endTime || "",
      duration: data.duration || "",
      type: data.type || "",
      doctor: data.doctor || "",
      status: "Scheduled",
      room: data.room || "",
      notes: data.notes || "",
    }
  
    // In a real app, we would add this to the database
    // For now, we'll just return the new appointment
    return newAppointment
  }
  
  export async function createLabOrder(data: Partial<Order>): Promise<Order> {
    // In a real app, this would insert into a database
    const newId = `LO-${10000 + mockLabOrders.length}`
  
    const newOrder: Order = {
      id: newId,
      patientId: data.patientId || "",
      date: data.date || new Date().toLocaleDateString(),
      type: data.type || "Glasses",
      status: "Ordered",
      details: data.details || "",
      price: data.price || "$0.00",
      insurance: data.insurance || "$0.00",
      balance: data.balance || "$0.00",
      priority: data.priority || "Normal",
      dueDate: data.dueDate,
      lab: data.lab,
      prescription: data.prescription,
      frame: data.frame,
      lens: data.lens,
      contacts: data.contacts,
      notes: data.notes,
    }
  
    // Create associated billing record
    const billingId = `B-${10000 + mockPatients.flatMap((p) => p.billing).length}`
    const newBilling: BillingRecord = {
      id: billingId,
      patientId: data.patientId || "",
      date: new Date().toLocaleDateString(),
      description: `${data.type} Order`,
      total: data.price || "$0.00",
      insurance: data.insurance || "$0.00",
      patient: data.balance || "$0.00",
      status: "Due",
      relatedEntityId: newId,
      relatedEntityType: "Order",
    }
  
    // Link the billing record to the order
    newOrder.billingId = billingId
  
    // In a real app, we would add these to the database
    // For now, we'll just return the new order
    return newOrder
  }
  
  // Add more database functions as needed
  