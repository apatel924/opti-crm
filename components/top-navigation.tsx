"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Search, Plus, Bot } from "lucide-react"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AiAssistant } from "@/components/ai-assistant"

export function TopNavigation() {
  const [searchQuery, setSearchQuery] = useState("")
  const [aiDialogOpen, setAiDialogOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div className="hidden md:block w-[300px]">
            <QuickSearch />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Dialog open={aiDialogOpen} onOpenChange={setAiDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-ghibli-blue/10 border-ghibli-blue text-ghibli-blue hover:bg-ghibli-blue/20"
              >
                <Bot className="h-4 w-4" />
                <span className="hidden sm:inline">I'm an AI, ask me for help</span>
                <span className="sm:hidden">AI Help</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-ghibli-blue" />
                  OptiCRM Assistant
                </DialogTitle>
                <DialogDescription>
                  I can help you navigate the system, find information, and complete tasks.
                </DialogDescription>
              </DialogHeader>
              <AiAssistant onClose={() => setAiDialogOpen(false)} />
            </DialogContent>
          </Dialog>

          <Button variant="outline" size="sm" asChild className="hidden md:flex">
            <Link href="/patients/new">
              <Plus className="mr-2 h-4 w-4" />
              New Patient
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs bg-ghibli-blue text-white">
                  3
                </Badge>
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
              <Button variant="ghost" size="icon" className="md:hidden">
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
      </div>
    </header>
  )
}
