import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { getNewsPost, getNewsPosts } from "@/lib/sanity-queries"
import { Calendar, ArrowLeft } from "lucide-react"
import { PortableText } from "@portabletext/react"

export const revalidate = 60 // Revalidate every 60 seconds

// Generate static params for all blog posts
export async function generateStaticParams() {
  try {
    const posts = await getNewsPosts()
    return posts.map((post: any) => ({
      slug: post.slug.current,
    }))
  } catch (error) {
    return []
  }
}

export default async function NewsPostPage({ params }: { params: { slug: string } }) {
  let post = null

  try {
    post = await getNewsPost(params.slug)
  } catch (error) {
    console.error("Error fetching news post:", error)
  }

  // Fallback data for demo purposes
  const fallbackPosts: Record<string, any> = {
    "welcome-new-school-year": {
      _id: "1",
      title: "Welcome to Our New School Year!",
      slug: { current: "welcome-new-school-year" },
      excerpt:
        "We're excited to welcome all our returning families and new students to Little Sprouts for another amazing year of learning and growth.",
      image: "/news-school-year.jpg?height=600&width=1200&query=happy children first day of school",
      category: "News",
      publishedAt: "2024-09-01T08:00:00Z",
      content: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "We are thrilled to kick off another wonderful school year at Little Sprouts Kindergarten! Our teachers have been busy preparing engaging activities and creating warm, welcoming classrooms for all our students.",
            },
          ],
        },
      ],
    },
    "fall-festival-coming-soon": {
      _id: "2",
      title: "Fall Festival Coming Soon",
      slug: { current: "fall-festival-coming-soon" },
      excerpt:
        "Join us for our annual Fall Festival on October 15th! There will be games, activities, pumpkin decorating, and more family fun.",
      image: "/news-fall-festival.jpg?height=600&width=1200&query=fall festival with pumpkins and children",
      category: "Events",
      publishedAt: "2024-09-15T10:00:00Z",
      content: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Mark your calendars for our annual Fall Festival on Saturday, October 15th from 10 AM to 2 PM! This beloved community event brings together families for a day of autumn fun and celebration.",
            },
          ],
        },
      ],
    },
  }

  const displayPost = post || fallbackPosts[params.slug]

  if (!displayPost) {
    notFound()
  }

  // Portable Text components for rendering rich text
  const portableTextComponents = {
    block: {
      normal: ({ children }: any) => <p className="mb-4 leading-relaxed text-muted-foreground">{children}</p>,
      h2: ({ children }: any) => <h2 className="mb-4 mt-8 text-2xl font-bold text-foreground">{children}</h2>,
      h3: ({ children }: any) => <h3 className="mb-3 mt-6 text-xl font-bold text-foreground">{children}</h3>,
    },
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Article Header */}
      <article className="px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <Button asChild variant="ghost" className="mb-8 rounded-full">
            <Link href="/news">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to News
            </Link>
          </Button>

          <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1 font-semibold text-primary">
              {displayPost.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(displayPost.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <h1 className="mb-8 text-balance text-4xl font-bold leading-tight text-foreground lg:text-5xl">
            {displayPost.title}
          </h1>

          {displayPost.image && (
            <div className="mb-8 overflow-hidden rounded-3xl">
              <img
                src={displayPost.image || "/placeholder.svg"}
                alt={displayPost.title}
                className="h-auto w-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            {displayPost.content ? (
              <PortableText value={displayPost.content} components={portableTextComponents} />
            ) : (
              <p className="leading-relaxed text-muted-foreground">{displayPost.excerpt}</p>
            )}
          </div>

          {/* Placeholder content for demo */}
          {!post && (
            <div className="mt-8 space-y-4">
              <p className="leading-relaxed text-muted-foreground">
                This year promises to be filled with exciting learning opportunities, creative projects, and memorable
                experiences. We have introduced new curriculum elements, updated our learning centers, and added fresh
                materials to inspire curiosity and discovery.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                Our dedicated team of educators is committed to providing a nurturing environment where every child can
                thrive. We look forward to partnering with families to support each child's unique journey of growth and
                development.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                Thank you for choosing Little Sprouts Kindergarten. Here's to a fantastic year ahead!
              </p>
            </div>
          )}
        </div>
      </article>

      <Footer />
    </div>
  )
}
