"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import {
  getCurrentUser,
  signIn as amplifySignIn,
  signUp as amplifySignUp,
  signOut as amplifySignOut,
  confirmSignUp as amplifyConfirmSignUp,
} from "aws-amplify/auth"

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

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuthState()
  }, [])

  const checkAuthState = async () => {
    try {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (username: string, password: string) => {
    const result = await amplifySignIn({ username, password })
    if (result.isSignedIn) {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    }
  }

  const signUp = async (username: string, password: string, email: string) => {
    await amplifySignUp({
      username,
      password,
      options: {
        userAttributes: {
          email,
        },
      },
    })
  }

  const signOut = async () => {
    await amplifySignOut()
    setUser(null)
  }

  const confirmSignUp = async (username: string, code: string) => {
    await amplifyConfirmSignUp({ username, confirmationCode: code })
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

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
