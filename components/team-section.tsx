import { Card, CardContent } from "@/components/ui/card"

interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image_url: string | null
}

export default async function TeamSection() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/team`, {
      cache: 'no-store',
    })
    
    if (!response.ok) {
      console.log("[v0] Failed to fetch team members:", response.statusText)
      return null
    }
    
    const teamMembers: TeamMember[] = await response.json()
    
    if (!teamMembers || teamMembers.length === 0) {
      return null
    }

    return (
      <section className="px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground lg:text-4xl">Нашият екип</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">Квалифицирани педагози и персонал, посветени на развитието на вашите деца</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden rounded-2xl border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  {member.image_url && (
                    <img
                      src={member.image_url}
                      alt={member.name}
                      className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                    />
                  )}
                  <h3 className="font-semibold text-lg text-center mb-1">{member.name}</h3>
                  <p className="text-sm text-primary font-medium text-center mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground text-center leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  } catch (error) {
    console.log("[v0] Error fetching team members:", error)
    return null
  }
}
