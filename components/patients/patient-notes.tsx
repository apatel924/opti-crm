"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Save } from "lucide-react"

interface PatientNotesProps {
  patient: any
}

export function PatientNotes({ patient }: PatientNotesProps) {
  const [notes, setNotes] = useState(patient.notes || [])
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [newNoteTitle, setNewNoteTitle] = useState("")
  const [newNoteContent, setNewNoteContent] = useState("")

  const handleAddNote = () => {
    if (newNoteTitle.trim() === "" || newNoteContent.trim() === "") return

    const newNote = {
      id: `N-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      title: newNoteTitle,
      content: newNoteContent,
      author: "Current User",
    }

    setNotes([newNote, ...notes])
    setNewNoteTitle("")
    setNewNoteContent("")
    setIsAddingNote(false)
  }

  const handleCancel = () => {
    setNewNoteTitle("")
    setNewNoteContent("")
    setIsAddingNote(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Patient Notes</h3>
        {!isAddingNote && (
          <Button onClick={() => setIsAddingNote(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Note
          </Button>
        )}
      </div>

      {isAddingNote && (
        <Card>
          <CardHeader>
            <CardTitle>New Note</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="note-title">Title</Label>
                <Input
                  id="note-title"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  placeholder="Note title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="note-content">Content</Label>
                <Textarea
                  id="note-content"
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  placeholder="Note content"
                  rows={5}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleAddNote}>
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {notes.length === 0 ? (
          <div className="rounded-md border border-dashed p-8 text-center">
            <p className="text-muted-foreground">No notes have been added yet.</p>
          </div>
        ) : (
          notes.map((note: any) => (
            <Card key={note.id}>
              <CardContent className="p-4">
                <h4 className="font-medium">{note.title}</h4>
                <div className="whitespace-pre-wrap text-sm">{note.content}</div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Added by {note.author} on {note.date}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
