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

    console.log("[SERVER][MIDDLEWARE] Path:", request.nextUrl.pathname, "User:", user?.id || "none")

    // Protect admin routes
    if (request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.startsWith("/admin/login")) {
      if (!user) {
        console.log("[SERVER][MIDDLEWARE] No user found, redirecting to login")
        const url = request.nextUrl.clone()
        url.pathname = "/admin/login"
        return NextResponse.redirect(url)
      }

      try {
        const { data: adminUser, error: adminError } = await supabase
          .from("admin_users")
          .select("id")
          .eq("id", user.id)
          .single()

        console.log("[SERVER][MIDDLEWARE] Admin check:", { adminUser, adminError })

        if (adminError || !adminUser) {
          console.log("[SERVER][MIDDLEWARE] Admin check failed, redirecting to login")
          const url = request.nextUrl.clone()
          url.pathname = "/admin/login"
          return NextResponse.redirect(url)
        }

        console.log("[SERVER][MIDDLEWARE] Admin access granted for user:", user.id)
      } catch (error) {
        console.error("[SERVER][MIDDLEWARE] Error checking admin status:", error)
        const url = request.nextUrl.clone()
        url.pathname = "/admin/login"
        return NextResponse.redirect(url)
      }
    }

    return supabaseResponse
  } catch (error) {
    console.error("[SERVER][MIDDLEWARE] Error in updateSession:", error)
    return supabaseResponse
  }
}
