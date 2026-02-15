"use client"

import { useState, useEffect } from "react"
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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { farmerProfile, schemes } from "@/data/mock-data"
import { matchAllSchemes, explainMatch, MatchResult } from "@/lib/scheme-matcher"
import {
  Search,
  Sparkles,
  FileText,
  Calendar,
  CheckCircle2,
  Info,
  ArrowRight,
  AlertCircle,
  TrendingUp,
  XCircle,
} from "lucide-react"

interface RecommendationsPageProps {
  onNavigate: (page: string) => void
}

export function RecommendationsPage({ onNavigate: _onNavigate }: RecommendationsPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [matchResults, setMatchResults] = useState<MatchResult[]>([])
  const [showOnlyEligible, setShowOnlyEligible] = useState(true)

  useEffect(() => {
    // Calculate matches on mount
    const results = matchAllSchemes(farmerProfile, schemes)
    setMatchResults(results)
  }, [])

  const categories = ["all", ...new Set(schemes.map((s) => s.category))]

  const filtered = matchResults.filter((result) => {
    const matchSearch =
      result.scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.scheme.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchCategory =
      categoryFilter === "all" || result.scheme.category === categoryFilter
    const matchEligibility = !showOnlyEligible || result.isEligible
    
    return matchSearch && matchCategory && matchEligibility
  })

  const eligibleCount = matchResults.filter(r => r.isEligible).length
  const totalCount = matchResults.length

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="font-display text-2xl font-bold text-foreground">
            AI Scheme Recommendations
          </h2>
        </div>
        <p className="text-muted-foreground">
          Based on your profile, you are eligible for <span className="font-semibold text-primary">{eligibleCount} out of {totalCount}</span> schemes.
        </p>
      </div>

      {/* Summary Alert */}
      {eligibleCount > 0 && (
        <Alert className="border-emerald-200 bg-emerald-50">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <AlertDescription className="text-emerald-800">
            <strong>Great news!</strong> You qualify for {eligibleCount} government schemes worth potential benefits of <strong>Rs. 10+ lakh</strong>. Start applying today!
          </AlertDescription>
        </Alert>
      )}

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
        <Button
          variant={showOnlyEligible ? "default" : "outline"}
          onClick={() => setShowOnlyEligible(!showOnlyEligible)}
          className="gap-2"
        >
          {showOnlyEligible ? (
            <>
              <CheckCircle2 className="h-4 w-4" />
              Eligible Only
            </>
          ) : (
            <>
              <Info className="h-4 w-4" />
              Show All
            </>
          )}
        </Button>
      </div>

      {/* Scheme Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((result) => (
          <Card
            key={result.scheme.id}
            className={`border transition-shadow hover:shadow-md ${
              result.isEligible 
                ? "border-emerald-200 bg-emerald-50/30" 
                : "border-border"
            }`}
          >
            <CardContent className="flex flex-col gap-4 p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <Badge variant="outline" className="shrink-0 text-xs">
                      {result.scheme.category}
                    </Badge>
                    {result.isEligible ? (
                      <Badge className="shrink-0 gap-1 bg-emerald-600">
                        <CheckCircle2 className="h-3 w-3" />
                        Eligible
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="shrink-0 gap-1 border-red-200 bg-red-50 text-red-700">
                        <XCircle className="h-3 w-3" />
                        Not Eligible
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground">
                    {result.scheme.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {result.scheme.ministry}
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    result.matchScore >= 80 
                      ? "bg-emerald-100" 
                      : result.matchScore >= 60
                      ? "bg-amber-100"
                      : "bg-gray-100"
                  }`}>
                    <span className={`text-sm font-bold ${
                      result.matchScore >= 80 
                        ? "text-emerald-600" 
                        : result.matchScore >= 60
                        ? "text-amber-600"
                        : "text-gray-600"
                    }`}>
                      {result.matchScore}%
                    </span>
                  </div>
                  <span className="mt-0.5 text-[10px] text-muted-foreground">
                    Match
                  </span>
                </div>
              </div>

              <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {result.scheme.description}
              </p>

              {/* Benefit & Deadline */}
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-1.5 font-semibold text-card-foreground">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                  {result.scheme.benefitAmount}
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  Deadline: {result.scheme.deadline}
                </span>
              </div>

              {/* Explainable AI */}
              <div className={`rounded-lg p-3 ${
                result.isEligible 
                  ? "bg-emerald-50 border border-emerald-200" 
                  : "bg-amber-50 border border-amber-200"
              }`}>
                <p className="flex items-start gap-2 text-sm">
                  {result.isEligible ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  ) : (
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                  )}
                  <span className="text-card-foreground">
                    <span className="font-semibold">
                      {result.isEligible ? "Why you're eligible:" : "Why not eligible:"}
                    </span>{" "}
                    {result.isEligible 
                      ? result.reasons.slice(0, 2).join(", ")
                      : result.missingRequirements.slice(0, 2).join(", ")
                    }
                  </span>
                </p>
              </div>

              {/* Required Documents */}
              <div className="flex flex-wrap gap-1.5">
                <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                {result.scheme.requiredDocuments.slice(0, 3).map((doc) => (
                  <Badge
                    key={doc}
                    variant="secondary"
                    className="text-xs font-normal"
                  >
                    {doc}
                  </Badge>
                ))}
                {result.scheme.requiredDocuments.length > 3 && (
                  <Badge variant="secondary" className="text-xs font-normal">
                    +{result.scheme.requiredDocuments.length - 3} more
                  </Badge>
                )}
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
                        {result.scheme.name}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{result.scheme.category}</Badge>
                        {result.isEligible ? (
                          <Badge className="gap-1 bg-emerald-600">
                            <CheckCircle2 className="h-3 w-3" />
                            Eligible
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="gap-1 border-red-200 bg-red-50 text-red-700">
                            <XCircle className="h-3 w-3" />
                            Not Eligible
                          </Badge>
                        )}
                        <span className="ml-auto text-sm font-bold text-primary">
                          {result.matchScore}% Match
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {result.scheme.ministry}
                      </p>
                      <Separator />
                      <div>
                        <h4 className="mb-1 font-semibold text-card-foreground">
                          About
                        </h4>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {result.scheme.description}
                        </p>
                      </div>
                      <div>
                        <h4 className="mb-1 font-semibold text-card-foreground">
                          Benefit
                        </h4>
                        <p className="text-sm text-card-foreground">
                          {result.scheme.benefitAmount}
                        </p>
                      </div>
                      <Separator />
                      <div className={`rounded-lg p-4 ${
                        result.isEligible 
                          ? "bg-emerald-50 border border-emerald-200" 
                          : "bg-amber-50 border border-amber-200"
                      }`}>
                        <h4 className="mb-2 flex items-center gap-1.5 font-semibold">
                          <Sparkles className="h-4 w-4" />
                          AI Eligibility Analysis
                        </h4>
                        <div className="whitespace-pre-line text-sm text-card-foreground">
                          {explainMatch(result)}
                        </div>
                      </div>
                      <div>
                        <h4 className="mb-2 font-semibold text-card-foreground">
                          Required Documents
                        </h4>
                        <div className="flex flex-col gap-2">
                          {result.scheme.requiredDocuments.map((doc) => (
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
                      {result.isEligible && (
                        <Button className="w-full">
                          Apply Now
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      )}
                      {!result.isEligible && result.requiredActions.length > 0 && (
                        <div className="rounded-lg bg-blue-50 p-3">
                          <p className="mb-2 text-sm font-semibold text-blue-900">
                            What you can do:
                          </p>
                          <ul className="list-inside list-disc space-y-1 text-sm text-blue-800">
                            {result.requiredActions.map((action, i) => (
                              <li key={i}>{action}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
                {result.isEligible && (
                  <Button size="sm" className="flex-1">
                    Apply Now
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center py-12 text-center">
          <Search className="mb-3 h-10 w-10 text-muted-foreground/30" />
          <p className="text-muted-foreground">
            No schemes found matching your filters
          </p>
        </div>
      )}
    </div>
  )
}