import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

/**
 * Checks that the request comes from a logged-in admin.
 * Returns the Supabase client (acting as that user) on success,
 * or a ready-to-return 401/403 response on failure.
 */
export async function requireAdmin() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) } as const
  }

  const { data: adminUser } = await supabase.from("admin_users").select("id").eq("id", user.id).maybeSingle()

  if (!adminUser) {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) } as const
  }

  return { supabase, user } as const
}
