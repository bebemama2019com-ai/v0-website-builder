import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/supabase/require-admin"
import { DOCUMENTS_BUCKET } from "@/lib/documents"
import { IMAGE_FOLDERS, IMAGE_TYPES, MAX_IMAGE_SIZE, isImageFolder } from "@/lib/uploaded-images"

// POST (multipart: "file", "folder" = team | news): stores an image and returns its public URL.
// The URL is saved on the team member / news post by the form that uploaded it.
export async function POST(request: NextRequest) {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error
  const { supabase } = auth

  const formData = await request.formData().catch(() => null)
  const file = formData?.get("file")
  const folder = formData?.get("folder")
  if (!(file instanceof File)) return NextResponse.json({ error: "Липсва файл." }, { status: 400 })
  if (!isImageFolder(folder)) return NextResponse.json({ error: "Невалидна папка." }, { status: 400 })

  const ext = IMAGE_TYPES[file.type]
  if (!ext) return NextResponse.json({ error: "Позволени са само JPG, PNG и WebP снимки." }, { status: 400 })
  if (file.size > MAX_IMAGE_SIZE) return NextResponse.json({ error: "Снимката е по-голяма от 5MB." }, { status: 400 })

  const path = `${IMAGE_FOLDERS[folder]}${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const { error } = await supabase.storage
    .from(DOCUMENTS_BUCKET)
    .upload(path, await file.arrayBuffer(), { contentType: file.type, upsert: false })

  if (error) {
    console.error("Image upload failed:", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const url = supabase.storage.from(DOCUMENTS_BUCKET).getPublicUrl(path).data.publicUrl
  return NextResponse.json({ url })
}
