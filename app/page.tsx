"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Construction, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function UnderConstructionPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1 items-center justify-center bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 px-4">
        <Card className="w-full max-w-2xl border-primary/20 shadow-xl">
          <CardContent className="p-12 text-center">
            <Construction className="mx-auto mb-6 h-24 w-24 text-primary" />

            <h1 className="mb-4 text-4xl font-bold text-foreground lg:text-5xl">Сайтът е в процес на разработка</h1>

            <div className="mx-auto mb-8 h-1 w-24 bg-primary" />

            <div className="mb-8 space-y-4 text-lg text-muted-foreground">
              <p>Работим усилено, за да ви предоставим най-добрия опит.</p>
              <p className="flex items-center justify-center gap-2 text-primary">
                <Clock className="h-5 w-5" />
                Скоро се завръщаме!
              </p>
            </div>

            <div className="rounded-lg bg-primary/5 p-6">
              <p className="text-sm text-muted-foreground">
                <strong>Детска Градина 202</strong>
                <br />
                ж.к. Младост 1, София
              </p>
            </div>
            {/* </CHANGE> */}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
