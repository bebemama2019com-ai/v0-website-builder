"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/i18n/language-context"
import { GraduationCap, Music, Palette, Dumbbell, Calendar } from "lucide-react"

export default function DODPage() {
  const { language } = useLanguage()

  const activities = [
    { name: "Чуждоезиково обучение – английски език", icon: GraduationCap },
    { name: "Български народни танци и фолклор", icon: Music },
    { name: "Модерни танци", icon: Music },
    { name: "Приложни изкуства", icon: Palette },
    { name: "Модерен и класически балет", icon: Music },
    { name: "Плуване", icon: Dumbbell },
    { name: "Футбол", icon: Dumbbell },
    { name: "Художествена гимнастика", icon: Dumbbell },
    { name: "Тенис на корт", icon: Dumbbell },
  ]

  const events = ["Ски училища", "Летни лагери", "Еднодневни екскурзии", "Спортни празници"]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {language === "bg" ? "Допълнителни образователни дейности" : "Additional Educational Activities"}
            </h1>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              {language === "bg"
                ? "За учебната 2024/2025г. за стимулиране на интересите и заложбите на децата извън Държавните Образователни Стандарти"
                : "For the 2024/2025 school year to stimulate children's interests and talents beyond State Educational Standards"}
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">
                {language === "bg" ? "Организирани занимания" : "Organized Activities"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {activities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-lg border bg-card p-4 transition-colors hover:bg-accent"
                  >
                    <activity.icon className="h-6 w-6 text-primary" />
                    <span className="font-medium">{activity.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">{language === "bg" ? "Организират се" : "We Organize"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {events.map((event, index) => (
                  <div key={index} className="flex items-center gap-3 rounded-lg border bg-card p-4">
                    <Calendar className="h-6 w-6 text-primary" />
                    <span className="font-medium">{event}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/50 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-xl text-primary">{language === "bg" ? "Важно" : "Important"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-pretty leading-relaxed">
                {language === "bg"
                  ? "Участието в допълнителните дейности става по желание на родителите и се заплаща всеки месец от 1 до 10 число."
                  : "Participation in additional activities is voluntary and is paid monthly from the 1st to the 10th."}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}
