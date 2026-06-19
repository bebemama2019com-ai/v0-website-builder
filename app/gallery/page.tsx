"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GalleryGrid } from "@/components/gallery-grid"
import { useLanguage } from "@/lib/i18n/language-context"
import { useFetchWithFallback } from "@/hooks/use-fetch-with-fallback"

// Move fallbackImages outside component to ensure it's available when useEffect runs
const fallbackImages = [
  // Real photos - Building & Exterior
  {
    _id: "r1",
    title: "Сграда на ДГ № 202",
    image: "/gallery/building-exterior.jpg",
    category: "Building",
    date: "2025-02-09",
  },
  {
    _id: "r2",
    title: "Вход на Детска Градина № 202",
    image: "/gallery/entrance-closeup.jpg",
    category: "Building",
    date: "2025-02-09",
  },
  // Real photos - Outdoor Play
  {
    _id: "r3",
    title: "Детска площадка",
    image: "/gallery/playground-outdoor.jpg",
    category: "Outdoor Play",
    date: "2025-02-09",
  },
  // Real photos - Classroom
  {
    _id: "r4",
    title: "Занималня с играчки",
    image: "/gallery/classroom-playroom.jpg",
    category: "Classroom",
    date: "2025-02-09",
  },
  {
    _id: "r5",
    title: "Книжки и образователни игри",
    image: "/gallery/bookshelf-toys.jpg",
    category: "Classroom",
    date: "2025-02-09",
  },
  {
    _id: "r6",
    title: "Шкафчета за децата",
    image: "/gallery/cubbies-storage.jpg",
    category: "Classroom",
    date: "2025-02-09",
  },
  // Real photos - Sleeping rooms
  {
    _id: "r7",
    title: "Спалня с декорации",
    image: "/gallery/sleeping-room-1.jpg",
    category: "Facilities",
    date: "2025-02-09",
  },
  {
    _id: "r8",
    title: "Спалня с рисунки на природа",
    image: "/gallery/sleeping-room-2.jpg",
    category: "Facilities",
    date: "2025-02-09",
  },
  // Real photos - Bathroom
  {
    _id: "r9",
    title: "Детска баня",
    image: "/gallery/children-bathroom.jpg",
    category: "Facilities",
    date: "2025-02-09",
  },
  // Real photos - Music hall & Lobby
  {
    _id: "r10",
    title: "Музикален салон",
    image: "/gallery/music-hall.jpg",
    category: "Facilities",
    date: "2025-02-09",
  },
  {
    _id: "r11",
    title: "Фоайе с рисунка на балони",
    image: "/gallery/lobby-mural.jpg",
    category: "Building",
    date: "2025-02-09",
  },
]

export default function GalleryPage() {
  const { t } = useLanguage()
  const { data: galleryImages } = useFetchWithFallback({
    endpoint: "/api/gallery",
    fallbackData: fallbackImages,
  })


  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/15 px-4 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-4 text-balance text-3xl font-bold leading-tight text-foreground lg:text-4xl">
            {t.gallery.hero.title}
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground lg:text-lg">
            {t.gallery.hero.description}
          </p>
        </div>
      </section>

      {/* Gallery Grid with Filters */}
      <section className="px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <GalleryGrid images={galleryImages} />
        </div>
      </section>

      <Footer />
    </div>
  )
}
