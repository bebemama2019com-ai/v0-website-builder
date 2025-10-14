import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Palette, Music, Globe, Calculator, Users, Leaf, Heart } from "lucide-react"

export default function CurriculumPage() {
  const subjects = [
    {
      icon: BookOpen,
      title: "Language & Literacy",
      description:
        "Building vocabulary, phonics, reading readiness, and communication skills through stories, songs, and conversations.",
      color: "bg-chart-1",
    },
    {
      icon: Calculator,
      title: "Math & Logic",
      description: "Exploring numbers, patterns, shapes, and problem-solving through hands-on activities and games.",
      color: "bg-chart-2",
    },
    {
      icon: Globe,
      title: "Science & Discovery",
      description: "Encouraging curiosity about the natural world through experiments, observations, and exploration.",
      color: "bg-chart-3",
    },
    {
      icon: Palette,
      title: "Creative Arts",
      description: "Fostering creativity and self-expression through painting, drawing, crafts, and imaginative play.",
      color: "bg-chart-4",
    },
    {
      icon: Music,
      title: "Music & Movement",
      description: "Developing rhythm, coordination, and musical appreciation through songs, dance, and instruments.",
      color: "bg-chart-5",
    },
    {
      icon: Users,
      title: "Social Skills",
      description: "Learning cooperation, sharing, empathy, and conflict resolution through group activities and play.",
      color: "bg-chart-1",
    },
    {
      icon: Heart,
      title: "Emotional Development",
      description: "Building self-awareness, confidence, and emotional regulation in a supportive environment.",
      color: "bg-chart-2",
    },
    {
      icon: Leaf,
      title: "Nature & Environment",
      description: "Connecting with nature through gardening, outdoor exploration, and environmental awareness.",
      color: "bg-chart-3",
    },
  ]

  const ageGroups = [
    {
      title: "Toddlers (18 months - 3 years)",
      focus: "Sensory Exploration & Basic Skills",
      activities: [
        "Sensory play with various textures and materials",
        "Simple songs, rhymes, and finger plays",
        "Basic motor skills development",
        "Social interaction and parallel play",
        "Toilet training support",
        "Introduction to colors, shapes, and numbers",
      ],
    },
    {
      title: "Preschool (3 - 4 years)",
      focus: "Independence & Social Learning",
      activities: [
        "Pre-reading and pre-writing activities",
        "Counting, sorting, and pattern recognition",
        "Dramatic play and role-playing",
        "Art projects and creative expression",
        "Group games and cooperative play",
        "Introduction to science concepts",
      ],
    },
    {
      title: "Pre-K (4 - 5 years)",
      focus: "School Readiness & Advanced Skills",
      activities: [
        "Letter recognition and phonics",
        "Early reading and writing skills",
        "Math concepts and problem-solving",
        "Science experiments and investigations",
        "Complex art projects and presentations",
        "Leadership and responsibility skills",
      ],
    },
  ]

  const dailyActivities = [
    {
      title: "Circle Time",
      description: "Group discussions, calendar activities, and sharing time to build community.",
    },
    {
      title: "Learning Centers",
      description: "Rotating stations for literacy, math, science, art, and dramatic play.",
    },
    {
      title: "Outdoor Play",
      description: "Physical activity, nature exploration, and gross motor skill development.",
    },
    {
      title: "Story Time",
      description: "Reading aloud to develop listening skills and love of books.",
    },
    {
      title: "Creative Arts",
      description: "Hands-on projects using various materials and techniques.",
    },
    {
      title: "Music & Movement",
      description: "Songs, dance, and rhythm activities to develop coordination.",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary/30 via-background to-accent/20 px-4 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-6 text-balance text-4xl font-bold leading-tight text-foreground lg:text-5xl">
            Our Curriculum
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground lg:text-xl">
            A comprehensive, play-based curriculum designed to nurture the whole child and prepare them for lifelong
            learning.
          </p>
        </div>
      </section>

      {/* Learning Areas */}
      <section className="px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground lg:text-4xl">Learning Areas</h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Our curriculum covers all essential areas of early childhood development.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {subjects.map((subject, index) => (
              <Card key={index} className="overflow-hidden rounded-3xl border-2 transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <div className={`mb-4 inline-flex rounded-2xl ${subject.color} p-3`}>
                    <subject.icon className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-foreground">{subject.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{subject.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Age-Specific Programs */}
      <section className="bg-muted/50 px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground lg:text-4xl">Age-Specific Programs</h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Tailored curriculum for each developmental stage.
            </p>
          </div>
          <div className="space-y-8">
            {ageGroups.map((group, index) => (
              <Card key={index} className="overflow-hidden rounded-3xl border-2 bg-card">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h3 className="mb-2 text-2xl font-bold text-foreground">{group.title}</h3>
                    <p className="text-lg font-semibold text-primary">{group.focus}</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {group.activities.map((activity, actIndex) => (
                      <div key={actIndex} className="flex items-start gap-2">
                        <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                        <p className="text-muted-foreground">{activity}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Activities */}
      <section className="px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground lg:text-4xl">Daily Activities</h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              A balanced mix of structured learning and free exploration.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dailyActivities.map((activity, index) => (
              <Card key={index} className="overflow-hidden rounded-3xl border-2">
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-foreground">{activity.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{activity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground lg:text-4xl">Our Approach</h2>
          </div>
          <Card className="overflow-hidden rounded-3xl border-2 bg-card">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-xl font-bold text-foreground">Play-Based Learning</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    We believe that play is the most effective way for young children to learn. Through play, children
                    develop cognitive, social, emotional, and physical skills naturally and joyfully.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-foreground">Individualized Attention</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Every child learns at their own pace. Our teachers observe and assess each child's development,
                    adapting activities to meet individual needs and interests.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-foreground">Hands-On Experiences</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Children learn best by doing. We provide rich, hands-on experiences with real materials that engage
                    all the senses and encourage exploration and discovery.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-foreground">Family Involvement</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    We partner with families to support each child's learning journey. Regular communication, parent
                    conferences, and family events keep you connected to your child's progress.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
