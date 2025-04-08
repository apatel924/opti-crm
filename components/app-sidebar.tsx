"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  Eye,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Settings,
  ShoppingBag,
  Users,
  Wallet,
  FlaskRoundIcon as Flask,
  Globe,
} from "lucide-react";
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
} from "@/components/ui/sidebar";
// import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
// import { Button } from "@/app/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/app/components/ui/dropdown-menu";
// import { ModeToggle } from "@/app/components/mode-toggle";

const mainNavItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/" },
  { title: "Patients", icon: Users, href: "/patients" },
  { title: "Appointments", icon: Calendar, href: "/appointments" },
  { title: "Examinations", icon: Eye, href: "/examinations" },
  { title: "Lab Management", icon: Flask, href: "/lab" },
  { title: "Billing", icon: Wallet, href: "/billing" },
  { title: "Inventory", icon: ShoppingBag, href: "/inventory" },
  { title: "Communications", icon: MessageSquare, href: "/communications" },
  { title: "Portal & Integrations", icon: Globe, href: "/portal" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="border-b px-2">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary">
            <Eye className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold">OptiCRM</span>
            <span className="text-xs text-muted-foreground">Optometry Management</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      pathname === item.href ||
                      (item.href !== "/" && pathname?.startsWith(item.href))
                    }
                    tooltip={state === "collapsed" ? item.title : undefined}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/settings"}
                  tooltip={state === "collapsed" ? "Settings" : undefined}
                >
                  <Link href="/settings">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/help"}
                  tooltip={state === "collapsed" ? "Help & Documentation" : undefined}
                >
                  <Link href="/help">
                    <FileText className="h-5 w-5" />
                    <span>Help & Documentation</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center justify-end">
          {/* User menu removed */}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
