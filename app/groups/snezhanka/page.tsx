import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Calendar, Clock, Users, BookOpen, Palette, Music } from "lucide-react"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Група СНЕЖАНКА - ДГ 202",
  description: "Информация за група СНЕЖАНКА в Детска градина 202",
}

export default function SnezhankaPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-secondary/20 via-background to-accent/10">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-primary/10 rounded-full px-6 py-2 mb-6">
                <span className="text-primary font-semibold">Възраст: 5-6 години</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                Група <span className="text-primary">СНЕЖАНКА</span>
              </h1>
              <p className="text-xl text-muted-foreground text-balance">Подготовка за училище с радост и увереност</p>
            </div>
          </div>
        </section>

        {/* Teacher Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
                <div className="flex items-center gap-2 mb-6">
                  <Users className="w-6 h-6 text-primary" />
                  <h2 className="text-3xl font-bold">Ръководител на групата</h2>
                </div>
                <div className="grid md:grid-cols-[200px_1fr] gap-8">
                  <div className="flex justify-center">
                    <Image
                      src="/friendly-female-kindergarten-teacher.jpg"
                      alt="Учител"
                      width={200}
                      height={200}
                      className="rounded-lg shadow-md object-cover"
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-primary mb-2">Петя Янкова</h3>
                      <p className="text-muted-foreground font-medium">
                        Магистър "Организация и управление на образованието", Първо ПКС
                      </p>
                    </div>
                    <p className="text-lg leading-relaxed">
                      Директор на детската градина и опитен педагог. Специализирана в подготовката на деца за училище и
                      използва иновативни образователни методи. Притежава богат опит в управлението на образователни
                      процеси.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Weekly Schedule */}
        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-8">
                <Calendar className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold">Седмична програма</h2>
              </div>

              <div className="grid gap-4">
                {/* Monday */}
                <div className="bg-card rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Понеделник</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">09:00 - 09:45</p>
                        <p className="text-muted-foreground">Български език - четене и писане</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">10:00 - 10:45</p>
                        <p className="text-muted-foreground">Математика и логика</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">11:00 - 11:45</p>
                        <p className="text-muted-foreground">Физическо възпитание</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tuesday */}
                <div className="bg-card rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Вторник</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">09:00 - 09:45</p>
                        <p className="text-muted-foreground">Английски език</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">10:00 - 10:45</p>
                        <p className="text-muted-foreground">Музика и ритмика</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">11:00 - 11:45</p>
                        <p className="text-muted-foreground">Изобразително изкуство</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Wednesday */}
                <div className="bg-card rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Сряда</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">09:00 - 09:45</p>
                        <p className="text-muted-foreground">Околен свят и наука</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">10:00 - 10:45</p>
                        <p className="text-muted-foreground">Компютърна грамотност</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">11:00 - 11:45</p>
                        <p className="text-muted-foreground">Игри на открито</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Thursday */}
                <div className="bg-card rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Четвъртък</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">09:00 - 09:45</p>
                        <p className="text-muted-foreground">Български език - писане</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">10:00 - 10:45</p>
                        <p className="text-muted-foreground">Математика - задачи</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">11:00 - 11:45</p>
                        <p className="text-muted-foreground">Физическо възпитание</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Friday */}
                <div className="bg-card rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Петък</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">09:00 - 09:45</p>
                        <p className="text-muted-foreground">Изобразително изкуство</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">10:00 - 10:45</p>
                        <p className="text-muted-foreground">Музика и танци</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">11:00 - 11:45</p>
                        <p className="text-muted-foreground">Свободни дейности и проекти</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Activities Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Основни дейности</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-card rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
                  <BookOpen className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Училищна подготовка</h3>
                  <p className="text-muted-foreground">Четене, писане, математика и логическо мислене</p>
                </div>
                <div className="bg-card rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
                  <Palette className="w-12 h-12 text-secondary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Творчество</h3>
                  <p className="text-muted-foreground">Изкуство, музика и творческо изразяване</p>
                </div>
                <div className="bg-card rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
                  <Music className="w-12 h-12 text-accent mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Социални умения</h3>
                  <p className="text-muted-foreground">Комуникация, работа в екип и емоционална интелигентност</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
