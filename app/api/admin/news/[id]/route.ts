import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/supabase/require-admin"
import { generateSlug } from "@/lib/utils/slug"
import { DOCUMENTS_BUCKET } from "@/lib/documents"
import { uploadedImagePath } from "@/lib/uploaded-images"
import { cleanNewsImageUrl } from "@/lib/news-images"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error
  const { supabase } = auth
  const { id } = await params

  try {
    const body = await request.json()

    const imageUrl = cleanNewsImageUrl(body.image_url)
    if (imageUrl === undefined) return NextResponse.json({ error: "Невалидна снимка." }, { status: 400 })

    const { data: existing } = await supabase.from("news_posts").select("image_url").eq("id", id).maybeSingle()

    const { data: updatedPost, error } = await supabase
      .from("news_posts")
      .update({
        title: body.title,
        slug: generateSlug(body.title),
        content: body.content,
        category: body.category || "announcement",
        news_date: body.news_date,
        news_hour: body.news_hour,
        from_text: body.from_text,
        is_active: body.is_active,
        image_url: imageUrl,
      })
      .eq("id", id)
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // The previous image is no longer used once it was replaced or removed.
    const oldPath = uploadedImagePath(existing?.image_url, "news")
    if (oldPath && existing?.image_url !== imageUrl) {
      await supabase.storage.from(DOCUMENTS_BUCKET).remove([oldPath])
    }

    return NextResponse.json(updatedPost[0])
  } catch (error) {
    console.error("Admin news PUT error:", error)
    return NextResponse.json({ error: "Failed to update news post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error
  const { supabase } = auth
  const { id } = await params

  try {
    const { data: existing } = await supabase.from("news_posts").select("image_url").eq("id", id).maybeSingle()

    const { error } = await supabase.from("news_posts").delete().eq("id", id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const imagePath = uploadedImagePath(existing?.image_url, "news")
    if (imagePath) await supabase.storage.from(DOCUMENTS_BUCKET).remove([imagePath])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Admin news DELETE error:", error)
    return NextResponse.json({ error: "Failed to delete news post" }, { status: 500 })
  }
}
