"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Mail } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export default function TeamPage() {
  const { t } = useLanguage()
  const [teamMembers, setTeamMembers] = useState([])

  useEffect(() => {
    // Fetch team members from API
    fetch("/api/team")
      .then((res) => res.json())
      .then((data) => setTeamMembers(data))
      .catch(() => {
        // Use fallback data
        setTeamMembers(fallbackTeam)
      })
  }, [])

  const fallbackTeam = [
    {
      _id: "1",
      name: "Sarah Johnson",
      role: "Director & Lead Teacher",
      bio: "With over 15 years of experience in early childhood education, Sarah is passionate about creating a nurturing environment where every child can thrive. She holds a Master's degree in Early Childhood Education.",
      image: "/teacher-portrait-1.jpg?height=400&width=400&query=friendly female kindergarten teacher",
      order: 1,
    },
    {
      _id: "2",
      name: "Michael Chen",
      role: "Preschool Teacher",
      bio: "Michael brings creativity and energy to the classroom. With a background in child psychology, he specializes in play-based learning and social-emotional development.",
      image: "/teacher-portrait-2.jpg?height=400&width=400&query=friendly male kindergarten teacher",
      order: 2,
    },
    {
      _id: "3",
      name: "Emily Rodriguez",
      role: "Toddler Teacher",
      bio: "Emily has a gentle, patient approach that helps our youngest learners feel safe and loved. She has 8 years of experience working with toddlers and infants.",
      image: "/teacher-portrait-3.jpg?height=400&width=400&query=friendly female toddler teacher",
      order: 3,
    },
    {
      _id: "4",
      name: "David Thompson",
      role: "Pre-K Teacher",
      bio: "David excels at preparing children for kindergarten through engaging, hands-on activities. His enthusiasm for learning is contagious and inspires young minds.",
      image: "/teacher-portrait-4.jpg?height=400&width=400&query=friendly male pre-k teacher",
      order: 4,
    },
    {
      _id: "5",
      name: "Lisa Park",
      role: "Art & Music Specialist",
      bio: "Lisa brings the joy of creative expression to our students. With a degree in Fine Arts and Music Education, she helps children discover their artistic talents.",
      image: "/teacher-portrait-5.jpg?height=400&width=400&query=friendly female art teacher",
      order: 5,
    },
    {
      _id: "6",
      name: "James Wilson",
      role: "Assistant Teacher",
      bio: "James supports our teaching team with dedication and care. He is currently pursuing his degree in Early Childhood Education and loves working with children.",
      image: "/teacher-portrait-6.jpg?height=400&width=400&query=friendly male assistant teacher",
      order: 6,
    },
  ]

  const displayTeam = teamMembers.length > 0 ? teamMembers : fallbackTeam

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary/30 via-background to-accent/20 px-4 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-6 text-balance text-4xl font-bold leading-tight text-foreground lg:text-5xl">
            {t.team.hero.title}
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground lg:text-xl">
            {t.team.hero.description}
          </p>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayTeam.map((member) => (
              <Card key={member._id} className="overflow-hidden rounded-3xl border-2 transition-shadow hover:shadow-lg">
                <div className="aspect-square overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-1 text-xl font-bold text-foreground">{member.name}</h3>
                  <p className="mb-3 text-sm font-semibold text-primary">{member.role}</p>
                  <p className="leading-relaxed text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-balance text-3xl font-bold text-foreground lg:text-4xl">{t.team.join.title}</h2>
          <p className="mb-8 text-pretty text-lg leading-relaxed text-muted-foreground">{t.team.join.description}</p>
          <a
            href={`mailto:${t.team.join.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-base font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            <Mail className="h-5 w-5" />
            {t.team.join.email}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
