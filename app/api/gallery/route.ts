import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: galleryImages, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error fetching gallery images:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(galleryImages || [])
  } catch (error) {
    console.error("[v0] Gallery API error:", error)
    return NextResponse.json({ error: "Failed to fetch gallery images" }, { status: 500 })
  }
}
