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
      <div className="relative min-h-screen overflow-hidden">
        {/* Decorative clouds */}
        <div className="ghibli-cloud ghibli-cloud-1"></div>
        <div className="ghibli-cloud ghibli-cloud-2"></div>
        <div className="ghibli-cloud ghibli-cloud-3"></div>

        <div className="flex min-h-screen">
          <AppSidebar />
          <div className="flex flex-col flex-1">
            <TopNavigation />
            <main className="flex-1 p-4 md:p-6">{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

