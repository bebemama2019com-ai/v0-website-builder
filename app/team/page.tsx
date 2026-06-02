"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Stethoscope, Briefcase, Shield } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import Image from "next/image"

export default function TeamPage() {
  const { language } = useLanguage()

  const pedagogicalStaff = [
    {
      name: "Петя Янкова",
      role: language === "bg" ? "Директор" : "Director",
      qualification: language === "bg" 
        ? 'Висше магистър "Организация и управление на образованието" и свидетелство за придобито първо ПКС'
        : 'Master\'s degree in "Organization and Management of Education" with First Professional Qualification Degree',
      image: "/team/petya-yankova.jpg",
      isDirector: true,
    },
    {
      name: "Ренета Попгеоргиева",
      role: language === "bg" ? "Учител" : "Teacher",
      qualification: language === "bg" ? 'Магистър по „ПНУП"' : 'Master\'s degree in "PNUP"',
      image: "/team/reneta-popgeorgieva.jpg",
    },
    {
      name: "Венцислава Георгиева",
      role: language === "bg" ? "Учител" : "Teacher",
      qualification: language === "bg" ? 'Бакалавър по „ПУП"' : 'Bachelor\'s degree in "PUP"',
    },
  ]

  const medicalStaff = [
    {
      name: "Пенка Дамянова",
      role: language === "bg" ? "Медицински специалист в детска градина" : "Medical specialist in kindergarten",
    },
    {
      name: "Фани Конакчиева",
      role: language === "bg" ? "Медицински специалист в детска градина" : "Medical specialist in kindergarten",
    },
    {
      name: "Димитрийка Мангърова",
      role: language === "bg" ? "Медицински специалист в яслена група" : "Medical specialist in nursery group",
    },
    {
      name: "Надя Петрова",
      role: language === "bg" ? "Медицински специалист в яслена група" : "Medical specialist in nursery group",
    },
    {
      name: "Нели Николова",
      role: language === "bg" ? "Медицински специалист в яслена група" : "Medical specialist in nursery group",
    },
    {
      name: "Савка Иванова",
      role: language === "bg" ? "Медицински специалист в яслена група" : "Medical specialist in nursery group",
    },
  ]

  const otherStaff = [
    {
      name: "Деляна Сергиева",
      role: language === "bg" ? "Счетоводител" : "Accountant",
    },
    {
      name: "Нели Шуманова",
      role: language === "bg" ? "ЗАС" : "Administrative Secretary",
    },
    {
      name: "Теменужка Кръстева",
      role: language === "bg" ? "Помощник-готвач" : "Assistant Cook",
    },
    {
      name: "Светла Пейкова",
      role: language === "bg" ? "Помощник-възпитател" : "Teaching Assistant",
    },
    {
      name: "Розалия Кьосева",
      role: language === "bg" ? "Помощник-възпитател" : "Teaching Assistant",
    },
    {
      name: "Татяна Нинова",
      role: language === "bg" ? "Помощник-възпитател" : "Teaching Assistant",
    },
    {
      name: "Георги Колев",
      role: language === "bg" ? "РПС" : "Maintenance Worker",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary/30 via-background to-accent/20 px-4 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-6 text-balance text-4xl font-bold leading-tight text-foreground lg:text-5xl">
            {language === "bg" ? "Екип" : "Our Team"}
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground lg:text-xl">
            {language === "bg" 
              ? "Запознайте се с нашия отдаден екип от професионалисти, които се грижат за вашите деца."
              : "Meet our dedicated team of professionals who care for your children."}
          </p>
        </div>
      </section>

      {/* Pedagogical Staff */}
      <section className="px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-10">
            <Users className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">
              {language === "bg" ? "Педагогически персонал" : "Pedagogical Staff"}
            </h2>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pedagogicalStaff.map((member, index) => (
              <Card key={index} className={`overflow-hidden rounded-3xl border-2 transition-shadow hover:shadow-lg ${member.isDirector ? 'md:col-span-2 lg:col-span-1 ring-2 ring-primary' : ''}`}>
                {member.image && (
                  <div className="aspect-square overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={400}
                      height={400}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="mb-1 text-xl font-bold text-foreground">{member.name}</h3>
                  <p className="mb-2 text-sm font-semibold text-primary">{member.role}</p>
                  {member.qualification && (
                    <p className="text-sm leading-relaxed text-muted-foreground">{member.qualification}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Staff */}
      <section className="px-4 py-16 lg:py-24 bg-card/50">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-10">
            <Stethoscope className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">
              {language === "bg" ? "Медицински специалисти" : "Medical Specialists"}
            </h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {medicalStaff.map((member, index) => (
              <Card key={index} className="overflow-hidden rounded-2xl border transition-shadow hover:shadow-md">
                <CardContent className="p-5">
                  <h3 className="mb-1 text-lg font-bold text-foreground">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Other Staff */}
      <section className="px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-10">
            <Briefcase className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">
              {language === "bg" ? "Друг персонал" : "Other Staff"}
            </h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {otherStaff.map((member, index) => (
              <Card key={index} className="overflow-hidden rounded-2xl border transition-shadow hover:shadow-md">
                <CardContent className="p-5">
                  <h3 className="mb-1 text-lg font-bold text-foreground">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="px-4 py-16 lg:py-24 bg-card/50">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-10">
            <Shield className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">
              {language === "bg" ? "Охрана" : "Security"}
            </h2>
          </div>
          
          <Card className="overflow-hidden rounded-2xl border max-w-md">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-foreground">
                {language === "bg" ? 'Охранителна фирма „ГАРД" ЕООД' : 'Security Company "GARD" Ltd.'}
              </h3>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
