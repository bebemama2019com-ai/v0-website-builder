import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/supabase/require-admin"
import { DOCUMENTS_BUCKET, UPLOAD_PREFIX, getDocumentByType, getDocumentUrl, isUploadedPath } from "@/lib/documents"

const ALLOWED_TYPES: Record<string, string> = {
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
}

const MAX_SIZE = 50 * 1024 * 1024

export async function POST(request: NextRequest) {
  const auth = await requireAdmin()
  if ("error" in auth) return auth.error
  const { supabase } = auth

  try {
    const formData = await request.formData()
    const file = formData.get("file")
    const documentType = formData.get("documentType")

    if (!(file instanceof File) || typeof documentType !== "string") {
      return NextResponse.json({ error: "Missing file or documentType" }, { status: 400 })
    }

    const entry = getDocumentByType(documentType)
    if (!entry) {
      return NextResponse.json({ error: "Unknown document type" }, { status: 400 })
    }

    const ext = ALLOWED_TYPES[file.type]
    if (!ext) {
      return NextResponse.json({ error: "Only PDF, DOC and DOCX files are allowed" }, { status: 400 })
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File size exceeds 50MB limit" }, { status: 400 })
    }

    // A new, unique path per upload, so browsers and the CDN never serve a stale copy.
    const filePath = `${UPLOAD_PREFIX}${documentType}/${Date.now()}.${ext}`

    const { data: existing } = await supabase
      .from("documents")
      .select("file_path")
      .eq("document_type", documentType)
      .maybeSingle()

    const { error: uploadError } = await supabase.storage
      .from(DOCUMENTS_BUCKET)
      .upload(filePath, await file.arrayBuffer(), { contentType: file.type, upsert: false })

    if (uploadError) {
      console.error("Document upload failed:", uploadError.message)
      return NextResponse.json({ error: uploadError.message || "Failed to upload file" }, { status: 500 })
    }

    const { error: dbError } = await supabase.from("documents").upsert(
      {
        document_type: documentType,
        file_name: file.name,
        file_path: filePath,
        file_size: file.size,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "document_type" },
    )

    if (dbError) {
      console.error("Document record save failed:", dbError.message)
      // Don't leave an orphaned file behind.
      await supabase.storage.from(DOCUMENTS_BUCKET).remove([filePath])
      return NextResponse.json({ error: dbError.message || "Failed to save document record" }, { status: 500 })
    }

    // Only now that the new file is live, remove the previously uploaded one.
    if (existing?.file_path && isUploadedPath(existing.file_path)) {
      await supabase.storage.from(DOCUMENTS_BUCKET).remove([existing.file_path])
    }

    return NextResponse.json({ success: true, filePath, url: getDocumentUrl(entry, filePath) })
  } catch (error) {
    console.error("Document upload error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to upload document" },
      { status: 500 },
    )
  }
}
