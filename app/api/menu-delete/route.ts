import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/supabase/require-admin"
import { MENU_BUCKET, isMenuType, menuStoragePath, type MenuFileRow } from "@/lib/menus"

// Deletes the current or the previous weekly menu.
// Deleting the current menu brings the previous one back as current (an undo for a wrong upload).
export async function POST(request: NextRequest) {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error
  const { supabase } = auth

  try {
    const { menuType, which } = await request.json()

    if (!isMenuType(menuType) || (which !== "current" && which !== "previous")) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 })
    }

    const { data: row, error: fetchError } = await supabase
      .from("weekly_menu_files")
      .select("*")
      .eq("menu_type", menuType)
      .maybeSingle<MenuFileRow>()

    if (fetchError || !row) {
      return NextResponse.json({ error: "Menu not found" }, { status: 404 })
    }

    const clearedPrevious = {
      previous_file_name: null,
      previous_file_url: null,
      previous_file_size: null,
      previous_updated_at: null,
    }

    let fileToRemove: string | null
    let dbError

    if (which === "previous") {
      if (!row.previous_file_url) return NextResponse.json({ error: "No previous menu" }, { status: 404 })
      fileToRemove = menuStoragePath(row.previous_file_url)
      ;({ error: dbError } = await supabase.from("weekly_menu_files").update(clearedPrevious).eq("menu_type", menuType))
    } else if (row.previous_file_url && row.previous_file_name) {
      // Promote the previous menu to current.
      fileToRemove = menuStoragePath(row.file_url)
      ;({ error: dbError } = await supabase
        .from("weekly_menu_files")
        .update({
          file_name: row.previous_file_name,
          file_url: row.previous_file_url,
          file_size: row.previous_file_size,
          updated_at: row.previous_updated_at ?? new Date().toISOString(),
          ...clearedPrevious,
        })
        .eq("menu_type", menuType))
    } else {
      fileToRemove = menuStoragePath(row.file_url)
      ;({ error: dbError } = await supabase.from("weekly_menu_files").delete().eq("menu_type", menuType))
    }

    if (dbError) {
      console.error("Menu delete failed:", dbError.message)
      return NextResponse.json({ error: "Failed to delete menu" }, { status: 500 })
    }

    if (fileToRemove) {
      const { error: removeError } = await supabase.storage.from(MENU_BUCKET).remove([fileToRemove])
      if (removeError) console.error("Menu file delete failed:", removeError.message)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Menu delete error:", error)
    return NextResponse.json({ error: "Failed to delete menu" }, { status: 500 })
  }
}
