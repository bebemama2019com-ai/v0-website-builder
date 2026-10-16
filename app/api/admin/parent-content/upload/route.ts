import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/supabase/require-admin"
import { DOCUMENTS_BUCKET } from "@/lib/documents"
import { PARENT_UPLOAD_PREFIX } from "@/lib/parent-content"

const ALLOWED_TYPES: Record<string, string> = {
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
}
const MAX_SIZE = 50 * 1024 * 1024

// POST (multipart, field "file"): stores a file for a form or council document and returns its URL.
// The URL is saved on the item by the regular update call.
export async function POST(request: NextRequest) {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error
  const { supabase } = auth

  const formData = await request.formData().catch(() => null)
  const file = formData?.get("file")
  if (!(file instanceof File)) return NextResponse.json({ error: "Missing file" }, { status: 400 })

  const ext = ALLOWED_TYPES[file.type]
  if (!ext) return NextResponse.json({ error: "Само PDF, DOC и DOCX файлове са позволени." }, { status: 400 })
  if (file.size > MAX_SIZE) return NextResponse.json({ error: "Файлът е по-голям от 50MB." }, { status: 400 })

  const path = `${PARENT_UPLOAD_PREFIX}${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const { error } = await supabase.storage
    .from(DOCUMENTS_BUCKET)
    .upload(path, await file.arrayBuffer(), { contentType: file.type, upsert: false })

  if (error) {
    console.error("Parent file upload failed:", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const url = supabase.storage.from(DOCUMENTS_BUCKET).getPublicUrl(path).data.publicUrl
  return NextResponse.json({ url, fileName: file.name })
}
