import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/lib/supabase/config"

// Refreshes the Supabase session cookie on every request and keeps /admin pages
// for logged-in admins only.
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const redirectTo = (pathname: string) => {
    const url = request.nextUrl.clone()
    url.pathname = pathname
    return NextResponse.redirect(url)
  }

  try {
    const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    })

    const {
      data: { user },
    } = await supabase.auth.getUser()

    const path = request.nextUrl.pathname
    const isLoginPage = path === "/admin/login"
    const isAdminPage = path.startsWith("/admin") && !path.startsWith("/admin/login")

    if (!isLoginPage && !isAdminPage) return supabaseResponse

    const isAdmin = user
      ? Boolean((await supabase.from("admin_users").select("id").eq("id", user.id).maybeSingle()).data)
      : false

    // Already logged in as an admin: skip the login page.
    if (isLoginPage) return isAdmin ? redirectTo("/admin") : supabaseResponse

    if (!user) return redirectTo("/admin/login")

    if (!isAdmin) {
      await supabase.auth.signOut()
      return redirectTo("/admin/login")
    }

    return supabaseResponse
  } catch (error) {
    console.error("Session check failed:", error)
    return request.nextUrl.pathname.startsWith("/admin") && request.nextUrl.pathname !== "/admin/login"
      ? redirectTo("/admin/login")
      : supabaseResponse
  }
}
