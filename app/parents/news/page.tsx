"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/i18n/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock } from "lucide-react"

interface NewsItem {
  id: string
  date: Date
  title: string
  content: string
  author?: string
}

export default function NewsPage() {
  const { language } = useLanguage()

  const newsItems: NewsItem[] = [
    {
      id: "library-2025",
      date: new Date(2025, 4, 12, 10, 30), // May 12, 2025, 10:30 AM
      title: "БИБЛИОТЕКА В ДЕТСКА ГРАДИНА № 202",
      content: `УВАЖАЕМИ ДЕЦА, РОДИТЕЛИ, СЛУЖИТЕЛИ,

Детска градина 202 създаде своя детска библиотека, която ще обогатим с нови, съобразени с възрастта и интересите на децата, книги.

Детската библиотека ще допринася за насърчаване на интереса към четенето, развитие на речта, въображението и ранната грамотност на децата. Създадената библиотека предоставя възможност на децата да се докоснат до света на книгите и да изградят положително отношение към четенето още в ранна възраст.

Благодарим на всички за предоставените детски книжки които станаха част от нашата библиотека.

Благодарим за подадената ръка! 
Заедно можем повече!`,
      author: "Администрация на ДГ 202",
    },
  ]

  // Sort news by date (newest first)
  const sortedNews = [...newsItems].sort((a, b) => b.date.getTime() - a.date.getTime())

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("bg-BG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("bg-BG", {
      hour: "2-digit",
      minute: "2-digit",
    })
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
                ? "Следете последните новини и события от Детска Градина 202"
                : "Follow the latest news and updates from Kindergarten 202"}
            </p>
          </div>
        </section>

        {/* News Section */}
        <section className="px-4 py-16 lg:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="space-y-6">
              {sortedNews.length > 0 ? (
                sortedNews.map((newsItem) => (
                  <Card key={newsItem.id} className="overflow-hidden rounded-3xl border-2 hover:shadow-lg transition-shadow">
                    <CardContent className="p-8">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">{formatDate(newsItem.date)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">{formatTime(newsItem.date)}</span>
                          </div>
                        </div>
                        {newsItem.author && (
                          <p className="text-sm text-muted-foreground italic">{newsItem.author}</p>
                        )}
                      </div>

                      <h2 className="mb-4 text-2xl font-bold text-foreground">{newsItem.title}</h2>

                      <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
                        {newsItem.content}
                      </p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="overflow-hidden rounded-3xl border-2">
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">
                      {language === "bg" ? "Няма нови новини в момента" : "No news available at the moment"}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
