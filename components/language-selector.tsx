"use client"

import * as React from "react"
import { Check, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ" },
  { code: "as", name: "Assamese", nativeName: "অসমীয়া" },
  { code: "ur", name: "Urdu", nativeName: "اردو" },
  { code: "sd", name: "Sindhi", nativeName: "سنڌي" },
  { code: "ks", name: "Kashmiri", nativeName: "كٲشُر" },
  { code: "ne", name: "Nepali", nativeName: "नेपाली" },
]

interface LanguageSelectorProps {
  value?: string
  onValueChange?: (value: string) => void
}

export function LanguageSelector({ value, onValueChange }: LanguageSelectorProps) {
  const [selectedLanguage, setSelectedLanguage] = React.useState(value || "en")

  // Update internal state when prop changes
  React.useEffect(() => {
    if (value) {
      setSelectedLanguage(value)
    }
  }, [value])

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode)
    onValueChange?.(languageCode)
  }

  const currentLanguage = languages.find((lang) => lang.code === selectedLanguage) || languages[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Languages className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
          <span className="sm:hidden">{currentLanguage.code.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <span>{language.nativeName}</span>
              <span className="text-xs text-muted-foreground">({language.name})</span>
            </span>
            {selectedLanguage === language.code && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}