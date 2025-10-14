"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GalleryGrid } from "@/components/gallery-grid"
import { useLanguage } from "@/lib/i18n/language-context"

export default function GalleryPage() {
  const { t } = useLanguage()
  const [galleryImages, setGalleryImages] = useState([])

  useEffect(() => {
    // Fetch gallery images from API
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => setGalleryImages(data))
      .catch(() => {
        // Use fallback data
        setGalleryImages(fallbackImages)
      })
  }, [])

  const fallbackImages = [
    {
      _id: "1",
      title: "Art Class Fun",
      image: "/gallery-art-class.jpg?height=600&width=600&query=children doing art in kindergarten",
      category: "Activities",
      date: "2024-01-15",
    },
    {
      _id: "2",
      title: "Outdoor Play",
      image: "/gallery-outdoor.jpg?height=600&width=600&query=children playing outside kindergarten",
      category: "Outdoor Play",
      date: "2024-01-14",
    },
    {
      _id: "3",
      title: "Reading Corner",
      image: "/gallery-reading.jpg?height=600&width=600&query=children reading books in classroom",
      category: "Classroom",
      date: "2024-01-13",
    },
    {
      _id: "4",
      title: "Music Time",
      image: "/gallery-music.jpg?height=600&width=600&query=children playing musical instruments",
      category: "Activities",
      date: "2024-01-12",
    },
    {
      _id: "5",
      title: "Science Experiment",
      image: "/gallery-science.jpg?height=600&width=600&query=children doing science experiment",
      category: "Activities",
      date: "2024-01-11",
    },
    {
      _id: "6",
      title: "Playground Fun",
      image: "/gallery-playground.jpg?height=600&width=600&query=children on playground equipment",
      category: "Outdoor Play",
      date: "2024-01-10",
    },
    {
      _id: "7",
      title: "Colorful Classroom",
      image: "/gallery-classroom.jpg?height=600&width=600&query=bright colorful kindergarten classroom",
      category: "Classroom",
      date: "2024-01-09",
    },
    {
      _id: "8",
      title: "Garden Time",
      image: "/gallery-garden.jpg?height=600&width=600&query=children gardening with plants",
      category: "Outdoor Play",
      date: "2024-01-08",
    },
    {
      _id: "9",
      title: "Building Blocks",
      image: "/gallery-blocks.jpg?height=600&width=600&query=children playing with building blocks",
      category: "Classroom",
      date: "2024-01-07",
    },
    {
      _id: "10",
      title: "Holiday Celebration",
      image: "/gallery-celebration.jpg?height=600&width=600&query=children celebrating at kindergarten",
      category: "Events",
      date: "2024-01-06",
    },
    {
      _id: "11",
      title: "Painting Activity",
      image: "/gallery-painting.jpg?height=600&width=600&query=children painting at easels",
      category: "Activities",
      date: "2024-01-05",
    },
    {
      _id: "12",
      title: "Story Time Circle",
      image: "/gallery-storytime.jpg?height=600&width=600&query=teacher reading to children in circle",
      category: "Classroom",
      date: "2024-01-04",
    },
  ]

  const displayImages = galleryImages.length > 0 ? galleryImages : fallbackImages

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary/30 via-background to-accent/20 px-4 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-6 text-balance text-4xl font-bold leading-tight text-foreground lg:text-5xl">
            {t.gallery.hero.title}
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground lg:text-xl">
            {t.gallery.hero.description}
          </p>
        </div>
      </section>

      {/* Gallery Grid with Filters */}
      <section className="px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <GalleryGrid images={displayImages} />
        </div>
      </section>

      <Footer />
    </div>
  )
}
