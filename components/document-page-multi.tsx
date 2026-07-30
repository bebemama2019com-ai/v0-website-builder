"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DocumentFile {
  name: string
  path: string
  description?: string
}

interface DocumentSection {
  title: string
  content: string[]
}

interface DocumentPageMultiProps {
  title: string
  subtitle: string
  orderInfo: string
  orderDetails: string
  approvedBy: string
  files: DocumentFile[]
  sections: DocumentSection[]
}

export function DocumentPageMulti({
  title,
  subtitle,
  orderInfo,
  orderDetails,
  approvedBy,
  files,
  sections,
}: DocumentPageMultiProps) {
  const [availableFiles, setAvailableFiles] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function checkFilesExist() {
      const available = new Set<string>()
      
      for (const file of files) {
        try {
          const response = await fetch(file.path, { method: "HEAD" })
          if (response.ok) {
            available.add(file.path)
          }
        } catch (error) {
          console.log(`[v0] File not available: ${file.path}`)
        }
      }
      
      setAvailableFiles(available)
      setIsLoading(false)
    }

    checkFilesExist()
  }, [files])


  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-secondary/20 via-background to-accent/10">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-primary/10 rounded-full px-6 py-2 mb-6 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <span className="text-primary font-semibold">{subtitle}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                {title}
              </h1>
              <p className="text-muted-foreground text-lg mb-6">
                {files.length} документ{files.length === 1 ? "" : "а"}
              </p>
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
                    <p className="font-semibold text-lg mb-1">{orderInfo}</p>
                    <p className="text-muted-foreground">{orderDetails}</p>
                    <p className="text-sm text-muted-foreground mt-2 italic">{approvedBy}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Files Section */}
        <section className="py-12 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-primary/10 rounded-full p-3">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Налични документи</h2>
              </div>
              <div className="grid gap-4">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="bg-background rounded-lg border border-border p-6 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="bg-primary/10 rounded-lg p-3 flex-shrink-0 mt-1">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-foreground mb-1">
                            {file.name}
                          </h3>
                          {file.description && (
                            <p className="text-muted-foreground text-sm">
                              {file.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        {availableFiles.has(file.path) ? (
                          <a href={file.path} download>
                            <Button size="sm" className="gap-2">
                              <Download className="w-4 h-4" />
                              Свали
                            </Button>
                          </a>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            Не е налично
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
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
                    <FileText className="w-6 h-6 text-primary" />
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
                <h2 className="text-2xl font-bold mb-2">Всички документи</h2>
                <p className="text-muted-foreground mb-6">
                  Свалете всички финансови отчети в PDF формат
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {files.map((file, index) => (
                    availableFiles.has(file.path) ? (
                      <a key={index} href={file.path} download>
                        <Button variant="outline" className="gap-2">
                          <Download className="w-4 h-4" />
                          {file.name}
                        </Button>
                      </a>
                    ) : (
                      <Button
                        key={index}
                        variant="outline"
                        disabled
                        className="gap-2 opacity-50 cursor-not-allowed"
                      >
                        <FileText className="w-4 h-4" />
                        {file.name}
                      </Button>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
