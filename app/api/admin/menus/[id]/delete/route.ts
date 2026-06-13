import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { data: isAdmin } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .single()

  if (!isAdmin) {
    return new Response("Forbidden", { status: 403 })
  }

  try {
    // Delete menu items first (due to foreign key constraint)
    const { error: itemsError } = await supabase
      .from("menu_items")
      .delete()
      .eq("menu_id", params.id)

    if (itemsError) throw itemsError

    // Then delete the menu
    const { error: menuError } = await supabase
      .from("weekly_menus")
      .delete()
      .eq("id", params.id)

    if (menuError) throw menuError

    return redirect("/admin/menus")
  } catch (error) {
    console.error("Error deleting menu:", error)
    return new Response("Error deleting menu", { status: 500 })
  }
}
