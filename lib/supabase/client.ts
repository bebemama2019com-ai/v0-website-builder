import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr"
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/lib/supabase/config"

export function createBrowserClient() {
  return createSupabaseBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}

export function createClient() {
  return createSupabaseBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}
