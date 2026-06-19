"use server"

import { createClient } from "@/lib/supabase/server"

export async function uploadMenuFile(formData: FormData) {
  try {
    const file = formData.get("file") as File
    const menuType = formData.get("menuType") as string

    console.log("[v0] Server action: Upload started", { fileName: file?.name, menuType })

    if (!file || !menuType) {
      return { error: "File and menuType are required" }
    }

    const supabase = await createClient()

    // 1. Upload file to storage
    const fileName = `${menuType}-${Date.now()}.pdf`
    const buffer = await file.arrayBuffer()
    
    console.log("[v0] Server action: Uploading to storage", { fileName, size: buffer.byteLength })
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("menu-files")
      .upload(fileName, buffer, {
        contentType: "application/pdf",
      })

    console.log("[v0] Server action: Upload response", { uploadData, uploadError })

    if (uploadError) {
      console.error("[v0] Storage upload error:", uploadError)
      return { error: `Storage error: ${uploadError.message}` }
    }

    // 2. Get public URL for the file
    console.log("[v0] Server action: Getting public URL")
    const { data: publicUrl } = supabase.storage.from("menu-files").getPublicUrl(fileName)
    const fileUrl = publicUrl.publicUrl
    console.log("[v0] Server action: Public URL", { fileUrl })

    // 3. Delete old file if it exists
    console.log("[v0] Server action: Checking for existing files")
    const { data: existingFiles } = await supabase
      .from("weekly_menu_files")
      .select("file_url")
      .eq("menu_type", menuType)

    if (existingFiles && existingFiles.length > 0 && existingFiles[0]?.file_url) {
      console.log("[v0] Server action: Deleting old file")
      const oldFileName = existingFiles[0].file_url.split("/").pop()
      if (oldFileName) {
        await supabase.storage.from("menu-files").remove([oldFileName])
      }
    }

    // 4. Upsert database record (insert or update)
    console.log("[v0] Server action: Upserting database record")
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

    console.log("[v0] Server action: Database response", { result, dbError })

    if (dbError) {
      console.error("[v0] Database error:", dbError)
      return { error: `Database error: ${dbError.message}` }
    }

    console.log("[v0] Server action: Success!")
    return { success: true }
  } catch (error) {
    console.error("[v0] Server action error:", error)
    return { error: error instanceof Error ? error.message : "Unknown error" }
  }
}
