"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAuth } from "@/hooks/use-auth"
import { indianStates } from "@/data/mock-data"
import { ArrowLeft, Wheat } from "lucide-react"

export function SignupPage() {
  const { setAuthState } = useAuth()

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">
        <button
          onClick={() => setAuthState("landing")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>

        <Card className="border border-border shadow-lg">
          <CardHeader className="items-center pb-2 pt-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <Wheat className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold text-card-foreground">
              Create Account
            </h1>
            <p className="text-sm text-muted-foreground">
              Register to discover your eligible schemes
            </p>
          </CardHeader>
          <CardContent className="p-6 pt-4">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setAuthState("onboarding")
              }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input id="signup-name" placeholder="Enter your full name" defaultValue="Rajesh Kumar" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="signup-phone">Phone Number</Label>
                <Input id="signup-phone" placeholder="+91 98765 43210" defaultValue="+91 98765 43210" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="signup-state">State</Label>
                <Select defaultValue="Madhya Pradesh">
                  <SelectTrigger id="signup-state">
                    <SelectValue placeholder="Select your state" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" placeholder="Create a strong password" defaultValue="password123" />
              </div>
              <Button type="submit" size="lg" className="mt-2 w-full text-base font-semibold">
                Continue to Profile Setup
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <button
                  className="font-semibold text-primary hover:underline"
                  onClick={() => setAuthState("login")}
                >
                  Log In
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
