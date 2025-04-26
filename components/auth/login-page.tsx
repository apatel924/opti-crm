"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"


export function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      // Accept any credentials
      router.push("/dashboard")
    }, 1000)
  }
