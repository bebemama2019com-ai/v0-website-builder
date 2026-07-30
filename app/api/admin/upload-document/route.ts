import { NextRequest, NextResponse } from "next/server"
import { createServerClient, createAdminClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const documentType = formData.get("documentType") as string

    if (!file || !documentType) {
      return NextResponse.json(
        { error: "Missing file or documentType" },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Only PDF and DOCX files are allowed" },
        { status: 400 }
      )
    }

    // Validate file size (50MB max)
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size exceeds 50MB limit" },
        { status: 400 }
      )
    }

    // Create filename based on document type
    const ext = file.name.split(".").pop()
    
    // Map document types to consistent filenames
    const fileNameMap: Record<string, string> = {
      budget: `otchet-byudzhet-2025.${ext}`,
      "budget-2026-q1": `otchet-byudzhet-2026-q1.${ext}`,
      "budget-2026-q2": `otchet-byudzhet-2026-q2.${ext}`,
      "budget-2026-q3": `otchet-byudzhet-2026-q3.${ext}`,
      "budget-2026-q4": `otchet-byudzhet-2026-q4.${ext}`,
      "eco-education": `programa-ekologichno-vazpitanie.${ext}`,
      "child-protection": `vansni-pravila-za-zaschita.${ext}`,
      "personal-data": `vansni-pravila-za-zaschita-na-lichni-dani.${ext}`,
      "godishen-plan": `godishen-plan-2025-2026.${ext}`,
      "sistema-programa": `programa-sistema.${ext}`,
      "pravilnik-propuskatelni": `pravilnik-za-propuskatelni-rejim.${ext}`,
      "pravila-dejstvie-terorizam": `pravila-za-dejstvie-pri-terorizam.${ext}`,
      "plan-programa-bdp": `plan-programa-bdp.${ext}`,
      "mehanizam-dete-risk": `mehanizam-za-dete-v-risk.${ext}`,
      "etichen-kodeks-dete": `etichen-kodeks-za-rabota-s-dete.${ext}`,
      "etichen-kodeks-dg-202": `etichen-kodeks-dg-202.${ext}`,
      "model-adaptacija": `model-za-adaptacija.${ext}`,
    }
    
    const fileName = fileNameMap[documentType] || `document-${documentType}.${ext}`

    const userClient = await createServerClient()
    const adminClient = createAdminClient()
    const buffer = await file.arrayBuffer()

    // Get existing file to delete
    const { data: existingFile } = await userClient
      .from("documents")
      .select("file_path")
      .eq("document_type", documentType)
      .single()

    // Delete old file from storage if it exists
    if (existingFile?.file_path) {
      const oldFileName = existingFile.file_path.split("/").pop()
      if (oldFileName) {
        console.log("[v0] Deleting old file:", oldFileName)
        await userClient.storage.from("documents").remove([oldFileName])
      }
    }

    // Upload new file to Supabase Storage
    const { error: uploadError } = await userClient.storage
      .from("documents")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: true,
      })

    if (uploadError) {
      console.error("[v0] Upload error:", uploadError)
      return NextResponse.json(
        { error: uploadError.message || "Failed to upload file to storage" },
        { status: 500 }
      )
    }

    console.log("[v0] Document uploaded to storage successfully:", fileName)

    // Get public URL
    const { data: publicUrl } = userClient.storage
      .from("documents")
      .getPublicUrl(fileName)

    // Save file info to database with public URL using admin client (bypasses RLS)
    const { error: upsertError } = await adminClient
      .from("documents")
      .upsert({
        document_type: documentType,
        file_name: file.name,
        file_path: fileName,
        file_url: publicUrl.publicUrl,
        file_size: file.size,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: "document_type"
      })

    if (upsertError) {
      console.error("[v0] Database upsert error:", upsertError)
      return NextResponse.json(
        { error: upsertError.message || "Failed to save document record" },
        { status: 500 }
      )
    }

    console.log("[v0] Document record saved to database")

    return NextResponse.json({
      success: true,
      fileName: fileName,
      path: publicUrl.publicUrl,
    })
  } catch (error) {
    console.error("[v0] Error uploading document:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to upload document" },
      { status: 500 }
    )
  }
}
