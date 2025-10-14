import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      content: "123 Learning Lane, Education City, EC 12345",
      color: "bg-chart-1",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+1 (555) 123-4567",
      color: "bg-chart-2",
    },
    {
      icon: Mail,
      title: "Email",
      content: "hello@littlesprouts.com",
      color: "bg-chart-3",
    },
    {
      icon: Clock,
      title: "Hours",
      content: "Monday - Friday: 7:00 AM - 6:00 PM",
      color: "bg-chart-4",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary/30 via-background to-accent/20 px-4 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-6 text-balance text-4xl font-bold leading-tight text-foreground lg:text-5xl">
            Get in Touch
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground lg:text-xl">
            We'd love to hear from you! Schedule a tour, ask questions, or learn more about enrollment at Little
            Sprouts.
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
                <h2 className="mb-2 text-3xl font-bold text-foreground">Send Us a Message</h2>
                <p className="leading-relaxed text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
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

              <Card className="overflow-hidden rounded-3xl border-2 bg-gradient-to-br from-primary/10 to-accent/10">
                <CardContent className="p-8">
                  <h3 className="mb-4 text-2xl font-bold text-foreground">Schedule a Tour</h3>
                  <p className="mb-4 leading-relaxed text-muted-foreground">
                    The best way to experience Little Sprouts is to visit us in person! We offer tours Monday through
                    Friday at 10:00 AM and 2:00 PM.
                  </p>
                  <p className="leading-relaxed text-muted-foreground">
                    During your visit, you'll meet our teachers, see our classrooms and facilities, and learn about our
                    curriculum and daily activities.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/50 px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground lg:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                question: "What ages do you accept?",
                answer:
                  "We accept children from 18 months to 5 years old, with programs tailored for toddlers, preschoolers, and pre-kindergarten students.",
              },
              {
                question: "What are your hours of operation?",
                answer:
                  "We're open Monday through Friday from 7:00 AM to 6:00 PM. We offer both full-day and half-day programs to accommodate different family schedules.",
              },
              {
                question: "What is your teacher-to-student ratio?",
                answer:
                  "We maintain low ratios to ensure personalized attention: 1:4 for toddlers, 1:8 for preschoolers, and 1:10 for pre-K students.",
              },
              {
                question: "Do you provide meals?",
                answer:
                  "We provide healthy snacks in the morning and afternoon. Families provide lunch, and we have refrigeration and warming facilities available.",
              },
              {
                question: "How do I enroll my child?",
                answer:
                  "Start by scheduling a tour to visit our facility. After your tour, we'll provide enrollment paperwork and discuss available start dates.",
              },
            ].map((faq, index) => (
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
