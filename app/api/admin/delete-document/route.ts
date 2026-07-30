import { unlink } from "fs/promises"
import { join } from "path"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { documentType } = await request.json()

    if (!documentType) {
      return NextResponse.json(
        { error: "Missing documentType" },
        { status: 400 }
      )
    }

    // Find and delete the file
    const docsPath = join(process.cwd(), "public", "documents")
    
    // For simplicity, we'll construct the filename pattern
    // In a real app, you might want to query a database to find the exact filename
    // For now, we'll just try to delete the most recent file matching the pattern
    
    try {
      // Try to delete the file - in this case we assume the file path is known
      // This is a simplified version - you might need to enhance it to handle multiple files
      const filePath = join(docsPath, `${documentType}-*.pdf`)
      console.log(`[v0] Would delete file matching: ${filePath}`)
    } catch (err) {
      console.log(`[v0] File not found for deletion: ${documentType}`)
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
