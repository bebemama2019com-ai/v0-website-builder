"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, Download, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { bg } from "date-fns/locale"

interface NewsFile {
  id: string
  file_name: string
  file_url: string
}

interface NewsPost {
  id: string
  title: string
  description: string
  content: string
  news_date: string
  news_hour: string
  from_text: string
  news_files: NewsFile[]
}

export default function NewsPage() {
  const { language } = useLanguage()
  const [newsPosts, setNewsPosts] = useState<NewsPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchNews()
  }, [])

  async function fetchNews() {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/news")
      if (!response.ok) throw new Error("Failed to fetch news")
      const data = await response.json()
      setNewsPosts(data)
    } catch (err) {
      console.error("Error fetching news:", err)
      setError(language === "bg" ? "Грешка при зареждане на новини" : "Error loading news")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/15 px-4 py-12 lg:py-16">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-balance text-3xl font-bold leading-tight text-foreground lg:text-4xl">
              {language === "bg" ? "Новини" : "News"}
            </h1>
            <p className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground lg:text-lg">
              {language === "bg"
                ? "Следете последните новини и събития"
                : "Follow the latest news and updates from Kindergarten 202"}
            </p>
          </div>
        </section>

        {/* News Section */}
        <section className="px-4 py-16 lg:py-24">
          <div className="mx-auto max-w-4xl">
            {loading ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">{language === "bg" ? "Зареждане..." : "Loading..."}</p>
              </div>
            ) : error ? (
              <Card className="overflow-hidden rounded-3xl border-2 border-destructive/50 bg-destructive/5">
                <CardContent className="p-8 text-center">
                  <p className="text-destructive">{error}</p>
                </CardContent>
              </Card>
            ) : newsPosts.length === 0 ? (
              <Card className="overflow-hidden rounded-3xl border-2">
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">
                    {language === "bg" ? "Няма нови новини в момента" : "No news available at the moment"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {newsPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden rounded-3xl border-2 hover:shadow-lg transition-shadow">
                    <CardContent className="p-8">
                      {/* Meta Information */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">
                              {format(new Date(post.news_date), "d MMMM yyyy", { locale: bg })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">{post.news_hour}</span>
                          </div>
                        </div>
                        {post.from_text && (
                          <p className="text-sm text-muted-foreground italic">{post.from_text}</p>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="mb-3 text-2xl font-bold text-foreground">{post.title}</h2>

                      {/* Description */}
                      <p className="mb-4 text-lg leading-relaxed text-muted-foreground">{post.description}</p>

                      {/* Content */}
                      <p className="mb-6 whitespace-pre-wrap text-base leading-relaxed text-muted-foreground">
                        {post.content}
                      </p>

                      {/* Files */}
                      {post.news_files && post.news_files.length > 0 && (
                        <div className="bg-muted/50 rounded-lg p-4">
                          <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            {language === "bg" ? "Прикачени файлове" : "Attachments"}
                          </h3>
                          <div className="space-y-2">
                            {post.news_files.map((file) => (
                              <a
                                key={file.id}
                                href={file.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                              >
                                <Download className="w-4 h-4" />
                                <span className="underline">{file.file_name}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
