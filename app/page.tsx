"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n/language-context"
import { Building2, Target, Users, Heart, BookOpen, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* About Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-secondary/30 via-background to-accent/20 px-4 py-16 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h1 className="mb-4 text-4xl font-bold text-foreground lg:text-5xl">{t.about.title}</h1>
              <div className="mx-auto h-1 w-24 bg-primary" />
            </div>

            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                <p>{t.about.welcome}</p>
                <p>{t.about.description}</p>
                <p>{t.about.staff.description}</p>
                <p>{t.about.groups.description}</p>
              </div>

              <div>
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-6">
                    <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-foreground">
                      <Target className="h-6 w-6 text-primary" />
                      {t.about.focus.title}
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <BookOpen className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                        <span className="text-muted-foreground">{t.about.focus.point1.description}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Heart className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                        <span className="text-muted-foreground">{t.about.focus.point2.description}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Users className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                        <span className="text-muted-foreground">{t.about.focus.point3.description}</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Facilities Section */}
        <section className="bg-muted/30 px-4 py-16 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <Building2 className="mx-auto mb-4 h-12 w-12 text-primary" />
              <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">{t.about.facilities.title}</h2>
              <div className="mx-auto h-1 w-24 bg-primary" />
            </div>

            <div className="mb-8 space-y-4 text-center text-lg leading-relaxed text-muted-foreground">
              <p>{t.about.facilities.intro1}</p>
              <p>{t.about.facilities.intro2}</p>
            </div>

            <Card>
              <CardContent className="p-8">
                <h3 className="mb-6 text-center text-xl font-bold text-foreground">{t.about.facilities.subtitle}</h3>
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {(t.about.facilities.items || []).map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <Sparkles className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Development Concept Section */}
        <section className="px-4 py-16 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">{t.about.concept.title}</h2>
              <div className="mx-auto h-1 w-24 bg-primary" />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Goal */}
              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-foreground">
                    <Target className="h-6 w-6 text-primary" />
                    {t.about.concept.goal.title}
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">{t.about.concept.goal.description}</p>
                </CardContent>
              </Card>

              {/* Tasks */}
              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-foreground">
                    <BookOpen className="h-6 w-6 text-primary" />
                    {t.about.concept.tasks.title}
                  </h3>
                  <ul className="space-y-2">
                    {(t.about.concept.tasks.items || []).map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1 text-primary">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Staff Management */}
              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-foreground">
                    <Users className="h-6 w-6 text-primary" />
                    {t.about.concept.staff.title}
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">{t.about.concept.staff.description}</p>
                  <ul className="space-y-2">
                    {(t.about.concept.staff.criteria || []).map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1 text-primary">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Pedagogy */}
              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-foreground">
                    <Sparkles className="h-6 w-6 text-primary" />
                    {t.about.concept.pedagogy.title}
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">{t.about.concept.pedagogy.description}</p>
                  <ul className="space-y-2">
                    {(t.about.concept.pedagogy.aspects || []).map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1 text-primary">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Adaptation Model Section */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 px-4 py-16 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <Heart className="mx-auto mb-4 h-12 w-12 text-primary" />
              <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">{t.about.adaptation.title}</h2>
              <div className="mx-auto h-1 w-24 bg-primary" />
              <p className="mt-6 text-lg font-semibold text-primary">{t.about.adaptation.motto}</p>
            </div>

            <p className="mb-8 text-center text-lg leading-relaxed text-muted-foreground">{t.about.adaptation.intro}</p>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Goals */}
              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-bold text-foreground">{t.about.adaptation.goals.title}</h3>
                  <ul className="space-y-2">
                    {(t.about.adaptation.goals.items || []).map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1 text-primary">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Tasks */}
              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-bold text-foreground">{t.about.adaptation.tasks.title}</h3>
                  <ul className="space-y-2">
                    {(t.about.adaptation.tasks.items || []).map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1 text-primary">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Priorities */}
              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-bold text-foreground">{t.about.adaptation.priorities.title}</h3>
                  <ul className="space-y-2">
                    {(t.about.adaptation.priorities.items || []).map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1 text-primary">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8 border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <p className="text-center text-lg leading-relaxed text-muted-foreground">
                  {t.about.adaptation.conclusion}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
