import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const menuType = formData.get("menuType") as string

    if (!file || !menuType) {
      return NextResponse.json(
        { error: "Missing file or menuType" },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    const fileName = `${menuType}-${Date.now()}.pdf`
    const buffer = await file.arrayBuffer()

    // Upload to storage
    const { error: uploadError } = await supabase.storage
      .from("menu-files")
      .upload(fileName, buffer, { contentType: "application/pdf" })

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 400 })
    }

    // Get public URL
    const { data } = supabase.storage.from("menu-files").getPublicUrl(fileName)
    const fileUrl = data.publicUrl

    // Save to database
    const { error: dbError } = await supabase.from("weekly_menu_files").upsert(
      {
        menu_type: menuType,
        file_name: file.name,
        file_url: fileUrl,
        file_size: file.size,
      },
      { onConflict: "menu_type" }
    )

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
