"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useLanguage } from "@/lib/i18n/language-context"
import { createClient } from "@/utils/supabase/client"

interface GroupTeacher {
  teacher_id: string
  team_members: {
    id: string
    name: string
    role: string
    bio: string | null
  }
}

interface Group {
  id: string
  name: string
  description: string | null
  age: string | null
  order_index: number
  group_teachers?: GroupTeacher[]
}

export default function GroupPage() {
  const params = useParams()
  const { language } = useLanguage()
  const [group, setGroup] = useState<Group | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const id = Array.isArray(params.id) ? params.id[0] : params.id

  useEffect(() => {
    async function fetchGroup() {
      if (!id) {
        setError("Group ID not found")
        setLoading(false)
        return
      }

      try {
        const { data, error: fetchError } = await supabase
          .from("groups")
          .select(`
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
          `)
          .eq("id", id)
          .single()

        if (fetchError) {
          // If relationship query fails, try without relationships
          if (fetchError.message && fetchError.message.includes("relationship")) {
            const { data: groupOnly, error: groupError } = await supabase
              .from("groups")
              .select("*")
              .eq("id", id)
              .single()

            if (groupError) {
              setError("Failed to load group")
            } else {
              setGroup({ ...groupOnly, group_teachers: [] })
            }
          } else {
            setError("Failed to load group")
          }
        } else {
          setGroup(data)
        }
      } catch (err) {
        console.error("[v0] Error fetching group:", err)
        setError("Failed to load group")
      } finally {
        setLoading(false)
      }
    }

    fetchGroup()
  }, [id, supabase])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="min-h-screen bg-background">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <Skeleton className="h-12 w-64 mb-4" />
            <Skeleton className="h-6 w-full mb-8" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !group) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {language === "bg" ? "Група не намерена" : "Group not found"}
            </h1>
            <p className="text-muted-foreground">
              {language === "bg" ? "Избраната група не съществува" : "The selected group does not exist"}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const teachers = group.group_teachers || []

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
              {group.name}
            </h1>
            {group.age && (
              <p className="text-lg text-muted-foreground mb-2">
                {language === "bg" ? `Възраст: ${group.age}` : `Age: ${group.age}`}
              </p>
            )}
            {group.description && (
              <p className="text-lg text-foreground mt-4">{group.description}</p>
            )}
          </div>

          {teachers.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {language === "bg" ? "Педагози" : "Teachers"}
                </CardTitle>
                <CardDescription>
                  {language === "bg" 
                    ? `Группата се ръководи от ${teachers.length} педагог${teachers.length > 1 ? "и" : ""}` 
                    : `Guided by ${teachers.length} teacher${teachers.length > 1 ? "s" : ""}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {teachers.map((teacher) => (
                    <Card key={teacher.teacher_id} className="bg-card">
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <h3 className="font-semibold text-lg text-foreground mb-1">
                            {teacher.team_members?.name}
                          </h3>
                          {teacher.team_members?.role && (
                            <p className="text-sm text-muted-foreground mb-2">
                              {teacher.team_members.role}
                            </p>
                          )}
                          {teacher.team_members?.bio && (
                            <p className="text-sm text-foreground mt-3">
                              {teacher.team_members.bio}
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
