import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"

// Revalidate every 5 seconds for fresh data
export const revalidate = 5

export async function GET() {
  try {
    // Public news must remain readable even when the legacy RLS policy still checks `published`.
    // Keep the endpoint safe by selecting only active posts here.
    const supabase = createAdminClient()

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
      console.error("[v0] Error fetching news posts:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(newsPosts || [])
  } catch (error) {
    console.error("[v0] News API error:", error)
    return NextResponse.json({ error: "Failed to fetch news posts" }, { status: 500 })
  }
}
