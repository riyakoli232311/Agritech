"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { farmerProfile, indianStates } from "@/data/mock-data"
import {
  Edit3,
  Save,
  X,
  MapPin,
  Crop,
  IndianRupee,
  Users,
  Calendar,
  Shield,
} from "lucide-react"

interface ProfilePageProps {
  onNavigate: (page: string) => void
}

export function ProfilePage({ onNavigate: _onNavigate }: ProfilePageProps) {
  const [editing, setEditing] = useState(false)

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      {/* Profile Header */}
      <Card className="border border-border">
        <CardContent className="flex flex-col items-center gap-4 p-6 sm:flex-row sm:items-start">
          <Avatar className="h-20 w-20 border-2 border-border">
            <AvatarFallback className="bg-primary/10 text-xl font-bold text-primary">
              {farmerProfile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col items-center gap-2 text-center sm:items-start sm:text-left">
            <div className="flex items-center gap-3">
              <h2 className="font-display text-2xl font-bold text-card-foreground">
                {farmerProfile.name}
              </h2>
              <Badge variant="secondary" className="font-medium">
                {farmerProfile.farmerCategory}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {farmerProfile.village}, {farmerProfile.district},{" "}
                {farmerProfile.state}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                Member since {new Date(farmerProfile.joinedDate).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
              </span>
            </div>
            <div className="flex gap-2">
              {farmerProfile.aadhaarLinked && (
                <Badge variant="outline" className="gap-1 border-emerald-200 bg-emerald-50 text-emerald-700">
                  <Shield className="h-3 w-3" />
                  Aadhaar Linked
                </Badge>
              )}
              {farmerProfile.bankAccount && (
                <Badge variant="outline" className="gap-1 border-sky-200 bg-sky-50 text-sky-700">
                  <IndianRupee className="h-3 w-3" />
                  Bank Verified
                </Badge>
              )}
            </div>
          </div>
          <Button
            variant={editing ? "destructive" : "outline"}
            size="sm"
            onClick={() => setEditing(!editing)}
            className="shrink-0"
          >
            {editing ? (
              <>
                <X className="mr-1 h-3.5 w-3.5" />
                Cancel
              </>
            ) : (
              <>
                <Edit3 className="mr-1 h-3.5 w-3.5" />
                Edit Profile
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Personal Information */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display text-lg">
              <Users className="h-5 w-5 text-primary" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-muted-foreground">Full Name</Label>
                {editing ? (
                  <Input defaultValue={farmerProfile.name} />
                ) : (
                  <p className="font-medium text-card-foreground">
                    {farmerProfile.name}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-muted-foreground">Age</Label>
                {editing ? (
                  <Input type="number" defaultValue={farmerProfile.age} />
                ) : (
                  <p className="font-medium text-card-foreground">
                    {farmerProfile.age} years
                  </p>
                )}
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-muted-foreground">Gender</Label>
                {editing ? (
                  <Select defaultValue={farmerProfile.gender.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="font-medium text-card-foreground">
                    {farmerProfile.gender}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-muted-foreground">Family Size</Label>
                {editing ? (
                  <Input type="number" defaultValue={farmerProfile.familySize} />
                ) : (
                  <p className="font-medium text-card-foreground">
                    {farmerProfile.familySize} members
                  </p>
                )}
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-muted-foreground">Phone</Label>
                <p className="font-medium text-card-foreground">
                  {farmerProfile.phone}
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-muted-foreground">Email</Label>
                <p className="font-medium text-card-foreground">
                  {farmerProfile.email}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Land & Location */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display text-lg">
              <MapPin className="h-5 w-5 text-primary" />
              Land & Location
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-muted-foreground">State</Label>
                {editing ? (
                  <Select defaultValue={farmerProfile.state}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {indianStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="font-medium text-card-foreground">
                    {farmerProfile.state}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-muted-foreground">District</Label>
                {editing ? (
                  <Input defaultValue={farmerProfile.district} />
                ) : (
                  <p className="font-medium text-card-foreground">
                    {farmerProfile.district}
                  </p>
                )}
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-muted-foreground">Land Ownership</Label>
                <p className="font-medium text-card-foreground">
                  {farmerProfile.landOwnership}
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-muted-foreground">Land Size</Label>
                <p className="font-medium text-card-foreground">
                  {farmerProfile.landSize} {farmerProfile.landUnit}
                </p>
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-muted-foreground">Soil Type</Label>
                <p className="font-medium text-card-foreground">
                  {farmerProfile.soilType}
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-muted-foreground">Irrigation</Label>
                <p className="font-medium text-card-foreground">
                  {farmerProfile.irrigationType}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Crops & Income */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display text-lg">
              <Crop className="h-5 w-5 text-primary" />
              Crops & Income
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-muted-foreground">Crops Grown</Label>
              <div className="flex flex-wrap gap-2">
                {farmerProfile.cropTypes.map((crop) => (
                  <Badge key={crop} variant="secondary">
                    {crop}
                  </Badge>
                ))}
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-muted-foreground">Annual Income</Label>
                <p className="font-medium text-card-foreground">
                  Rs. {farmerProfile.annualIncome.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-muted-foreground">Category</Label>
                <p className="font-medium text-card-foreground">
                  {farmerProfile.farmerCategory}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Farmer ID */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display text-lg">
              <Shield className="h-5 w-5 text-primary" />
              Farmer ID & Verification
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-muted-foreground">Farmer ID</Label>
              <p className="font-mono font-medium text-card-foreground">
                {farmerProfile.id}
              </p>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-muted-foreground">Aadhaar Linked</Label>
                <p className="font-medium text-emerald-600">Yes</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-muted-foreground">Bank Account</Label>
                <p className="font-medium text-emerald-600">Verified</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {editing && (
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setEditing(false)}>
            Cancel
          </Button>
          <Button onClick={() => setEditing(false)}>
            <Save className="mr-1 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      )}
    </div>
  )
}
