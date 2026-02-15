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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { schemes } from "@/data/mock-data"
import {
  Search,
  Filter,
  Calendar,
  IndianRupee,
  Building2,
  ArrowRight,
} from "lucide-react"

interface ExplorerPageProps {
  onNavigate: (page: string) => void
}

export function ExplorerPage({ onNavigate: _onNavigate }: ExplorerPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [ministry, setMinistry] = useState("all")
  const [category, setCategory] = useState("all")

  const ministries = ["all", ...new Set(schemes.map((s) => s.ministry))]
  const categories = ["all", ...new Set(schemes.map((s) => s.category))]

  const filtered = schemes.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchMinistry = ministry === "all" || s.ministry === ministry
    const matchCategory = category === "all" || s.category === category
    return matchSearch && matchMinistry && matchCategory
  })

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Scheme Explorer
        </h2>
        <p className="text-muted-foreground">
          Browse and search all available government schemes for farmers.
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="border border-border">
        <CardContent className="flex flex-col gap-4 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search schemes by name, description, or benefit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 text-base"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                Filters:
              </span>
            </div>
            <Select value={ministry} onValueChange={setMinistry}>
              <SelectTrigger className="w-auto min-w-[180px]">
                <Building2 className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                <SelectValue placeholder="Ministry" />
              </SelectTrigger>
              <SelectContent>
                {ministries.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m === "all" ? "All Ministries" : m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-auto min-w-[160px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c === "all" ? "All Categories" : c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {(ministry !== "all" || category !== "all" || searchQuery) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setMinistry("all")
                  setCategory("all")
                  setSearchQuery("")
                }}
              >
                Clear All
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground">
        Showing {filtered.length} of {schemes.length} schemes
      </p>

      {/* View Tabs */}
      <Tabs defaultValue="grid">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((scheme) => (
              <Card
                key={scheme.id}
                className="border border-border transition-shadow hover:shadow-md"
              >
                <CardContent className="flex flex-col gap-3 p-5">
                  <div className="flex items-start justify-between gap-2">
                    <Badge variant="outline" className="text-xs">
                      {scheme.category}
                    </Badge>
                    {scheme.isPopular && (
                      <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-base font-semibold leading-snug text-card-foreground">
                    {scheme.name}
                  </h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {scheme.description}
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className="flex items-center gap-1 text-card-foreground">
                      <IndianRupee className="h-3.5 w-3.5 text-emerald-600" />
                      {scheme.benefitAmount}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {scheme.deadline}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <StatusBadge status={scheme.status} />
                    <Button variant="ghost" size="sm" className="text-primary">
                      Learn More
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-4">
          <div className="flex flex-col gap-3">
            {filtered.map((scheme) => (
              <Card
                key={scheme.id}
                className="border border-border transition-shadow hover:shadow-sm"
              >
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate text-sm font-semibold text-card-foreground">
                        {scheme.name}
                      </h3>
                      <Badge variant="outline" className="shrink-0 text-xs">
                        {scheme.category}
                      </Badge>
                      <StatusBadge status={scheme.status} />
                    </div>
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {scheme.description}
                    </p>
                  </div>
                  <div className="hidden shrink-0 items-center gap-4 text-sm sm:flex">
                    <span className="font-medium text-card-foreground">
                      {scheme.benefitAmount}
                    </span>
                    <Button variant="ghost" size="sm" className="text-primary">
                      Details
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
