import { unlink } from "fs/promises"
import { join } from "path"
import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { documentType } = await request.json()

    if (!documentType) {
      return NextResponse.json(
        { error: "Missing documentType" },
        { status: 400 }
      )
    }

    // Get the document from database to find the file path
    const supabase = await createServerClient()
    const { data: doc, error: fetchError } = await supabase
      .from("documents")
      .select("file_path")
      .eq("document_type", documentType)
      .single()

    if (fetchError || !doc) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      )
    }

    // Delete the file from disk
    const docsPath = join(process.cwd(), "public", "documents")
    const filePath = join(docsPath, doc.file_path)

    try {
      await unlink(filePath)
      console.log("[v0] File deleted from disk:", doc.file_path)
    } catch (err) {
      console.error("[v0] Error deleting file from disk:", err)
    }

    // Delete from database
    const { error: deleteError } = await supabase
      .from("documents")
      .delete()
      .eq("document_type", documentType)

    if (deleteError) {
      console.error("[v0] Error deleting from database:", deleteError)
      return NextResponse.json(
        { error: "Failed to delete document record" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Document deleted successfully",
    })
  } catch (error) {
    console.error("[v0] Error deleting document:", error)
    return NextResponse.json(
      { error: "Failed to delete document" },
      { status: 500 }
    )
  }
}
