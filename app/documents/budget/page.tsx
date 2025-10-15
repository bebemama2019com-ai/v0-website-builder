"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

interface Document {
  id: string
  title: string
  description?: string
  file_url: string
  file_type: string
  file_size: number
  quarter: string
}

export default function BudgetPage() {
  const { t } = useLanguage()
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/documents")
      .then((res) => res.json())
      .then((data) => {
        const budgetDocs = data.filter((doc: Document) => doc.quarter)
        setDocuments(budgetDocs)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching documents:", error)
        setLoading(false)
      })
  }, [])

  const budgetByQuarter = {
    Q1: documents.filter((doc) => doc.quarter === "Q1"),
    Q2: documents.filter((doc) => doc.quarter === "Q2"),
    Q3: documents.filter((doc) => doc.quarter === "Q3"),
    Q4: documents.filter((doc) => doc.quarter === "Q4"),
  }

  const quarterNames = {
    Q1: t.documents?.q1 || "Първо тримесечие",
    Q2: t.documents?.q2 || "Второ тримесечие",
    Q3: t.documents?.q3 || "Трето тримесечие",
    Q4: t.documents?.q4 || "Четвърто тримесечие",
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg text-muted-foreground">Зареждане...</p>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">{t.nav?.budget || "Бюджет"}</h1>
            <p className="text-lg text-muted-foreground mb-12">
              Тук можете да изтеглите бюджетните документи за всяко тримесечие
            </p>

            <div className="space-y-12">
              {(["Q1", "Q2", "Q3", "Q4"] as const).map((quarter) => (
                <div key={quarter}>
                  <h2 className="text-2xl font-semibold mb-6">{quarterNames[quarter]}</h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {budgetByQuarter[quarter].map((doc) => (
                      <Card key={doc.id} className="p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start gap-4">
                          <FileText className="w-10 h-10 text-primary flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg mb-2">{doc.title}</h3>
                            {doc.description && <p className="text-sm text-muted-foreground mb-3">{doc.description}</p>}
                            <p className="text-xs text-muted-foreground mb-4">
                              {doc.file_type.toUpperCase()} • {(doc.file_size / 1024).toFixed(0)} KB
                            </p>
                            <a href={doc.file_url} target="_blank" rel="noopener noreferrer" download>
                              <Button className="w-full">
                                <Download className="w-4 h-4 mr-2" />
                                Изтегли
                              </Button>
                            </a>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                  {budgetByQuarter[quarter].length === 0 && (
                    <Card className="p-8">
                      <p className="text-center text-muted-foreground">
                        Все още няма налични документи за това тримесечие
                      </p>
                    </Card>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
