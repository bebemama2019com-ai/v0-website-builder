import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export const revalidate = 0

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const minimal = url.searchParams.get("minimal")

    const supabase = await createServerClient()

    if (minimal === "true") {
      // Lightweight response for file availability checks
      const { data: documents, error } = await supabase
        .from("documents")
        .select("file_path")
        .order("document_type", { ascending: true })

      if (error) throw error
      return NextResponse.json(documents || [])
    } else {
      // Full response for admin panel with all document details
      const { data: documents, error } = await supabase
        .from("documents")
        .select("id, document_type, file_name, file_path, file_size, updated_at")
        .order("document_type", { ascending: true })

      if (error) throw error
      return NextResponse.json(documents || [])
    }
  } catch (error) {
    console.error("[v0] Error fetching documents:", error)
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 })
  }
}
