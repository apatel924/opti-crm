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
    <div>
      <div>
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back! Here's an overview of your clinic today.</p>
        </div>
        <RoleSelector value={selectedRole} onValueChange={setSelectedRole} />
      </div>

      <div>
        <MetricsCards role={selectedRole} />
      </div>

      <Tabs defaultValue="appointments">
        <TabsList>
          <TabsTrigger value="appointments">Today's Appointments</TabsTrigger>
          <TabsTrigger value="patients">Recent Patients</TabsTrigger>
          <TabsTrigger value="activity">Activity Feed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="appointments">
          <div>
            <h2>Today's Appointments</h2>
            <Button>View All</Button>
          </div>
          <AppointmentList />
        </TabsContent>

        <TabsContent value="patients">
          <div>
            <h2>Recent Patients</h2>
            <div>
              <form>
                <Search />
                <Input type="search" placeholder="Search patients..." />
              </form>
              <Button>View All</Button>
            </div>
          </div>
          <RecentPatients />
        </TabsContent>

        <TabsContent value="activity">
          <div>
            <h2>Activity Feed</h2>
            <Button>View All</Button>
          </div>
          <ActivityFeed />
        </TabsContent>
      </Tabs>
    </div>
  )
}
