"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Baby, GraduationCap, Eye } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import { useState, useEffect } from "react"

interface MenuFile {
  id: string
  menu_type: string
  file_name: string
  file_url: string
  updated_at: string
}

export default function WeeklyMenuPage() {
  const { language } = useLanguage()
  const [menuFiles, setMenuFiles] = useState<MenuFile[]>([])
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState<string | null>(null)

  useEffect(() => {
    fetchMenuFiles()
  }, [])

  function handleViewMenu(menuFile: MenuFile) {
    // Add ?dl=false to force Supabase to return Content-Disposition: inline (preview) instead of attachment (download)
    const previewUrl = menuFile.file_url.includes("?") 
      ? `${menuFile.file_url}&dl=false`
      : `${menuFile.file_url}?dl=false`
    window.open(previewUrl, "_blank")
  }

  async function handleDownload(menuFile: MenuFile) {
    try {
      setDownloading(menuFile.menu_type)
      const response = await fetch(menuFile.file_url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = menuFile.file_name
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("[v0] Error downloading file:", error)
    } finally {
      setDownloading(null)
    }
  }

  async function fetchMenuFiles() {
    try {
      const response = await fetch("/api/weekly-menu")
      const data = await response.json()
      setMenuFiles(data)
    } catch (error) {
      console.error("[v0] Error fetching menu files:", error)
    } finally {
      setLoading(false)
    }
  }

  const getMenuInfo = (menuType: string) => {
    if (menuType === "kindergarten") {
      return {
        title: language === "bg" ? "Детска градина" : "Kindergarten",
        subtitle: language === "bg" ? "Възрастова група от 3 до 7 години" : "Age group 3-7 years",
        description: language === "bg" 
          ? "Седмично меню за деца от групите в детската градина"
          : "Weekly menu for children in kindergarten groups",
        icon: GraduationCap,
        color: "from-primary/20 to-accent/20",
        iconColor: "text-primary",
        bgColor: "bg-primary/10",
      }
    } else {
      return {
        title: language === "bg" ? "Ясла" : "Nursery",
        subtitle: language === "bg" ? "Възрастова група от 1 до 3 години" : "Age group 1-3 years",
        description: language === "bg"
          ? "Седмично меню за деца от яслените групи"
          : "Weekly menu for children in nursery groups",
        icon: Baby,
        color: "from-secondary/20 to-primary/20",
        iconColor: "text-secondary",
        bgColor: "bg-secondary/10",
      }
    }
  }

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
            {["kindergarten", "nursery"].map((menuType) => {
              const menuFile = menuFiles.find((f) => f.menu_type === menuType)
              const menuInfo = getMenuInfo(menuType)
              const Icon = menuInfo.icon

              return (
                <Card key={menuType} className="overflow-hidden rounded-3xl border-2 transition-all hover:shadow-xl">
                  <div className={`h-3 bg-gradient-to-r ${menuInfo.color}`} />
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4">
                      <div className={`rounded-2xl ${menuInfo.bgColor} p-4`}>
                        <Icon className={`h-8 w-8 ${menuInfo.iconColor}`} />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold">{menuInfo.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{menuInfo.subtitle}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{menuInfo.description}</p>

                    {/* View and Download Buttons */}
                    {loading ? (
                      <Button disabled className="w-full rounded-xl" size="lg">
                        {language === "bg" ? "Зареждане..." : "Loading..."}
                      </Button>
                    ) : menuFile ? (
                      <div className="space-y-3">
                        <Button 
                          onClick={() => handleViewMenu(menuFile)}
                          className="w-full rounded-xl" 
                          size="lg"
                        >
                          <Eye className="mr-2 h-5 w-5" />
                          {language === "bg" ? "Виж меню" : "View Menu"}
                        </Button>
                        <Button 
                          onClick={() => handleDownload(menuFile)}
                          disabled={downloading === menuFile.menu_type}
                          variant="outline" 
                          className="w-full rounded-xl" 
                          size="lg"
                        >
                          <Download className="mr-2 h-5 w-5" />
                          {downloading === menuFile.menu_type 
                            ? (language === "bg" ? "Изтеглянето..." : "Downloading...")
                            : (language === "bg" ? "Изтегли меню" : "Download Menu")}
                        </Button>
                      </div>
                    ) : (
                      <Button disabled variant="outline" className="w-full rounded-xl" size="lg">
                        {language === "bg" ? "Няма налична версия" : "Not available"}
                      </Button>
                    )}

                    {menuFile && (
                      <p className="text-xs text-muted-foreground text-center">
                        {language === "bg" ? "Обновлено: " : "Updated: "}
                        {new Date(menuFile.updated_at).toLocaleDateString("bg-BG")}
                      </p>
                    )}
                  </CardContent>
                </Card>
              )
            })}
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
