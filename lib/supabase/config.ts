// Supabase connection settings, read from environment variables
// (Vercel → Project → Settings → Environment Variables, or .env.local for local development).
//
// Both values are public by design: they are shipped to the browser, and the
// database's row-level security policies decide what each visitor may do.
// The `process.env.NEXT_PUBLIC_...` names must be written out in full so Next.js
// can inline them into the browser bundle at build time.

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!url || !anonKey) {
  throw new Error(
    "Missing Supabase settings: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in the environment.",
  )
}

export const SUPABASE_URL: string = url
export const SUPABASE_ANON_KEY: string = anonKey
