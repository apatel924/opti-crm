"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Calendar,
  Eye,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Settings,
  ShoppingBag,
  Users,
  DollarSign,
  FlaskRoundIcon as Flask,
  Globe,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/mode-toggle"

// Custom styles for the sidebar trigger
const sidebarTriggerStyles = "bg-white/20 text-white hover:bg-white/30 rounded-md"

const mainNavItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "Patients",
    icon: Users,
    href: "/patients",
  },
  {
    title: "Appointments",
    icon: Calendar,
    href: "/appointments",
  },
  {
    title: "Examinations",
    icon: Eye,
    href: "/examinations",
  },
  {
    title: "Lab Management",
    icon: Flask,
    href: "/lab",
  },
  {
    title: "Quick Billing",
    icon: DollarSign,
    href: "/quick-billing",
  },
  {
    title: "Inventory",
    icon: ShoppingBag,
    href: "/inventory",
  },
  {
    title: "Communications",
    icon: MessageSquare,
    href: "/communications",
  },
  {
    title: "Portal & Integrations",
    icon: Globe,
    href: "/portal",
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { state } = useSidebar()

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="bg-gradient-to-b from-ghibli-blue to-ghibli-cream border-r border-ghibli-blue-light"
      triggerClassName={sidebarTriggerStyles}
    >
      <SidebarHeader className="border-b border-white/20">
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md animate-float">
            <Eye className="h-6 w-6 text-ghibli-blue" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-white">OptiVue</span>
            <span className="text-xs text-white/80">Optometry Management</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-opacity-10 backdrop-blur-sm">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/90">Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))}
                    tooltip={state === "collapsed" ? item.title : undefined}
                    className={`transition-all duration-300 hover:bg-white/20 active:scale-95 ${
                      pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
                        ? "bg-white/30 font-medium text-black"
                        : "text-white"
                    }`}
                  >
                    <Link href={item.href}>
                      <item.icon
                        className={`h-5 w-5 ${
                          pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
                            ? "text-black"
                            : "text-white"
                        }`}
                      />
                      <span
                        className={`${
                          pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
                            ? "text-black"
                            : "text-white"
                        }`}
                      >
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator className="bg-white/20" />
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/90">System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/settings"}
                  tooltip={state === "collapsed" ? "Settings" : undefined}
                  className={`transition-all duration-300 hover:bg-white/20 active:scale-95 ${
                    pathname === "/settings" ? "bg-white/30 font-medium text-black" : "text-white"
                  }`}
                >
                  <Link href="/settings">
                    <Settings className={`h-5 w-5 ${pathname === "/settings" ? "text-black" : "text-white"}`} />
                    <span className={`${pathname === "/settings" ? "text-black" : "text-white"}`}>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/help"}
                  tooltip={state === "collapsed" ? "Help & Documentation" : undefined}
                  className={`transition-all duration-300 hover:bg-white/20 active:scale-95 ${
                    pathname === "/help" ? "bg-white/30 font-medium text-black" : "text-white"
                  }`}
                >
                  <Link href="/help">
                    <FileText className={`h-5 w-5 ${pathname === "/help" ? "text-black" : "text-white"}`} />
                    <span className={`${pathname === "/help" ? "text-black" : "text-white"}`}>
                      Help & Documentation
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-white/20 p-4">
        <div className="flex items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 rounded-full p-0 hover:bg-white/20">
                <Avatar className="h-8 w-8 border-2 border-white">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback className="bg-ghibli-blue text-white">OP</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 rounded-xl">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="rounded-lg">Profile</DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg">Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="rounded-lg">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
