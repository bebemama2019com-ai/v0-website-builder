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

    // Get existing file to delete
    const { data: existingFile } = await supabase
      .from("weekly_menu_files")
      .select("file_url")
      .eq("menu_type", menuType)

    // Delete old file from storage if it exists
    if (existingFile && existingFile.length > 0 && existingFile[0]?.file_url) {
      const oldPath = existingFile[0].file_url.split("/").pop()
      if (oldPath) {
        await supabase.storage.from("menu-files").remove([oldPath])
      }
    }

    // Upload new file
    const fileName = `${menuType}-${Date.now()}.pdf`
    const buffer = await file.arrayBuffer()
    
    const { error: uploadError } = await supabase.storage
      .from("menu-files")
      .upload(fileName, buffer, {
        contentType: "application/pdf",
        upsert: false,
      })

    if (uploadError) {
      return { error: uploadError.message }
    }

    const { data: publicUrl } = supabase.storage.from("menu-files").getPublicUrl(fileName)
    const fileUrl = publicUrl?.publicUrl || `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/menu-files/${fileName}`

    // Update or insert database record
    if (existingFile && existingFile.length > 0) {
      const { error: updateError } = await supabase
        .from("weekly_menu_files")
        .update({
          file_name: file.name,
          file_url: fileUrl,
          file_size: file.size,
        })
        .eq("menu_type", menuType)

      if (updateError) {
        return { error: updateError.message }
      }
    } else {
      const { error: insertError } = await supabase.from("weekly_menu_files").insert({
        menu_type: menuType,
        file_name: file.name,
        file_url: fileUrl,
        file_size: file.size,
      })

      if (insertError) {
        return { error: insertError.message }
      }
    }

    return { success: true }
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error" }
  }
}
