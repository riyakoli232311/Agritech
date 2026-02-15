"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { applications } from "@/data/mock-data"
import { Eye, CheckCircle2, Clock, AlertCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ApplicationsPageProps {
  onNavigate: (page: string) => void
}

const statusIcons: Record<string, React.ElementType> = {
  completed: CheckCircle2,
  in_progress: Clock,
  pending: Clock,
  rejected: XCircle,
}

const statusColors: Record<string, string> = {
  completed: "text-emerald-600",
  in_progress: "text-sky-600",
  pending: "text-muted-foreground",
  rejected: "text-red-600",
}

export function ApplicationsPage({ onNavigate: _onNavigate }: ApplicationsPageProps) {
  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Application Tracker
        </h2>
        <p className="text-muted-foreground">
          Track all your scheme applications and their current status.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total", value: applications.length, color: "text-foreground" },
          {
            label: "Approved",
            value: applications.filter((a) => a.status === "approved").length,
            color: "text-emerald-600",
          },
          {
            label: "In Progress",
            value: applications.filter(
              (a) => a.status === "in_progress" || a.status === "pending"
            ).length,
            color: "text-sky-600",
          },
          {
            label: "Rejected",
            value: applications.filter((a) => a.status === "rejected").length,
            color: "text-red-600",
          },
        ].map((item) => (
          <Card key={item.label} className="border border-border">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="font-display text-lg font-semibold">
            All Applications
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Scheme</TableHead>
                  <TableHead>Applied Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-card-foreground">
                          {app.schemeName}
                        </p>
                        <p className="text-xs text-muted-foreground">{app.id}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(app.appliedDate).toLocaleDateString("en-IN")}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={app.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-20 overflow-hidden rounded-full bg-muted">
                          <div
                            className={cn(
                              "h-full rounded-full",
                              app.status === "approved"
                                ? "bg-emerald-500"
                                : app.status === "rejected"
                                  ? "bg-red-500"
                                  : "bg-primary"
                            )}
                            style={{
                              width: `${(app.currentStep / app.totalSteps) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {app.currentStep}/{app.totalSteps}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="ghost" size="sm" className="gap-1.5">
                            <Eye className="h-3.5 w-3.5" />
                            Details
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="overflow-y-auto">
                          <SheetHeader>
                            <SheetTitle className="font-display text-xl">
                              {app.schemeName}
                            </SheetTitle>
                          </SheetHeader>
                          <div className="mt-6 flex flex-col gap-5">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">
                                Application ID
                              </span>
                              <span className="font-mono text-sm font-medium">
                                {app.id}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">
                                Status
                              </span>
                              <StatusBadge status={app.status} />
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">
                                Last Updated
                              </span>
                              <span className="text-sm font-medium">
                                {new Date(app.lastUpdated).toLocaleDateString("en-IN")}
                              </span>
                            </div>
                            {app.benefitReceived && (
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                  Benefit Received
                                </span>
                                <span className="text-sm font-semibold text-emerald-600">
                                  {app.benefitReceived}
                                </span>
                              </div>
                            )}
                            {"rejectionReason" in app && app.rejectionReason && (
                              <div className="rounded-lg bg-red-50 p-3">
                                <p className="flex items-start gap-2 text-sm text-red-700">
                                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                                  {app.rejectionReason as string}
                                </p>
                              </div>
                            )}
                            <Separator />
                            {/* Timeline */}
                            <h4 className="font-semibold text-card-foreground">
                              Progress Timeline
                            </h4>
                            <div className="flex flex-col gap-0">
                              {app.timeline.map((step, i) => {
                                const StepIcon =
                                  statusIcons[step.status] || Clock
                                return (
                                  <div key={i} className="flex gap-3">
                                    <div className="flex flex-col items-center">
                                      <div
                                        className={cn(
                                          "flex h-7 w-7 items-center justify-center rounded-full border-2",
                                          step.status === "completed"
                                            ? "border-emerald-500 bg-emerald-50"
                                            : step.status === "in_progress"
                                              ? "border-sky-500 bg-sky-50"
                                              : step.status === "rejected"
                                                ? "border-red-500 bg-red-50"
                                                : "border-border bg-muted"
                                        )}
                                      >
                                        <StepIcon
                                          className={cn(
                                            "h-3.5 w-3.5",
                                            statusColors[step.status]
                                          )}
                                        />
                                      </div>
                                      {i < app.timeline.length - 1 && (
                                        <div className="h-8 w-px bg-border" />
                                      )}
                                    </div>
                                    <div className="pb-6">
                                      <p className="text-sm font-medium text-card-foreground">
                                        {step.step}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        {step.date || "Pending"}
                                      </p>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </SheetContent>
                      </Sheet>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
