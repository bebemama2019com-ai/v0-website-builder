import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import MenuForm from "@/components/admin/menu-form"

export default async function NewMenuPage() {
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

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/admin/menus" className="text-sm text-muted-foreground hover:text-foreground">
            ← Назад
          </Link>
          <h1 className="text-3xl font-bold mt-2">Добави ново меню</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <MenuForm />
      </div>
    </div>
  )
}
