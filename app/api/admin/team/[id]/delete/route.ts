import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createServerClient()

    // Verify user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect("/admin/login")
    }

    // Verify user is admin
    const { data: adminUser, error: adminError } = await supabase
      .from("admin_users")
      .select("id")
      .eq("id", user.id)
      .maybeSingle()

    if (adminError || !adminUser) {
      redirect("/admin/login")
    }

    // Delete the team member
    const { error: deleteError } = await supabase.from("team_members").delete().eq("id", params.id)

    if (deleteError) {
      console.error("[v0] Error deleting team member:", deleteError)
      redirect("/admin/team?error=delete_failed")
    }

    // Redirect to team admin page
    redirect("/admin/team")
  } catch (error) {
    console.error("[v0] Delete team member error:", error)
    redirect("/admin/team?error=delete_error")
  }
}
