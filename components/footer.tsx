"use client"

import Link from "next/link"
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-primary">ДГ 202</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{t.footer.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">{t.footer.quickLinks}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-muted-foreground hover:text-primary">
                  {t.nav.team}
                </Link>
              </li>
              <li>
                <Link href="/curriculum" className="text-muted-foreground hover:text-primary">
                  {t.nav.curriculum}
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-muted-foreground hover:text-primary">
                  {t.nav.gallery}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">{t.footer.contact}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span className="text-muted-foreground">София, Младост 1</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-primary" />
                <span className="text-muted-foreground">0884 80 16 40</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-primary" />
                <span className="text-muted-foreground">dg202sofia@abv.bg</span>
              </li>
            </ul>
          </div>

          {/* Social & Hours */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">{t.footer.followUs}</h3>
            <div className="mb-4 flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">{t.footer.hours}:</strong>
              <br />
              {t.footer.hoursContent}
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Детска Градина 202. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
