"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Baby, GraduationCap } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export default function WeeklyMenuPage() {
  const { language } = useLanguage()

  const menus = [
    {
      id: "kindergarten",
      title: language === "bg" ? "Детска градина" : "Kindergarten",
      subtitle: language === "bg" ? "Възрастова група от 3 до 7 години" : "Age group 3-7 years",
      description: language === "bg" 
        ? "Седмично меню за деца от групите в детската градина"
        : "Weekly menu for children in kindergarten groups",
      icon: GraduationCap,
      pdfUrl: "/documents/menu-detska-gradina.pdf",
      color: "from-primary/20 to-accent/20",
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      id: "nursery",
      title: language === "bg" ? "Ясла" : "Nursery",
      subtitle: language === "bg" ? "Възрастова група от 1 до 3 години" : "Age group 1-3 years",
      description: language === "bg"
        ? "Седмично меню за деца от яслените групи"
        : "Weekly menu for children in nursery groups",
      icon: Baby,
      pdfUrl: "/documents/menu-yasla.pdf",
      color: "from-secondary/20 to-primary/20",
      iconColor: "text-secondary",
      bgColor: "bg-secondary/10",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary/30 via-background to-accent/20 px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex rounded-2xl bg-primary/10 p-4">
            <FileText className="h-10 w-10 text-primary" />
          </div>
          <h1 className="mb-4 text-balance text-4xl font-bold leading-tight text-foreground lg:text-5xl">
            {language === "bg" ? "Седмично меню" : "Weekly Menu"}
          </h1>
          <p className="text-pretty text-lg text-muted-foreground">
            {language === "bg"
              ? "Менюто е съобразено с Наредба №6 на МЗ и Наредба №9 и №8 на МЗХ. Менюто може да бъде променено поради независещи от нас причини."
              : "The menu complies with Regulation No. 6 of the Ministry of Health and Regulations No. 9 and No. 8 of the Ministry of Agriculture. The menu may be changed due to reasons beyond our control."}
          </p>
        </div>
      </section>

      {/* Menu Cards Section */}
      <section className="px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2">
            {menus.map((menu) => (
              <Card key={menu.id} className="overflow-hidden rounded-3xl border-2 transition-all hover:shadow-xl">
                <div className={`h-3 bg-gradient-to-r ${menu.color}`} />
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className={`rounded-2xl ${menu.bgColor} p-4`}>
                      <menu.icon className={`h-8 w-8 ${menu.iconColor}`} />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold">{menu.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{menu.subtitle}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{menu.description}</p>

                  {/* Download Button */}
                  <Button asChild className="w-full rounded-xl" size="lg">
                    <a href={menu.pdfUrl} download target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-5 w-5" />
                      {language === "bg" ? "Изтегли меню" : "Download Menu"}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Allergen Information */}
          <Card className="mt-12 overflow-hidden rounded-3xl border-2">
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                {language === "bg" ? "Информация за алергени (Регламент 1169/2011г.)" : "Allergen Information (Regulation 1169/2011)"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">A</span>
                  <span>{language === "bg" ? "Зърнени храни" : "Cereals"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">B</span>
                  <span>{language === "bg" ? "Мляко и млечни продукти" : "Milk and dairy"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">C</span>
                  <span>{language === "bg" ? "Яйца" : "Eggs"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">D</span>
                  <span>{language === "bg" ? "Риба и рибни продукти" : "Fish and fish products"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">E</span>
                  <span>{language === "bg" ? "Целина" : "Celery"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">F</span>
                  <span>{language === "bg" ? "Ядки" : "Nuts"}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
