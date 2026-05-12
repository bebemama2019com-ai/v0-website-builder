"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations, type Language, type TranslationKeys } from "./translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: TranslationKeys
  isHydrated: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Default language that matches what the server will render
const DEFAULT_LANGUAGE: Language = "en"

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load language from localStorage on mount - only after hydration
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "bg")) {
      setLanguageState(savedLanguage)
    }
    setIsHydrated(true)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  // Always use default language for SSR to prevent hydration mismatch
  // Once hydrated, use the actual language from state
  const effectiveLanguage = isHydrated ? language : DEFAULT_LANGUAGE

  const value = {
    language: effectiveLanguage,
    setLanguage,
    t: translations[effectiveLanguage],
    isHydrated,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
