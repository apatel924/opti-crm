"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Bot, Send, User, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

interface AiAssistantProps {
  onClose?: () => void
}

export function AiAssistant({ onClose }: AiAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your OptiCRM assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let response = ""

      // Simple pattern matching for demo purposes
      const lowercaseInput = input.toLowerCase()
      if (lowercaseInput.includes("appointment") || lowercaseInput.includes("schedule")) {
        response =
          "To schedule an appointment, go to the Appointments page and click on 'New Appointment'. You can then select a patient, doctor, date, and time."
      } else if (
        lowercaseInput.includes("patient") &&
        (lowercaseInput.includes("add") || lowercaseInput.includes("new"))
      ) {
        response =
          "To add a new patient, click on the 'New Patient' button in the top navigation bar, or go to Patients > New Patient."
      } else if (lowercaseInput.includes("lab") || lowercaseInput.includes("order")) {
        response =
          "Lab orders can be managed in the Lab Management section. You can create new orders, track existing ones, and update their status."
      } else if (lowercaseInput.includes("billing") || lowercaseInput.includes("invoice")) {
        response =
          "For billing operations, visit the Quick Billing section. You can create new invoices, process payments, and view billing history."
      } else {
        response =
          "I'm here to help with OptiCRM! You can ask me about patients, appointments, lab orders, billing, and more. How can I assist you today?"
      }

      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: response,
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-[500px]">
      <ScrollArea className="flex-1 p-4 rounded-md border bg-muted/20">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
            >
              {message.role === "assistant" && (
                <div className="h-8 w-8 rounded-full bg-ghibli-blue flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
              )}
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.role === "assistant"
                    ? "bg-ghibli-blue-light text-gray-800"
                    : "bg-ghibli-green-light text-gray-800"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
              {message.role === "user" && (
                <div className="h-8 w-8 rounded-full bg-ghibli-green flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-ghibli-blue flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="rounded-lg px-4 py-2 bg-ghibli-blue-light">
                <Loader2 className="h-5 w-5 animate-spin text-gray-800" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <div className="flex items-center gap-2 mt-4">
        <Input
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <Button onClick={handleSend} disabled={isLoading || !input.trim()} size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
