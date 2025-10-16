"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/lib/i18n/language-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useLanguage()

  const navigation = [
    { name: t.nav.about, href: "/about" },
    {
      name: t.nav.groups,
      dropdown: [
        { name: t.nav.group1, href: "/groups/group-1" },
        { name: t.nav.group2, href: "/groups/group-2" },
        { name: t.nav.group3, href: "/groups/group-3" },
        { name: t.nav.group4, href: "/groups/group-4" },
        { name: t.nav.dod, href: "/groups/dod" },
      ],
    },
    { name: t.nav.team, href: "/team" },
    { name: t.nav.gallery, href: "/gallery" },
    {
      name: t.nav.documents,
      dropdown: [
        { name: t.nav.regulations, href: "/documents/regulations" },
        { name: t.nav.budget, href: "/documents/budget" },
      ],
    },
    {
      name: t.nav.forParents,
      dropdown: [
        { name: t.nav.dailySchedule, href: "/parents/daily-schedule" },
        { name: t.nav.weeklyMenu, href: "/parents/weekly-menu" },
        { name: t.nav.publicCouncil, href: "/parents/public-council" },
        { name: t.nav.formsApplications, href: "/parents/forms" },
      ],
    },
    { name: t.nav.contact, href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-2xl font-bold text-primary">ДГ 202</span>
          </Link>
        </div>
        <div className="flex lg:hidden gap-2">
          <LanguageSelector />
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-xl p-2.5 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-6">
          {navigation.map((item) =>
            item.dropdown ? (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-semibold leading-6 text-foreground transition-colors hover:text-primary">
                  {item.name}
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="rounded-2xl">
                  {item.dropdown.map((subItem) => (
                    <DropdownMenuItem key={subItem.name} asChild>
                      <Link href={subItem.href} className="cursor-pointer">
                        {subItem.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-foreground transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ),
          )}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <LanguageSelector />
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation.map((item) =>
              item.dropdown ? (
                <div key={item.name} className="space-y-1">
                  <div className="px-3 py-2 text-base font-semibold text-foreground">{item.name}</div>
                  <div className="pl-4 space-y-1">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block rounded-xl px-3 py-2 text-sm text-foreground hover:bg-muted"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-xl px-3 py-2 text-base font-semibold text-foreground hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ),
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
