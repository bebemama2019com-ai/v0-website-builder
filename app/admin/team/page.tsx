import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Pencil, Trash2 } from "lucide-react"

export default async function AdminTeamPage() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data: isAdmin } = await supabase.from("admin_users").select("id").eq("user_id", user.id).single()

  if (!isAdmin) {
    redirect("/admin/login")
  }

  const { data: teamMembers } = await supabase
    .from("team_members")
    .select("*")
    .order("order_position", { ascending: true })

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground">
                ← Назад към таблото
              </Link>
              <h1 className="text-3xl font-bold mt-2">Управление на екипа</h1>
            </div>
            <Link href="/admin/team/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Добави член на екипа
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers?.map((member) => (
            <Card key={member.id} className="p-6">
              {member.image_url && (
                <img
                  src={member.image_url || "/placeholder.svg"}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                />
              )}
              <h3 className="font-semibold text-lg text-center">{member.name}</h3>
              <p className="text-sm text-muted-foreground text-center mb-2">{member.role}</p>
              <p className="text-sm text-center mb-4 line-clamp-2">{member.bio}</p>
              <div className="flex gap-2 justify-center">
                <Link href={`/admin/team/${member.id}/edit`}>
                  <Button variant="outline" size="sm">
                    <Pencil className="w-4 h-4 mr-1" />
                    Редактирай
                  </Button>
                </Link>
                <form action={`/api/admin/team/${member.id}/delete`} method="POST">
                  <Button variant="destructive" size="sm" type="submit">
                    <Trash2 className="w-4 h-4 mr-1" />
                    Изтрий
                  </Button>
                </form>
              </div>
            </Card>
          ))}
        </div>

        {!teamMembers ||
          (teamMembers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Все още няма членове на екипа</p>
              <Link href="/admin/team/new">
                <Button>Добавете първия член на екипа</Button>
              </Link>
            </div>
          ))}
      </div>
    </div>
  )
}
