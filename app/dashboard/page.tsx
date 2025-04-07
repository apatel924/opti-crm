import { DashboardPage } from "@/app/dashboard/dashboard-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard | OptiCRM",
  description: "Optometry practice management dashboard",
}

export default function Dashboard() {
  return <DashboardPage />
}

