"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"
import { ArrowLeft, ArrowRight, Check, Wheat } from "lucide-react"

const steps = [
  { label: "Personal", id: 1 },
  { label: "Land Details", id: 2 },
  { label: "Crop & Income", id: 3 },
]

const cropOptions = ["Wheat", "Rice", "Cotton", "Soybean", "Sugarcane", "Maize", "Pulses", "Vegetables", "Fruits"]

export function OnboardingPage() {
  const { setAuthState } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCrops, setSelectedCrops] = useState<string[]>(["Wheat", "Soybean"])

  const progress = (currentStep / steps.length) * 100

  const toggleCrop = (crop: string) => {
    setSelectedCrops((prev) =>
      prev.includes(crop) ? prev.filter((c) => c !== crop) : [...prev, crop]
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-lg">
        <button
          onClick={() =>
            currentStep > 1
              ? setCurrentStep(currentStep - 1)
              : setAuthState("signup")
          }
          className="mb-6 flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {currentStep > 1 ? "Previous Step" : "Back to Sign Up"}
        </button>

        <Card className="border border-border shadow-lg">
          <CardHeader className="pb-2 pt-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wheat className="h-5 w-5 text-primary" />
                <span className="font-display text-lg font-bold text-card-foreground">
                  Profile Setup
                </span>
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                Step {currentStep} of {steps.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="mt-3 flex justify-between">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="flex items-center gap-1.5 text-xs font-medium"
                >
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                      step.id < currentStep
                        ? "bg-primary text-primary-foreground"
                        : step.id === currentStep
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.id < currentStep ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span
                    className={
                      step.id === currentStep
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-4">
            {currentStep === 1 && (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="ob-age">Age</Label>
                    <Input id="ob-age" type="number" placeholder="42" defaultValue="42" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Gender</Label>
                    <Select defaultValue="male">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="ob-district">District</Label>
                  <Input id="ob-district" placeholder="e.g. Indore" defaultValue="Indore" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="ob-village">Village</Label>
                  <Input id="ob-village" placeholder="e.g. Sanwer" defaultValue="Sanwer" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Family Size</Label>
                  <Input type="number" placeholder="5" defaultValue="5" />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Land Ownership</Label>
                  <RadioGroup defaultValue="owned" className="grid grid-cols-2 gap-3">
                    {["Owned", "Leased", "Shared", "Government Allotted"].map(
                      (type) => (
                        <Label
                          key={type}
                          htmlFor={`land-${type}`}
                          className="flex cursor-pointer items-center gap-2 rounded-lg border border-border p-3 transition-colors hover:bg-muted [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
                        >
                          <RadioGroupItem
                            value={type.toLowerCase().replace(" ", "_")}
                            id={`land-${type}`}
                          />
                          <span className="text-sm">{type}</span>
                        </Label>
                      )
                    )}
                  </RadioGroup>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="ob-land-size">Land Size</Label>
                    <Input id="ob-land-size" type="number" placeholder="4.5" defaultValue="4.5" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Unit</Label>
                    <Select defaultValue="acres">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="acres">Acres</SelectItem>
                        <SelectItem value="hectares">Hectares</SelectItem>
                        <SelectItem value="bigha">Bigha</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Soil Type</Label>
                  <Select defaultValue="black_cotton">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="black_cotton">Black Cotton Soil</SelectItem>
                      <SelectItem value="alluvial">Alluvial Soil</SelectItem>
                      <SelectItem value="red">Red Soil</SelectItem>
                      <SelectItem value="laterite">Laterite Soil</SelectItem>
                      <SelectItem value="sandy">Sandy Soil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Irrigation Type</Label>
                  <Select defaultValue="tubewell">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tubewell">Tubewell</SelectItem>
                      <SelectItem value="canal">Canal</SelectItem>
                      <SelectItem value="rainfed">Rainfed</SelectItem>
                      <SelectItem value="drip">Drip Irrigation</SelectItem>
                      <SelectItem value="sprinkler">Sprinkler</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Crops Grown (select all that apply)</Label>
                  <div className="flex flex-wrap gap-2">
                    {cropOptions.map((crop) => (
                      <Badge
                        key={crop}
                        variant={selectedCrops.includes(crop) ? "default" : "outline"}
                        className="cursor-pointer px-3 py-1.5 text-sm transition-colors"
                        onClick={() => toggleCrop(crop)}
                      >
                        {crop}
                        {selectedCrops.includes(crop) && (
                          <Check className="ml-1 h-3 w-3" />
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="ob-income">Annual Income (Rs.)</Label>
                  <Input
                    id="ob-income"
                    type="number"
                    placeholder="280000"
                    defaultValue="280000"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Farmer Category</Label>
                  <Select defaultValue="small">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="marginal">Marginal Farmer (Below 1 ha)</SelectItem>
                      <SelectItem value="small">Small Farmer (1-2 ha)</SelectItem>
                      <SelectItem value="semi_medium">Semi-Medium (2-4 ha)</SelectItem>
                      <SelectItem value="medium">Medium (4-10 ha)</SelectItem>
                      <SelectItem value="large">Large (Above 10 ha)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back
                </Button>
              )}
              <Button
                size="lg"
                className="flex-1 text-base font-semibold"
                onClick={() => {
                  if (currentStep < steps.length) {
                    setCurrentStep(currentStep + 1)
                  } else {
                    setAuthState("authenticated")
                  }
                }}
              >
                {currentStep < steps.length ? (
                  <>
                    Next
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Complete Setup
                    <Check className="ml-1 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
