import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, BookOpen, Palette, Music } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata = {
  title: "Група ЗВЪНЧЕ - ДГ 202",
  description: "Информация за група ЗВЪНЧЕ в Детска градина 202",
}

export default function ZvanchePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-r from-primary/20 to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Група ЗВЪНЧЕ</h1>
              <p className="text-xl text-muted-foreground">Възраст: 4-5 години</p>
            </div>
          </div>
        </section>

        {/* Teacher Section */}
        <section className="py-12 container mx-auto px-4">
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Users className="h-6 w-6" />
                Ръководител на групата
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-primary/20">
                  <Image src="/friendly-female-kindergarten-teacher.jpg" alt="Учител" fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">Генка Нанкинска</h3>
                  <p className="text-muted-foreground mb-4">Бакалавър по „Предучилищна педагогика"</p>
                  <p className="text-foreground leading-relaxed">
                    Опитен педагог с фокус върху емоционалното и интелектуално развитие на децата. Използва съвременни
                    методи за обучение и създава топла и подкрепяща среда за всяко дете.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Weekly Schedule */}
        <section className="py-12 container mx-auto px-4">
          <Card>
            <CardHeader className="bg-gradient-to-r from-secondary/10 to-accent/10">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Calendar className="h-6 w-6" />
                Седмична програма
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  {
                    day: "Понеделник",
                    activities: [
                      { time: "9:00 - 9:30", name: "Музика и ритмика", icon: Music },
                      { time: "10:00 - 10:30", name: "Български език", icon: BookOpen },
                    ],
                  },
                  {
                    day: "Вторник",
                    activities: [
                      { time: "9:00 - 9:30", name: "Математика", icon: BookOpen },
                      { time: "10:00 - 10:30", name: "Изобразително изкуство", icon: Palette },
                    ],
                  },
                  {
                    day: "Сряда",
                    activities: [
                      { time: "9:00 - 9:30", name: "Опознаване на околния свят", icon: BookOpen },
                      { time: "10:00 - 10:30", name: "Физическо възпитание", icon: Users },
                    ],
                  },
                  {
                    day: "Четвъртък",
                    activities: [
                      { time: "9:00 - 9:30", name: "Конструиране и технологии", icon: Palette },
                      { time: "10:00 - 10:30", name: "Български език", icon: BookOpen },
                    ],
                  },
                  {
                    day: "Петък",
                    activities: [
                      { time: "9:00 - 9:30", name: "Музика и ритмика", icon: Music },
                      { time: "10:00 - 10:30", name: "Игри и забавления", icon: Users },
                    ],
                  },
                ].map((day, idx) => (
                  <div key={idx} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-lg mb-3 text-primary">{day.day}</h3>
                    <div className="space-y-2">
                      {day.activities.map((activity, actIdx) => {
                        const Icon = activity.icon
                        return (
                          <div key={actIdx} className="flex items-start gap-3 pl-2">
                            <Icon className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                            <div className="flex-1">
                              <span className="text-sm font-medium text-muted-foreground">{activity.time}</span>
                              <p className="text-foreground">{activity.name}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Activities Overview */}
        <section className="py-12 container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Дейности и активности</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Познавателни игри",
                description: "Развиваме любознателността и логическото мислене чрез игрови задачи",
                icon: BookOpen,
              },
              {
                title: "Творчески занимания",
                description: "Рисуване, моделиране и конструиране за развитие на креативността",
                icon: Palette,
              },
              {
                title: "Музика и движение",
                description: "Музикални игри, песни и танци за физическо и емоционално развитие",
                icon: Music,
              },
              {
                title: "Социализация",
                description: "Групови игри и дейности за развитие на социални умения",
                icon: Users,
              },
              {
                title: "Езиково развитие",
                description: "Разговори, приказки и езикови игри за богат речников запас",
                icon: BookOpen,
              },
              {
                title: "Двигателни умения",
                description: "Физически упражнения и игри за развитие на координацията",
                icon: Users,
              },
            ].map((activity, idx) => {
              const Icon = activity.icon
              return (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">{activity.title}</h3>
                        <p className="text-muted-foreground text-sm">{activity.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
