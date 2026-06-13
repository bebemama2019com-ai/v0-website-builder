"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Heart, Building2 } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export default function AboutPage() {
  const { t } = useLanguage()

  const focusAreas = [
    {
      icon: GraduationCap,
      title: t.about.focus.point1.title,
      description: t.about.focus.point1.description,
    },
    {
      icon: Heart,
      title: t.about.focus.point2.title,
      description: t.about.focus.point2.description,
    },
    {
      icon: Users,
      title: t.about.focus.point3.title,
      description: t.about.focus.point3.description,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary/30 via-background to-accent/20 px-4 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <h1 className="mb-6 text-balance text-4xl font-bold leading-tight text-foreground lg:text-5xl">
                {t.about.hero.title}
              </h1>
              <p className="mb-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                {t.about.hero.description1}
              </p>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground">{t.about.hero.description2}</p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20">
                <img src="/about-building-exterior.jpg" alt="ДГ 202" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Staff Section - Moved to /team page */}

      {/* Groups Section */}
      <section className="bg-muted/50 px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <div className="mb-6 inline-flex rounded-2xl bg-primary/10 p-4 w-fit">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h2 className="mb-6 text-balance text-3xl font-bold text-foreground lg:text-4xl">
                {t.about.groups.title}
              </h2>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground mb-6">{t.about.groups.description}</p>
              
              <h3 className="text-xl font-semibold text-foreground mb-4">{t.about.groups.focusTitle}</h3>
              <ul className="space-y-3 text-muted-foreground">
                {t.about.groups.focusPoints.map((point: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-pretty leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xl font-semibold text-primary">{t.about.groups.welcome}</p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20">
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Feb%2025%2C%202026%2C%2004_04_22%20PM%20%281%29-KjYZKMSYkUjxdgVZ1lNqzSmcIDMz9b.png" alt="Нашите групи" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20">
                <img src="/about-playground.jpg" alt="Материално-техническа база" className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="flex flex-col justify-center order-1 lg:order-2">
              <div className="mb-6 inline-flex rounded-2xl bg-primary/10 p-4 w-fit">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h2 className="mb-6 text-balance text-3xl font-bold text-foreground lg:text-4xl">
                {t.about.facilities?.title || "Материално-техническа база"}
              </h2>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground mb-4">
                {t.about.facilities?.description1 || "С богатата си и уютна материална база, детска градина № 202 е приказен дом за вашите деца. Създали сме условия за пълноценно детство, равен старт на всяко дете и целенасочена предучилищна подготовка за успешна реализация в училище."}
              </p>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground mb-4">
                {t.about.facilities?.description2 || "Материално-техническата база осигурява динамичност в социалната комуникация между децата, като поражда чувство за радост от сътрудничество в различни дейности."}
              </p>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground mb-6">
                {t.about.facilities?.description3 || "Функциите на средата позволяват да се осигурят условия за разнообразна дейност на децата, за задоволяване на потребностите и интересите им съобразно предпочетената от тях дейност."}
              </p>
              <p className="text-lg font-semibold text-foreground mb-4">
                {t.about.facilities?.listTitle || "Детското заведение разполага с много добра материална база, обезпечено е с:"}
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-muted-foreground">
                {[
                  "Музикален/физкултурен салон",
                  "Открита сцена",
                  "Кабинет на психолога",
                  "Логопедичен кабинет",
                  "Кабинет на ресурсния учител",
                  "Кабинет за ранно чуждоезиково обучение - английски език",
                  "Кабинет по приложни изкуства",
                  "Видео наблюдение",
                  "Охрана",
                  "Индивидуални занимални на всяка група",
                  "Индивидуални спални помещения",
                  "Индивидуални офиси за помощник-възпитателя",
                  "Просторен двор за отдих и игри",
                  "Здравен кабинет",
                  "Собствена кухня",
                  "Пералня"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-pretty">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="bg-muted/50 px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground lg:text-4xl">{t.about.focus.title}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {focusAreas.map((area, index) => (
              <Card key={index} className="overflow-hidden rounded-3xl border-2">
                <CardContent className="p-8 text-center">
                  <div className="mb-4 inline-flex rounded-2xl bg-primary/10 p-4">
                    <area.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-foreground">{area.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{area.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
