import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

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

    // Create unique filename with timestamp to prevent overwrites
    const timestamp = Date.now()
    const ext = file.name.split(".").pop()
    // Format: documentType-originalName-timestamp.ext (e.g., budget-report-myfile-1234567890.pdf)
    const originalName = file.name.split(".")[0].replace(/\s+/g, "-").toLowerCase()
    const fileName = `${documentType}-${originalName}-${timestamp}.${ext}`

    // Ensure directory exists
    const docsPath = join(process.cwd(), "public", "documents")
    await mkdir(docsPath, { recursive: true })

    // Write file to public/documents
    const filePath = join(docsPath, fileName)
    const buffer = await file.arrayBuffer()
    await writeFile(filePath, Buffer.from(buffer))

    console.log("[v0] Document uploaded successfully:", fileName)

    // Save file info to database
    try {
      const supabase = await createServerClient()
      const { error: upsertError } = await supabase
        .from("documents")
        .upsert({
          document_type: documentType,
          file_name: file.name,
          file_path: fileName,
          file_size: file.size,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: "document_type"
        })

      if (upsertError) {
        console.error("[v0] Database upsert error:", upsertError)
      } else {
        console.log("[v0] Document record saved to database")
      }
    } catch (dbError) {
      console.error("[v0] Error saving document to database:", dbError)
      // Continue anyway - file is already uploaded
    }

    return NextResponse.json({
      success: true,
      fileName: fileName,
      path: `/documents/${fileName}`,
    })
  } catch (error) {
    console.error("[v0] Error uploading document:", error)
    return NextResponse.json(
      { error: "Failed to upload document" },
      { status: 500 }
    )
  }
}
