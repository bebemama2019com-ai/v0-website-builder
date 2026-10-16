import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// Revalidate every 5 seconds to ensure fresh data
export const revalidate = 5

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: teamMembers, error } = await supabase
      .from("team_members")
      .select("*")
      .order("order_index", { ascending: true })

    if (error) {
      console.error("Supabase query error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(teamMembers || [])
  } catch (error) {
    console.error("Team API error:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch team members"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
