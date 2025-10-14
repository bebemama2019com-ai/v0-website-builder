import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getNewsPosts } from "@/lib/sanity-queries"
import { Calendar, ArrowRight } from "lucide-react"

export const revalidate = 60 // Revalidate every 60 seconds

export default async function NewsPage() {
  // Fetch news posts from Sanity CMS
  let newsPosts = []
  try {
    newsPosts = await getNewsPosts()
  } catch (error) {
    console.error("Error fetching news posts:", error)
  }

  // Fallback data if CMS is not set up yet
  const fallbackPosts = [
    {
      _id: "1",
      title: "Welcome to Our New School Year!",
      slug: { current: "welcome-new-school-year" },
      excerpt:
        "We're excited to welcome all our returning families and new students to Little Sprouts for another amazing year of learning and growth.",
      image: "/news-school-year.jpg?height=600&width=800&query=happy children first day of school",
      category: "News",
      publishedAt: "2024-09-01T08:00:00Z",
    },
    {
      _id: "2",
      title: "Fall Festival Coming Soon",
      slug: { current: "fall-festival-coming-soon" },
      excerpt:
        "Join us for our annual Fall Festival on October 15th! There will be games, activities, pumpkin decorating, and more family fun.",
      image: "/news-fall-festival.jpg?height=600&width=800&query=fall festival with pumpkins and children",
      category: "Events",
      publishedAt: "2024-09-15T10:00:00Z",
    },
    {
      _id: "3",
      title: "New Art Studio Opening",
      slug: { current: "new-art-studio-opening" },
      excerpt:
        "We're thrilled to announce the opening of our brand new art studio, complete with easels, supplies, and plenty of space for creativity.",
      image: "/news-art-studio.jpg?height=600&width=800&query=children's art studio with supplies",
      category: "News",
      publishedAt: "2024-08-20T09:00:00Z",
    },
    {
      _id: "4",
      title: "Parent-Teacher Conferences",
      slug: { current: "parent-teacher-conferences" },
      excerpt:
        "Fall parent-teacher conferences will be held the week of October 20th. Sign up for your time slot in the parent portal.",
      image: "/news-conferences.jpg?height=600&width=800&query=teacher meeting with parents",
      category: "Events",
      publishedAt: "2024-10-01T08:00:00Z",
    },
    {
      _id: "5",
      title: "Garden Project Success",
      slug: { current: "garden-project-success" },
      excerpt:
        "Our students have been busy tending to our school garden! We've harvested tomatoes, cucumbers, and herbs that we used in our cooking activities.",
      image: "/news-garden.jpg?height=600&width=800&query=children harvesting vegetables in garden",
      category: "Activities",
      publishedAt: "2024-09-25T11:00:00Z",
    },
    {
      _id: "6",
      title: "Music Program Expansion",
      slug: { current: "music-program-expansion" },
      excerpt:
        "We're expanding our music program with new instruments and weekly music classes for all age groups. Students will explore rhythm, melody, and movement.",
      image: "/news-music.jpg?height=600&width=800&query=children playing musical instruments",
      category: "News",
      publishedAt: "2024-08-10T10:00:00Z",
    },
  ]

  const displayPosts = newsPosts.length > 0 ? newsPosts : fallbackPosts

  // Sort posts by date (newest first)
  const sortedPosts = [...displayPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )

  // Get featured post (most recent)
  const featuredPost = sortedPosts[0]
  const otherPosts = sortedPosts.slice(1)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary/30 via-background to-accent/20 px-4 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-6 text-balance text-4xl font-bold leading-tight text-foreground lg:text-5xl">
            News & Events
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground lg:text-xl">
            Stay updated with the latest happenings, events, and activities at Little Sprouts Kindergarten.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="px-4 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6">
              <span className="inline-block rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground">
                Featured
              </span>
            </div>
            <Card className="overflow-hidden rounded-3xl border-2">
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="aspect-[4/3] overflow-hidden lg:aspect-auto">
                  <img
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="flex flex-col justify-center p-8 lg:p-12">
                  <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
                      {featuredPost.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(featuredPost.publishedAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h2 className="mb-4 text-balance text-3xl font-bold text-foreground lg:text-4xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mb-6 text-pretty leading-relaxed text-muted-foreground lg:text-lg">
                    {featuredPost.excerpt}
                  </p>
                  <div>
                    <Button asChild className="rounded-full">
                      <Link href={`/news/${featuredPost.slug.current}`}>
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Other Posts Grid */}
      <section className="bg-muted/50 px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {otherPosts.map((post) => (
              <Card key={post._id} className="overflow-hidden rounded-3xl border-2 transition-shadow hover:shadow-lg">
                <Link href={`/news/${post.slug.current}`}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="mb-2 text-balance text-xl font-bold text-foreground">{post.title}</h3>
                    <p className="mb-4 line-clamp-3 text-pretty leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      Read More
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
