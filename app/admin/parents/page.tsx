import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Pencil, Trash2 } from "lucide-react"

export default async function AdminParentsPage() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data: isAdmin } = await supabase.from("admin_users").select("id").eq("id", user.id).single()

  if (!isAdmin) {
    redirect("/admin/login")
  }

  const { data: content } = await supabase.from("parent_content").select("*").order("order_index", { ascending: true })

  const dailySchedule = content?.filter((c) => c.category === "daily_schedule") || []
  const weeklyMenu = content?.filter((c) => c.category === "weekly_menu") || []
  const council = content?.filter((c) => c.category === "council") || []
  const forms = content?.filter((c) => c.category === "forms") || []

  const renderSection = (title: string, items: any[], category: string) => (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card key={item.id} className="p-6">
            {item.image_url && (
              <img
                src={item.image_url || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-32 object-cover rounded mb-4"
              />
            )}
            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.content}</p>
            <div className="flex gap-2">
              <Link href={`/admin/parents/${item.id}/edit`}>
                <Button variant="outline" size="sm">
                  <Pencil className="w-4 h-4 mr-1" />
                  Редактирай
                </Button>
              </Link>
              <form action={`/api/admin/parents/${item.id}/delete`} method="POST">
                <Button variant="destructive" size="sm" type="submit">
                  <Trash2 className="w-4 h-4 mr-1" />
                  Изтрий
                </Button>
              </form>
            </div>
          </Card>
        ))}
      </div>
      {items.length === 0 && <p className="text-center text-muted-foreground py-8">Все още няма съдържание</p>}
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground">
                ← Назад към таблото
              </Link>
              <h1 className="text-3xl font-bold mt-2">Управление на съдържание за родители</h1>
            </div>
            <Link href="/admin/parents/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Добави съдържание
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {renderSection("Дневен режим", dailySchedule, "daily_schedule")}
          {renderSection("Седмично меню", weeklyMenu, "weekly_menu")}
          {renderSection("Обществен съвет", council, "council")}
          {renderSection("Бланки и заявления", forms, "forms")}
        </div>
      </div>
    </div>
  )
}
