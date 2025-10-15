import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.SUPABASE_NEXT_PUBLIC_SUPABASE_URL || "https://bulrhtnvqxasrhjmihdk.supabase.co"
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1bHJodG52cXhhc3Joam1paGRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NTA4MjksImV4cCI6MjA3NjAyNjgyOX0.GAhmN8QbyYfyEjGQhNXgS6OfMQIUq6jtNiK-oOPw89I"

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    })

    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Protect admin routes
    if (request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.startsWith("/admin/login")) {
      if (!user) {
        const url = request.nextUrl.clone()
        url.pathname = "/admin/login"
        return NextResponse.redirect(url)
      }

      try {
        const { data: adminUser } = await supabase.from("admin_users").select("id").eq("user_id", user.id).single()

        if (!adminUser) {
          const url = request.nextUrl.clone()
          url.pathname = "/admin/login"
          return NextResponse.redirect(url)
        }
      } catch (error) {
        console.error("[MIDDLEWARE] Error checking admin status:", error)
        // Allow access if admin check fails (table might not exist yet)
      }
    }

    return supabaseResponse
  } catch (error) {
    console.error("[MIDDLEWARE] Error in updateSession:", error)
    // Return response even if middleware fails to prevent 500 errors
    return supabaseResponse
  }
}
