"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Search } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { QuickSearch } from "@/components/layout/quick-search"

export function TopNavigation() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <SidebarTrigger />

      <div className="hidden md:flex md:flex-1">
        <QuickSearch />
      </div>

      <div className="flex items-center gap-2 md:ml-auto">
        <div className="hidden md:flex">
          <Button asChild>
            <Link href="/patients/new" className="border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 text-sm">New Patient</Link>
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="relative h-9 w-9 rounded-md hover:bg-accent hover:text-accent-foreground">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">3</Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-auto">
              {[1, 2, 3].map((i) => (
                <DropdownMenuItem key={i} className="flex flex-col items-start py-2">
                  <div className="font-medium">Order #1234 is ready for pickup</div>
                  <div className="text-xs text-muted-foreground">2 minutes ago</div>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center font-medium">View all notifications</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Sheet>
          <SheetTrigger asChild>
            <Button className="md:hidden h-9 w-9 rounded-md hover:bg-accent hover:text-accent-foreground">
              <Search className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="h-40">
            <SheetHeader className="mb-4">
              <SheetTitle>Search</SheetTitle>
              <SheetDescription>Search for patients, appointments, or orders</SheetDescription>
            </SheetHeader>
            <form className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
