import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { generateSlug } from "@/lib/utils/slug"

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const slug = generateSlug(body.title)

    const { data: updatedPost, error } = await supabase
      .from("news_posts")
      .update({
        title: body.title,
        slug: slug,
        content: body.content,
        category: body.category || "announcement",
        news_date: body.news_date,
        news_hour: body.news_hour,
        from_text: body.from_text,
        is_active: body.is_active,
      })
      .eq("id", (await params).id)
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(updatedPost[0])
  } catch (error) {
    console.error("Admin news PUT error:", error)
    return NextResponse.json({ error: "Failed to update news post" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()

    const { error } = await supabase
      .from("news_posts")
      .delete()
      .eq("id", (await params).id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Admin news DELETE error:", error)
    return NextResponse.json({ error: "Failed to delete news post" }, { status: 500 })
  }
}
