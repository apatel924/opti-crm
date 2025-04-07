import type React from "react"
import { SidebarProvider } from "@/app/components/ui/sidebar/SidebarProvider"
import { AppSidebar } from "@/app/components/app-sidebar"
import { TopNavigation } from "@/app/components/top-navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen">
        <div className="flex">
          <AppSidebar />
          <div className="flex flex-col flex-1">
            <TopNavigation />
            <main className="flex-1 p-4">{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
