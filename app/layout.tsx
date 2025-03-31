import "./styles/globals.css"
import type { ReactNode } from "react"
import { Inter } from "next/font/google"
import { AppSidebar } from "@/app/components/app-sidebar"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          <AppSidebar />
          <main className="flex-1 p-4">{children}</main>
        </div>
      </body>
    </html>
  )
}
