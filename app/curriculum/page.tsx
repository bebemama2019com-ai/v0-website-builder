"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Palette, Music, Globe, Calculator, Users, Leaf, Heart } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export default function CurriculumPage() {
  const { t } = useLanguage()

  const subjects = [
    {
      icon: BookOpen,
      title: t.curriculum.learningAreas.language.title,
      description: t.curriculum.learningAreas.language.description,
      color: "bg-chart-1",
    },
    {
      icon: Calculator,
      title: t.curriculum.learningAreas.math.title,
      description: t.curriculum.learningAreas.math.description,
      color: "bg-chart-2",
    },
    {
      icon: Globe,
      title: t.curriculum.learningAreas.science.title,
      description: t.curriculum.learningAreas.science.description,
      color: "bg-chart-3",
    },
    {
      icon: Palette,
      title: t.curriculum.learningAreas.arts.title,
      description: t.curriculum.learningAreas.arts.description,
      color: "bg-chart-4",
    },
    {
      icon: Music,
      title: t.curriculum.learningAreas.music.title,
      description: t.curriculum.learningAreas.music.description,
      color: "bg-chart-5",
    },
    {
      icon: Users,
      title: t.curriculum.learningAreas.social.title,
      description: t.curriculum.learningAreas.social.description,
      color: "bg-chart-1",
    },
    {
      icon: Heart,
      title: t.curriculum.learningAreas.emotional.title,
      description: t.curriculum.learningAreas.emotional.description,
      color: "bg-chart-2",
    },
    {
      icon: Leaf,
      title: t.curriculum.learningAreas.nature.title,
      description: t.curriculum.learningAreas.nature.description,
      color: "bg-chart-3",
    },
  ]

  const ageGroups = [
    {
      title: t.curriculum.ageGroups.toddlers.title,
      focus: t.curriculum.ageGroups.toddlers.focus,
      activities: t.curriculum.ageGroups.toddlers.activities,
    },
    {
      title: t.curriculum.ageGroups.preschool.title,
      focus: t.curriculum.ageGroups.preschool.focus,
      activities: t.curriculum.ageGroups.preschool.activities,
    },
    {
      title: t.curriculum.ageGroups.preK.title,
      focus: t.curriculum.ageGroups.preK.focus,
      activities: t.curriculum.ageGroups.preK.activities,
    },
  ]

  const dailyActivities = [
    {
      title: t.curriculum.dailyActivities.circle.title,
      description: t.curriculum.dailyActivities.circle.description,
    },
    {
      title: t.curriculum.dailyActivities.centers.title,
      description: t.curriculum.dailyActivities.centers.description,
    },
    {
      title: t.curriculum.dailyActivities.outdoor.title,
      description: t.curriculum.dailyActivities.outdoor.description,
    },
    {
      title: t.curriculum.dailyActivities.story.title,
      description: t.curriculum.dailyActivities.story.description,
    },
    {
      title: t.curriculum.dailyActivities.arts.title,
      description: t.curriculum.dailyActivities.arts.description,
    },
    {
      title: t.curriculum.dailyActivities.music.title,
      description: t.curriculum.dailyActivities.music.description,
    },
  ]

  const approach = [
    {
      title: t.curriculum.approach.playBased.title,
      description: t.curriculum.approach.playBased.description,
    },
    {
      title: t.curriculum.approach.individualized.title,
      description: t.curriculum.approach.individualized.description,
    },
    {
      title: t.curriculum.approach.handsOn.title,
      description: t.curriculum.approach.handsOn.description,
    },
    {
      title: t.curriculum.approach.family.title,
      description: t.curriculum.approach.family.description,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary/30 via-background to-accent/20 px-4 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-6 text-balance text-4xl font-bold leading-tight text-foreground lg:text-5xl">
            {t.curriculum.hero.title}
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground lg:text-xl">
            {t.curriculum.hero.description}
          </p>
        </div>
      </section>

      {/* Learning Areas */}
      <section className="px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground lg:text-4xl">
              {t.curriculum.learningAreas.title}
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {t.curriculum.learningAreas.subtitle}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {subjects.map((subject, index) => (
              <Card key={index} className="overflow-hidden rounded-3xl border-2 transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <div className={`mb-4 inline-flex rounded-2xl ${subject.color} p-3`}>
                    <subject.icon className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-foreground">{subject.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{subject.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Age-Specific Programs */}
      <section className="bg-muted/50 px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground lg:text-4xl">
              {t.curriculum.ageGroups.title}
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {t.curriculum.ageGroups.subtitle}
            </p>
          </div>
          <div className="space-y-8">
            {ageGroups.map((group, index) => (
              <Card key={index} className="overflow-hidden rounded-3xl border-2 bg-card">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h3 className="mb-2 text-2xl font-bold text-foreground">{group.title}</h3>
                    <p className="text-lg font-semibold text-primary">{group.focus}</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {group.activities.map((activity, actIndex) => (
                      <div key={actIndex} className="flex items-start gap-2">
                        <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                        <p className="text-muted-foreground">{activity}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Activities */}
      <section className="px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground lg:text-4xl">
              {t.curriculum.dailyActivities.title}
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {t.curriculum.dailyActivities.subtitle}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dailyActivities.map((activity, index) => (
              <Card key={index} className="overflow-hidden rounded-3xl border-2">
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-foreground">{activity.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{activity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground lg:text-4xl">
              {t.curriculum.approach.title}
            </h2>
          </div>
          <Card className="overflow-hidden rounded-3xl border-2 bg-card">
            <CardContent className="p-8">
              <div className="space-y-6">
                {approach.map((item, index) => (
                  <div key={index}>
                    <h3 className="mb-2 text-xl font-bold text-foreground">{item.title}</h3>
                    <p className="leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
