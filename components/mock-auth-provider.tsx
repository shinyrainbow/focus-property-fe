"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface User {
  username: string
  email: string
  attributes: any
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (username: string, password: string) => Promise<void>
  signUp: (username: string, password: string, email: string) => Promise<void>
  signOut: () => Promise<void>
  confirmSignUp: (username: string, code: string) => Promise<void>
}

// Mock users for testing
const mockUsers = [
  {
    username: "testuser",
    password: "password123",
    email: "test@focusproperty.com",
    attributes: {
      email: "test@focusproperty.com",
      name: "Test User",
    },
  },
  {
    username: "john.doe",
    password: "demo123",
    email: "john.doe@example.com",
    attributes: {
      email: "john.doe@example.com",
      name: "John Doe",
    },
  },
  {
    username: "admin",
    password: "admin123",
    email: "admin@focusproperty.com",
    attributes: {
      email: "admin@focusproperty.com",
      name: "Admin User",
    },
  },
]

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function MockAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem("mockUser")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem("mockUser")
      }
    }
    setLoading(false)
  }, [])

  const signIn = async (username: string, password: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser = mockUsers.find((u) => u.username === username && u.password === password)

    if (!mockUser) {
      throw new Error("Invalid username or password")
    }

    const user = {
      username: mockUser.username,
      email: mockUser.email,
      attributes: mockUser.attributes,
    }

    setUser(user)
    localStorage.setItem("mockUser", JSON.stringify(user))
  }

  const signUp = async (username: string, password: string, email: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.username === username || u.email === email)
    if (existingUser) {
      throw new Error("User already exists")
    }

    // In a real app, this would create the user in the backend
    // For mock purposes, we'll just simulate success
    console.log("Mock user created:", { username, email })
  }

  const signOut = async () => {
    setUser(null)
    localStorage.removeItem("mockUser")
  }

  const confirmSignUp = async (username: string, code: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For mock purposes, any 6-digit code works
    if (code.length !== 6) {
      throw new Error("Invalid verification code")
    }

    console.log("Mock user confirmed:", username)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        confirmSignUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useMockAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useMockAuth must be used within a MockAuthProvider")
  }
  return context
}
