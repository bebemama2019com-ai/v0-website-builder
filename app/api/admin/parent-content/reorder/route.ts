import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/supabase/require-admin"
import { isParentCategory } from "@/lib/parent-content"

// POST { category, ids }: saves the order of one list (ids in their new order).
export async function POST(request: NextRequest) {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error
  const { supabase } = auth

  const body = await request.json().catch(() => ({}))
  const ids: unknown = body.ids
  if (!isParentCategory(body.category) || !Array.isArray(ids) || !ids.every((id) => typeof id === "string")) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const results = await Promise.all(
    (ids as string[]).map((id, index) =>
      supabase.from("parent_content").update({ order_index: index }).eq("id", id).eq("category", body.category),
    ),
  )
  const failed = results.find((r) => r.error)
  if (failed?.error) {
    console.error("Reordering parent content failed:", failed.error.message)
    return NextResponse.json({ error: "Failed to save the order" }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}
