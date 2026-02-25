"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

interface GalleryImage {
  _id: string
  title: string
  image: string
  category: string
  date: string
}

interface GalleryGridProps {
  images: GalleryImage[]
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(images.map((img) => img.category)))]

  // Filter images based on selected category
  const filteredImages = selectedCategory === "All" ? images : images.filter((img) => img.category === selectedCategory)

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "All":
        return t.gallery.filters.all
      case "Classroom":
        return t.gallery.filters.classroom
      case "Outdoor Play":
        return t.gallery.filters.outdoor
      case "Activities":
        return t.gallery.filters.activities
      case "Events":
        return t.gallery.filters.events
      case "Building":
        return t.gallery.filters.building || "Сграда"
      case "Facilities":
        return t.gallery.filters.facilities || "Помещения"
      default:
        return category
    }
  }

  return (
    <>
      {/* Category Filters */}
      <div className="mb-8 flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            variant={selectedCategory === category ? "default" : "outline"}
            className="rounded-full"
          >
            {getCategoryLabel(category)}
          </Button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredImages.map((image) => (
          <button
            key={image._id}
            onClick={() => setSelectedImage(image)}
            className="group relative aspect-square overflow-hidden rounded-3xl transition-transform hover:scale-[1.02]"
          >
            <img
              src={image.image || "/placeholder.svg"}
              alt={image.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-left opacity-0 transition-opacity group-hover:opacity-100">
              <h3 className="text-lg font-bold text-white">{image.title}</h3>
              <p className="text-sm text-white/80">{getCategoryLabel(image.category)}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl border-0 bg-transparent p-0 shadow-none">
          <div className="relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -right-4 -top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-lg transition-transform hover:scale-110"
            >
              <X className="h-5 w-5" />
            </button>
            {selectedImage && (
              <div className="overflow-hidden rounded-3xl bg-card">
                <img
                  src={selectedImage.image || "/placeholder.svg"}
                  alt={selectedImage.title}
                  className="h-auto w-full"
                />
                <div className="p-6">
                  <h3 className="mb-2 text-2xl font-bold text-foreground">{selectedImage.title}</h3>
                  <p className="text-muted-foreground">
                    {getCategoryLabel(selectedImage.category)} • {new Date(selectedImage.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
