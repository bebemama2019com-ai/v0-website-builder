"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/i18n/language-context"
import { Users, Loader2, BookOpen, Palette, Music, Dumbbell } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

interface Group {
  id: string
  name: string
  description: string | null
  age: string | null
  order_index: number
  group_teachers?: Array<{
    teacher_id: string
    team_members?: {
      id: string
      name: string
      role: string | null
      bio: string | null
    }
  }>
}

export default function GroupsPage() {
  const { language } = useLanguage()
  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchGroups()
  }, [])

  async function fetchGroups() {
    try {
      setLoading(true)
      setError(null)

      const supabase = await createClient()

      // First, try to fetch groups with teacher relationships
      let { data, error: fetchError } = await supabase
        .from("groups")
        .select(
          `
          *,
          group_teachers (
            teacher_id,
            team_members:teacher_id (
              id,
              name,
              role,
              bio
            )
          )
        `
        )
        .order("order_index", { ascending: true })

      // If the error is about missing relationship (Migration 009 not run yet),
      // fall back to fetching just groups without teachers
      if (fetchError && fetchError.message && fetchError.message.includes("relationship")) {
        console.warn("group_teachers table not found, fetching groups without teachers")

        const { data: groupsOnly, error: groupsError } = await supabase
          .from("groups")
          .select("*")
          .order("order_index", { ascending: true })

        if (groupsError) throw groupsError

        // Add empty group_teachers array to maintain consistent structure
        data = groupsOnly?.map((group) => ({
          ...group,
          group_teachers: [],
        })) || []
      } else if (fetchError) {
        throw fetchError
      }

      setGroups(data || [])
    } catch (err) {
      console.error("Error fetching groups:", err)
      setError(language === "bg" ? "Грешка при зареждане на групи" : "Error loading groups")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {language === "bg" ? "Групи" : "Groups"}
            </h1>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              {language === "bg"
                ? "Запознайте се с нашите групи и техните педагози"
                : "Meet our groups and their teachers"}
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center gap-4 py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">
                {language === "bg" ? "Зареждане на групи..." : "Loading groups..."}
              </p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <Card className="border-destructive/50 bg-destructive/5">
              <CardContent className="pt-6">
                <p className="text-destructive">{error}</p>
              </CardContent>
            </Card>
          )}

          {/* Groups Grid */}
          {!loading && !error && groups.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {groups.map((group) => (
                <Link key={group.id} href={`/groups/${group.id}`}>
                  <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg cursor-pointer h-full">
                    <CardHeader className="bg-primary/5">
                      <CardTitle className="text-2xl">{group.name}</CardTitle>
                      {group.age && <CardDescription>{group.age}</CardDescription>}
                    </CardHeader>

                    <CardContent className="flex flex-1 flex-col gap-4 pt-6">
                      {/* Description */}
                      {group.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{group.description}</p>
                      )}

                      {/* Teachers */}
                      <div className="flex-1">
                        <h3 className="mb-3 flex items-center gap-2 font-semibold">
                          <Users className="h-4 w-4" />
                          {language === "bg" ? "Педагози" : "Teachers"}
                        </h3>

                        {group.group_teachers && group.group_teachers.length > 0 ? (
                          <ul className="space-y-2">
                            {group.group_teachers.slice(0, 2).map((gt) => (
                              <li key={gt.teacher_id} className="text-sm text-foreground">
                                {gt.team_members?.name || "Unknown"}
                                {gt.team_members?.role && (
                                  <div className="text-xs text-muted-foreground">{gt.team_members.role}</div>
                                )}
                              </li>
                            ))}
                            {group.group_teachers.length > 2 && (
                              <li className="text-xs text-muted-foreground italic">
                                +{group.group_teachers.length - 2} {language === "bg" ? "друго" : "more"}
                              </li>
                            )}
                          </ul>
                        ) : (
                          <p className="text-xs text-muted-foreground">
                            {language === "bg" ? "Няма назначени педагози" : "No teachers assigned"}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && groups.length === 0 && (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center gap-4 py-12">
                <Users className="h-12 w-12 text-muted-foreground/50" />
                <p className="text-center text-muted-foreground">
                  {language === "bg" ? "Няма налични групи" : "No groups available"}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Organized Activities Section */}
          <div className="mt-16">
            <h2 className="mb-8 text-3xl font-bold text-foreground">
              {language === "bg" ? "Организирани занимания" : "Organized Activities"}
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Activity 1 */}
              <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center gap-4 pt-8 pb-8">
                  <BookOpen className="h-12 w-12 text-primary" />
                  <p className="text-center font-semibold text-foreground">
                    {language === "bg" ? "Чужденезиково обучение – английски език" : "Foreign Language Learning - English"}
                  </p>
                </CardContent>
              </Card>

              {/* Activity 2 */}
              <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center gap-4 pt-8 pb-8">
                  <Palette className="h-12 w-12 text-primary" />
                  <p className="text-center font-semibold text-foreground">
                    {language === "bg" ? "Приложни изкуства" : "Applied Arts"}
                  </p>
                </CardContent>
              </Card>

              {/* Activity 3 */}
              <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center gap-4 pt-8 pb-8">
                  <Dumbbell className="h-12 w-12 text-primary" />
                  <p className="text-center font-semibold text-foreground">
                    {language === "bg" ? "Поддържни игри със топка" : "Ball Games Support"}
                  </p>
                </CardContent>
              </Card>

              {/* Activity 4 */}
              <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center gap-4 pt-8 pb-8">
                  <Dumbbell className="h-12 w-12 text-primary" />
                  <p className="text-center font-semibold text-foreground">
                    {language === "bg" ? "Художествена гимнастика" : "Rhythmic Gymnastics"}
                  </p>
                </CardContent>
              </Card>

              {/* Activity 5 */}
              <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center gap-4 pt-8 pb-8">
                  <Music className="h-12 w-12 text-primary" />
                  <p className="text-center font-semibold text-foreground">
                    {language === "bg" ? "Спортни и народни танци" : "Sports and Folk Dancing"}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
