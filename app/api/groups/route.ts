import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    // First, try to fetch groups with teacher relationships
    let { data, error } = await supabase
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

    // If the error is about missing relationship (Migration 009 not run yet),
    // fall back to fetching just groups without teachers
    if (error && error.message && error.message.includes("relationship")) {
      console.warn("group_teachers table not found, fetching groups without teachers")
      
      const { data: groupsOnly, error: groupsError } = await supabase
        .from("groups")
        .select("*")
        .order("order_index", { ascending: true })

      if (groupsError) throw groupsError
      
      // Add empty group_teachers array to maintain consistent structure
      data = groupsOnly?.map(group => ({
        ...group,
        group_teachers: []
      })) || []
    } else if (error) {
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching groups:", error)
    return NextResponse.json({ error: "Failed to fetch groups" }, { status: 500 })
  }
}
