import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Група СНЕЖАНКА - ДГ 202",
  description: "Информация за група СНЕЖАНКА в Детска градина 202",
}

export default function SnezhankaPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-secondary/20 via-background to-accent/10">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                Група <span className="text-primary">СНЕЖАНКА</span>
              </h1>
            </div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-card rounded-lg shadow-lg p-12 border border-border">
                <p className="text-2xl text-muted-foreground text-balance">
                  Очаква се прием на деца на есен
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
