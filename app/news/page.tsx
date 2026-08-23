"use client"
import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { Calendar } from "lucide-react"

export default function NewsPage() {
  const [newsPosts, setNewsPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const projectId = 'p75xja6f'
        const dataset = 'production'
        const query = encodeURIComponent(`*[_type == "news"] | order(publishedAt desc){_id, title, "slug": slug.current, excerpt, publishedAt, category}`)
        const url = `https://${projectId}.apicdn.sanity.io/v2024-01-01/data/query/${dataset}?query=${query}`
        const res = await fetch(url)
        const data = await res.json()
        setNewsPosts(data.result || [])
      } catch (e) { console.error(e) } finally { setLoading(false) }
    }
    load()
  }, [])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12">
          <div className="container mx-auto px-4"><h1 className="text-4xl font-bold">Новини и събития</h1></div>
        </section>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-6">
              {loading ? <p className="text-center py-12">Зареждане...</p> : newsPosts.length === 0 ? <p className="text-center py-12">Все още няма новини - добави в Sanity</p> :
                newsPosts.map((post: any) => (
                  <article key={post._id} className="bg-card border rounded-lg p-6">
                    <div className="text-sm text-muted-foreground mb-3 flex gap-2">
                      <Calendar className="w-4 h-4" /> {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('bg-BG') : ''} {post.category && <span className="bg-primary/10 px-2 rounded-full">{post.category}</span>}
                    </div>
                    <h2 className="text-2xl font-bold mb-3"><Link href={`/news/${post.slug}`}>{post.title}</Link></h2>
                    {post.excerpt && <p className="text-muted-foreground mb-4">{post.excerpt}</p>}
                    <Link href={`/news/${post.slug}`} className="text-primary font-semibold">Прочети повече →</Link>
                  </article>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
