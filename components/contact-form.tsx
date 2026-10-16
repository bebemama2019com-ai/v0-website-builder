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
    website: "", // honeypot, hidden from visitors
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!response.ok) throw new Error(`Request failed: ${response.status}`)

      setIsSubmitted(true)
      setFormData({ name: "", email: "", phone: "", message: "", website: "" })
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (err) {
      console.error("Contact form submit failed:", err)
      setError("Съобщението не можа да бъде изпратено. Моля, опитайте отново или ни пишете на dg202sofia@abv.bg.")
    } finally {
      setIsSubmitting(false)
    }
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

          {/* Honeypot: hidden from people, filled in by spam bots */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website}
              onChange={handleChange}
            />
          </div>

          {error && (
            <p role="alert" className="rounded-xl bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </p>
          )}

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
