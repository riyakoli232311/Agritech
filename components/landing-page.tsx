"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"
import {
  Search,
  Shield,
  FileCheck,
  MessageSquare,
  Globe,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Wheat,
  Users,
  TrendingUp,
} from "lucide-react"
import Image from "next/image"
import { LanguageSelector } from "@/components/language-selector"

export function LandingPage() {
  const { setAuthState } = useAuth()

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Wheat className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">
              KisanMitra
            </span>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              How It Works
            </a>
            <a href="#schemes" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Schemes
            </a>
            <LanguageSelector />
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-sm font-medium"
              onClick={() => setAuthState("login")}
            >
              Log In
            </Button>
            <Button
              className="text-sm font-medium"
              onClick={() => setAuthState("signup")}
            >
              Get Started
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                AI-Powered Scheme Discovery
              </div>
              <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
                <span className="text-balance">Every Farmer Deserves the Right Support</span>
              </h1>
              <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
                Discover government schemes tailored to your profile. Our AI analyzes your land, crops, and location to recommend the best benefits available to you.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="text-base font-semibold"
                  onClick={() => setAuthState("signup")}
                >
                  Start Free Discovery
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base font-semibold"
                  onClick={() => setAuthState("login")}
                >
                  I Have an Account
                </Button>
              </div>
              {/* Stats */}
              <div className="mt-4 flex gap-8">
                <div>
                  <p className="text-2xl font-bold text-foreground">500+</p>
                  <p className="text-sm text-muted-foreground">Schemes Available</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">12 Lakh+</p>
                  <p className="text-sm text-muted-foreground">Farmers Served</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">16</p>
                  <p className="text-sm text-muted-foreground">Languages</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/images/hero-farmer.jpg"
                  alt="Indian farmland at golden hour with lush green fields"
                  width={600}
                  height={400}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 rounded-xl border border-border bg-card p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50">
                    <Shield className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-card-foreground">5 Schemes Found</p>
                    <p className="text-xs text-muted-foreground">Based on your profile</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
              Features
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              <span className="text-balance">Everything You Need in One Place</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              From discovering schemes to tracking your applications, KisanMitra simplifies every step of the process.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Search,
                title: "AI Scheme Discovery",
                desc: "Our AI matches your profile with 500+ government schemes and explains why you qualify.",
              },
              {
                icon: Shield,
                title: "Eligibility Check",
                desc: "Instantly know if you are eligible based on your land, income, crops, and location.",
              },
              {
                icon: FileCheck,
                title: "Document Verification",
                desc: "Upload documents for automatic OCR extraction and verification before applying.",
              },
              {
                icon: MessageSquare,
                title: "AI Assistant",
                desc: "Chat with our AI in your language. Ask questions, get guidance, and apply with ease.",
              },
              {
                icon: TrendingUp,
                title: "Application Tracking",
                desc: "Track all your scheme applications in real-time from submission to benefit disbursal.",
              },
              {
                icon: Globe,
                title: "Multilingual Support",
                desc: "Available in 16 Indian languages with voice input support for easy accessibility.",
              },
            ].map((feature) => (
              <Card
                key={feature.title}
                className="border border-border bg-card transition-shadow hover:shadow-md"
              >
                <CardContent className="flex flex-col gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground">
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
              How It Works
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              <span className="text-balance">Three Simple Steps to Your Benefits</span>
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                icon: Users,
                title: "Create Your Profile",
                desc: "Enter your details like land size, crops, location, and income. It takes less than 5 minutes.",
              },
              {
                step: "02",
                icon: Sparkles,
                title: "Get AI Recommendations",
                desc: "Our AI instantly analyzes your profile and finds all the government schemes you are eligible for.",
              },
              {
                step: "03",
                icon: FileCheck,
                title: "Apply & Track",
                desc: "Upload documents, apply directly, and track your applications all the way to benefit receipt.",
              },
            ].map((item) => (
              <div key={item.step} className="relative flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
                  <item.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <span className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
                  Step {item.step}
                </span>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-primary py-16">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
            <span className="text-balance">Start Discovering Your Government Benefits Today</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Join lakhs of farmers who have already discovered schemes worth crores. Free, easy, and available in your language.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              variant="secondary"
              className="text-base font-semibold"
              onClick={() => setAuthState("signup")}
            >
              Create Free Account
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-base font-semibold text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              onClick={() => setAuthState("login")}
            >
              Log In to Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Wheat className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-bold text-foreground">KisanMitra</span>
            </div>
            <p className="text-sm text-muted-foreground">
              A Digital India Initiative for Farmer Welfare
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
