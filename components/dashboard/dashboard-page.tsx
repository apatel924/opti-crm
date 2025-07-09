"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Eye, Users, FileText, ArrowRight, Sparkles } from "lucide-react"
import { RoleSelector } from "@/components/dashboard/role-selector"
import { AppointmentList } from "@/components/dashboard/appointment-list"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { RecentPatients } from "@/components/dashboard/recent-patients"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export function DashboardPage() {
  const [selectedRole, setSelectedRole] = useState("optometrist")

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ghibli-blue">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to OptiCRM</p>
        </div>
        <RoleSelector value={selectedRole} onValueChange={setSelectedRole} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="bg-gradient-to-br from-ghibli-blue-light to-white border-ghibli-blue/20 shadow-md hover:shadow-lg transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Calendar className="h-5 w-5 text-ghibli-blue" />
              <span>My Appointments</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-ghibli-blue">12</div>
            <p className="text-sm text-muted-foreground">Today's schedule</p>
          </CardContent>
          <CardFooter>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-ghibli-blue hover:text-ghibli-blue hover:bg-ghibli-blue/10"
              asChild
            >
              <Link href="/appointments">
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-gradient-to-br from-ghibli-green-light to-white border-ghibli-green/20 shadow-md hover:shadow-lg transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Users className="h-5 w-5 text-ghibli-green" />
              <span>Patients Seen</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-ghibli-green">5</div>
            <p className="text-sm text-muted-foreground">Today</p>
            <Progress value={42} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">42% of schedule</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-ghibli-yellow-light to-white border-ghibli-yellow/20 shadow-md hover:shadow-lg transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Eye className="h-5 w-5 text-ghibli-brown" />
              <span>Pending Orders</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-ghibli-brown">8</div>
            <p className="text-sm text-muted-foreground">Requires attention</p>
          </CardContent>
          <CardFooter>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-ghibli-brown hover:text-ghibli-brown hover:bg-ghibli-brown/10"
              asChild
            >
              <Link href="/lab">
                View orders
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-gradient-to-br from-ghibli-pink-light to-white border-ghibli-pink/20 shadow-md hover:shadow-lg transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <FileText className="h-5 w-5 text-ghibli-pink" />
              <span>Unread Messages</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-ghibli-pink">3</div>
            <p className="text-sm text-muted-foreground">From patients</p>
          </CardContent>
          <CardFooter>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-ghibli-pink hover:text-ghibli-pink hover:bg-ghibli-pink/10"
              asChild
            >
              <Link href="/communications">
                Check inbox
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7 mb-6">
        <Card className="md:col-span-4 border-ghibli-blue/20 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-ghibli-blue" />
              <span>Today's Schedule</span>
            </CardTitle>
            <CardDescription>Your upcoming appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <AppointmentList />
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              View Full Schedule
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-3 border-ghibli-green/20 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-ghibli-green" />
              <span>Activity Feed</span>
            </CardTitle>
            <CardDescription>Recent system activity</CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityFeed />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        <Card className="md:col-span-8 border-ghibli-yellow/20 shadow-md">
          <CardHeader>
            <CardTitle>Recent Patients</CardTitle>
            <CardDescription>Patients you've seen recently</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentPatients />
          </CardContent>
        </Card>

        <Card className="md:col-span-4 border-ghibli-pink/20 shadow-md">
          <CardHeader>
            <CardTitle>Next Patient</CardTitle>
            <CardDescription>Coming up at 10:30 AM</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 mb-4 flex items-center justify-center rounded-full bg-ghibli-blue-light">
                <Users className="h-8 w-8 text-ghibli-blue" />
              </div>
              <h3 className="text-2xl font-bold text-ghibli-blue">John D.</h3>
              <p className="text-muted-foreground">Annual Eye Exam</p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
                <Button size="sm">Start Exam</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
