"use server"

import { createClient } from "@/lib/supabase/server"

export async function uploadMenuFile(formData: FormData) {
  try {
    const file = formData.get("file") as File
    const menuType = formData.get("menuType") as string

    if (!file || !menuType) {
      return { error: "File and menuType are required" }
    }

    const supabase = await createClient()

    // 1. Upload file to storage
    const fileName = `${menuType}-${Date.now()}.pdf`
    const buffer = await file.arrayBuffer()
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("menu-files")
      .upload(fileName, buffer, {
        contentType: "application/pdf",
      })

    if (uploadError) {
      console.error("[v0] Storage upload error:", uploadError)
      return { error: `Storage error: ${uploadError.message}` }
    }

    // 2. Get public URL for the file
    const { data: publicUrl } = supabase.storage.from("menu-files").getPublicUrl(fileName)
    const fileUrl = publicUrl.publicUrl

    // 3. Delete old file if it exists
    const { data: existingFiles } = await supabase
      .from("weekly_menu_files")
      .select("file_url")
      .eq("menu_type", menuType)

    if (existingFiles && existingFiles.length > 0 && existingFiles[0]?.file_url) {
      const oldFileName = existingFiles[0].file_url.split("/").pop()
      if (oldFileName) {
        await supabase.storage.from("menu-files").remove([oldFileName])
      }
    }

    // 4. Upsert database record (insert or update)
    const { data: result, error: dbError } = await supabase
      .from("weekly_menu_files")
      .upsert({
        menu_type: menuType,
        file_name: file.name,
        file_url: fileUrl,
        file_size: file.size,
      }, {
        onConflict: "menu_type"
      })

    if (dbError) {
      console.error("[v0] Database error:", dbError)
      // Even if database fails, file is uploaded. Return partial success
      return { error: `Database error: ${dbError.message}` }
    }

    return { success: true }
  } catch (error) {
    console.error("[v0] Server action error:", error)
    return { error: error instanceof Error ? error.message : "Unknown error" }
  }
}
