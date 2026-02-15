"use client"

import { AuthProvider, useAuth } from "@/hooks/use-auth"
import { LandingPage } from "@/components/landing-page"
import { LoginPage } from "@/components/auth/login-page"
import { SignupPage } from "@/components/auth/signup-page"
import { OnboardingPage } from "@/components/auth/onboarding-page"
import { DashboardLayout } from "@/components/dashboard-layout"

function AppRouter() {
  const { authState } = useAuth()

  switch (authState) {
    case "landing":
      return <LandingPage />
    case "login":
      return <LoginPage />
    case "signup":
      return <SignupPage />
    case "onboarding":
      return <OnboardingPage />
    case "authenticated":
      return <DashboardLayout />
    default:
      return <LandingPage />
  }
}

export default function Page() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}
