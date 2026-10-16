"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/lib/i18n/language-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

interface Group {
  id: string
  name: string
  slug?: string
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [groups, setGroups] = useState<Group[]>([])
  const [groupsLoading, setGroupsLoading] = useState(true)
  const { t, isHydrated } = useLanguage()

  useEffect(() => {
    fetchGroups()
  }, [])

  async function fetchGroups() {
    try {
      const response = await fetch("/api/groups")
      const data = await response.json()
      if (Array.isArray(data)) {
        setGroups(data)
      }
    } catch (error) {
      console.error("Error fetching groups:", error)
    } finally {
      setGroupsLoading(false)
    }
  }

  const groupsDropdown = [
    ...groups.map((group) => ({
      name: group.name,
      href: `/groups/${group.id}`,
    })),
    {
      name: "ДОД",
      href: "/dod",
    },
  ]

  const navigation = [
    { name: t.nav.about, href: "/about" },
    { name: t.nav.team, href: "/team" },
    {
      name: t.nav.groups,
      dropdown: groupsDropdown.length > 0 ? groupsDropdown : [{ name: "Групи", href: "#" }],
    },
    { name: t.nav.gallery, href: "/gallery" },
    {
      name: t.nav.documents,
      dropdown: [
        { name: t.nav.budget, href: "/documents/budget" },
        { name: t.nav.budgetReport2025, href: "/documents/budget-report-2025" },
        { name: t.nav.budgetReport2026, href: "/documents/budget-report-2026" },
        { name: t.nav.ecoEducationProgram, href: "/documents/eco-education-program" },
        { name: t.nav.dataProtectionRules, href: "/documents/data-protection-rules" },
        { name: t.nav.godishenPlan, href: "/documents/godishen-plan" },
        { name: t.nav.programnaSistema, href: "/documents/programna-sistema" },
        { name: t.nav.pravilnikPropuskatelen, href: "/documents/pravilnik-propuskatelen-rezhim" },
        { name: t.nav.pravilaTerorizam, href: "/documents/pravila-terorizam" },
        { name: t.nav.planProgramaBdp, href: "/documents/plan-programa-bdp" },
        { name: t.nav.mehanizamDeteVRisk, href: "/documents/mehanizam-dete-v-risk" },
        { name: t.nav.etichenKodeksDetsa, href: "/documents/etichen-kodeks-rabota-s-detsa" },
        { name: t.nav.etichenKodeksDg202, href: "/documents/etichen-kodeks-dg202" },
        { name: t.nav.modelAdaptatsia, href: "/documents/model-adaptatsia" },
      ],
    },
    {
      name: t.nav.forParents,
      dropdown: [
        { name: t.nav.news, href: "/parents/news" },
        { name: t.nav.dailySchedule, href: "/parents/daily-schedule" },
        { name: t.nav.weeklyMenu, href: "/parents/weekly-menu" },
        { name: t.nav.publicCouncil, href: "/parents/public-council" },
        { name: t.nav.formsApplications, href: "/parents/forms" },
      ],
    },
    { name: t.nav.contact, href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md border-b-4 border-primary" suppressHydrationWarning>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" suppressHydrationWarning>
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3 transition-transform hover:scale-105">
            <Image
              src="/logo.jpg"
              alt="ДГ 202 Logo"
              width={230}
              height={115}
              className="h-24 w-auto object-contain shadow-lg mx-[-7px] rounded-sm"
              priority
            />
          </Link>
        </div>
        <div className="flex lg:hidden gap-2">
          <LanguageSelector />
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-xl p-2.5 text-primary hover:bg-primary/10 transition-colors"
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
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item, index) =>
            item.dropdown ? (
              <DropdownMenu key={index}>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-bold leading-6 text-foreground transition-all hover:text-primary hover:scale-105">
                  <span suppressHydrationWarning>{item.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="rounded-2xl shadow-xl border-2">
                  {item.dropdown.map((subItem, subIndex) => (
                    <DropdownMenuItem key={subIndex} asChild>
                      <Link href={subItem.href} className="cursor-pointer font-semibold hover:text-primary">
                        <span suppressHydrationWarning>{subItem.name}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={index}
                href={item.href}
                className="text-sm font-bold leading-6 text-foreground transition-all hover:text-primary hover:scale-105"
              >
                <span suppressHydrationWarning>{item.name}</span>
              </Link>
            ),
          )}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <LanguageSelector />
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t-2 border-primary/20 max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation.map((item, index) =>
              item.dropdown ? (
                <div key={index} className="space-y-1">
                  <div className="px-3 py-2 text-base font-bold text-primary" suppressHydrationWarning>{item.name}</div>
                  <div className="pl-4 space-y-1">
                    {item.dropdown.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.href}
                        className="block rounded-xl px-3 py-2 text-sm font-semibold text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span suppressHydrationWarning>{subItem.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={index}
                  href={item.href}
                  className="block rounded-xl px-3 py-2 text-base font-bold text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span suppressHydrationWarning>{item.name}</span>
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
