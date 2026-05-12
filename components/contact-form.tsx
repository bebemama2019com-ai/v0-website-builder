"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export function ContactForm() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("[v0] Form submitted:", formData)
    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      })
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <Card className="overflow-hidden rounded-3xl border-2 bg-gradient-to-br from-primary/10 to-accent/10">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <CheckCircle2 className="mb-4 h-16 w-16 text-primary" />
          <h3 className="mb-2 text-2xl font-bold text-foreground">{t.contact.form.success}</h3>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden rounded-3xl border-2">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">{t.contact.form.name} *</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Иван Петров"
              value={formData.name}
              onChange={handleChange}
              required
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t.contact.form.email} *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="ivan@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{t.contact.form.phone}</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+359 888 12 34 56"
              value={formData.phone}
              onChange={handleChange}
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{t.contact.form.message} *</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Моля добавете съобщение..."
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="rounded-xl"
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full rounded-full" size="lg">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t.contact.form.sending}
              </>
            ) : (
              t.contact.form.submit
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
