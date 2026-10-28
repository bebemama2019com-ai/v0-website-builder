import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/supabase/require-admin"
import { uniqueSlug } from "@/lib/utils/slug"

export async function GET() {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error
  const { supabase } = auth

  try {

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
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error
  const { supabase } = auth

  try {
    const body = await request.json()

    const slug = await uniqueSlug(body.title ?? "", async (candidate) => {
      const { data } = await supabase.from("news_posts").select("id").eq("slug", candidate).maybeSingle()
      return Boolean(data)
    })

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
