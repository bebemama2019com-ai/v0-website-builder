"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Eye, Award, Clock } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export default function AboutPage() {
  const { t } = useLanguage()

  const values = [
    {
      icon: Target,
      title: t.about.missionVision.mission.title,
      description: t.about.missionVision.mission.description,
    },
    {
      icon: Eye,
      title: t.about.missionVision.vision.title,
      description: t.about.missionVision.vision.description,
    },
    {
      icon: Award,
      title: t.about.missionVision.values.title,
      description: t.about.missionVision.values.description,
    },
  ]

  const philosophy = [
    {
      title: t.about.philosophy.childCentered.title,
      description: t.about.philosophy.childCentered.description,
    },
    {
      title: t.about.philosophy.playBased.title,
      description: t.about.philosophy.playBased.description,
    },
    {
      title: t.about.philosophy.family.title,
      description: t.about.philosophy.family.description,
    },
    {
      title: t.about.philosophy.safe.title,
      description: t.about.philosophy.safe.description,
    },
  ]

  const schedule = [
    { time: "7:00 - 8:30 AM", activity: t.about.schedule.times.arrival },
    { time: "8:30 - 9:00 AM", activity: t.about.schedule.times.circle },
    { time: "9:00 - 10:00 AM", activity: t.about.schedule.times.centers },
    { time: "10:00 - 10:30 AM", activity: t.about.schedule.times.snack },
    { time: "10:30 - 11:30 AM", activity: t.about.schedule.times.outdoor },
    { time: "11:30 - 12:30 PM", activity: t.about.schedule.times.lunch },
    { time: "12:30 - 2:00 PM", activity: t.about.schedule.times.rest },
    { time: "2:00 - 3:00 PM", activity: t.about.schedule.times.arts },
    { time: "3:00 - 3:30 PM", activity: t.about.schedule.times.afternoon },
    { time: "3:30 - 6:00 PM", activity: t.about.schedule.times.departure },
  ]

  const facilities = [
    { title: t.about.facilities.brightClassrooms, query: "bright colorful kindergarten classroom" },
    { title: t.about.facilities.outdoorPlayground, query: "safe outdoor playground for children" },
    { title: t.about.facilities.artStudio, query: "children's art studio with supplies" },
    { title: t.about.facilities.readingCorner, query: "cozy reading corner with books" },
    { title: t.about.facilities.musicRoom, query: "music room with instruments for kids" },
    { title: t.about.facilities.gardenArea, query: "children's garden with plants" },
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
                <img
                  src="/kindergarten-building-exterior-with-playground.jpg"
                  alt="Little Sprouts Kindergarten"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground lg:text-4xl">
              {t.about.missionVision.title}
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value, index) => (
              <Card key={index} className="overflow-hidden rounded-3xl border-2">
                <CardContent className="p-8 text-center">
                  <div className="mb-4 inline-flex rounded-2xl bg-primary/10 p-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-foreground">{value.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Philosophy */}
      <section className="bg-muted/50 px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground lg:text-4xl">
              {t.about.philosophy.title}
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {t.about.philosophy.subtitle}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {philosophy.map((item, index) => (
              <Card key={index} className="overflow-hidden rounded-3xl border-2 bg-card">
                <CardContent className="p-8">
                  <h3 className="mb-3 text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Schedule */}
      <section className="px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground lg:text-4xl">
              {t.about.schedule.title}
            </h2>
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground">{t.about.schedule.subtitle}</p>
          </div>
          <Card className="overflow-hidden rounded-3xl border-2">
            <CardContent className="p-8">
              <div className="space-y-6">
                {schedule.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{item.time}</p>
                      <p className="text-muted-foreground">{item.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Facilities */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground lg:text-4xl">
              {t.about.facilities.title}
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {t.about.facilities.subtitle}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility, index) => (
              <div key={index} className="group relative aspect-[4/3] overflow-hidden rounded-3xl">
                <img
                  src={`/.jpg?height=400&width=500&query=${facility.query}`}
                  alt={facility.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-bold text-white">{facility.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
