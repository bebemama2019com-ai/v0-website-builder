"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Users, UserCheck, Building2 } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export default function PublicCouncilPage() {
  const { language } = useLanguage()

  const regularMembers = [
    {
      name: "Стефан Шабанов",
      role: language === "bg" ? "Председател" : "Chairman",
      description: language === "bg" ? "Представител на родителите в ДГ № 202" : "Parent representative at Kindergarten 202",
    },
    {
      name: "Елисавета Баджакова",
      role: language === "bg" ? "Член" : "Member",
      description: language === "bg" ? "Представител на родителите в ДГ № 202" : "Parent representative at Kindergarten 202",
    },
    {
      name: "Ивета Асенова",
      role: language === "bg" ? "Член" : "Member",
      description: language === "bg" ? "Представител на родителите в ДГ № 202" : "Parent representative at Kindergarten 202",
    },
    {
      name: "Цветелина Серафимова",
      role: language === "bg" ? "Член" : "Member",
      description: language === "bg" ? "Представител на родителите в ДГ № 202" : "Parent representative at Kindergarten 202",
    },
    {
      name: "Светлана Дякова",
      role: language === "bg" ? "Член" : "Member",
      description: language === "bg" ? "Представител на финансиращия орган" : "Representative of the financing authority",
    },
  ]

  const reserveMembers = [
    { name: "Вера Димитрова", description: language === "bg" ? "Представител на родителите" : "Parent representative" },
    { name: "Петя Лакова", description: language === "bg" ? "Представител на родителите" : "Parent representative" },
    { name: "Деница Николова", description: language === "bg" ? "Представител на родителите" : "Parent representative" },
    { name: "Моника Петрова", description: language === "bg" ? "Представител на родителите" : "Parent representative" },
    { name: "Милена Кръстева", description: language === "bg" ? "Представител на финансиращия орган" : "Representative of the financing authority" },
  ]

  const documents = [
    {
      id: "statute",
      title: language === "bg" ? "Устав на Обществения съвет" : "Public Council Statute",
      description: language === "bg"
        ? "Устав на Обществения съвет при ДГ № 202"
        : "Statute of the Public Council at Kindergarten 202",
      icon: FileText,
      pdfUrl: "/documents/ustav-obshtestven-savet.pdf",
    },
    {
      id: "order",
      title: language === "bg" ? "Заповед за състав" : "Composition Order",
      description: language === "bg"
        ? "Заповед за утвърждаване членовете на Обществения съвет за уч. 2025/2026г."
        : "Order for approval of Public Council members for 2025/2026 school year",
      icon: UserCheck,
      pdfUrl: "/documents/zapoved-obshtestven-savet.pdf",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary/30 via-background to-accent/20 px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex rounded-2xl bg-primary/10 p-4">
            <Users className="h-10 w-10 text-primary" />
          </div>
          <h1 className="mb-4 text-balance text-4xl font-bold leading-tight text-foreground lg:text-5xl">
            {language === "bg" ? "Обществен съвет" : "Public Council"}
          </h1>
          <p className="text-pretty text-lg text-muted-foreground">
            {language === "bg"
              ? "Обществения съвет в ДГ № 202 за учебната 2025/2026г. с мандат 3 години"
              : "Public Council at Kindergarten 202 for the 2025/2026 school year with a 3-year mandate"}
          </p>
        </div>
      </section>

      {/* Regular Members Section */}
      <section className="px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              {language === "bg" ? "Редовни членове" : "Regular Members"}
            </h2>
            <p className="text-muted-foreground">
              {language === "bg"
                ? "4 представители на родителите и 1 представител на финансиращия орган"
                : "4 parent representatives and 1 representative of the financing authority"}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regularMembers.map((member, index) => (
              <Card key={index} className={`overflow-hidden rounded-2xl border-2 transition-all hover:shadow-lg ${index === 0 ? 'md:col-span-2 lg:col-span-1 border-primary/50 bg-primary/5' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full ${index === 0 ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{member.name}</h3>
                      <p className={`text-sm font-medium ${index === 0 ? 'text-primary' : 'text-muted-foreground'}`}>{member.role}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{member.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reserve Members Section */}
      <section className="bg-muted/50 px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              {language === "bg" ? "Резервни членове" : "Reserve Members"}
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reserveMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden rounded-2xl border transition-all hover:shadow-md">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className="px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              {language === "bg" ? "Документи" : "Documents"}
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {documents.map((doc) => (
              <Card key={doc.id} className="overflow-hidden rounded-3xl border-2 transition-all hover:shadow-xl">
                <div className="h-3 bg-gradient-to-r from-primary/20 to-accent/20" />
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-2xl bg-primary/10 p-4">
                      <doc.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold">{doc.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">{doc.description}</p>
                  
                  {/* PDF Preview */}
                  <div className="aspect-[4/3] overflow-hidden rounded-xl border bg-muted/50">
                    <iframe
                      src={`${doc.pdfUrl}#toolbar=0&navpanes=0`}
                      className="h-full w-full"
                      title={doc.title}
                    />
                  </div>

                  {/* Download Button */}
                  <Button asChild className="w-full rounded-xl" size="lg">
                    <a href={doc.pdfUrl} download target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-5 w-5" />
                      {language === "bg" ? "Изтегли документ" : "Download Document"}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Info Card */}
      <section className="bg-muted/50 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <Card className="overflow-hidden rounded-3xl border-2">
            <CardContent className="p-8 text-center">
              <Building2 className="mx-auto mb-4 h-12 w-12 text-primary" />
              <h3 className="mb-4 text-xl font-bold text-foreground">
                {language === "bg" ? "Правно основание" : "Legal Basis"}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {language === "bg"
                  ? "Обществения съвет е създаден в изпълнение на чл. 266, ал.1 от ЗПУО, чл.6, ал.1, т.1 от Правилника за създаването, устройството и дейността на обществените съвети към детските градини и училищата, и чл. 259 ал.1 от ЗПУО."
                  : "The Public Council was established in accordance with Art. 266, para.1 of the Preschool and School Education Act, Art.6, para.1, item 1 of the Regulations for the establishment, structure and activities of public councils at kindergartens and schools, and Art. 259 para.1 of the Preschool and School Education Act."}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
