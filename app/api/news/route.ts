import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export const revalidate = 5

// Public news feed. Row-level security only returns posts with is_active = true to visitors;
// the filter below keeps admins (who can see every post) to the same list.
export async function GET() {
  try {
    const supabase = await createServerClient()

    const { data: newsPosts, error } = await supabase
      .from("news_posts")
      .select(`
        *,
        news_files (
          id,
          file_name,
          file_url
        )
      `)
      .eq("is_active", true)
      .order("news_date", { ascending: false })
      .order("news_hour", { ascending: false })

    if (error) {
      console.error("Error fetching news posts:", error.message)
      return NextResponse.json({ error: "Failed to fetch news posts" }, { status: 500 })
    }

    return NextResponse.json(newsPosts || [])
  } catch (error) {
    console.error("News API error:", error)
    return NextResponse.json({ error: "Failed to fetch news posts" }, { status: 500 })
  }
}
