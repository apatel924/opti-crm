"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Search } from "lucide-react"

export function TopNavigation() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4">
      <button className="p-2 hover:bg-gray-100 rounded">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="hidden md:flex md:flex-1">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border rounded-md"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <div className="hidden md:flex">
          <Link 
            href="/patients/new"
            className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100"
          >
            New Patient
          </Link>
        </div>

        <button className="p-2 hover:bg-gray-100 rounded relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        <button className="p-2 hover:bg-gray-100 rounded md:hidden">
          <Search className="w-5 h-5" />
        </button>
      </div>
    </header>
  )
}
