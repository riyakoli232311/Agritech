"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import { farmerProfile, schemes, applications, notifications } from "@/data/mock-data"
import {
  Sparkles,
  ClipboardList,
  Clock,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  FileText,
  Bell,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface DashboardPageProps {
  onNavigate: (page: string) => void
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const eligibleSchemes = schemes.filter((s) => s.status === "eligible")
  const submittedApps = applications.length
  const pendingApps = applications.filter(
    (a) => a.status === "pending" || a.status === "in_progress"
  ).length
  const approvedApps = applications.filter((a) => a.status === "approved").length

  const summaryCards = [
    {
      title: "Eligible Schemes",
      value: eligibleSchemes.length,
      icon: Sparkles,
      color: "text-sky-600",
      bg: "bg-sky-50",
    },
    {
      title: "Applications",
      value: submittedApps,
      icon: ClipboardList,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Pending Review",
      value: pendingApps,
      icon: Clock,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      title: "Approved",
      value: approvedApps,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ]

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      {/* Welcome Section */}
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Welcome back, {farmerProfile.name.split(" ")[0]}
        </h2>
        <p className="text-muted-foreground">
          Here is an overview of your scheme applications and recommendations.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <Card key={card.title} className="border border-border">
            <CardContent className="flex items-center gap-4 p-5">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${card.bg}`}
              >
                <card.icon className={`h-6 w-6 ${card.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-card-foreground">
                  {card.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recommended Schemes */}
        <div className="lg:col-span-2">
          <Card className="border border-border">
            <CardHeader className="flex-row items-center justify-between pb-4">
              <CardTitle className="font-display text-lg font-semibold">
                Top Recommended Schemes
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary"
                onClick={() => onNavigate("recommendations")}
              >
                View All
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pt-0">
              {eligibleSchemes.slice(0, 3).map((scheme) => (
                <div
                  key={scheme.id}
                  className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-sm font-semibold text-card-foreground">
                      {scheme.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {scheme.benefitAmount}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-bold text-primary">
                      {scheme.matchScore}%
                    </span>
                    <span className="text-[10px] text-muted-foreground">Match</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* Application Status */}
          <Card className="border border-border">
            <CardHeader className="flex-row items-center justify-between pb-4">
              <CardTitle className="font-display text-lg font-semibold">
                Application Status
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary"
                onClick={() => onNavigate("applications")}
              >
                View
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pt-0">
              {applications.slice(0, 3).map((app) => (
                <div key={app.id} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-card-foreground">
                      {app.schemeName.length > 22
                        ? app.schemeName.substring(0, 22) + "..."
                        : app.schemeName}
                    </span>
                    <StatusBadge status={app.status} />
                  </div>
                  <Progress
                    value={(app.currentStep / app.totalSteps) * 100}
                    className="h-1.5"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border border-border">
            <CardHeader className="flex-row items-center justify-between pb-4">
              <CardTitle className="font-display text-lg font-semibold">
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pt-0">
              {notifications.slice(0, 3).map((notif) => (
                <div
                  key={notif.id}
                  className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
                >
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted">
                    {notif.type === "success" ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    ) : notif.type === "warning" ? (
                      <Bell className="h-3.5 w-3.5 text-amber-600" />
                    ) : (
                      <FileText className="h-3.5 w-3.5 text-sky-600" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-card-foreground">
                      {notif.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{notif.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
