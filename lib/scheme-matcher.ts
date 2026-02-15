// lib/scheme-matcher.ts
// Smart scheme matching algorithm for KisanMitra

export interface FarmerProfile {
  name: string
  age: number
  gender: string
  state: string
  district: string
  village: string
  landOwnership: string
  landSize: number
  landUnit: string
  cropTypes: string[]
  annualIncome: number
  familySize: number
  farmerCategory: string
  bankAccount: boolean
  aadhaarLinked: boolean
  soilType: string
  irrigationType: string
}

export interface Scheme {
  id: string
  name: string
  ministry: string
  description: string
  benefitAmount: string
  eligibility: string
  category: string
  requiredDocuments: string[]
  deadline: string
}

export interface MatchResult {
  scheme: Scheme
  matchScore: number
  isEligible: boolean
  reasons: string[]
  missingRequirements: string[]
  requiredActions: string[]
}

/**
 * Calculate scheme match score and eligibility
 */
export function calculateSchemeMatch(
  profile: FarmerProfile,
  scheme: Scheme
): MatchResult {
  let score = 0
  const reasons: string[] = []
  const missingRequirements: string[] = []
  const requiredActions: string[] = []

  // Convert land to acres for consistent comparison
  const landInAcres = profile.landUnit === "Hectares" 
    ? profile.landSize * 2.47 
    : profile.landUnit === "Bigha"
    ? profile.landSize * 0.625
    : profile.landSize

  // Base eligibility checks by scheme ID
  switch (scheme.id) {
    case "SCH-001": // PM-KISAN
      // Must own land
      if (profile.landOwnership === "Owned") {
        score += 30
        reasons.push("You own farmland")
      } else {
        missingRequirements.push("Must own land (currently: " + profile.landOwnership + ")")
      }

      // Income criteria
      if (profile.annualIncome < 300000) {
        score += 25
        reasons.push("Annual income below Rs. 3 lakh")
      }

      // Aadhaar linked
      if (profile.aadhaarLinked) {
        score += 20
        reasons.push("Aadhaar linked to bank account")
      } else {
        missingRequirements.push("Aadhaar must be linked")
        requiredActions.push("Link Aadhaar to bank account")
      }

      // Bank account
      if (profile.bankAccount) {
        score += 15
        reasons.push("Bank account verified")
      } else {
        missingRequirements.push("Verified bank account required")
      }

      // State coverage - all states eligible
      score += 10
      reasons.push(`${profile.state} is covered under this scheme`)
      break

    case "SCH-002": // Fasal Bima Yojana
      // Check if crops are covered
      const coveredCrops = ["Wheat", "Rice", "Cotton", "Soybean", "Maize", "Pulses"]
      const farmerCrops = profile.cropTypes.filter(c => 
        coveredCrops.some(cc => cc.toLowerCase() === c.toLowerCase())
      )
      
      if (farmerCrops.length > 0) {
        score += 35
        reasons.push(`You grow covered crops: ${farmerCrops.join(", ")}`)
      } else {
        missingRequirements.push("Must grow notified crops (Wheat, Rice, Cotton, etc.)")
      }

      // Land size - at least 1 acre
      if (landInAcres >= 1) {
        score += 25
        reasons.push(`Land size: ${profile.landSize} ${profile.landUnit}`)
      } else {
        missingRequirements.push("Minimum 1 acre land required")
      }

      // Aadhaar
      if (profile.aadhaarLinked) {
        score += 20
        reasons.push("Aadhaar verified")
      }

      // Bank account for premium payment
      if (profile.bankAccount) {
        score += 20
        reasons.push("Bank account for premium deduction")
      }
      break

    case "SCH-003": // Soil Health Card
      // Universal eligibility - all farmers
      score += 50
      reasons.push("All farmers are eligible")

      // Bonus for soil type
      if (profile.soilType) {
        score += 25
        reasons.push(`${profile.soilType} will benefit from customized recommendations`)
      }

      // Land ownership
      if (profile.landOwnership === "Owned") {
        score += 25
        reasons.push("Land ownership verified")
      }
      break

    case "SCH-004": // PM Krishi Sinchayee Yojana
      // Land size - min 2 acres for drip irrigation
      if (landInAcres >= 2) {
        score += 30
        reasons.push(`Land size (${profile.landSize} ${profile.landUnit}) qualifies`)
      } else {
        missingRequirements.push("Minimum 2 acres required for subsidy")
      }

      // Irrigation type - preference for upgrades
      if (profile.irrigationType === "Rainfed" || profile.irrigationType === "Tubewell") {
        score += 25
        reasons.push(`Can upgrade from ${profile.irrigationType} to micro-irrigation`)
      }

      // Crop type - drip irrigation benefits
      const dripCrops = ["Cotton", "Sugarcane", "Vegetables", "Fruits"]
      const benefitCrops = profile.cropTypes.filter(c => 
        dripCrops.some(dc => dc.toLowerCase() === c.toLowerCase())
      )
      if (benefitCrops.length > 0) {
        score += 20
        reasons.push(`${benefitCrops.join(", ")} benefit from drip irrigation`)
      }

      // State scheme availability
      const coverageStates = ["Madhya Pradesh", "Maharashtra", "Gujarat", "Rajasthan", "Karnataka"]
      if (coverageStates.includes(profile.state)) {
        score += 15
        reasons.push(`Active in ${profile.state}`)
      }

      // Documents
      if (profile.bankAccount && profile.aadhaarLinked) {
        score += 10
        reasons.push("Required documents available")
      }
      break

    case "SCH-005": // Kisan Credit Card
      // Land ownership
      if (profile.landOwnership === "Owned") {
        score += 30
        reasons.push("Land ownership verified")
      }

      // Credit limit based on land
      if (landInAcres >= 2) {
        score += 25
        reasons.push(`Can get credit limit: Rs. ${Math.min(landInAcres * 50000, 300000).toLocaleString('en-IN')}`)
      }

      // Income - prefer small/marginal farmers
      if (profile.annualIncome < 400000) {
        score += 20
        reasons.push("Income range qualifies for subsidized interest")
      }

      // Bank account mandatory
      if (profile.bankAccount) {
        score += 15
        reasons.push("Bank account verified")
      } else {
        missingRequirements.push("Active bank account required")
        requiredActions.push("Open or verify bank account")
      }

      // Crop cultivation proof
      if (profile.cropTypes.length > 0) {
        score += 10
        reasons.push(`Cultivating: ${profile.cropTypes.join(", ")}`)
      }
      break

    case "SCH-006": // National Mission on Sustainable Agriculture
      // State coverage
      const nmsa_states = ["Madhya Pradesh", "Rajasthan", "Maharashtra", "Karnataka", "Andhra Pradesh"]
      if (nmsa_states.includes(profile.state)) {
        score += 25
        reasons.push(`${profile.state} is covered under NMSA`)
      } else {
        missingRequirements.push(`Not currently active in ${profile.state}`)
      }

      // Land size - priority to small farmers
      if (landInAcres >= 1 && landInAcres <= 5) {
        score += 25
        reasons.push("Small farmer category gets priority")
      }

      // Sustainable practices
      if (profile.irrigationType === "Drip" || profile.irrigationType === "Sprinkler") {
        score += 20
        reasons.push("Already using sustainable irrigation")
      }

      // Soil health awareness
      score += 10
      reasons.push("Soil type documented - shows awareness")
      break
  }

  // General bonuses
  // Small/marginal farmer priority
  if (profile.farmerCategory === "Small Farmer" || profile.farmerCategory === "Marginal Farmer") {
    score += 5
    reasons.push("Priority category farmer")
  }

  // Determine eligibility
  const isEligible = score >= 60 && missingRequirements.length === 0

  // Add actions if not eligible
  if (!isEligible && missingRequirements.length > 0) {
    requiredActions.push("Complete missing requirements to become eligible")
  }

  return {
    scheme,
    matchScore: Math.min(score, 100), // Cap at 100
    isEligible,
    reasons,
    missingRequirements,
    requiredActions
  }
}

