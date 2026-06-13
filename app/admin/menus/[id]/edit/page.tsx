import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import MenuForm from "@/components/admin/menu-form"

export default async function EditMenuPage({ params }: { params: { id: string } }) {
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

  const { data: menu } = await supabase.from("weekly_menus").select("*").eq("id", params.id).single()

  if (!menu) {
    redirect("/admin/menus")
  }

  const { data: menuItems } = await supabase
    .from("menu_items")
    .select("*")
    .eq("menu_id", params.id)
    .order("day_of_week")
    .order("meal_type")

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/admin/menus" className="text-sm text-muted-foreground hover:text-foreground">
            ← Назад
          </Link>
          <h1 className="text-3xl font-bold mt-2">Редактирай меню</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <MenuForm menu={menu} menuItems={menuItems || []} />
      </div>
    </div>
  )
}
