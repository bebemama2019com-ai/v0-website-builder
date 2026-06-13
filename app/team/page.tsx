"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Stethoscope, Briefcase, Shield } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import Image from "next/image"
import { useFetchWithFallback } from "@/hooks/use-fetch-with-fallback"

// Fallback pedagogical staff data
const fallbackPedagogicalStaff = [
  {
    id: "1",
    name: "Петя Янкова",
    role: "Директор",
    qualification: 'Висше магистър "Организация и управление на образованието" и свидетелство за придобито първо ПКС',
    image: "/team/petya-yankova.jpg",
    isDirector: true,
  },
  {
    id: "2",
    name: "Ренета Попгеоргиева",
    role: "Учител",
    qualification: 'Магистър по „ПНУП"',
    image: "/team/reneta-popgeorgieva.jpg",
  },
  {
    id: "3",
    name: "Венцислава Георгиева",
    role: "Учител",
    qualification: 'Бакалавър по „ПУП"',
    image: "/team/ventsislava-georgieva.jpg",
  },
]

export default function TeamPage() {
  const { language, t } = useLanguage()
  const { data: pedagogicalStaffData } = useFetchWithFallback({
    endpoint: "/api/team",
    fallbackData: fallbackPedagogicalStaff,
  })

  // Map API data to display format - use the data as-is from database
  const pedagogicalStaff = pedagogicalStaffData.map((member: any) => ({
    id: member.id,
    name: member.name,
    role: member.position || member.role || "",
    qualification: member.bio || member.qualification || "",
    image: member.image || "/team/default.jpg",
    isDirector: member.featured || false,
  }))

  const medicalStaff = [
    {
      name: "Пенка Дамянова",
      role: "Медицински специалист в детска градина",
    },
    {
      name: "Фани Конакчиева",
      role: "Медицински специалист в детска градина",
    },
    {
      name: "Димитрийка Мангърова",
      role: "Медицински специалист в яслена група",
    },
    {
      name: "Надя Петрова",
      role: "Медицински специалист в яслена група",
    },
    {
      name: "Нели Николова",
      role: "Медицински специалист в яслена група",
    },
    {
      name: "Савка Иванова",
      role: "Медицински специалист в яслена група",
    },
  ]

  const otherStaff = [
    {
      name: "Деляна Сергиева",
      role: "Счетоводител",
    },
    {
      name: "Нели Шуманова",
      role: "ЗАС",
    },
    {
      name: "Теменужка Кръстева",
      role: "Помощник-готвач",
    },
    {
      name: "Светла Пейкова",
      role: "Помощник-възпитател",
    },
    {
      name: "Розалия Кьосева",
      role: "Помощник-възпитател",
    },
    {
      name: "Татяна Нинова",
      role: "Помощник-възпитател",
    },
    {
      name: "Георги Колев",
      role: "РПС",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary/30 via-background to-accent/20 px-4 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-6 text-balance text-4xl font-bold leading-tight text-foreground lg:text-5xl">
            {t?.team?.title || "Екип"}
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground lg:text-xl">
            {t?.team?.subtitle || "Запознайте се с нашия отдаден екип от професионалисти, които се грижат за вашите деца."}
          </p>
        </div>
      </section>

      {/* Pedagogical Staff */}
      <section className="px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-10">
            <Users className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">
              {t?.team?.pedagogicalStaff || "Педагогически персонал"}
            </h2>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pedagogicalStaff.map((member, index) => (
              <Card key={member.id || index} className={`overflow-hidden rounded-3xl border-2 transition-shadow hover:shadow-lg ${member.isDirector ? 'md:col-span-2 lg:col-span-1 ring-2 ring-primary' : ''}`}>
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
              {t?.team?.medicalStaff || "Медицински специалисти"}
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
              {t?.team?.otherStaff || "Друг персонал"}
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
              {t?.team?.security || "Охрана"}
            </h2>
          </div>
          
          <Card className="overflow-hidden rounded-2xl border max-w-md">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-foreground">
                {t?.team?.securityCompany || 'Охранителна фирма "ГАРД" ЕООД'}
              </h3>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
