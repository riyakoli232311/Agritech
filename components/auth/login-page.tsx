"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useAuth } from "@/hooks/use-auth"
import { ArrowLeft, Wheat, Phone, Mail } from "lucide-react"

export function LoginPage() {
  const { setAuthState } = useAuth()
  const [otpSent, setOtpSent] = useState(false)

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
              Welcome Back
            </h1>
            <p className="text-sm text-muted-foreground">
              Log in to access your dashboard
            </p>
          </CardHeader>
          <CardContent className="p-6 pt-4">
            <Tabs defaultValue="password" className="w-full">
              <TabsList className="mb-6 grid w-full grid-cols-2">
                <TabsTrigger value="password" className="gap-2">
                  <Mail className="h-3.5 w-3.5" />
                  Password
                </TabsTrigger>
                <TabsTrigger value="otp" className="gap-2">
                  <Phone className="h-3.5 w-3.5" />
                  OTP
                </TabsTrigger>
              </TabsList>

              <TabsContent value="password">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setAuthState("authenticated")
                  }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="login-phone">Phone Number or Email</Label>
                    <Input
                      id="login-phone"
                      placeholder="+91 98765 43210"
                      defaultValue="+91 98765 43210"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password">Password</Label>
                      <button
                        type="button"
                        className="text-xs font-medium text-primary hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      defaultValue="password123"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="remember" defaultChecked />
                    <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">
                      Remember me
                    </Label>
                  </div>
                  <Button type="submit" size="lg" className="mt-2 w-full text-base font-semibold">
                    Log In
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="otp">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="otp-phone">Phone Number</Label>
                    <Input
                      id="otp-phone"
                      placeholder="+91 98765 43210"
                      defaultValue="+91 98765 43210"
                    />
                  </div>
                  {!otpSent ? (
                    <Button
                      size="lg"
                      className="w-full text-base font-semibold"
                      onClick={() => setOtpSent(true)}
                    >
                      Send OTP
                    </Button>
                  ) : (
                    <>
                      <div className="flex flex-col items-center gap-2">
                        <Label>Enter 6-digit OTP</Label>
                        <InputOTP maxLength={6}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                        <button
                          type="button"
                          className="mt-1 text-xs text-primary hover:underline"
                          onClick={() => setOtpSent(false)}
                        >
                          Resend OTP
                        </button>
                      </div>
                      <Button
                        size="lg"
                        className="w-full text-base font-semibold"
                        onClick={() => setAuthState("authenticated")}
                      >
                        Verify & Log In
                      </Button>
                    </>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {"Don't have an account? "}
                <button
                  className="font-semibold text-primary hover:underline"
                  onClick={() => setAuthState("signup")}
                >
                  Sign Up
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