/**
 * Match farmer profile against all schemes and rank by score
 */
export function matchAllSchemes(
  profile: FarmerProfile,
  schemes: Scheme[]
): MatchResult[] {
  const results = schemes.map(scheme => calculateSchemeMatch(profile, scheme))
  
  // Sort by match score (highest first)
  return results.sort((a, b) => b.matchScore - a.matchScore)
}

/**
 * Get only eligible schemes
 */
export function getEligibleSchemes(
  profile: FarmerProfile,
  schemes: Scheme[]
): MatchResult[] {
  return matchAllSchemes(profile, schemes).filter(r => r.isEligible)
}

/**
 * Generate explanation text for scheme match
 */
export function explainMatch(match: MatchResult): string {
  let explanation = `**${match.scheme.name}** - ${match.matchScore}% Match\n\n`
  
  if (match.isEligible) {
    explanation += `✅ **You are ELIGIBLE**\n\n`
    explanation += `**Why you qualify:**\n`
    match.reasons.forEach(reason => {
      explanation += `• ${reason}\n`
    })
  } else {
    explanation += `❌ **Not Currently Eligible**\n\n`
    if (match.reasons.length > 0) {
      explanation += `**What you have:**\n`
      match.reasons.forEach(reason => {
        explanation += `• ${reason}\n`
      })
      explanation += `\n`
    }
    if (match.missingRequirements.length > 0) {
      explanation += `**What's missing:**\n`
      match.missingRequirements.forEach(req => {
        explanation += `• ${req}\n`
      })
      explanation += `\n`
    }
    if (match.requiredActions.length > 0) {
      explanation += `**What to do:**\n`
      match.requiredActions.forEach(action => {
        explanation += `• ${action}\n`
      })
    }
  }

  return explanation
}