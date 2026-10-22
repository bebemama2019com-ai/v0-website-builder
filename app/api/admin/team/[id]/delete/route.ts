import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { DOCUMENTS_BUCKET } from "@/lib/documents"
import { teamPhotoStoragePath } from "@/lib/team-photos"

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

  const { data: member } = await supabase.from("team_members").select("image_url").eq("id", id).maybeSingle()

  const { error } = await supabase.from("team_members").delete().eq("id", id)
  if (error) {
    console.error("Team member delete failed:", error.message)
    return to("/admin/team?error=delete_failed")
  }

  // Remove the photo too if it was uploaded from the admin panel.
  const photoPath = teamPhotoStoragePath(member?.image_url)
  if (photoPath) await supabase.storage.from(DOCUMENTS_BUCKET).remove([photoPath])

  return to("/admin/team")
}
