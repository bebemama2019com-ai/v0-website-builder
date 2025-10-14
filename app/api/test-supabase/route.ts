import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    console.log("[v0] Testing Supabase connection...")

    const supabase = await createClient()

    // Test 1: Check if we can connect and get the current user (will be null if not logged in, but connection works)
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    console.log("[v0] Auth test:", { user: user?.email || "No user", authError })

    // Test 2: Try to query existing tables
    const { data: teamData, error: teamError } = await supabase.from("team_members").select("count").limit(1)

    const { data: newsData, error: newsError } = await supabase.from("news_posts").select("count").limit(1)

    const { data: galleryData, error: galleryError } = await supabase.from("gallery_images").select("count").limit(1)

    console.log("[v0] Table queries:", { teamError, newsError, galleryError })

    return NextResponse.json({
      success: true,
      message: "Supabase connection test complete",
      results: {
        authentication: authError ? `Error: ${authError.message}` : "Connected",
        currentUser: user?.email || "Not logged in",
        tables: {
          team_members: teamError ? `Not found: ${teamError.message}` : `Found (${teamData?.length || 0} records)`,
          news_posts: newsError ? `Not found: ${newsError.message}` : `Found (${newsData?.length || 0} records)`,
          gallery_images: galleryError
            ? `Not found: ${galleryError.message}`
            : `Found (${galleryData?.length || 0} records)`,
        },
        nextSteps:
          teamError || newsError || galleryError
            ? "Tables not found. Run the SQL scripts in scripts/ folder to create them."
            : "All tables exist! You can start using the CMS.",
      },
    })
  } catch (error: any) {
    console.error("[v0] Supabase test error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        details: "Check that SUPABASE_NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set correctly",
      },
      { status: 500 },
    )
  }
}
