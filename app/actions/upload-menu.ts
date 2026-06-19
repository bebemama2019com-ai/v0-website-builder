"use server"

import { createClient } from "@/lib/supabase/server"

export async function uploadMenuFile(file: File, menuType: string) {
  try {
    if (!file || !menuType) {
      return { error: "File and menuType are required" }
    }

    const supabase = await createClient()

    // Upload file to storage
    const fileName = `${menuType}-${Date.now()}.pdf`
    const buffer = await file.arrayBuffer()
    
    const { error: uploadError } = await supabase.storage
      .from("menu-files")
      .upload(fileName, buffer, {
        contentType: "application/pdf",
      })

    if (uploadError) {
      return { error: `Upload failed: ${uploadError.message}` }
    }

    // Get public URL
    const { data: publicUrl } = supabase.storage.from("menu-files").getPublicUrl(fileName)

    // Save to database
    const { error: dbError } = await supabase
      .from("weekly_menu_files")
      .upsert({
        menu_type: menuType,
        file_name: file.name,
        file_url: publicUrl.publicUrl,
        file_size: file.size,
      }, {
        onConflict: "menu_type"
      })

    if (dbError) {
      return { error: `Save failed: ${dbError.message}` }
    }

    return { success: true }
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error occurred" }
  }
}
