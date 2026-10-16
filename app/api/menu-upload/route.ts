import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/supabase/require-admin"
import { MENU_BUCKET, isMenuType, menuStoragePath, type MenuFileRow } from "@/lib/menus"

const MAX_SIZE = 50 * 1024 * 1024

// Uploads a new weekly menu. The current menu becomes the previous one,
// and the file that was previous until now is deleted from storage.
export async function POST(request: NextRequest) {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error
  const { supabase } = auth

  try {
    const formData = await request.formData()
    const file = formData.get("file")
    const menuType = formData.get("menuType")

    if (!(file instanceof File) || !isMenuType(menuType)) {
      return NextResponse.json({ error: "Missing file or invalid menu type" }, { status: 400 })
    }
    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 })
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File size exceeds 50MB limit" }, { status: 400 })
    }

    const { data: existing, error: fetchError } = await supabase
      .from("weekly_menu_files")
      .select("*")
      .eq("menu_type", menuType)
      .maybeSingle<MenuFileRow>()

    if (fetchError) {
      console.error("Menu lookup failed:", fetchError.message)
      return NextResponse.json({ error: "Failed to read the current menu" }, { status: 500 })
    }

    const storagePath = `${menuType}-${Date.now()}.pdf`
    const { error: uploadError } = await supabase.storage
      .from(MENU_BUCKET)
      .upload(storagePath, await file.arrayBuffer(), { contentType: "application/pdf", upsert: false })

    if (uploadError) {
      console.error("Menu upload failed:", uploadError.message)
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }

    const fileUrl = supabase.storage.from(MENU_BUCKET).getPublicUrl(storagePath).data.publicUrl
    const now = new Date().toISOString()

    const { error: dbError } = await supabase.from("weekly_menu_files").upsert(
      {
        menu_type: menuType,
        file_name: file.name,
        file_url: fileUrl,
        file_size: file.size,
        updated_at: now,
        // The menu that was current until now becomes the previous one.
        previous_file_name: existing?.file_name ?? null,
        previous_file_url: existing?.file_url ?? null,
        previous_file_size: existing?.file_size ?? null,
        previous_updated_at: existing ? existing.updated_at : null,
      },
      { onConflict: "menu_type" },
    )

    if (dbError) {
      console.error("Menu record save failed:", dbError.message)
      await supabase.storage.from(MENU_BUCKET).remove([storagePath])
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }

    // Only two menus are kept per type: drop the file that has just fallen off.
    const droppedPath = menuStoragePath(existing?.previous_file_url)
    if (droppedPath && droppedPath !== menuStoragePath(existing?.file_url)) {
      const { error: removeError } = await supabase.storage.from(MENU_BUCKET).remove([droppedPath])
      if (removeError) console.error("Old menu file delete failed:", removeError.message)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Menu upload error:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
