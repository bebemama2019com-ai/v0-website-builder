"use client"

import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/lib/i18n/language-context"

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Select language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-2xl">
        <DropdownMenuItem
          onClick={() => setLanguage("en")}
          className={`cursor-pointer rounded-xl ${language === "en" ? "bg-muted" : ""}`}
        >
          <span className="mr-2">🇬🇧</span>
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("bg")}
          className={`cursor-pointer rounded-xl ${language === "bg" ? "bg-muted" : ""}`}
        >
          <span className="mr-2">🇧🇬</span>
          Български
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
