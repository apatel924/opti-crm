export const appointmentTypes = {
    "Annual Exam": { color: "bg-blue-500", border: "border-blue-600", textColor: "text-white", shortName: "Annual" },
    "Contact Lens Fitting": {
      color: "bg-purple-500",
      border: "border-purple-600",
      textColor: "text-white",
      shortName: "Contact",
    },
    "Follow-up": { color: "bg-green-500", border: "border-green-600", textColor: "text-white", shortName: "Follow-up" },
    Emergency: { color: "bg-red-500", border: "border-red-600", textColor: "text-white", shortName: "Emergency" },
    "Comprehensive Exam": {
      color: "bg-indigo-500",
      border: "border-indigo-600",
      textColor: "text-white",
      shortName: "Comp Exam",
    },
    "Frame Selection": { color: "bg-cyan-500", border: "border-cyan-600", textColor: "text-white", shortName: "Frames" },
    "Glasses Fitting": { color: "bg-teal-500", border: "border-teal-600", textColor: "text-white", shortName: "Fitting" },
    "Glasses Pickup": { color: "bg-amber-500", border: "border-amber-600", textColor: "text-white", shortName: "Pickup" },
    "Contact Lens Training": {
      color: "bg-pink-500",
      border: "border-pink-600",
      textColor: "text-white",
      shortName: "CL Train",
    },
    Block: { color: "bg-gray-300", border: "border-gray-400", textColor: "text-gray-700", shortName: "Block" },
    Lunch: { color: "bg-yellow-200", border: "border-yellow-300", textColor: "text-gray-800", shortName: "Lunch" },
  }
// Define providers
export const providers = [
    { id: "dr-williams", name: "Dr. Williams" },
    { id: "dr-smith", name: "Dr. Smith" },
    { id: "dr-johnson", name: "Dr. Johnson" },
    { id: "optician", name: "Optician", isOptician: true },
  ]
  
  // Mock patient data
  export const mockPatients = [
    {
      id: "P-10042",
      name: "Sarah Johnson",
      dob: "05/12/1981",
      age: 42,
      gender: "Female",
      phone: "(555) 123-4567",
      email: "sarah.j@example.com",
    },
    {
      id: "P-10043",
      name: "Michael Chen",
      dob: "09/23/1995",
      age: 28,
      gender: "Male",
      phone: "(555) 987-6543",
      email: "michael.c@example.com",
    },
    {
      id: "P-10044",
      name: "Robert Garcia",
      dob: "11/05/1988",
      age: 35,
      gender: "Male",
      phone: "(555) 456-7890",
      email: "robert.g@example.com",
    },
    {
      id: "P-10045",
      name: "Emily Wilson",
      dob: "02/18/1971",
      age: 52,
      gender: "Female",
      phone: "(555) 789-0123",
      email: "emily.w@example.com",
    },
    {
      id: "P-10046",
      name: "Jessica Martinez",
      dob: "07/14/1992",
      age: 31,
      gender: "Female",
      phone: "(555) 234-5678",
      email: "jessica.m@example.com",
    },
  ]  
