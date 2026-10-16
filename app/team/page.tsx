"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Stethoscope, Briefcase, Shield } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import Image from "next/image"
import { useFetchWithFallback } from "@/hooks/use-fetch-with-fallback"

// Fallback team data - category field determines the group
const fallbackTeamData = [
  // Pedagogical staff
  {
    id: "1",
    name: "Петя Янкова",
    role: "Директор",
    category: "pedagogical",
    bio: 'Висше магистър "Организация и управление на образованието"',
    image: null,
    featured: true,
  },
  {
    id: "2",
    name: "Ренета Попгеоргиева",
    role: "Учител",
    category: "pedagogical",
    bio: 'Магистър по „ПНУП"',
    image: null,
  },
  {
    id: "3",
    name: "Венцислава Георгиева",
    role: "Учител",
    category: "pedagogical",
    bio: 'Бакалавър по „ПУП"',
    image: null,
  },
  // Medical staff
  {
    id: "4",
    name: "Пенка Дамянова",
    role: "Медицински специалист в детска градина",
    category: "medical",
    image: null,
  },
  {
    id: "5",
    name: "Фани Конакчиева",
    role: "Медицински специалист в детска градина",
    category: "medical",
    image: null,
  },
  // Other staff
  {
    id: "6",
    name: "Деляна Сергиева",
    role: "Счетоводител",
    category: "other",
    image: null,
  },
  {
    id: "7",
    name: "Нели Шуманова",
    role: "ЗАС",
    category: "other",
    image: null,
  },
]

export default function TeamPage() {
  const { t } = useLanguage()
  const { data: allTeamData } = useFetchWithFallback({
    endpoint: "/api/team",
    fallbackData: fallbackTeamData,
  })

  // Normalize field names
  const normalizedData = allTeamData.map((member: any) => {
    return {
      id: member.id,
      name: member.name,
      role: member.role || "",
      bio: member.bio || "",
      image: member.image || member.image_url || null,
      category: member.category || "other",
      featured: member.featured || false,
    }
  })

  // Group team members by their category field
  const groupedTeam = {
    pedagogical: normalizedData.filter((member: any) => member.category === "pedagogical"),
    medical: normalizedData.filter((member: any) => member.category === "medical"),
    other: normalizedData.filter((member: any) => member.category === "other"),
    security: normalizedData.filter((member: any) => member.category === "security"),
  }

  // Helper function to render team member card
  const renderTeamCard = (member: any, index: number, isDirector: boolean = false) => (
    <Card 
      key={member.id || index} 
      className={`overflow-hidden rounded-2xl border-2 transition-shadow hover:shadow-lg ${
        isDirector ? 'md:col-span-2 lg:col-span-1 ring-2 ring-primary' : ''
      }`}
    >
      {/* Only show image container if image URL exists */}
      {member.image && (
        <div className="aspect-square overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
          <Image
            src={member.image}
            alt={member.name}
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            priority={false}
            unoptimized={true}
          />
        </div>
      )}
      <CardContent className={member.image ? "p-4" : "p-6"}>
        <h3 className="mb-1 font-bold text-foreground">
          {member.image ? <span className="text-lg">{member.name}</span> : <span className="text-lg">{member.name}</span>}
        </h3>
        <p className="text-sm font-semibold text-primary mb-2">{member.role}</p>
        {member.bio && (
          <p className="text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary/30 via-background to-accent/20 px-4 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-6 text-balance text-4xl font-bold leading-tight text-foreground lg:text-5xl">
            {"Екип"}
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground lg:text-xl">
            {"Запознайте се с нашия отдаден екип от професионалисти, които се грижат за вашите деца."}
          </p>
        </div>
      </section>

      {/* Pedagogical Staff */}
      {groupedTeam.pedagogical.length > 0 && (
        <section className="px-4 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-3 mb-10">
              <Users className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">
                {"Педагогически персонал"}
              </h2>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {groupedTeam.pedagogical.map((member: any, index: number) => 
                renderTeamCard(member, index, member.featured || false)
              )}
            </div>
          </div>
        </section>
      )}

      {/* Medical Staff */}
      {groupedTeam.medical.length > 0 && (
        <section className="px-4 py-16 lg:py-24 bg-card/50">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-3 mb-10">
              <Stethoscope className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">
                {"Медицински специалисти"}
              </h2>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {groupedTeam.medical.map((member: any, index: number) => 
                renderTeamCard(member, index)
              )}
            </div>
          </div>
        </section>
      )}

      {/* Other Staff */}
      {groupedTeam.other.length > 0 && (
        <section className="px-4 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-3 mb-10">
              <Briefcase className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">
                {"Друг персонал"}
              </h2>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {groupedTeam.other.map((member: any, index: number) => 
                renderTeamCard(member, index)
              )}
            </div>
          </div>
        </section>
      )}

      {/* Security */}
      <section className="px-4 py-16 lg:py-24 bg-card/50">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-10">
            <Shield className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">
              {"Охрана"}
            </h2>
          </div>
          
          {groupedTeam.security.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {groupedTeam.security.map((member: any, index: number) => 
                renderTeamCard(member, index)
              )}
            </div>
          ) : (
            <Card className="overflow-hidden rounded-2xl border max-w-md">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-foreground">
                  {'Охранителна фирма "ГАРД" ЕООД'}
                </h3>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
