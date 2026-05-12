import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: galleryImages, error } = await supabase
      .from("gallery_images")
      .select("id, title, description, image_url, category, created_at")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error fetching gallery images:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Transform Supabase data to match GalleryGrid expected interface
    const transformedImages = (galleryImages || []).map((img) => ({
      _id: img.id,
      title: img.title,
      image: img.image_url,
      category: img.category,
      date: img.created_at || new Date().toISOString(),
    }))

    return NextResponse.json(transformedImages)
  } catch (error) {
    console.error("[v0] Gallery API error:", error)
    return NextResponse.json({ error: "Failed to fetch gallery images" }, { status: 500 })
  }
}
