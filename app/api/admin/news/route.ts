import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { generateSlug } from "@/lib/utils/slug"

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: newsPosts, error } = await supabase
      .from("news_posts")
      .select("*")
      .order("news_date", { ascending: false })
      .order("news_hour", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(newsPosts || [])
  } catch (error) {
    console.error("Admin news GET error:", error)
    return NextResponse.json({ error: "Failed to fetch news posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const slug = generateSlug(body.title)

    const { data: newPost, error } = await supabase
      .from("news_posts")
      .insert({
        title: body.title,
        slug: slug,
        content: body.content,
        category: body.category || "announcement",
        news_date: body.news_date,
        news_hour: body.news_hour,
        from_text: body.from_text,
        is_active: body.is_active,
      })
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(newPost[0])
  } catch (error) {
    console.error("Admin news POST error:", error)
    return NextResponse.json({ error: "Failed to create news post" }, { status: 500 })
  }
}
