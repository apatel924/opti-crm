"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { PatientSearchDialog } from "@/components/patient-search/patient-search-dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export function NewBillingDialog() {
    const [open, setOpen] = useState(false)
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Billing
          </Button>
        </DialogTrigger>
  
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Billing</DialogTitle>
          </DialogHeader>
          <form>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="patient">Patient</Label>
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger id="patient">
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="P-10042">Sarah Johnson (P-10042)</SelectItem>
                      <SelectItem value="P-10043">Michael Chen (P-10043)</SelectItem>
                      <SelectItem value="P-10044">Robert Garcia (P-10044)</SelectItem>
                    </SelectContent>
                  </Select>
                  <PatientSearchDialog
                    trigger={
                      <Button variant="outline" type="button">
                        <Search className="mr-2 h-4 w-4" />
                        Find
                      </Button>
                    }
                  />
                </div>
              </div>
              <Tabs defaultValue="exam">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="exam">Eye Exam</TabsTrigger>
                  <TabsTrigger value="lab">Lab Order</TabsTrigger>
                  <TabsTrigger value="custom">Custom</TabsTrigger>
                </TabsList>

                <TabsContent value="exam" className="space-y-4 pt-4">
                  {/* Exam fields will go here */}
                </TabsContent>

                <TabsContent value="lab" className="space-y-4 pt-4">
                  {/* Lab order fields will go here */}
                </TabsContent>

                <TabsContent value="custom" className="space-y-4 pt-4">
                  {/* Custom billing fields will go here */}
                </TabsContent>
              </Tabs>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    )
}