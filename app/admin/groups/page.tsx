"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2, Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Group {
  id: string
  name: string
  description: string | null
  age: string | null
  order_index: number
  group_teachers: Array<{
    team_members: {
      name: string
      role: string
    }
  }>
}

export default function GroupsAdminPage() {
  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchGroups()
  }, [])

  async function fetchGroups() {
    try {
      const { data, error } = await supabase
        .from("groups")
        .select(`
          *,
          group_teachers (
            team_members:teacher_id (name, role)
          )
        `)
        .order("order_index", { ascending: true })

      // If the error is about missing relationship (Migration 009 not run yet),
      // fall back to fetching just groups without teachers
      if (error && error.message && error.message.includes("relationship")) {
        console.warn("group_teachers table not found, fetching groups without teachers")
        
        const { data: groupsOnly, error: groupsError } = await supabase
          .from("groups")
          .select("*")
          .order("order_index", { ascending: true })

        if (groupsError) throw groupsError
        
        // Add empty group_teachers array to maintain consistent structure
        const groupsWithEmpty = groupsOnly?.map(group => ({
          ...group,
          group_teachers: []
        })) || []
        
        setGroups(groupsWithEmpty)
      } else if (error) {
        throw error
      } else {
        setGroups(data || [])
      }
    } catch (error) {
      console.error("Error fetching groups:", error)
      alert("Грешка при зареждане на групи")
    } finally {
      setLoading(false)
    }
  }

  async function deleteGroup(id: string) {
    if (!confirm("Сигурни ли сте, че искате да изтриете тази група?")) return

    try {
      const { error } = await supabase.from("groups").delete().eq("id", id)
      if (error) throw error
      fetchGroups()
    } catch (error) {
      console.error("Грешка при изтриване:", error)
      alert("Грешка при изтриване на групата")
    }
  }

  if (loading) {
    return <div className="p-8">Зареждане...</div>
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Управление на групи</h1>
            <p className="text-muted-foreground mt-2">Управлявайте групите и техните седмични програми</p>
          </div>
        </div>
        <Button asChild>
          <Link href="/admin/groups/new">
            <Plus className="mr-2 h-4 w-4" />
            Добави група
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <Card key={group.id}>
            <CardHeader>
              <CardTitle>{group.name}</CardTitle>
              <CardDescription>{group.description || "Няма описание"}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {group.age && (
                  <div className="text-sm">
                    <span className="font-medium">Възраст: </span>
                    {group.age}
                  </div>
                )}
                {group.group_teachers && group.group_teachers.length > 0 && (
                  <div className="text-sm">
                    <span className="font-medium">Отговорни учители: </span>
                    <div className="mt-1 space-y-1">
                      {group.group_teachers.map((gt, index) => (
                        <div key={index} className="text-xs">
                          {gt.team_members?.name} ({gt.team_members?.role})
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
                    <Link href={`/admin/groups/${group.id}/schedule`}>
                      <Calendar className="mr-2 h-4 w-4" />
                      Програма
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/groups/${group.id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => deleteGroup(group.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {groups.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Все още няма добавени групи. Добавете първата група.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
