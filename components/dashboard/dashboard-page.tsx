"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RoleSelector } from "@/components/dashboard/role-selector"
import { AppointmentList } from "@/components/dashboard/appointment-list"
import { RecentPatients } from "@/components/dashboard/recent-patients"
import { MetricsCards } from "@/components/dashboard/metrics-cards"
import { ActivityFeed } from "@/components/dashboard/activity-feed"


export function DashboardPage() {
  const [selectedRole, setSelectedRole] = useState("front-desk")

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ghibli-blue">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your clinic today.</p>
        </div>
        <RoleSelector value={selectedRole} onValueChange={setSelectedRole} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricsCards role={selectedRole} />
      </div>

      <Tabs defaultValue="appointments" className="space-y-4">
        <TabsList className="rounded-xl p-1 bg-ghibli-blue-light/30">
          <TabsTrigger value="appointments" className="rounded-lg data-[state=active]:bg-white">
            Today's Appointments
          </TabsTrigger>
          <TabsTrigger value="patients" className="rounded-lg data-[state=active]:bg-white">
            Recent Patients
          </TabsTrigger>
          <TabsTrigger value="activity" className="rounded-lg data-[state=active]:bg-white">
            Activity Feed
          </TabsTrigger>
        </TabsList>
        <TabsContent value="appointments" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-ghibli-blue">Today's Appointments</h2>
            <Button variant="outline" size="sm" className="ghibli-button">
              View All
            </Button>
          </div>
          <AppointmentList />
        </TabsContent>
        <TabsContent value="patients" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-ghibli-blue">Recent Patients</h2>
            <div className="flex items-center gap-2">
              <form className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search patients..." className="w-[200px] pl-8 ghibli-input" />
              </form>
              <Button variant="outline" size="sm" className="ghibli-button">
                View All
              </Button>
            </div>
          </div>
          <RecentPatients />
        </TabsContent>
        <TabsContent value="activity" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-ghibli-blue">Activity Feed</h2>
            <Button variant="outline" size="sm" className="ghibli-button">
              View All
            </Button>
          </div>
          <ActivityFeed />
        </TabsContent>
      </Tabs>
    </div>
  )
}

