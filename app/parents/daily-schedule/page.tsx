import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Clock, Download, FileText, Sun, Moon, Coffee, Utensils, Baby, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Дневен режим - ДГ 202",
  description: "Програма за организация на деня в Детска градина 202 за учебна 2025/2026 г.",
}

export default function DailySchedulePage() {
  const groupSchedule = [
    { time: "7:00 - 8:30", activity: "Прием на децата по групи; дейност по избор на децата; дейности, организирани от учителя; индивидуална работа и др.", icon: Sun },
    { time: "8:30 - 8:50", activity: "Сутрешно раздвижване; дейности по избор", icon: Sun },
    { time: "8:50 - 9:15", activity: "Сутрешна закуска", icon: Coffee },
    { time: "9:20 - 10:30", activity: "Педагогически ситуации, творчески игри, подвижни игри, ателиета", icon: BookOpen },
    { time: "10:30", activity: "Подкрепителна закуска", icon: Coffee },
    { time: "10:40 - 11:50", activity: "Педагогически ситуации; дейност по избор на децата; дейности, организирани от учителя, подвижни игри, игри на открито", icon: BookOpen },
    { time: "12:00", activity: "Обяд", icon: Utensils },
    { time: "12:30 - 13:00", activity: "Подготовка за сън", icon: Moon },
    { time: "13:00 - 15:00", activity: "Следобеден сън", icon: Moon },
    { time: "15:15 - 15:40", activity: "Следобедна закуска", icon: Coffee },
    { time: "15:40 - 18:30", activity: "Подвижни игри, педагогически ситуации; допълнителни дейности, дейност по избор на децата; дейности, организирани от учителя, игри на открито, изпращане на децата", icon: Sun },
  ]

  const nurserySchedule = [
    { time: "7:00 - 8:30", activity: "Сутрешен прием. Дейности по избор на децата. Дейности, организирани от медицинската сестра (комуникативни игри за адаптация и социализиране)", icon: Sun },
    { time: "8:35 - 8:50", activity: "Утринно раздвижване (гимнастика, музикално-подвижни игри и др.)", icon: Sun },
    { time: "8:55 - 9:15", activity: "Подготовка за закуска. Закуска", icon: Coffee },
    { time: "9:15 - 9:30", activity: "Тоалет (гърне, миене на ръце и др.)", icon: Baby },
    { time: "9:30 - 10:00", activity: "Дейности с образователна цел организирани от мед. сестри - разказване на приказки, слушане на музика, заучаване на художествени текстове, пеене и танци, изобразителна дейност, модели за овладяване на навици за самообслужване, култура на поведение и др.", icon: BookOpen },
    { time: "10:00 - 10:20", activity: "Миене на ръце, подготовка и подкрепителна закуска (плод)", icon: Coffee },
    { time: "10:20 - 10:30", activity: "Тоалет (гърне)", icon: Baby },
    { time: "10:30 - 11:20", activity: "Игри и свободно реализирани дейности по избор (на открито или на закрито) - разходки, наблюдения, конструктивни и ролеви игри, музикално-подвижни игри и др. Дейности съобразно потребностите на децата", icon: Sun },
    { time: "11:25 - 11:45", activity: "Прибиране в занимарнята, тоалет (гърне, миене на ръце и др.)", icon: Baby },
    { time: "11:50 - 12:20", activity: "Подготовка за обяд. Обяд", icon: Utensils },
    { time: "12:20 - 15:30", activity: "Тоалет (гърне), подготовка за следобедна почивка и сън", icon: Moon },
    { time: "15:30 - 16:00", activity: "Следобеден тоалет (гърне, миене на ръце). Раздвижване (игри - подвижни, за раздвижване и емоционална нагласа)", icon: Baby },
    { time: "16:00 - 16:30", activity: "Подготовка за следобедна закуска. Закуска", icon: Coffee },
    { time: "16:30 - 19:00", activity: "Дейности, организирани от мед. спец. (на открито и закрито); игри и други свободно реализирани дейности - развлечения, театър, приказки, занимания на маси и др.", icon: Sun },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-secondary/20 via-background to-accent/10">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-primary/10 rounded-full px-6 py-2 mb-6">
                <span className="text-primary font-semibold">Учебна 2025/2026 г.</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                Дневен <span className="text-primary">режим</span>
              </h1>
              <p className="text-xl text-muted-foreground text-balance mb-8">
                Програма за организация на деня в ДГ 202
              </p>
              <a href="/documents/dneven-rezhim.pdf" download>
                <Button size="lg" className="gap-2 text-lg px-8 py-6 rounded-xl">
                  <Download className="w-5 h-5" />
                  Свали PDF документа
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Order Info */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
                <div className="flex items-start gap-3">
                  <FileText className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-lg mb-1">Заповед No 18/14.10.2025 г.</p>
                    <p className="text-muted-foreground">
                      На основание чл. 259 ал.1 от ЗПУО, Наредба No 5/03.06.2016г. за предучилищно образование
                      и решение на ПС с Протокол No 1 от 10.10.2025г.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2 italic">
                      Петя Янкова - ВрИД Директор на ДГ No 202
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Group Schedule */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-8">
                <Clock className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold">Програма за градинска група</h2>
              </div>

              <div className="grid gap-3">
                {groupSchedule.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={index}
                      className="bg-card rounded-lg p-5 border border-border shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
                    >
                      <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-primary text-lg">{item.time} ч.</p>
                        <p className="text-muted-foreground mt-1">{item.activity}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Nursery Schedule */}
        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-8">
                <Baby className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold">Програма за яслена група</h2>
              </div>

              <div className="grid gap-3">
                {nurserySchedule.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={index}
                      className="bg-card rounded-lg p-5 border border-border shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
                    >
                      <div className="bg-secondary/20 rounded-full p-3 flex-shrink-0">
                        <Icon className="w-5 h-5 text-secondary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-secondary text-lg">{item.time} ч.</p>
                        <p className="text-muted-foreground mt-1">{item.activity}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-lg p-8 border border-border">
                <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Изтегли пълния документ</h2>
                <p className="text-muted-foreground mb-6">
                  Свалете официалния PDF документ с дневния режим на ДГ 202
                </p>
                <a href="/documents/dneven-rezhim.pdf" download>
                  <Button size="lg" className="gap-2 rounded-xl">
                    <Download className="w-5 h-5" />
                    Свали PDF
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
