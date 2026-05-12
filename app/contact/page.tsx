"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export default function ContactPage() {
  const { t } = useLanguage()

  const contactInfo = [
    {
      icon: MapPin,
      title: t.contact.info.address.title,
      content: t.contact.info.address.content,
      color: "bg-chart-1",
    },
    {
      icon: Phone,
      title: t.contact.info.phone.title,
      content: t.contact.info.phone.content,
      color: "bg-chart-2",
    },
    {
      icon: Mail,
      title: t.contact.info.email.title,
      content: t.contact.info.email.content,
      color: "bg-chart-3",
    },
    {
      icon: Clock,
      title: t.contact.info.hours.title,
      content: t.contact.info.hours.content,
      color: "bg-chart-4",
    },
  ]

  const faqs = [
    {
      question: t.contact.faq.q1.question,
      answer: t.contact.faq.q1.answer,
    },
    {
      question: t.contact.faq.q2.question,
      answer: t.contact.faq.q2.answer,
    },
    {
      question: t.contact.faq.q3.question,
      answer: t.contact.faq.q3.answer,
    },
    {
      question: t.contact.faq.q4.question,
      answer: t.contact.faq.q4.answer,
    },
    {
      question: t.contact.faq.q5.question,
      answer: t.contact.faq.q5.answer,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary/30 via-background to-accent/20 px-4 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-6 text-balance text-4xl font-bold leading-tight text-foreground lg:text-5xl">
            {t.contact.hero.title}
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground lg:text-xl">
            {t.contact.hero.description}
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, index) => (
              <Card key={index} className="overflow-hidden rounded-3xl border-2">
                <CardContent className="p-6 text-center">
                  <div className={`mx-auto mb-4 inline-flex rounded-2xl ${info.color} p-3`}>
                    <info.icon className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-foreground">{info.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{info.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form and Map */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <div className="mb-6">
                <h2 className="mb-2 text-3xl font-bold text-foreground">{t.contact.form.title}</h2>
                <p className="leading-relaxed text-muted-foreground">{t.contact.form.subtitle}</p>
              </div>
              <ContactForm />
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-6">
              <Card className="overflow-hidden rounded-3xl border-2">
                <div className="aspect-[4/3] bg-muted">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412648718453!2d-73.98823492346069!3d40.75889097138558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Little Sprouts Kindergarten Location"
                  />
                </div>
              </Card>


            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/50 px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground lg:text-4xl">{t.contact.faq.title}</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="overflow-hidden rounded-3xl border-2">
                <CardContent className="p-6">
                  <h3 className="mb-2 text-lg font-bold text-foreground">{faq.question}</h3>
                  <p className="leading-relaxed text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
