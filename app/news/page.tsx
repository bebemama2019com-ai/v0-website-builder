"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Download, Calendar, Clock, User } from "lucide-react"
import { useState, useEffect } from "react"
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
  image_url: string | null
}

export default function NewsPage() {
  const [newsPosts, setNewsPosts] = useState<NewsPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNews()
  }, [])

  async function fetchNews() {
    try {
      const response = await fetch("/api/news")
      const data = await response.json()
      setNewsPosts(data)
    } catch (error) {
      console.error("Error fetching news:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-2">Новини и събития</h1>
            <p className="text-lg opacity-90">Останете информирани за последните новини и събития</p>
          </div>
        </section>

        {/* News List */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-6">
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Зареждане...</p>
                </div>
              ) : newsPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">Все още няма публикувани новини</p>
                </div>
              ) : (
                newsPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      {/* Header */}
                      <h2 className="text-2xl font-bold mb-3 text-foreground">{post.title}</h2>

                      {/* Meta Information */}
                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{format(new Date(post.news_date), "d MMMM yyyy", { locale: bg })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{post.news_hour}</span>
                        </div>
                        {post.from_text && (
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{post.from_text}</span>
                          </div>
                        )}
                      </div>

                      {/* Image */}
                      {post.image_url && (
                        <a href={post.image_url} target="_blank" rel="noopener noreferrer" className="mb-4 block">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={post.image_url}
                            alt={post.title}
                            loading="lazy"
                            className="max-h-[28rem] w-full rounded-lg border bg-muted object-contain"
                          />
                        </a>
                      )}

                      {/* Description */}
                      <p className="text-foreground mb-4 leading-relaxed">{post.description}</p>

                      {/* Full Content */}
                      <div className="prose prose-sm max-w-none mb-6 whitespace-pre-wrap text-muted-foreground">
                        {post.content}
                      </div>

                      {/* Files */}
                      {post.news_files && post.news_files.length > 0 && (
                        <div className="bg-muted/50 rounded-lg p-4">
                          <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Прикачени файлове
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
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
