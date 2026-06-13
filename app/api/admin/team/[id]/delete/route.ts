import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()

    // Verify user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify user is admin
    const { data: isAdmin } = await supabase.from("admin_users").select("id").eq("id", user.id).single()

    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Delete the team member
    const { error } = await supabase.from("team_members").delete().eq("id", params.id)

    if (error) {
      console.error("[v0] Error deleting team member:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Redirect to team admin page
    return NextResponse.redirect(new URL("/admin/team", request.url), 303)
  } catch (error) {
    console.error("[v0] Delete team member error:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to delete team member"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
