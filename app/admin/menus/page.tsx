import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Pencil, Trash2, Eye } from "lucide-react"
import { format } from "date-fns"

export default async function AdminMenusPage() {
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

  const { data: menus } = await supabase
    .from("weekly_menus")
    .select("*")
    .order("week_start_date", { ascending: false })

  const getAgeGroupLabel = (ageGroup: string) => {
    return ageGroup === "yasla" ? "Ясла (1-3 години)" : "Детска градина (3-7 години)"
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground">
                ← Назад към таблото
              </Link>
              <h1 className="text-3xl font-bold mt-2">Управление на седмични меню</h1>
            </div>
            <Link href="/admin/menus/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Добави ново меню
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          {menus?.map((menu) => (
            <Card key={menu.id} className="p-6">
              <div className="flex gap-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-xl mb-2">{menu.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {format(new Date(menu.week_start_date), "d MMMM")} - {format(new Date(menu.week_end_date), "d MMMM yyyy")}
                      </p>
                      <div className="flex gap-2">
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          {getAgeGroupLabel(menu.age_group)}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/admin/menus/${menu.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Преглед
                        </Button>
                      </Link>
                      <Link href={`/admin/menus/${menu.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </Link>
                      <form action={`/api/admin/menus/${menu.id}/delete`} method="POST">
                        <Button variant="destructive" size="sm" type="submit">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {!menus ||
          (menus.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Все още няма менюта</p>
              <Link href="/admin/menus/new">
                <Button>Добавете първото меню</Button>
              </Link>
            </div>
          ))}
      </div>
    </div>
  )
}
