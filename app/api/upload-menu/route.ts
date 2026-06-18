import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const menuType = formData.get("menuType") as string

    if (!file || !menuType) {
      return NextResponse.json(
        { error: "File and menuType are required" },
        { status: 400 }
      )
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("[v0] Missing Supabase credentials")
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      )
    }

    // Use service role key to bypass RLS
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get existing file to delete
    const { data: existingFile, error: fetchErr } = await supabase
      .from("weekly_menu_files")
      .select("file_url")
      .eq("menu_type", menuType)

    console.log("[v0] Existing files query:", { existingFile, fetchErr })

    // Delete old file from storage if it exists
    if (existingFile && existingFile.length > 0 && existingFile[0]?.file_url) {
      const oldPath = existingFile[0].file_url.split("/").pop()
      if (oldPath) {
        console.log("[v0] Deleting old file:", oldPath)
        await supabase.storage.from("menu-files").remove([oldPath])
      }
    }

    // Upload new file
    const fileName = `${menuType}-${Date.now()}.pdf`
    console.log("[v0] Uploading file:", fileName)

    const buffer = await file.arrayBuffer()
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("menu-files")
      .upload(fileName, buffer, {
        contentType: "application/pdf",
        upsert: false,
      })

    if (uploadError) {
      console.error("[v0] Upload error:", uploadError)
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }

    console.log("[v0] Upload successful:", uploadData)
    const { data: publicUrl } = supabase.storage.from("menu-files").getPublicUrl(fileName)

    let fileUrl = ""
    if (publicUrl?.publicUrl) {
      fileUrl = publicUrl.publicUrl
    } else if (typeof publicUrl === "string") {
      fileUrl = publicUrl
    } else {
      fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/menu-files/${fileName}`
    }

    console.log("[v0] Final file URL:", fileUrl)

    // Update or insert database record
    if (existingFile && existingFile.length > 0) {
      console.log("[v0] Updating existing record")
      const { error: updateError } = await supabase
        .from("weekly_menu_files")
        .update({
          file_name: file.name,
          file_url: fileUrl,
          file_size: file.size,
        })
        .eq("menu_type", menuType)

      if (updateError) {
        console.error("[v0] Update error:", updateError)
        return NextResponse.json({ error: updateError.message }, { status: 500 })
      }
    } else {
      console.log("[v0] Inserting new record")
      const { error: insertError } = await supabase.from("weekly_menu_files").insert({
        menu_type: menuType,
        file_name: file.name,
        file_url: fileUrl,
        file_size: file.size,
      })

      if (insertError) {
        console.error("[v0] Insert error:", insertError)
        return NextResponse.json({ error: insertError.message }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true, message: "File uploaded successfully" })
  } catch (error) {
    console.error("[v0] Unexpected error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
