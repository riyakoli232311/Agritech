"use client"

import React, { createContext, useContext, useState, useCallback } from "react"

type AuthState = "landing" | "login" | "signup" | "onboarding" | "authenticated"

interface AuthContextType {
  authState: AuthState
  setAuthState: (state: AuthState) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>("landing")

  const logout = useCallback(() => {
    setAuthState("landing")
  }, [])

  return (
    <AuthContext.Provider value={{ authState, setAuthState, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
