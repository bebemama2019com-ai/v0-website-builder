"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/lib/i18n/language-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useLanguage()

  const navigation = [
    { name: t.nav.about, href: "/about" },
    {
      name: t.nav.groups,
      dropdown: [
        { name: t.nav.lavcheta, href: "/groups/lavcheta" },
        { name: t.nav.zvanche, href: "/groups/zvanche" },
        { name: t.nav.slanchitse, href: "/groups/slanchitse" },
        { name: t.nav.pepelyashka, href: "/groups/pepelyashka" },
        { name: t.nav.snezhanka, href: "/groups/snezhanka" },
        { name: t.nav.sarchitse, href: "/groups/sarchitse" },
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
        { name: t.nav.dailySchedule, href: "/parents/daily-schedule" },
        { name: t.nav.weeklyMenu, href: "/parents/weekly-menu" },
        { name: t.nav.publicCouncil, href: "/parents/public-council" },
        { name: t.nav.formsApplications, href: "/parents/forms" },
      ],
    },
    { name: t.nav.contact, href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md border-b-4 border-primary">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3 transition-transform hover:scale-105">
            <Image
              src="/images/design-mode/Screenshot_1.jpg"
              alt="ДГ 202 Logo"
              width={160}
              height={80}
              className="h-16 w-auto object-contain shadow-lg mx-[-7px] rounded-sm"
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
          {navigation.map((item) =>
            item.dropdown ? (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-bold leading-6 text-foreground transition-all hover:text-primary hover:scale-105">
                  {item.name}
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="rounded-2xl shadow-xl border-2">
                  {item.dropdown.map((subItem) => (
                    <DropdownMenuItem key={subItem.name} asChild>
                      <Link href={subItem.href} className="cursor-pointer font-semibold hover:text-primary">
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
                className="text-sm font-bold leading-6 text-foreground transition-all hover:text-primary hover:scale-105"
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
        <div className="lg:hidden bg-white border-t-2 border-primary/20">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation.map((item) =>
              item.dropdown ? (
                <div key={item.name} className="space-y-1">
                  <div className="px-3 py-2 text-base font-bold text-primary">{item.name}</div>
                  <div className="pl-4 space-y-1">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block rounded-xl px-3 py-2 text-sm font-semibold text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
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
                  className="block rounded-xl px-3 py-2 text-base font-bold text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
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
