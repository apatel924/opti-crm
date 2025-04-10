import { DashboardPage } from "@/components/dashboard/dashboard-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard | OptiVue",
  description: "Optometry practice management dashboard",
}

export default function Dashboard() {
  return <DashboardPage />
}
