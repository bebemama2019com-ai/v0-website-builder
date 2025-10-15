import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    const supabase = await createServerClient()

    let query = supabase.from("parent_content").select("*").eq("published", true)

    if (category) {
      query = query.eq("category", category)
    }

    const { data, error } = await query.order("order_index", { ascending: true })

    if (error) {
      console.error("[SERVER][v0] Supabase query error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("[SERVER][v0] Parent content API error:", error)
    return NextResponse.json({ error: "Failed to fetch parent content" }, { status: 500 })
  }
}
