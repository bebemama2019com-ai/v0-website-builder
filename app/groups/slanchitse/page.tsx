import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Users, BookOpen, Palette, Music } from "lucide-react"

export const metadata: Metadata = {
  title: "Група СЛЪНЧИЦЕ - ДГ 202",
  description: "Информация за група СЛЪНЧИЦЕ в Детска градина 202",
}

export default function SlanchitsePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-secondary/20 via-background to-accent/10">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-primary/10 rounded-full px-6 py-2 mb-6">
                <span className="text-primary font-semibold">Възраст: 3-4 години</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                Група <span className="text-primary">СЛЪНЧИЦЕ</span>
              </h1>
              <p className="text-xl text-muted-foreground text-balance">Откриваме света чрез игра и творчество</p>
            </div>
          </div>
        </section>

        {/* Teacher Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
                <div className="flex items-center gap-2 mb-6">
                  <Users className="w-6 h-6 text-primary" />
                  <h2 className="text-3xl font-bold">Ръководител на групата</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-primary mb-2">Ренета Попгеоргиева</h3>
                    <p className="text-muted-foreground font-medium">Магистър по "ПНУП"</p>
                  </div>
                  <p className="text-lg leading-relaxed">
                    Опитен педагог с богат опит в работата с деца от предучилищна възраст. Специализирана в ранното
                    детско развитие и използва съвременни образователни методи, които стимулират креативността и
                    любознателността на децата.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Activities Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Основни дейности</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-card rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
                  <BookOpen className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Развитие на речта</h3>
                  <p className="text-muted-foreground">Обогатяване на речниковия запас и комуникативни умения</p>
                </div>
                <div className="bg-card rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
                  <Palette className="w-12 h-12 text-secondary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Творчество</h3>
                  <p className="text-muted-foreground">Рисуване, моделиране и развиване на въображението</p>
                </div>
                <div className="bg-card rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
                  <Music className="w-12 h-12 text-accent mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Музика</h3>
                  <p className="text-muted-foreground">Музикално-ритмични игри и песни</p>
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
