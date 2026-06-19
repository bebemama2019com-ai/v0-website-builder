"use server"

import { createClient } from "@/lib/supabase/server"

export async function uploadMenuFile(
  fileBytes: ArrayBuffer,
  fileName: string,
  menuType: string,
  fileSize: number
) {
  try {
    if (!fileBytes || !menuType) {
      return { error: "File and menuType are required" }
    }

    const supabase = await createClient()

    // Upload file to storage
    const uploadFileName = `${menuType}-${Date.now()}.pdf`
    const buffer = fileBytes
    
    const { error: uploadError } = await supabase.storage
      .from("menu-files")
      .upload(uploadFileName, buffer, {
        contentType: "application/pdf",
      })

    if (uploadError) {
      return { error: `Upload failed: ${uploadError.message}` }
    }

    // Get public URL
    const { data: publicUrl } = supabase.storage.from("menu-files").getPublicUrl(uploadFileName)

    // Save to database
    const { error: dbError } = await supabase
      .from("weekly_menu_files")
      .upsert({
        menu_type: menuType,
        file_name: fileName,
        file_url: publicUrl.publicUrl,
        file_size: fileSize,
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
