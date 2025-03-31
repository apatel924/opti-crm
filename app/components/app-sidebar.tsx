// components/app-sidebar.tsx
"use client"

import Link from "next/link"

export function AppSidebar() {
  return (
    <nav className="border-r w-48 p-4">
      <ul>
        <li>
          <Link href="/">Dashboard</Link>
        </li>
      </ul>
    </nav>
  )
}
