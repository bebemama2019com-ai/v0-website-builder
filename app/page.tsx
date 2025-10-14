import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Sparkles, BookOpen, Palette, Music } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: Heart,
      title: "Nurturing Environment",
      description: "A warm, caring space where every child feels safe, valued, and loved.",
      color: "bg-chart-1",
    },
    {
      icon: Users,
      title: "Experienced Teachers",
      description: "Dedicated educators passionate about early childhood development.",
      color: "bg-chart-2",
    },
    {
      icon: Sparkles,
      title: "Play-Based Learning",
      description: "Learning through exploration, creativity, and hands-on activities.",
      color: "bg-chart-3",
    },
    {
      icon: BookOpen,
      title: "Rich Curriculum",
      description: "Age-appropriate programs that foster cognitive and social growth.",
      color: "bg-chart-4",
    },
    {
      icon: Palette,
      title: "Creative Arts",
      description: "Music, art, and movement activities that spark imagination.",
      color: "bg-chart-5",
    },
    {
      icon: Music,
      title: "Daily Activities",
      description: "Structured routines with outdoor play, story time, and more.",
      color: "bg-chart-1",
    },
  ]

  const ageGroups = [
    {
      title: "Toddlers",
      age: "18 months - 3 years",
      description: "Gentle introduction to social play and early learning concepts.",
    },
    {
      title: "Preschool",
      age: "3 - 4 years",
      description: "Building independence, language skills, and school readiness.",
    },
    {
      title: "Pre-K",
      age: "4 - 5 years",
      description: "Preparing for kindergarten with advanced literacy and math skills.",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary/30 via-background to-accent/20 px-4 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <h1 className="mb-6 text-balance text-4xl font-bold leading-tight text-foreground lg:text-6xl">
                Where Little Minds Grow Big Dreams
              </h1>
              <p className="mb-8 text-pretty text-lg leading-relaxed text-muted-foreground lg:text-xl">
                Welcome to Little Sprouts Kindergarten, a nurturing environment where children discover the joy of
                learning through play, creativity, and exploration.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="rounded-full text-base">
                  <Link href="/contact">Schedule a Visit</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full text-base bg-transparent">
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20">
                <img
                  src="/happy-children-playing-in-colorful-kindergarten-cl.jpg"
                  alt="Children playing in kindergarten"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-chart-4 opacity-60 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-chart-5 opacity-60 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground lg:text-4xl">
              Why Choose Little Sprouts?
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              We provide a holistic approach to early childhood education, focusing on the whole child.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="overflow-hidden rounded-3xl border-2 transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <div className={`mb-4 inline-flex rounded-2xl ${feature.color} p-3`}>
                    <feature.icon className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-foreground">{feature.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Age Groups Section */}
      <section className="bg-muted/50 px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground lg:text-4xl">Our Programs</h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Age-appropriate programs designed to meet the developmental needs of each child.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {ageGroups.map((group, index) => (
              <Card key={index} className="overflow-hidden rounded-3xl border-2 bg-card">
                <CardContent className="p-8 text-center">
                  <div className="mb-4 text-5xl font-bold text-primary">{index + 1}</div>
                  <h3 className="mb-2 text-2xl font-bold text-foreground">{group.title}</h3>
                  <p className="mb-4 text-sm font-semibold text-primary">{group.age}</p>
                  <p className="leading-relaxed text-muted-foreground">{group.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground lg:text-4xl">
              A Day at Little Sprouts
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Peek into our vibrant classrooms and outdoor spaces where learning comes alive.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="group relative aspect-square overflow-hidden rounded-3xl">
                <img
                  src={`/kindergarten-activity-.jpg?height=400&width=400&query=kindergarten activity ${i}`}
                  alt={`Gallery image ${i}`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild size="lg" variant="outline" className="rounded-full bg-transparent">
              <Link href="/gallery">View Full Gallery</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-balance text-3xl font-bold text-foreground lg:text-4xl">
            Ready to Join Our Family?
          </h2>
          <p className="mb-8 text-pretty text-lg leading-relaxed text-muted-foreground lg:text-xl">
            Schedule a tour to see our facilities, meet our teachers, and discover why families love Little Sprouts.
          </p>
          <Button asChild size="lg" className="rounded-full text-base">
            <Link href="/contact">Schedule Your Visit Today</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
