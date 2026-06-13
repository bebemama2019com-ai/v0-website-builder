import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("groups")
      .select(`
        *,
        group_teachers (
          teacher_id,
          team_members:teacher_id (
            id,
            name,
            role,
            bio
          )
        )
      `)
      .order("order_index", { ascending: true })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error fetching groups:", error)
    return NextResponse.json({ error: "Failed to fetch groups" }, { status: 500 })
  }
}
