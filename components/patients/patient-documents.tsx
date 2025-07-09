"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Upload,
  Download,
  Image,
  File,
  FileSpreadsheet,
  FileIcon as FilePdf,
  MoreHorizontal,
  Trash,
  Share,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

interface PatientDocumentsProps {
  patient: any
}

export function PatientDocuments({ patient }: PatientDocumentsProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDocuments = patient.documents.filter(
    (doc: any) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getDocumentIcon = (type: string) => {
    if (type.includes("image")) return Image
    if (type.includes("pdf")) return FilePdf
    if (type.includes("spreadsheet") || type.includes("excel")) return FileSpreadsheet
    return File
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Documents & Images</h3>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Input
          type="search"
          placeholder="Search documents..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredDocuments.map((document: any) => {
          const DocIcon = getDocumentIcon(document.type)

          return (
            <Card key={document.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-md bg-primary/10 p-2">
                      <DocIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{document.name}</CardTitle>
                      <CardDescription>{document.date}</CardDescription>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share className="mr-2 h-4 w-4" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-xs text-muted-foreground">Uploaded by: {document.uploadedBy}</div>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {document.type.split("/")[1].toUpperCase()}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  View Document
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
