import { createServerClient } from "@/lib/supabase/server"
import { getDocumentByType, getDocumentUrl } from "@/lib/documents"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// Public list of published documents with their download URLs.
export async function GET() {
  try {
    const supabase = await createServerClient()

    const { data, error } = await supabase.from("documents").select("document_type, file_path, updated_at")

    if (error) {
      console.error("Documents query failed:", error.message)
      return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 })
    }

    const documents = (data || []).flatMap((row) => {
      const entry = getDocumentByType(row.document_type)
      if (!entry) return []
      return [
        {
          document_type: row.document_type,
          file: entry.file,
          url: getDocumentUrl(entry, row.file_path),
          updated_at: row.updated_at,
        },
      ]
    })

    return NextResponse.json(documents)
  } catch (error) {
    console.error("Documents API error:", error)
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 })
  }
}
