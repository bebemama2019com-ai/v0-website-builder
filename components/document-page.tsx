import Header from "@/components/header"
import Footer from "@/components/footer"
import { Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"
import { createServerClient } from "@/lib/supabase/server"
import { getDocumentByPath, getDocumentUrl } from "@/lib/documents"
import { getDocumentPageHeader } from "@/lib/document-page-content"
import { RichText } from "@/components/rich-text"
import { unstable_rethrow } from "next/navigation"

interface DocumentSection {
  title: string
  content: string[]
}

interface DocumentPageProps {
  title: string
  subtitle: string
  /** Key of this page in lib/document-pages.ts; its header box is editable in the admin panel */
  pageKey: string
  pdfPath: string
  icon: LucideIcon
  sections: DocumentSection[]
}

export async function DocumentPage({
  title,
  subtitle,
  pageKey,
  pdfPath,
  icon: Icon,
  sections,
}: DocumentPageProps) {
  const header = await getDocumentPageHeader(pageKey)

  // A document is downloadable when it has a row in the `documents` table.
  // The row decides whether parents get an admin-uploaded file or the original one.
  let downloadUrl: string | null = null
  const entry = getDocumentByPath(pdfPath)
  if (entry) {
    try {
      const supabase = await createServerClient()
      const { data: doc } = await supabase
        .from("documents")
        .select("file_path")
        .eq("document_type", entry.type)
        .maybeSingle()
      if (doc) downloadUrl = getDocumentUrl(entry, doc.file_path)
    } catch (error) {
      unstable_rethrow(error)
      console.error("Error checking document availability:", error)
    }
  }
  const fileAvailable = downloadUrl !== null
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-secondary/20 via-background to-accent/10">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-primary/10 rounded-full px-6 py-2 mb-6">
                <span className="text-primary font-semibold">{subtitle}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                {title}
              </h1>
              {fileAvailable ? (
                <a href={downloadUrl ?? pdfPath} download target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="gap-2 text-lg px-8 py-6 rounded-xl mt-4">
                    <Download className="w-5 h-5" />
                    Свали PDF документа
                  </Button>
                </a>
              ) : (
                <div className="mt-4 text-muted-foreground">
                  Документът не е наличен
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Order Info */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
                <div className="flex items-start gap-3">
                  <FileText className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-lg mb-1"><RichText text={header.orderInfo} /></p>
                    <p className="text-muted-foreground"><RichText text={header.orderDetails} /></p>
                    <p className="text-sm text-muted-foreground mt-2 italic"><RichText text={header.approvedBy} /></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        {sections.map((section, sectionIndex) => (
          <section key={sectionIndex} className={`py-12 ${sectionIndex % 2 === 1 ? "bg-card/50" : ""}`}>
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/10 rounded-full p-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>
                <div className="space-y-4">
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-muted-foreground leading-relaxed text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Download Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-lg p-8 border border-border">
                <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Изтегли пълния документ</h2>
                <p className="text-muted-foreground mb-6">
                  Свалете официалния PDF документ
                </p>
                {fileAvailable ? (
                  <a href={downloadUrl ?? pdfPath} download target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="gap-2 rounded-xl">
                      <Download className="w-5 h-5" />
                      Свали PDF
                    </Button>
                  </a>
                ) : (
                  <div className="text-muted-foreground">
                    Документът не е наличен
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
