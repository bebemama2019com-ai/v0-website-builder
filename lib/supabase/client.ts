import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr"

const supabaseUrl = "https://bulrhtnvqxasrhjmihdk.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1bHJodG52cXhhc3Joam1paGRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NTA4MjksImV4cCI6MjA3NjAyNjgyOX0.GAhmN8QbyYfyEjGQhNXgS6OfMQIUq6jtNiK-oOPw89I"

export function createBrowserClient() {
  return createSupabaseBrowserClient(supabaseUrl, supabaseKey)
}

export function createClient() {
  return createSupabaseBrowserClient(supabaseUrl, supabaseKey)
}
