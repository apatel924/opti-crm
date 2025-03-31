// components/app-sidebar.tsx
"use client"

import Link from "next/link"

export function AppSidebar() {
  return (
    <nav className="border-r w-48 p-4">
      <ul className="space-y-2">
        <li>
          <Link href="/">Dashboard</Link>
        </li>
        <li>
          <Link href="/patients">Patients</Link>
        </li>
        <li>
          <Link href="/appointments">Appointments</Link>
        </li>
        <li>
          <Link href="/examinations">Examinations</Link>
        </li>
        <li>
          <Link href="/lab">Lab Management</Link>
        </li>
        <li>
          <Link href="/billing">Billing</Link>
        </li>
        <li>
          <Link href="/inventory">Inventory</Link>
        </li>
        <li>
          <Link href="/communications">Communications</Link>
        </li>
        <li>
          <Link href="/portal">Portal & Integrations</Link>
        </li>
      </ul>
    </nav>
  )
}
