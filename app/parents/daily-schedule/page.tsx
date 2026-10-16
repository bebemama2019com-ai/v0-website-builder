import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Clock, Download, FileText, Sun, Moon, Coffee, Utensils, Baby, BookOpen, type LucideIcon } from "lucide-react"
import { RichText } from "@/components/rich-text"
import { getDocumentPageHeader } from "@/lib/document-page-content"
import { getParentItems, getPublishedDocumentUrl, settingValue } from "@/lib/parent-content-server"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Дневен режим - ДГ 202",
  description: "Програма за организация на деня в Детска градина 202",
}

const ICONS: Record<string, LucideIcon> = {
  sun: Sun,
  coffee: Coffee,
  book: BookOpen,
  utensils: Utensils,
  moon: Moon,
  baby: Baby,
}
const iconFor = (name: string | null) => ICONS[name ?? ""] ?? Sun

// The schedules, the school-year badge, the PDF and the order box are all edited in /admin/parents.
export default async function DailySchedulePage() {
  const [items, header, pdfUrl] = await Promise.all([
    getParentItems(["schedule_group", "schedule_nursery", "setting"] as const),
    getDocumentPageHeader("daily-schedule"),
    getPublishedDocumentUrl("daily-schedule"),
  ])
  const groupSchedule = items.schedule_group
  const nurserySchedule = items.schedule_nursery
  const badge = settingValue(items.setting, "daily_schedule_badge")

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-secondary/20 via-background to-accent/10">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-primary/10 rounded-full px-6 py-2 mb-6">
                <span className="text-primary font-semibold">{badge}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                Дневен <span className="text-primary">режим</span>
              </h1>
              <p className="text-xl text-muted-foreground text-balance mb-8">
                Програма за организация на деня в ДГ 202
              </p>
              {pdfUrl && (
                <a href={pdfUrl} download target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="gap-2 text-lg px-8 py-6 rounded-xl">
                    <Download className="w-5 h-5" />
                    Свали PDF документа
                  </Button>
                </a>
              )}
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
                    <p className="font-semibold text-lg mb-1"><RichText text={header.orderInfo} /></p>
                    <p className="text-muted-foreground"><RichText text={header.orderDetails} /></p>
                    <p className="text-sm text-muted-foreground mt-2 italic"><RichText text={header.approvedBy} /></p>
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
                  const Icon = iconFor(item.icon)
                  return (
                    <div
                      key={item.id}
                      className="bg-card rounded-lg p-5 border border-border shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
                    >
                      <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-primary text-lg">{item.title} ч.</p>
                        <p className="text-muted-foreground mt-1">{item.content}</p>
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
                  const Icon = iconFor(item.icon)
                  return (
                    <div
                      key={item.id}
                      className="bg-card rounded-lg p-5 border border-border shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
                    >
                      <div className="bg-secondary/20 rounded-full p-3 flex-shrink-0">
                        <Icon className="w-5 h-5 text-secondary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-secondary text-lg">{item.title} ч.</p>
                        <p className="text-muted-foreground mt-1">{item.content}</p>
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
                {pdfUrl ? (
                  <a href={pdfUrl} download target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="gap-2 rounded-xl">
                      <Download className="w-5 h-5" />
                      Свали PDF
                    </Button>
                  </a>
                ) : (
                  <p className="text-muted-foreground">Документът не е наличен</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
