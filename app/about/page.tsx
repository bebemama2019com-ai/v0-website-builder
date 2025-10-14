import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Eye, Award, Clock } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To provide a nurturing, stimulating environment where children develop a lifelong love of learning through play-based education and meaningful experiences.",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "To be a leading early childhood education center recognized for excellence in fostering creativity, curiosity, and confidence in every child.",
    },
    {
      icon: Award,
      title: "Our Values",
      description:
        "Respect, kindness, creativity, and growth. We believe every child is unique and deserves individualized attention and care.",
    },
  ]

  const philosophy = [
    {
      title: "Child-Centered Learning",
      description:
        "We follow each child's interests and developmental pace, creating personalized learning experiences that build confidence and competence.",
    },
    {
      title: "Play-Based Approach",
      description:
        "Play is the foundation of learning. Through structured and free play, children develop social, emotional, cognitive, and physical skills.",
    },
    {
      title: "Family Partnership",
      description:
        "We believe parents are a child's first teachers. We work closely with families to support each child's growth and development.",
    },
    {
      title: "Safe & Nurturing",
      description:
        "Safety and emotional well-being are our top priorities. We create a warm, welcoming environment where children feel secure and valued.",
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
              <h1 className="mb-6 text-balance text-4xl font-bold leading-tight text-foreground lg:text-5xl">
                About Little Sprouts
              </h1>
              <p className="mb-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                Founded in 2010, Little Sprouts Kindergarten has been a cornerstone of early childhood education in our
                community. We are dedicated to providing a warm, nurturing environment where children can grow, learn,
                and thrive.
              </p>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                Our experienced team of educators is passionate about fostering a love of learning in every child. We
                believe that the early years are crucial for development, and we are committed to making them magical.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20">
                <img
                  src="/kindergarten-building-exterior-with-playground.jpg"
                  alt="Little Sprouts Kindergarten"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground lg:text-4xl">
              Our Mission, Vision & Values
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value, index) => (
              <Card key={index} className="overflow-hidden rounded-3xl border-2">
                <CardContent className="p-8 text-center">
                  <div className="mb-4 inline-flex rounded-2xl bg-primary/10 p-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-foreground">{value.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Philosophy */}
      <section className="bg-muted/50 px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground lg:text-4xl">
              Our Educational Philosophy
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              We believe in nurturing the whole child through a holistic, play-based approach to learning.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {philosophy.map((item, index) => (
              <Card key={index} className="overflow-hidden rounded-3xl border-2 bg-card">
                <CardContent className="p-8">
                  <h3 className="mb-3 text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Schedule */}
      <section className="px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground lg:text-4xl">A Typical Day</h2>
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
              Our structured yet flexible daily routine provides consistency while allowing for spontaneous learning
              moments.
            </p>
          </div>
          <Card className="overflow-hidden rounded-3xl border-2">
            <CardContent className="p-8">
              <div className="space-y-6">
                {[
                  { time: "7:00 - 8:30 AM", activity: "Arrival & Free Play" },
                  { time: "8:30 - 9:00 AM", activity: "Morning Circle & Calendar Time" },
                  { time: "9:00 - 10:00 AM", activity: "Learning Centers & Activities" },
                  { time: "10:00 - 10:30 AM", activity: "Snack Time & Story Time" },
                  { time: "10:30 - 11:30 AM", activity: "Outdoor Play & Exploration" },
                  { time: "11:30 - 12:30 PM", activity: "Lunch & Quiet Time" },
                  { time: "12:30 - 2:00 PM", activity: "Rest Time / Quiet Activities" },
                  { time: "2:00 - 3:00 PM", activity: "Creative Arts & Music" },
                  { time: "3:00 - 3:30 PM", activity: "Afternoon Snack" },
                  { time: "3:30 - 6:00 PM", activity: "Free Play & Departure" },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{item.time}</p>
                      <p className="text-muted-foreground">{item.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Facilities */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground lg:text-4xl">Our Facilities</h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Bright, spacious classrooms and safe outdoor areas designed for exploration and learning.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Bright Classrooms", query: "bright colorful kindergarten classroom" },
              { title: "Outdoor Playground", query: "safe outdoor playground for children" },
              { title: "Art Studio", query: "children's art studio with supplies" },
              { title: "Reading Corner", query: "cozy reading corner with books" },
              { title: "Music Room", query: "music room with instruments for kids" },
              { title: "Garden Area", query: "children's garden with plants" },
            ].map((facility, index) => (
              <div key={index} className="group relative aspect-[4/3] overflow-hidden rounded-3xl">
                <img
                  src={`/.jpg?height=400&width=500&query=${facility.query}`}
                  alt={facility.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-bold text-white">{facility.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
