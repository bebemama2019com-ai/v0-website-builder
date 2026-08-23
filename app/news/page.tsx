import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { Calendar } from "lucide-react"

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getNews() {
  const projectId = 'p75xja6f'
  const dataset = 'production'
  const query = encodeURIComponent(`*[_type == "news"] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    category
  }`)
  const url = `https://${projectId}.apicdn.sanity.io/v2024-01-01/data/query/${dataset}?query=${query}`
  try {
    const res = await fetch(url, { cache: 'no-store' })
    const data = await res.json()
    return data.result || []
  } catch {
    return []
  }
}

export default async function NewsPage() {
  const newsPosts = await getNews()

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-2">Новини и събития</h1>
            <p className="text-lg opacity-90">Останете информирани за последните новини и събития</p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-6">
              {newsPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">Все още няма публикувани новини</p>
                </div>
              ) : (
                newsPosts.map((post: any) => (
                  <div key={post._id} className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <h2 className="text-2xl font-bold mb-3 text-foreground">{post.title}</h2>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar className="h-4 w-4" />
                        <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('bg-BG') : ''}</span>
                        {post.category && <span>• {post.category}</span>}
                      </div>
                      <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                      <Link href={`/news/${post.slug}`} className="text-primary font-semibold hover:underline">
                        Прочети повече →
                      </Link>
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
