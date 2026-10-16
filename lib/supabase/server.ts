import { createServerClient as createSupabaseServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/lib/supabase/config"

// Server-side Supabase client acting as the current visitor (or logged-in admin),
// so the database's row-level security policies apply.
export async function createServerClient() {
  const cookieStore = await cookies()

  return createSupabaseServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // Called from a Server Component, where cookies can't be set; the middleware refreshes the session.
        }
      },
    },
  })
}

export const createClient = createServerClient
