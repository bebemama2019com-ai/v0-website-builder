import { NextResponse } from "next/server"

// Sends contact-form messages by email through Resend (https://resend.com).
//
// Environment variables (set in Vercel):
//   RESEND_API_KEY       required — API key from the Resend dashboard
//   CONTACT_TO_EMAIL     optional — inbox that receives messages (default: dg202sofia@abv.bg)
//   CONTACT_FROM_EMAIL   optional — sender; must be on a domain verified in Resend,
//                        e.g. "ДГ 202 <noreply@dg202.bg>" (default: Resend's test sender,
//                        which can only deliver to the Resend account owner's own address)

const TO = process.env.CONTACT_TO_EMAIL || "dg202sofia@abv.bg"
const FROM = process.env.CONTACT_FROM_EMAIL || "ДГ 202 <onboarding@resend.dev>"

const LIMITS = { name: 100, email: 200, phone: 40, message: 5000 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function field(body: Record<string, unknown>, key: keyof typeof LIMITS) {
  const value = body[key]
  return typeof value === "string" ? value.trim().slice(0, LIMITS[key]) : ""
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  // Honeypot: a hidden field real visitors never fill in. Pretend success to bots.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ success: true })
  }

  const name = field(body, "name")
  const email = field(body, "email")
  const phone = field(body, "phone")
  const message = field(body, "message")

  if (!name || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please fill in name, a valid email and a message" }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not set")
    return NextResponse.json({ error: "Email is not configured" }, { status: 503 })
  }

  const html = `
    <h2>Ново съобщение от сайта на ДГ 202</h2>
    <p><strong>Име:</strong> ${escapeHtml(name)}</p>
    <p><strong>Имейл:</strong> ${escapeHtml(email)}</p>
    ${phone ? `<p><strong>Телефон:</strong> ${escapeHtml(phone)}</p>` : ""}
    <p><strong>Съобщение:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `

  const text = `Име: ${name}\nИмейл: ${email}\n${phone ? `Телефон: ${phone}\n` : ""}\n${message}`

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: `Съобщение от сайта: ${name}`,
        html,
        text,
      }),
    })

    if (!response.ok) {
      console.error("Contact form: Resend returned", response.status, await response.text())
      return NextResponse.json({ error: "Failed to send message" }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form: send failed", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 502 })
  }
}
