"use client"

import { FileText, Download } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n/language-context"
import type { ParentItem } from "@/lib/parent-content"
import { Card, CardContent } from "@/components/ui/card"

// Forms are edited in /admin/parents (stored in Bulgarian only).
export default function FormsContent({ forms }: { forms: ParentItem[] }) {
  const { language } = useLanguage()


  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Hero Section */}
        <section className="px-4 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <div className="mb-6 inline-flex rounded-2xl bg-primary/10 p-4">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h1 className="mb-4 text-balance text-4xl font-bold text-foreground lg:text-5xl">
                {language === "bg" ? "Бланки и заявления" : "Forms and Applications"}
              </h1>
              <p className="text-lg text-muted-foreground">
                {language === "bg"
                  ? "Необходимите документи и бланки за родителите"
                  : "Required documents and forms for parents"}
              </p>
            </div>
          </div>
        </section>

        {/* Forms Section */}
        <section className="px-4 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 md:grid-cols-2">
              {forms.map((form) => (
                <Card key={form.id} className="overflow-hidden rounded-3xl border-2 hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="mb-4 inline-flex rounded-2xl bg-primary/10 p-3">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-2xl font-bold text-foreground">
                      {form.title}
                    </h3>
                    <p className="mb-6 leading-relaxed text-muted-foreground">
                      {form.content}
                    </p>
                    {form.file_url ? (
                      <div className="flex gap-3">
                        <a
                          href={form.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-3 font-semibold transition-all hover:scale-105 active:scale-95"
                        >
                          <FileText className="h-5 w-5" />
                          {language === "bg" ? "Преглед" : "Preview"}
                        </a>
                        <a
                          href={form.file_url}
                          download
                          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-secondary text-secondary-foreground px-4 py-3 font-semibold transition-all hover:scale-105 active:scale-95"
                        >
                          <Download className="h-5 w-5" />
                          {language === "bg" ? "Изтегляне" : "Download"}
                        </a>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {language === "bg" ? "Файлът не е наличен" : "File not available"}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="bg-primary/5 px-4 py-16 lg:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-3xl bg-white p-8 border-2 border-primary/20">
              <h2 className="mb-4 text-2xl font-bold text-foreground">
                {language === "bg" ? "Важна информация" : "Important Information"}
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                {language === "bg" ? (
                  <>
                    <p>
                      Всички документи трябва да бъдат попълнени и подписани от законния представител на детето преди записване в детската градина.
                    </p>
                    <p>
                      Декларацията за защита на личните данни е задължителна съгласно GDPR (Регламент (ЕС) 2016/679).
                    </p>
                    <p>
                      При необходимост от допълнителни документи или въпроси, моля свържете се с администрацията на ДГ № 202.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      All documents must be completed and signed by the child's legal representative before enrollment in kindergarten.
                    </p>
                    <p>
                      The personal data protection declaration is mandatory under GDPR (Regulation (EU) 2016/679).
                    </p>
                    <p>
                      For any additional documents or questions, please contact the administration of Kindergarten 202.
                    </p>
                  </>
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
