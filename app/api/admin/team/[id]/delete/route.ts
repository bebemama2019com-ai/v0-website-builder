import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

// Called by a plain HTML form on the team admin page, so it answers with redirects.
// Redirects are built with NextResponse instead of `redirect()`, which throws and
// was being swallowed by the surrounding try/catch.
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const to = (path: string) => NextResponse.redirect(new URL(path, request.url), 303)

  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return to("/admin/login")

  const { data: adminUser } = await supabase.from("admin_users").select("id").eq("id", user.id).maybeSingle()
  if (!adminUser) return to("/admin/login")

  const { error } = await supabase.from("team_members").delete().eq("id", id)
  if (error) {
    console.error("Team member delete failed:", error.message)
    return to("/admin/team?error=delete_failed")
  }

  return to("/admin/team")
}
