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
  // Adding the missing patients with complete data
  {
    id: "P-10044",
    firstName: "Robert",
    lastName: "Garcia",
    fullName: "Robert Garcia",
    dob: "11/05/1988",
    age: 35,
    gender: "Male",
    email: "robert.g@example.com",
    phone: "(555) 456-7890",
    address: "789 Pine St",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    occupation: "Architect",
    emergencyContact: "Maria Garcia (Wife) - (555) 456-7891",
    status: "Active",
    lastVisit: "01/10/2023",
    nextVisit: "07/12/2023",
    preferredDoctor: "Dr. Smith",
    insurance: {
      primary: "United Healthcare",
      policyNumber: "UHC567890123",
      groupNumber: "GRP456789",
      effectiveDate: "01/01/2023",
      expirationDate: "12/31/2023",
      copay: "$15",
      coverage: "85%",
    },
    medicalAlerts: ["Seasonal allergies"],
    visionHistory: {
      currentRx: {
        date: "01/10/2023",
        rightEye: {
          sphere: "-1.50",
          cylinder: "-0.25",
          axis: "95",
          add: "",
        },
        leftEye: {
          sphere: "-1.25",
          cylinder: "-0.50",
          axis: "90",
          add: "",
        },
        pd: "64",
        notes: "Computer glasses recommended",
        expirationDate: "01/10/2024",
      },
      previousRx: [],
    },
    medicalHistory: {
      conditions: ["Seasonal allergies"],
      medications: ["Loratadine 10mg as needed"],
      allergies: ["Pollen", "Dust"],
      familyHistory: ["Father: Glaucoma"],
    },
    visits: [
      {
        id: "V-10044",
        date: "01/10/2023",
        type: "Annual Exam",
        doctor: "Dr. Smith",
        reason: "Routine eye examination",
        notes: "Patient reports eye strain when working on computer for long periods.",
        diagnosis: "Mild Myopia, Computer Vision Syndrome",
        followUp: "1 year",
        billingId: "B-10047",
      },
    ],
    orders: [
      {
        id: "O-10044",
        patientId: "P-10044",
        date: "01/10/2023",
        type: "Glasses",
        status: "Dispensed",
        details: "Computer glasses with blue light filtering",
        price: "$350.00",
        insurance: "$280.00",
        balance: "$70.00",
        priority: "Normal",
        lab: "Vision Labs",
        receivedDate: "01/25/2023",
        billingId: "B-10048",
        prescription: {
          rightEye: {
            sphere: "-1.50",
            cylinder: "-0.25",
            axis: "95",
            add: "",
          },
          leftEye: {
            sphere: "-1.25",
            cylinder: "-0.50",
            axis: "90",
            add: "",
          },
          pd: "64",
          notes: "Blue light filtering",
        },
        frame: {
          manufacturer: "Warby Parker",
          model: "Felix",
          color: "Crystal",
          size: "52-18-145",
          source: "Order",
          cost: "$145.00",
        },
        lens: {
          type: "Single Vision",
          coating: ["Anti-Reflective", "Blue Light Filtering", "Scratch Resistant"],
          brand: "Zeiss",
          cost: "$205.00",
        },
      },
    ],
    billing: [
      {
        id: "B-10047",
        patientId: "P-10044",
        date: "01/10/2023",
        description: "Annual Eye Examination",
        serviceCode: "92004",
        total: "$150.00",
        insurance: "$127.50",
        patient: "$22.50",
        status: "Paid",
        paymentDate: "01/10/2023",
        paymentMethod: "Credit Card",
        relatedEntityId: "V-10044",
        relatedEntityType: "Visit",
      },
      {
        id: "B-10048",
        patientId: "P-10044",
        date: "01/10/2023",
        description: "Computer Glasses",
        total: "$350.00",
        insurance: "$280.00",
        patient: "$70.00",
        status: "Paid",
        paymentDate: "01/25/2023",
        paymentMethod: "Credit Card",
        relatedEntityId: "O-10044",
        relatedEntityType: "Order",
      },
    ],
    documents: [
      {
        id: "D-10044",
        name: "Insurance Card",
        type: "image/jpeg",
        date: "01/10/2023",
        uploadedBy: "Front Desk",
      },
    ],
    communications: [
      {
        id: "C-10044",
        date: "01/11/2023",
        type: "Email",
        subject: "Appointment Summary",
        content: "Thank you for your visit. Your glasses will be ready for pickup around January 25.",
        sentBy: "System",
      },
    ],
    notes: [
      {
        id: "N-10044",
        date: "01/10/2023",
        title: "Computer Usage",
        content: "Patient spends 8+ hours daily on computer. Recommended 20-20-20 rule and computer glasses.",
        author: "Dr. Smith",
      },
    ],
  },
  {
    id: "P-10045",
    firstName: "Emily",
    lastName: "Wilson",
    fullName: "Emily Wilson",
    dob: "02/18/1971",
    age: 52,
    gender: "Female",
    email: "emily.w@example.com",
    phone: "(555) 789-0123",
    address: "321 Maple Dr",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    occupation: "Marketing Director",
    emergencyContact: "James Wilson (Husband) - (555) 789-0124",
    status: "Active",
    lastVisit: "03/05/2023",
    nextVisit: "09/08/2023",
    preferredDoctor: "Dr. Williams",
    insurance: {
      primary: "Cigna",
      policyNumber: "CIG345678901",
      groupNumber: "GRP234567",
      effectiveDate: "01/01/2023",
      expirationDate: "12/31/2023",
      copay: "$20",
      coverage: "80%",
    },
    medicalAlerts: ["High blood pressure"],
    visionHistory: {
      currentRx: {
        date: "03/05/2023",
        rightEye: {
          sphere: "+1.75",
          cylinder: "-0.50",
          axis: "85",
          add: "+2.25",
        },
        leftEye: {
          sphere: "+2.00",
          cylinder: "-0.25",
          axis: "90",
          add: "+2.25",
        },
        pd: "62",
        notes: "Progressive lenses",
        expirationDate: "03/05/2024",
      },
      previousRx: [
        {
          date: "03/10/2022",
          rightEye: {
            sphere: "+1.50",
            cylinder: "-0.50",
            axis: "85",
            add: "+2.00",
          },
          leftEye: {
            sphere: "+1.75",
            cylinder: "-0.25",
            axis: "90",
            add: "+2.00",
          },
          pd: "62",
          notes: "Progressive lenses",
        },
      ],
    },
    medicalHistory: {
      conditions: ["Hypertension", "Presbyopia"],
      medications: ["Lisinopril 10mg daily"],
      allergies: [],
      familyHistory: ["Mother: Macular Degeneration", "Father: Cataracts"],
    },
    visits: [
      {
        id: "V-10045",
        date: "03/05/2023",
        type: "Annual Exam",
        doctor: "Dr. Williams",
        reason: "Routine eye examination",
        notes: "Patient reports difficulty reading small print. Increased add power in prescription.",
        diagnosis: "Presbyopia, Hyperopia",
        followUp: "6 months",
        billingId: "B-10049",
      },
      {
        id: "V-10046",
        date: "03/10/2022",
        type: "Annual Exam",
        doctor: "Dr. Williams",
        reason: "Routine eye examination",
        notes: "No significant changes from previous exam.",
        diagnosis: "Presbyopia, Hyperopia",
        followUp: "1 year",
        billingId: "B-10050",
      },
    ],
    orders: [
      {
        id: "O-10045",
        patientId: "P-10045",
        date: "03/05/2023",
        type: "Glasses",
        status: "Dispensed",
        details: "Progressive glasses with anti-fatigue features",
        price: "$495.00",
        insurance: "$396.00",
        balance: "$99.00",
        priority: "Normal",
        lab: "Vision Labs",
        receivedDate: "03/20/2023",
        billingId: "B-10051",
        prescription: {
          rightEye: {
            sphere: "+1.75",
            cylinder: "-0.50",
            axis: "85",
            add: "+2.25",
          },
          leftEye: {
            sphere: "+2.00",
            cylinder: "-0.25",
            axis: "90",
            add: "+2.25",
          },
          pd: "62",
          notes: "Progressive lenses",
        },
        frame: {
          manufacturer: "Kate Spade",
          model: "Jodie",
          color: "Tortoise",
          size: "53-16-140",
          source: "Stock",
          cost: "$175.00",
        },
        lens: {
          type: "Progressive",
          coating: ["Anti-Reflective", "Scratch Resistant", "UV Protection"],
          brand: "Varilux",
          cost: "$320.00",
        },
      },
    ],
    billing: [
      {
        id: "B-10049",
        patientId: "P-10045",
        date: "03/05/2023",
        description: "Annual Eye Examination",
        serviceCode: "92004",
        total: "$150.00",
        insurance: "$120.00",
        patient: "$30.00",
        status: "Paid",
        paymentDate: "03/05/2023",
        paymentMethod: "Credit Card",
        relatedEntityId: "V-10045",
        relatedEntityType: "Visit",
      },
      {
        id: "B-10050",
        patientId: "P-10045",
        date: "03/10/2022",
        description: "Annual Eye Examination",
        serviceCode: "92004",
        total: "$150.00",
        insurance: "$120.00",
        patient: "$30.00",
        status: "Paid",
        relatedEntityId: "V-10046",
        relatedEntityType: "Visit",
      },
      {
        id: "B-10051",
        patientId: "P-10045",
        date: "03/05/2023",
        description: "Progressive Glasses",
        total: "$495.00",
        insurance: "$396.00",
        patient: "$99.00",
        status: "Paid",
        paymentDate: "03/20/2023",
        paymentMethod: "Credit Card",
        relatedEntityId: "O-10045",
        relatedEntityType: "Order",
      },
    ],
    documents: [
      {
        id: "D-10045",
        name: "Insurance Card",
        type: "image/jpeg",
        date: "03/05/2023",
        uploadedBy: "Front Desk",
      },
      {
        id: "D-10046",
        name: "Medical History Form",
        type: "application/pdf",
        date: "03/05/2023",
        uploadedBy: "Patient",
      },
    ],
    communications: [
      {
        id: "C-10045",
        date: "03/06/2023",
        type: "Email",
        subject: "Appointment Summary",
        content: "Thank you for your visit. Your glasses will be ready for pickup around March 20.",
        sentBy: "System",
      },
      {
        id: "C-10046",
        date: "03/19/2023",
        type: "SMS",
        subject: "Glasses Ready",
        content: "Your new glasses are ready for pickup. Our office is open Mon-Fri 9am-5pm.",
        sentBy: "System",
      },
    ],
    notes: [
      {
        id: "N-10045",
        date: "03/05/2023",
        title: "Reading Habits",
        content: "Patient reads extensively on digital devices. Recommended blue light filtering and regular breaks.",
        author: "Dr. Williams",
      },
    ],
  },
  {
    id: "P-10046",
    firstName: "Jessica",
    lastName: "Martinez",
    fullName: "Jessica Martinez",
    dob: "07/14/1992",
    age: 31,
    gender: "Female",
    email: "jessica.m@example.com",
    phone: "(555) 234-5678",
    address: "567 Cedar Ln",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    occupation: "Nurse",
    emergencyContact: "Carlos Martinez (Brother) - (555) 234-5679",
    status: "Active",
    lastVisit: "02/20/2023",
    nextVisit: "05/22/2023",
    preferredDoctor: "Dr. Smith",
    insurance: {
      primary: "Kaiser Permanente",
      policyNumber: "KP789012345",
      groupNumber: "GRP345678",
      effectiveDate: "01/01/2023",
      expirationDate: "12/31/2023",
      copay: "$15",
      coverage: "90%",
    },
    medicalAlerts: [],
    visionHistory: {
      currentRx: {
        date: "02/20/2023",
        rightEye: {
          sphere: "-4.25",
          cylinder: "-1.00",
          axis: "175",
          add: "",
        },
        leftEye: {
          sphere: "-4.00",
          cylinder: "-1.25",
          axis: "10",
          add: "",
        },
        pd: "61",
        notes: "Contact lens and glasses wearer",
        expirationDate: "02/20/2024",
      },
      previousRx: [
        {
          date: "02/15/2022",
          rightEye: {
            sphere: "-4.00",
            cylinder: "-1.00",
            axis: "175",
            add: "",
          },
          leftEye: {
            sphere: "-3.75",
            cylinder: "-1.25",
            axis: "10",
            add: "",
          },
          pd: "61",
          notes: "",
        },
      ],
    },
    medicalHistory: {
      conditions: [],
      medications: [],
      allergies: ["Latex"],
      familyHistory: ["Sister: High Myopia"],
    },
    visits: [
      {
        id: "V-10047",
        date: "02/20/2023",
        type: "Annual Exam",
        doctor: "Dr. Smith",
        reason: "Routine eye examination and contact lens fitting",
        notes: "Patient interested in daily disposable contacts for convenience with work schedule.",
        diagnosis: "Myopia, Astigmatism",
        followUp: "3 months",
        billingId: "B-10052",
      },
    ],
    orders: [
      {
        id: "O-10046",
        patientId: "P-10046",
        date: "02/20/2023",
        type: "Contact Lenses",
        status: "Dispensed",
        details: "Biofinity Toric - 6 month supply",
        price: "$280.00",
        insurance: "$252.00",
        balance: "$28.00",
        priority: "Normal",
        billingId: "B-10053",
        contacts: {
          brand: "Biofinity Toric",
          rightEye: {
            power: "-4.25",
            baseCurve: "8.7",
            diameter: "14.5",
            cylinder: "-1.00",
            axis: "180",
            quantity: 6,
          },
          leftEye: {
            power: "-4.00",
            baseCurve: "8.7",
            diameter: "14.5",
            cylinder: "-1.25",
            axis: "10",
            quantity: 6,
          },
          supplyDuration: "6 months",
        },
      },
      {
        id: "O-10047",
        patientId: "P-10046",
        date: "02/20/2023",
        type: "Glasses",
        status: "Dispensed",
        details: "Backup glasses",
        price: "$320.00",
        insurance: "$288.00",
        balance: "$32.00",
        priority: "Normal",
        lab: "Vision Labs",
        receivedDate: "03/05/2023",
        billingId: "B-10054",
        prescription: {
          rightEye: {
            sphere: "-4.25",
            cylinder: "-1.00",
            axis: "175",
            add: "",
          },
          leftEye: {
            sphere: "-4.00",
            cylinder: "-1.25",
            axis: "10",
            add: "",
          },
          pd: "61",
          notes: "Backup glasses",
        },
        frame: {
          manufacturer: "Ray-Ban",
          model: "RB5228",
          color: "Black",
          size: "53-17-140",
          source: "Stock",
          cost: "$150.00",
        },
        lens: {
          type: "Single Vision",
          coating: ["Anti-Reflective", "Scratch Resistant"],
          brand: "Essilor",
          cost: "$170.00",
        },
      },
    ],
    billing: [
      {
        id: "B-10052",
        patientId: "P-10046",
        date: "02/20/2023",
        description: "Annual Eye Examination with Contact Lens Fitting",
        serviceCode: "92310",
        total: "$200.00",
        insurance: "$180.00",
        patient: "$20.00",
        status: "Paid",
        paymentDate: "02/20/2023",
        paymentMethod: "Credit Card",
        relatedEntityId: "V-10047",
        relatedEntityType: "Visit",
      },
      {
        id: "B-10053",
        patientId: "P-10046",
        date: "02/20/2023",
        description: "Contact Lenses - 6 month supply",
        total: "$280.00",
        insurance: "$252.00",
        patient: "$28.00",
        status: "Paid",
        paymentDate: "02/20/2023",
        paymentMethod: "Credit Card",
        relatedEntityId: "O-10046",
        relatedEntityType: "Order",
      },
      {
        id: "B-10054",
        patientId: "P-10046",
        date: "02/20/2023",
        description: "Backup Glasses",
        total: "$320.00",
        insurance: "$288.00",
        patient: "$32.00",
        status: "Paid",
        paymentDate: "03/05/2023",
        paymentMethod: "Credit Card",
        relatedEntityId: "O-10047",
        relatedEntityType: "Order",
      },
    ],
    documents: [
      {
        id: "D-10047",
        name: "Insurance Card",
        type: "image/jpeg",
        date: "02/20/2023",
        uploadedBy: "Front Desk",
      },
    ],
    communications: [
      {
        id: "C-10047",
        date: "02/21/2023",
        type: "Email",
        subject: "Contact Lens Instructions",
        content: "Thank you for your visit. Please find attached the care instructions for your new contact lenses.",
        sentBy: "Dr. Smith",
      },
      {
        id: "C-10048",
        date: "03/04/2023",
        type: "SMS",
        subject: "Glasses Ready",
        content: "Your new glasses are ready for pickup. Our office is open Mon-Fri 9am-5pm.",
        sentBy: "System",
      },
    ],
    notes: [
      {
        id: "N-10046",
        date: "02/20/2023",
        title: "Contact Lens Training",
        content: "Patient is experienced with contact lenses. Reviewed proper care and handling procedures.",
        author: "Dr. Smith",
      },
    ],
  },
  {
    id: "P-10047",
    firstName: "David",
    lastName: "Thompson",
    fullName: "David Thompson",
    dob: "03/30/1978",
    age: 45,
    gender: "Male",
    email: "david.t@example.com",
    phone: "(555) 345-6789",
    address: "890 Birch St",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    occupation: "Construction Manager",
    emergencyContact: "Susan Thompson (Wife) - (555) 345-6780",
    status: "Inactive",
    lastVisit: "11/15/2022",
    nextVisit: "",
    preferredDoctor: "Dr. Johnson",
    insurance: {
      primary: "Blue Shield",
      policyNumber: "BS456789012",
      groupNumber: "GRP567890",
      effectiveDate: "01/01/2022",
      expirationDate: "12/31/2022",
      copay: "$25",
      coverage: "70%",
    },
    medicalAlerts: ["Diabetes Type 2"],
    visionHistory: {
      currentRx: {
        date: "11/15/2022",
        rightEye: {
          sphere: "+0.75",
          cylinder: "-0.50",
          axis: "90",
          add: "+1.75",
        },
        leftEye: {
          sphere: "+1.00",
          cylinder: "-0.25",
          axis: "85",
          add: "+1.75",
        },
        pd: "65",
        notes: "Safety glasses for work",
        expirationDate: "11/15/2023",
      },
      previousRx: [],
    },
    medicalHistory: {
      conditions: ["Type 2 Diabetes (diagnosed 2018)"],
      medications: ["Metformin 1000mg twice daily"],
      allergies: [],
      familyHistory: ["Father: Diabetic Retinopathy"],
    },
    visits: [
      {
        id: "V-10048",
        date: "11/15/2022",
        type: "Annual Exam",
        doctor: "Dr. Johnson",
        reason: "Routine eye examination with diabetic screening",
        notes: "No signs of diabetic retinopathy. Recommended yearly diabetic eye exams.",
        diagnosis: "Hyperopia, Presbyopia",
        followUp: "1 year",
        billingId: "B-10055",
      },
    ],
    orders: [
      {
        id: "O-10048",
        patientId: "P-10047",
        date: "11/15/2022",
        type: "Glasses",
        status: "Dispensed",
        details: "Safety glasses with side shields",
        price: "$275.00",
        insurance: "$192.50",
        balance: "$82.50",
        priority: "Normal",
        lab: "Safety Vision Labs",
        receivedDate: "11/30/2022",
        billingId: "B-10056",
        prescription: {
          rightEye: {
            sphere: "+0.75",
            cylinder: "-0.50",
            axis: "90",
            add: "+1.75",
          },
          leftEye: {
            sphere: "+1.00",
            cylinder: "-0.25",
            axis: "85",
            add: "+1.75",
          },
          pd: "65",
          notes: "Safety glasses with side shields",
        },
        frame: {
          manufacturer: "WileyX",
          model: "Valor",
          color: "Matte Black",
          size: "55-18-140",
          source: "Order",
          cost: "$125.00",
        },
        lens: {
          type: "Bifocal",
          coating: ["Anti-Reflective", "Scratch Resistant", "Impact Resistant"],
          brand: "Essilor",
          cost: "$150.00",
        },
      },
    ],
    billing: [
      {
        id: "B-10055",
        patientId: "P-10047",
        date: "11/15/2022",
        description: "Annual Eye Examination with Diabetic Screening",
        serviceCode: "92004",
        total: "$175.00",
        insurance: "$122.50",
        patient: "$52.50",
        status: "Paid",
        paymentDate: "11/15/2022",
        paymentMethod: "Credit Card",
        relatedEntityId: "V-10048",
        relatedEntityType: "Visit",
      },
      {
        id: "B-10056",
        patientId: "P-10047",
        date: "11/15/2022",
        description: "Safety Glasses",
        total: "$275.00",
        insurance: "$192.50",
        patient: "$82.50",
        status: "Paid",
        paymentDate: "11/30/2022",
        paymentMethod: "Credit Card",
        relatedEntityId: "O-10048",
        relatedEntityType: "Order",
      },
    ],
    documents: [
      {
        id: "D-10048",
        name: "Insurance Card",
        type: "image/jpeg",
        date: "11/15/2022",
        uploadedBy: "Front Desk",
      },
      {
        id: "D-10049",
        name: "Diabetic Screening Results",
        type: "application/pdf",
        date: "11/15/2022",
        uploadedBy: "Dr. Johnson",
      },
    ],
    communications: [
      {
        id: "C-10049",
        date: "11/16/2022",
        type: "Email",
        subject: "Diabetic Eye Exam Results",
        content:
          "Good news! Your diabetic eye exam showed no signs of diabetic retinopathy. Please continue with your regular diabetes management and return in one year for your next exam.",
        sentBy: "Dr. Johnson",
      },
    ],
    notes: [
      {
        id: "N-10047",
        date: "11/15/2022",
        title: "Diabetes Management",
        content:
          "Patient reports good blood sugar control with A1C of 6.8. Discussed importance of regular eye exams for diabetic patients.",
        author: "Dr. Johnson",
      },
    ],
  },
  {
    id: "P-10048",
    firstName: "Jennifer",
    lastName: "Lee",
    fullName: "Jennifer Lee",
    dob: "12/05/1994",
    age: 29,
    gender: "Female",
    email: "jennifer.l@example.com",
    phone: "(555) 456-7890",
    address: "123 Elm St",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    occupation: "Graphic Designer",
    emergencyContact: "Daniel Lee (Husband) - (555) 456-7891",
    status: "Active",
    lastVisit: "03/01/2023",
    nextVisit: "06/03/2023",
    preferredDoctor: "Dr. Williams",
    insurance: {
      primary: "Anthem",
      policyNumber: "ANT234567890",
      groupNumber: "GRP678901",
      effectiveDate: "01/01/2023",
      expirationDate: "12/31/2023",
      copay: "$20",
      coverage: "80%",
    },
    medicalAlerts: [],
    visionHistory: {
      currentRx: {
        date: "03/01/2023",
        rightEye: {
          sphere: "-2.75",
          cylinder: "-0.75",
          axis: "10",
          add: "",
        },
        leftEye: {
          sphere: "-3.00",
          cylinder: "-0.50",
          axis: "175",
          add: "",
        },
        pd: "60",
        notes: "Blue light filtering recommended for computer work",
        expirationDate: "03/01/2024",
      },
      previousRx: [
        {
          date: "03/05/2022",
          rightEye: {
            sphere: "-2.50",
            cylinder: "-0.75",
            axis: "10",
            add: "",
          },
          leftEye: {
            sphere: "-2.75",
            cylinder: "-0.50",
            axis: "175",
            add: "",
          },
          pd: "60",
          notes: "",
        },
      ],
    },
    medicalHistory: {
      conditions: ["Migraine with visual aura"],
      medications: ["Sumatriptan as needed"],
      allergies: [],
      familyHistory: ["Mother: Myopia"],
    },
    visits: [
      {
        id: "V-10049",
        date: "03/01/2023",
        type: "Annual Exam",
        doctor: "Dr. Williams",
        reason: "Routine eye examination",
        notes: "Patient reports eye strain and occasional headaches after long periods of computer work.",
        diagnosis: "Myopia, Astigmatism, Computer Vision Syndrome",
        followUp: "3 months",
        billingId: "B-10057",
      },
    ],
    orders: [
      {
        id: "O-10049",
        patientId: "P-10048",
        date: "03/01/2023",
        type: "Glasses",
        status: "Dispensed",
        details: "Computer glasses with blue light filtering",
        price: "$380.00",
        insurance: "$304.00",
        balance: "$76.00",
        priority: "Normal",
        lab: "Vision Labs",
        receivedDate: "03/15/2023",
        billingId: "B-10058",
        prescription: {
          rightEye: {
            sphere: "-2.75",
            cylinder: "-0.75",
            axis: "10",
            add: "",
          },
          leftEye: {
            sphere: "-3.00",
            cylinder: "-0.50",
            axis: "175",
            add: "",
          },
          pd: "60",
          notes: "Blue light filtering",
        },
        frame: {
          manufacturer: "Modo",
          model: "4060",
          color: "Crystal/Blue",
          size: "51-17-140",
          source: "Stock",
          cost: "$160.00",
        },
        lens: {
          type: "Single Vision",
          coating: ["Anti-Reflective", "Blue Light Filtering", "Scratch Resistant"],
          brand: "Crizal",
          cost: "$220.00",
        },
      },
    ],
    billing: [
      {
        id: "B-10057",
        patientId: "P-10048",
        date: "03/01/2023",
        description: "Annual Eye Examination",
        serviceCode: "92004",
        total: "$150.00",
        insurance: "$120.00",
        patient: "$30.00",
        status: "Paid",
        paymentDate: "03/01/2023",
        paymentMethod: "Credit Card",
        relatedEntityId: "V-10049",
        relatedEntityType: "Visit",
      },
      {
        id: "B-10058",
        patientId: "P-10048",
        date: "03/01/2023",
        description: "Computer Glasses with Blue Light Filtering",
        total: "$380.00",
        insurance: "$304.00",
        patient: "$76.00",
        status: "Paid",
        paymentDate: "03/15/2023",
        paymentMethod: "Credit Card",
        relatedEntityId: "O-10049",
        relatedEntityType: "Order",
      },
    ],
    documents: [
      {
        id: "D-10050",
        name: "Insurance Card",
        type: "image/jpeg",
        date: "03/01/2023",
        uploadedBy: "Front Desk",
      },
    ],
    communications: [
      {
        id: "C-10050",
        date: "03/02/2023",
        type: "Email",
        subject: "Computer Vision Syndrome Information",
        content:
          "Thank you for your visit. As discussed, here are some tips to reduce eye strain while working on your computer: 1) Follow the 20-20-20 rule, 2) Adjust your monitor position, 3) Use proper lighting, 4) Take regular breaks.",
        sentBy: "Dr. Williams",
      },
      {
        id: "C-10051",
        date: "03/14/2023",
        type: "SMS",
        subject: "Glasses Ready",
        content: "Your new computer glasses are ready for pickup. Our office is open Mon-Fri 9am-5pm.",
        sentBy: "System",
      },
    ],
    notes: [
      {
        id: "N-10048",
        date: "03/01/2023",
        title: "Computer Usage",
        content:
          "Patient works 8-10 hours daily on computer. Discussed ergonomics and the 20-20-20 rule. Recommended follow-up in 3 months to check efficacy of blue light filtering lenses.",
        author: "Dr. Williams",
      },
    ],
  },
  {
    id: "P-10049",
    firstName: "William",
    lastName: "Brown",
    fullName: "William Brown",
    dob: "08/22/1965",
    age: 58,
    gender: "Male",
    email: "william.b@example.com",
    phone: "(555) 567-8901",
    address: "456 Walnut Ave",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    occupation: "Accountant",
    emergencyContact: "Elizabeth Brown (Wife) - (555) 567-8902",
    status: "Active",
    lastVisit: "02/15/2023",
    nextVisit: "08/18/2023",
    preferredDoctor: "Dr. Johnson",
    insurance: {
      primary: "Medicare",
      policyNumber: "MED123456789",
      groupNumber: "",
      effectiveDate: "01/01/2023",
      expirationDate: "12/31/2023",
      copay: "$0",
      coverage: "80%",
      secondaryInsurance: {
        provider: "AARP Supplemental",
        policyNumber: "AARP987654321",
        groupNumber: "GRP789012",
      },
    },
    medicalAlerts: ["Glaucoma", "High cholesterol"],
    visionHistory: {
      currentRx: {
        date: "02/15/2023",
        rightEye: {
          sphere: "+1.25",
          cylinder: "-0.75",
          axis: "90",
          add: "+2.50",
        },
        leftEye: {
          sphere: "+1.50",
          cylinder: "-0.50",
          axis: "85",
          add: "+2.50",
        },
        pd: "64",
        notes: "Progressive lenses",
        expirationDate: "02/15/2024",
      },
      previousRx: [
        {
          date: "02/10/2022",
          rightEye: {
            sphere: "+1.00",
            cylinder: "-0.75",
            axis: "90",
            add: "+2.25",
          },
          leftEye: {
            sphere: "+1.25",
            cylinder: "-0.50",
            axis: "85",
            add: "+2.25",
          },
          pd: "64",
          notes: "Progressive lenses",
        },
      ],
    },
    medicalHistory: {
      conditions: ["Glaucoma (diagnosed 2015)", "Hypercholesterolemia"],
      medications: ["Latanoprost eye drops daily", "Atorvastatin 20mg daily"],
      allergies: ["Sulfa drugs"],
      familyHistory: ["Father: Glaucoma", "Mother: Cataracts"],
    },
    visits: [
      {
        id: "V-10050",
        date: "02/15/2023",
        type: "Glaucoma Check-up",
        doctor: "Dr. Johnson",
        reason: "Glaucoma monitoring and routine eye examination",
        notes: "IOP: 18 mmHg OD, 17 mmHg OS. Stable compared to previous measurements. Continue current treatment.",
        diagnosis: "Primary Open-Angle Glaucoma, Hyperopia, Presbyopia",
        followUp: "6 months",
        billingId: "B-10059",
      },
    ],
    orders: [
      {
        id: "O-10050",
        patientId: "P-10049",
        date: "02/15/2023",
        type: "Glasses",
        status: "Dispensed",
        details: "Progressive glasses",
        price: "$520.00",
        insurance: "$416.00",
        balance: "$104.00",
        priority: "Normal",
        lab: "Vision Labs",
        receivedDate: "03/01/2023",
        billingId: "B-10060",
        prescription: {
          rightEye: {
            sphere: "+1.25",
            cylinder: "-0.75",
            axis: "90",
            add: "+2.50",
          },
          leftEye: {
            sphere: "+1.50",
            cylinder: "-0.50",
            axis: "85",
            add: "+2.50",
          },
          pd: "64",
          notes: "Progressive lenses",
        },
        frame: {
          manufacturer: "Silhouette",
          model: "Titan Minimal Art",
          color: "Gunmetal",
          size: "54-17-145",
          source: "Order",
          cost: "$220.00",
        },
        lens: {
          type: "Progressive",
          coating: ["Anti-Reflective", "Scratch Resistant", "UV Protection"],
          brand: "Varilux",
          cost: "$300.00",
        },
      },
    ],
    billing: [
      {
        id: "B-10059",
        patientId: "P-10049",
        date: "02/15/2023",
        description: "Comprehensive Eye Examination with Glaucoma Evaluation",
        serviceCode: "92004",
        total: "$200.00",
        insurance: "$160.00",
        patient: "$40.00",
        status: "Paid",
        paymentDate: "02/15/2023",
        paymentMethod: "Credit Card",
        relatedEntityId: "V-10050",
        relatedEntityType: "Visit",
      },
      {
        id: "B-10060",
        patientId: "P-10049",
        date: "02/15/2023",
        description: "Progressive Glasses",
        total: "$520.00",
        insurance: "$416.00",
        patient: "$104.00",
        status: "Paid",
        paymentDate: "03/01/2023",
        paymentMethod: "Credit Card",
        relatedEntityId: "O-10050",
        relatedEntityType: "Order",
      },
    ],
    documents: [
      {
        id: "D-10051",
        name: "Insurance Card",
        type: "image/jpeg",
        date: "02/15/2023",
        uploadedBy: "Front Desk",
      },
      {
        id: "D-10052",
        name: "Visual Field Test Results",
        type: "application/pdf",
        date: "02/15/2023",
        uploadedBy: "Dr. Johnson",
      },
      {
        id: "D-10053",
        name: "OCT Scan",
        type: "image/jpeg",
        date: "02/15/2023",
        uploadedBy: "Technician",
      },
    ],
    communications: [
      {
        id: "C-10052",
        date: "02/16/2023",
        type: "Email",
        subject: "Glaucoma Check-up Results",
        content:
          "Good news! Your glaucoma appears stable with your current treatment. Please continue using your Latanoprost eye drops daily as prescribed. Your next check-up is scheduled for August 18, 2023.",
        sentBy: "Dr. Johnson",
      },
      {
        id: "C-10053",
        date: "02/28/2023",
        type: "SMS",
        subject: "Glasses Ready",
        content: "Your new progressive glasses are ready for pickup. Our office is open Mon-Fri 9am-5pm.",
        sentBy: "System",
      },
    ],
    notes: [
      {
        id: "N-10049",
        date: "02/15/2023",
        title: "Glaucoma Management",
        content:
          "Patient compliant with medication. IOP stable. Visual fields show no progression. OCT shows stable RNFL thickness. Continue current treatment regimen.",
        author: "Dr. Johnson",
      },
    ],
  },
  {
    id: "P-10050",
    firstName: "Amanda",
    lastName: "Taylor",
    fullName: "Amanda Taylor",
    dob: "04/10/1990",
    age: 33,
    gender: "Female",
    email: "amanda.t@example.com",
    phone: "(555) 678-9012",
    address: "789 Spruce Dr",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    occupation: "Elementary School Teacher",
    emergencyContact: "Brian Taylor (Husband) - (555) 678-9013",
    status: "Active",
    lastVisit: "03/10/2023",
    nextVisit: "09/12/2023",
    preferredDoctor: "Dr. Williams",
    insurance: {
      primary: "VSP",
      policyNumber: "VSP345678901",
      groupNumber: "GRP890123",
      effectiveDate: "01/01/2023",
      expirationDate: "12/31/2023",
      copay: "$10",
      coverage: "85%",
    },
    medicalAlerts: ["Pregnant - Second Trimester"],
    visionHistory: {
      currentRx: {
        date: "03/10/2023",
        rightEye: {
          sphere: "-1.25",
          cylinder: "-0.50",
          axis: "180",
          add: "",
        },
        leftEye: {
          sphere: "-1.00",
          cylinder: "-0.75",
          axis: "175",
          add: "",
        },
        pd: "62",
        notes: "Patient is pregnant - prescription may change",
        expirationDate: "03/10/2024",
      },
      previousRx: [
        {
          date: "03/15/2022",
          rightEye: {
            sphere: "-1.00",
            cylinder: "-0.50",
            axis: "180",
            add: "",
          },
          leftEye: {
            sphere: "-0.75",
            cylinder: "-0.75",
            axis: "175",
            add: "",
          },
          pd: "62",
          notes: "",
        },
      ],
    },
    medicalHistory: {
      conditions: ["Pregnancy - Due 08/2023"],
      medications: ["Prenatal vitamins"],
      allergies: [],
      familyHistory: ["Mother: Myopia"],
    },
    visits: [
      {
        id: "V-10051",
        date: "03/10/2023",
        type: "Annual Exam",
        doctor: "Dr. Williams",
        reason: "Routine eye examination",
        notes:
          "Patient is 5 months pregnant. Slight prescription change. Advised that vision may fluctuate during pregnancy and postpartum period.",
        diagnosis: "Myopia, Mild Astigmatism",
        followUp: "6 months",
        billingId: "B-10061",
      },
    ],
    orders: [
      {
        id: "O-10051",
        patientId: "P-10050",
        date: "03/10/2023",
        type: "Glasses",
        status: "Dispensed",
        details: "New glasses with updated prescription",
        price: "$350.00",
        insurance: "$297.50",
        balance: "$52.50",
        priority: "Normal",
        lab: "Vision Labs",
        receivedDate: "03/25/2023",
        billingId: "B-10062",
        prescription: {
          rightEye: {
            sphere: "-1.25",
            cylinder: "-0.50",
            axis: "180",
            add: "",
          },
          leftEye: {
            sphere: "-1.00",
            cylinder: "-0.75",
            axis: "175",
            add: "",
          },
          pd: "62",
          notes: "",
        },
        frame: {
          manufacturer: "Coach",
          model: "HC6124",
          color: "Burgundy",
          size: "52-16-140",
          source: "Stock",
          cost: "$180.00",
        },
        lens: {
          type: "Single Vision",
          coating: ["Anti-Reflective", "Scratch Resistant", "UV Protection"],
          brand: "Essilor",
          cost: "$170.00",
        },
      },
    ],
    billing: [
      {
        id: "B-10061",
        patientId: "P-10050",
        date: "03/10/2023",
        description: "Annual Eye Examination",
        serviceCode: "92004",
        total: "$150.00",
        insurance: "$127.50",
        patient: "$22.50",
        status: "Paid",
        paymentDate: "03/10/2023",
        paymentMethod: "Credit Card",
        relatedEntityId: "V-10051",
        relatedEntityType: "Visit",
      },
      {
        id: "B-10062",
        patientId: "P-10050",
        date: "03/10/2023",
        description: "Single Vision Glasses",
        total: "$350.00",
        insurance: "$297.50",
        patient: "$52.50",
        status: "Paid",
        paymentDate: "03/25/2023",
        paymentMethod: "Credit Card",
        relatedEntityId: "O-10051",
        relatedEntityType: "Order",
      },
    ],
    documents: [
      {
        id: "D-10054",
        name: "Insurance Card",
        type: "image/jpeg",
        date: "03/10/2023",
        uploadedBy: "Front Desk",
      },
    ],
    communications: [
      {
        id: "C-10054",
        date: "03/11/2023",
        type: "Email",
        subject: "Pregnancy and Vision Changes",
        content:
          "Thank you for your visit yesterday. As we discussed, it's normal to experience some vision changes during pregnancy due to hormonal fluctuations. These changes are usually temporary and resolve after delivery or when you finish breastfeeding. If you notice any significant vision changes, please contact us right away.",
        sentBy: "Dr. Williams",
      },
      {
        id: "C-10055",
        date: "03/24/2023",
        type: "SMS",
        subject: "Glasses Ready",
        content: "Your new glasses are ready for pickup. Our office is open Mon-Fri 9am-5pm.",
        sentBy: "System",
      },
    ],
    notes: [
      {
        id: "N-10050",
        date: "03/10/2023",
        title: "Pregnancy",
        content:
          "Patient is 5 months pregnant. Discussed potential vision changes during pregnancy and postpartum period. Recommended follow-up in 6 months or sooner if significant vision changes occur.",
        author: "Dr. Williams",
      },
    ],
  },
  {
    id: "P-10051",
    firstName: "James",
    lastName: "Wilson",
    fullName: "James Wilson",
    dob: "01/25/1982",
    age: 41,
    gender: "Male",
    email: "james.w@example.com",
    phone: "(555) 789-0123",
    address: "321 Aspen Ct",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    occupation: "IT Manager",
    emergencyContact: "Emily Wilson (Wife) - (555) 789-0124",
    status: "Inactive",
    lastVisit: "12/05/2022",
    nextVisit: "",
    preferredDoctor: "Dr. Smith",
    insurance: {
      primary: "Humana",
      policyNumber: "HUM456789012",
      groupNumber: "GRP901234",
      effectiveDate: "01/01/2022",
      expirationDate: "12/31/2022",
      copay: "$20",
      coverage: "75%",
    },
    medicalAlerts: ["LASIK surgery 2020"],
    visionHistory: {
      currentRx: {
        date: "12/05/2022",
        rightEye: {
          sphere: "-0.50",
          cylinder: "",
          axis: "",
          add: "",
        },
        leftEye: {
          sphere: "-0.25",
          cylinder: "",
          axis: "",
          add: "",
        },
        pd: "63",
        notes: "Post-LASIK enhancement",
        expirationDate: "12/05/2023",
      },
      previousRx: [
        {
          date: "12/10/2021",
          rightEye: {
            sphere: "-0.75",
            cylinder: "",
            axis: "",
            add: "",
          },
          leftEye: {
            sphere: "-0.50",
            cylinder: "",
            axis: "",
            add: "",
          },
          pd: "63",
          notes: "Post-LASIK",
        },
      ],
    },
    medicalHistory: {
      conditions: ["LASIK surgery (2020)"],
      medications: [],
      allergies: [],
      familyHistory: [],
    },
    visits: [
      {
        id: "V-10052",
        date: "12/05/2022",
        type: "Post-LASIK Follow-up",
        doctor: "Dr. Smith",
        reason: "Annual post-LASIK check-up",
        notes:
          "Patient reports good vision but occasional dryness, especially during computer use. Recommended artificial tears.",
        diagnosis: "Post-LASIK, Mild Residual Myopia, Dry Eye",
        followUp: "1 year",
        billingId: "B-10063",
      },
    ],
    orders: [
      {
        id: "O-10052",
        patientId: "P-10051",
        date: "12/05/2022",
        type: "Glasses",
        status: "Dispensed",
        details: "Computer glasses for residual prescription",
        price: "$280.00",
        insurance: "$210.00",
        balance: "$70.00",
        priority: "Normal",
        lab: "Vision Labs",
        receivedDate: "12/20/2022",
        billingId: "B-10064",
        prescription: {
          rightEye: {
            sphere: "-0.50",
            cylinder: "",
            axis: "",
            add: "",
          },
          leftEye: {
            sphere: "-0.25",
            cylinder: "",
            axis: "",
            add: "",
          },
          pd: "63",
          notes: "Computer glasses with blue light filtering",
        },
        frame: {
          manufacturer: "Oakley",
          model: "Limit Switch",
          color: "Satin Black",
          size: "52-18-138",
          source: "Stock",
          cost: "$150.00",
        },
        lens: {
          type: "Single Vision",
          coating: ["Anti-Reflective", "Blue Light Filtering", "Scratch Resistant"],
          brand: "Crizal",
          cost: "$130.00",
        },
      },
    ],
    billing: [
      {
        id: "B-10063",
        patientId: "P-10051",
        date: "12/05/2022",
        description: "Post-LASIK Examination",
        serviceCode: "92012",
        total: "$125.00",
        insurance: "$93.75",
        patient: "$31.25",
        status: "Paid",
        paymentDate: "12/05/2022",
        paymentMethod: "Credit Card",
        relatedEntityId: "V-10052",
        relatedEntityType: "Visit",
      },
      {
        id: "B-10064",
        patientId: "P-10051",
        date: "12/05/2022",
        description: "Computer Glasses",
        total: "$280.00",
        insurance: "$210.00",
        patient: "$70.00",
        status: "Paid",
        paymentDate: "12/20/2022",
        paymentMethod: "Credit Card",
        relatedEntityId: "O-10052",
        relatedEntityType: "Order",
      },
    ],
    documents: [
      {
        id: "D-10055",
        name: "Insurance Card",
        type: "image/jpeg",
        date: "12/05/2022",
        uploadedBy: "Front Desk",
      },
      {
        id: "D-10056",
        name: "LASIK Records",
        type: "application/pdf",
        date: "12/05/2022",
        uploadedBy: "Dr. Smith",
      },
    ],
    communications: [
      {
        id: "C-10056",
        date: "12/06/2022",
        type: "Email",
        subject: "Dry Eye Management",
        content:
          "Thank you for your visit yesterday. As we discussed, it's common to experience some dryness after LASIK. I recommend using preservative-free artificial tears 3-4 times daily, especially during computer use. Also, remember the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.",
        sentBy: "Dr. Smith",
      },
      {
        id: "C-10057",
        date: "12/19/2022",
        type: "SMS",
        subject: "Glasses Ready",
        content: "Your new computer glasses are ready for pickup. Our office is open Mon-Fri 9am-5pm.",
        sentBy: "System",
      },
    ],
    notes: [
      {
        id: "N-10051",
        date: "12/05/2022",
        title: "Post-LASIK Management",
        content:
          "Patient doing well 2 years post-LASIK. Mild residual prescription. Experiencing computer-related dry eye. Recommended artificial tears and computer glasses with blue light filtering.",
        author: "Dr. Smith",
      },
    ],
  },
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
  {
    id: "E-10044",
    patientId: "P-10044",
    patientName: "Robert Garcia",
    date: "05/01/2023",
    time: "11:00 AM",
    type: "Follow-up",
    doctor: "Dr. Smith",
    status: "Waiting",
    preTestingStatus: "Pending",
    examStatus: "Pending",
    prescriptionStatus: "Pending",
    notes: "Follow-up for computer vision syndrome",
    billingId: "",
  },
  {
    id: "E-10045",
    patientId: "P-10045",
    patientName: "Emily Wilson",
    date: "05/01/2023",
    time: "1:00 PM",
    type: "Comprehensive Exam",
    doctor: "Dr. Williams",
    status: "Scheduled",
    preTestingStatus: "Pending",
    examStatus: "Pending",
    prescriptionStatus: "Pending",
    notes: "Patient has family history of macular degeneration",
    billingId: "",
  },
  {
    id: "E-10046",
    patientId: "P-10046",
    patientName: "Jessica Martinez",
    date: "05/01/2023",
    time: "2:00 PM",
    type: "Annual Exam",
    doctor: "Dr. Smith",
    status: "Scheduled",
    preTestingStatus: "Pending",
    examStatus: "Pending",
    prescriptionStatus: "Pending",
    notes: "Contact lens wearer",
    billingId: "",
  },
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
  {
    id: "A-10044",
    patientId: "P-10044",
    patientName: "Robert Garcia",
    date: "05/01/2023",
    time: "11:00 AM",
    endTime: "11:30 AM",
    duration: "30 min",
    type: "Follow-up",
    doctor: "Dr. Smith",
    status: "Checked In",
    room: "Exam 1",
  },
  {
    id: "A-10045",
    patientId: "P-10045",
    patientName: "Emily Wilson",
    date: "05/01/2023",
    time: "1:00 PM",
    endTime: "1:45 PM",
    duration: "45 min",
    type: "Comprehensive Exam",
    doctor: "Dr. Williams",
    status: "Scheduled",
    room: "Exam 2",
  },
  {
    id: "A-10046",
    patientId: "P-10046",
    patientName: "Jessica Martinez",
    date: "05/01/2023",
    time: "2:00 PM",
    endTime: "2:30 PM",
    duration: "30 min",
    type: "Annual Exam",
    doctor: "Dr. Smith",
    status: "Scheduled",
    room: "Exam 1",
  },
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
  {
    id: "LO-10002",
    patientId: "P-10043",
    date: "04/15/2023",
    type: "Contact Lenses",
    status: "Ordered",
    details: "Acuvue Oasis for Astigmatism - Annual supply",
    price: "$480.00",
    insurance: "$360.00",
    balance: "$120.00",
    priority: "Normal",
    dueDate: "04/30/2023",
    lab: "Contact Lens Direct",
    contacts: {
      brand: "Acuvue Oasis",
      rightEye: {
        power: "-3.25",
        baseCurve: "8.4",
        diameter: "14.0",
        cylinder: "-0.50",
        axis: "90",
        quantity: 12,
      },
      leftEye: {
        power: "-3.00",
        baseCurve: "8.4",
        diameter: "14.0",
        cylinder: "-0.75",
        axis: "85",
        quantity: 12,
      },
      supplyDuration: "12 months",
    },
    billingId: "B-10048",
    notes: "Patient requested annual supply for insurance benefits.",
  },
  {
    id: "LO-10003",
    patientId: "P-10044",
    date: "04/20/2023",
    type: "Glasses",
    status: "In Progress",
    details: "Computer glasses with blue light filtering",
    price: "$375.00",
    insurance: "$300.00",
    balance: "$75.00",
    priority: "Rush",
    dueDate: "04/27/2023",
    lab: "Vision Labs",
    prescription: {
      rightEye: {
        sphere: "-1.50",
        cylinder: "-0.25",
        axis: "95",
        add: "",
      },
      leftEye: {
        sphere: "-1.25",
        cylinder: "-0.50",
        axis: "90",
        add: "",
      },
      pd: "64",
      notes: "Blue light filtering for computer use",
    },
    billingId: "B-10049",
    notes: "Rush order - patient needs for work presentation next week.",
  },
  {
    id: "LO-10004",
    patientId: "P-10045",
    date: "04/25/2023",
    type: "Glasses",
    status: "Ordered",
    details: "Progressive glasses with anti-fatigue features",
    price: "$520.00",
    insurance: "$416.00",
    balance: "$104.00",
    priority: "Normal",
    dueDate: "05/10/2023",
    lab: "Vision Labs",
    prescription: {
      rightEye: {
        sphere: "+1.75",
        cylinder: "-0.50",
        axis: "85",
        add: "+2.25",
      },
      leftEye: {
        sphere: "+2.00",
        cylinder: "-0.25",
        axis: "90",
        add: "+2.25",
      },
      pd: "62",
      notes: "Progressive lenses with anti-fatigue features",
    },
    billingId: "B-10050",
    notes: "Patient requested premium anti-reflective coating for reduced glare.",
  },
  {
    id: "LO-10005",
    patientId: "P-10046",
    date: "04/30/2023",
    type: "Contact Lenses",
    status: "Delayed",
    details: "Biofinity Toric - 6 month supply",
    price: "$280.00",
    insurance: "$252.00",
    balance: "$28.00",
    priority: "Normal",
    dueDate: "05/15/2023",
    lab: "Contact Lens Direct",
    contacts: {
      brand: "Biofinity Toric",
      rightEye: {
        power: "-4.25",
        baseCurve: "8.7",
        diameter: "14.5",
        cylinder: "-1.00",
        axis: "180",
        quantity: 6,
      },
      leftEye: {
        power: "-4.00",
        baseCurve: "8.7",
        diameter: "14.5",
        cylinder: "-1.25",
        axis: "10",
        quantity: 6,
      },
      supplyDuration: "6 months",
    },
    billingId: "B-10051",
    notes: "Delayed due to manufacturer backorder. Expected to ship 05/10/2023.",
  },
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
