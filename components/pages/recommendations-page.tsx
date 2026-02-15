"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/status-badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { schemes } from "@/data/mock-data"
import {
  Search,
  Sparkles,
  FileText,
  Calendar,
  CheckCircle2,
  Info,
  ArrowRight,
} from "lucide-react"

interface RecommendationsPageProps {
  onNavigate: (page: string) => void
}

export function RecommendationsPage({ onNavigate: _onNavigate }: RecommendationsPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const categories = ["all", ...new Set(schemes.map((s) => s.category))]

  const filtered = schemes.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchCategory =
      categoryFilter === "all" || s.category === categoryFilter
    return matchSearch && matchCategory
  })

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="font-display text-2xl font-bold text-foreground">
            AI Recommended Schemes
          </h2>
        </div>
        <p className="text-muted-foreground">
          Based on your profile, our AI found {filtered.length} schemes you may be eligible for.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search schemes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Scheme Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((scheme) => (
          <Card
            key={scheme.id}
            className="border border-border transition-shadow hover:shadow-md"
          >
            <CardContent className="flex flex-col gap-4 p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <Badge variant="outline" className="shrink-0 text-xs">
                      {scheme.category}
                    </Badge>
                    <StatusBadge status={scheme.status} />
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground">
                    {scheme.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {scheme.ministry}
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-sm font-bold text-primary">
                      {scheme.matchScore}%
                    </span>
                  </div>
                  <span className="mt-0.5 text-[10px] text-muted-foreground">
                    Match
                  </span>
                </div>
              </div>

              <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {scheme.description}
              </p>

              {/* Benefit & Deadline */}
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-1.5 font-semibold text-card-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  {scheme.benefitAmount}
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  Deadline: {scheme.deadline}
                </span>
              </div>

              {/* Explainable AI */}
              <div className="rounded-lg bg-primary/5 p-3">
                <p className="flex items-start gap-2 text-sm">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <span className="text-card-foreground">
                    <span className="font-semibold">Why you are eligible:</span>{" "}
                    {scheme.whyEligible}
                  </span>
                </p>
              </div>

              {/* Required Documents */}
              <div className="flex flex-wrap gap-1.5">
                <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                {scheme.requiredDocuments.map((doc) => (
                  <Badge
                    key={doc}
                    variant="secondary"
                    className="text-xs font-normal"
                  >
                    {doc}
                  </Badge>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="font-display text-xl">
                        {scheme.name}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{scheme.category}</Badge>
                        <StatusBadge status={scheme.status} />
                        <span className="ml-auto text-sm font-bold text-primary">
                          {scheme.matchScore}% Match
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {scheme.ministry}
                      </p>
                      <Separator />
                      <div>
                        <h4 className="mb-1 font-semibold text-card-foreground">
                          About
                        </h4>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {scheme.description}
                        </p>
                      </div>
                      <div>
                        <h4 className="mb-1 font-semibold text-card-foreground">
                          Benefit
                        </h4>
                        <p className="text-sm text-card-foreground">
                          {scheme.benefitAmount}
                        </p>
                      </div>
                      <div>
                        <h4 className="mb-1 font-semibold text-card-foreground">
                          Eligibility
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {scheme.eligibility}
                        </p>
                      </div>
                      <div className="rounded-lg bg-primary/5 p-3">
                        <h4 className="mb-1 flex items-center gap-1.5 font-semibold text-primary">
                          <Sparkles className="h-4 w-4" />
                          AI Eligibility Analysis
                        </h4>
                        <p className="text-sm text-card-foreground">
                          {scheme.whyEligible}
                        </p>
                      </div>
                      <div>
                        <h4 className="mb-2 font-semibold text-card-foreground">
                          Required Documents
                        </h4>
                        <div className="flex flex-col gap-2">
                          {scheme.requiredDocuments.map((doc) => (
                            <div
                              key={doc}
                              className="flex items-center gap-2 text-sm"
                            >
                              <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                              {doc}
                            </div>
                          ))}
                        </div>
                      </div>
                      <Button className="w-full">
                        Apply Now
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button size="sm" className="flex-1">
                  Apply Now
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
