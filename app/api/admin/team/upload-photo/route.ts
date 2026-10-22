import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/supabase/require-admin"
import { DOCUMENTS_BUCKET } from "@/lib/documents"
import { TEAM_PHOTO_PREFIX } from "@/lib/team-photos"

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
}
const MAX_SIZE = 5 * 1024 * 1024

// POST (multipart, field "file"): stores a team member photo and returns its public URL.
// The URL is saved on the team member by the form.
export async function POST(request: NextRequest) {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error
  const { supabase } = auth

  const formData = await request.formData().catch(() => null)
  const file = formData?.get("file")
  if (!(file instanceof File)) return NextResponse.json({ error: "Липсва файл." }, { status: 400 })

  const ext = ALLOWED_TYPES[file.type]
  if (!ext) return NextResponse.json({ error: "Позволени са само JPG, PNG и WebP снимки." }, { status: 400 })
  if (file.size > MAX_SIZE) return NextResponse.json({ error: "Снимката е по-голяма от 5MB." }, { status: 400 })

  const path = `${TEAM_PHOTO_PREFIX}${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const { error } = await supabase.storage
    .from(DOCUMENTS_BUCKET)
    .upload(path, await file.arrayBuffer(), { contentType: file.type, upsert: false })

  if (error) {
    console.error("Team photo upload failed:", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const url = supabase.storage.from(DOCUMENTS_BUCKET).getPublicUrl(path).data.publicUrl
  return NextResponse.json({ url })
}
