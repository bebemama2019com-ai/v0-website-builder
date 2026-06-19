import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const { data: updatedPost, error } = await supabase
      .from("news_posts")
      .update({
        title: body.title,
        description: body.description,
        content: body.content,
        news_date: body.news_date,
        news_hour: body.news_hour,
        from_text: body.from_text,
        is_active: body.is_active,
      })
      .eq("id", params.id)
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(updatedPost[0])
  } catch (error) {
    console.error("[v0] Admin news PUT error:", error)
    return NextResponse.json({ error: "Failed to update news post" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()

    const { error } = await supabase
      .from("news_posts")
      .delete()
      .eq("id", params.id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Admin news DELETE error:", error)
    return NextResponse.json({ error: "Failed to delete news post" }, { status: 500 })
  }
}
