import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/supabase/require-admin"
import { DOCUMENTS_BUCKET, isUploadedPath } from "@/lib/documents"

export async function POST(request: NextRequest) {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error
  const { supabase } = auth

  try {
    const { documentType } = await request.json()

    if (typeof documentType !== "string" || !documentType) {
      return NextResponse.json({ error: "Missing documentType" }, { status: 400 })
    }

    const { data: doc, error: fetchError } = await supabase
      .from("documents")
      .select("file_path")
      .eq("document_type", documentType)
      .maybeSingle()

    if (fetchError || !doc) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 })
    }

    const { error: deleteError } = await supabase.from("documents").delete().eq("document_type", documentType)

    if (deleteError) {
      console.error("Document record delete failed:", deleteError.message)
      return NextResponse.json({ error: "Failed to delete document record" }, { status: 500 })
    }

    // Uploaded files live in Supabase Storage; the original files in public/ are part of the
    // deployment and can't be deleted at runtime (removing the row unpublishes them).
    if (isUploadedPath(doc.file_path)) {
      const { error: storageError } = await supabase.storage.from(DOCUMENTS_BUCKET).remove([doc.file_path])
      if (storageError) {
        console.error("Stored file delete failed:", storageError.message)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Document delete error:", error)
    return NextResponse.json({ error: "Failed to delete document" }, { status: 500 })
  }
}
