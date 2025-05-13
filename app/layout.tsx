import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TopNavigation } from "@/components/top-navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "OptiCRM - Optometry Practice Management",
  description: "Comprehensive optometry practice management system",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <SidebarProvider>
            <div className="flex h-screen">
              <AppSidebar />
              <div className="flex flex-col w-full">
                <TopNavigation />
                <main className="flex-1 overflow-auto">
                  <div className="container mx-auto p-4 md:p-6">{children}</div>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
