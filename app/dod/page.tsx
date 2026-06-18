"use client"

import { useLanguage } from "@/lib/i18n/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Palette, Music, Dumbbell, Calendar } from "lucide-react"

interface Activity {
  id: string
  icon: React.ReactNode
  name_bg: string
  name_en: string
  description_bg: string
  description_en: string
}

const activities: Activity[] = [
  {
    id: "1",
    icon: <BookOpen className="h-12 w-12 text-primary" />,
    name_bg: "Чужденезиково обучение – английски език",
    name_en: "Foreign Language Learning - English",
    description_bg: "Уроци по английски език за развитие на комуникативните умения на детето.",
    description_en: "English language lessons for developing children's communication skills.",
  },
  {
    id: "2",
    icon: <Palette className="h-12 w-12 text-primary" />,
    name_bg: "Приложни изкуства",
    name_en: "Applied Arts",
    description_bg: "Творчески дейности насърчаващи художественото развитие на децата.",
    description_en: "Creative activities promoting children's artistic development.",
  },
  {
    id: "3",
    icon: <Dumbbell className="h-12 w-12 text-primary" />,
    name_bg: "Поддържни игри със топка",
    name_en: "Ball Games Support",
    description_bg: "Физическа активност и спортни игри за здравословното развитие.",
    description_en: "Physical activity and sports games for healthy development.",
  },
  {
    id: "4",
    icon: <Dumbbell className="h-12 w-12 text-primary" />,
    name_bg: "Художествена гимнастика",
    name_en: "Rhythmic Gymnastics",
    description_bg: "Гимнастически упражнения за развитие на координацията и гъвкавостта.",
    description_en: "Gymnastics exercises for developing coordination and flexibility.",
  },
  {
    id: "5",
    icon: <Music className="h-12 w-12 text-primary" />,
    name_bg: "Спортни и народни танци",
    name_en: "Sports and Folk Dancing",
    description_bg: "Танцови упражнения развиващи ритъма и движението на детето.",
    description_en: "Dance exercises developing children's rhythm and movement.",
  },
]

export default function DODPage() {
  const { language } = useLanguage()

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Header Section */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
              {language === "bg" ? "Допълнително Организирани Дейности" : "Additional Organized Activities"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === "bg"
                ? "За учебната 2025/2026г. за стимулиране на интересите и заложбите на децата извън Държавните Образователни Стандарти"
                : "For the 2025/2026 academic year to stimulate children's interests and talents outside the State Educational Standards"}
            </p>
          </div>

          {/* Activities Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => (
              <Card key={activity.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-8 pb-8 flex flex-col items-center gap-4 text-center">
                  {activity.icon}
                  <div>
                    <h3 className="font-bold text-foreground mb-2">
                      {language === "bg" ? activity.name_bg : activity.name_en}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {language === "bg" ? activity.description_bg : activity.description_en}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Organization Section */}
          <div className="space-y-8">
            <Card className="border-0 shadow-sm">
              <CardContent className="pt-8 pb-8">
                <h2 className="text-2xl font-bold text-foreground mb-8">
                  {language === "bg" ? "Организират се" : "Getting Organized"}
                </h2>
                
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Ski Schools */}
                  <Card className="border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="pt-6 pb-6 flex items-center gap-4">
                      <Calendar className="h-8 w-8 text-primary flex-shrink-0" />
                      <p className="font-semibold text-foreground">
                        {language === "bg" ? "Ски училища" : "Ski Schools"}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Summer Camps */}
                  <Card className="border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="pt-6 pb-6 flex items-center gap-4">
                      <Calendar className="h-8 w-8 text-primary flex-shrink-0" />
                      <p className="font-semibold text-foreground">
                        {language === "bg" ? "Летни лагери" : "Summer Camps"}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Day Excursions */}
                  <Card className="border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="pt-6 pb-6 flex items-center gap-4">
                      <Calendar className="h-8 w-8 text-primary flex-shrink-0" />
                      <p className="font-semibold text-foreground">
                        {language === "bg" ? "Еднодневни екскурзии" : "Day Excursions"}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Sports Holidays */}
                  <Card className="border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="pt-6 pb-6 flex items-center gap-4">
                      <Calendar className="h-8 w-8 text-primary flex-shrink-0" />
                      <p className="font-semibold text-foreground">
                        {language === "bg" ? "Спортни празници" : "Sports Holidays"}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Important Notice */}
            <Card className="border-2 border-primary bg-primary/5">
              <CardContent className="pt-8 pb-8">
                <h3 className="text-lg font-bold text-primary mb-4">
                  {language === "bg" ? "Важно" : "Important"}
                </h3>
                <p className="text-foreground leading-relaxed">
                  {language === "bg"
                    ? "Участието в допълнителните дейности става по желание на родителите и се заплаща всеки месец от 1 до 10 число."
                    : "Participation in additional activities is optional and paid monthly between the 1st and 10th of the month."}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
