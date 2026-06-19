import { useEffect, useState } from "react"

interface UseFetchWithFallbackOptions {
  endpoint: string
  fallbackData: any
  onError?: (error: Error) => void
}

/**
 * Reusable hook that fetches data from an API endpoint with automatic fallback to static data.
 * Perfect for fetching admin-managed content that can be stored in Supabase.
 *
 * Usage:
 * const data = useFetchWithFallback({
 *   endpoint: "/api/team",
 *   fallbackData: staticTeamMembers,
 * })
 */
export function useFetchWithFallback({ endpoint, fallbackData, onError }: UseFetchWithFallbackOptions) {
  const [data, setData] = useState(fallbackData)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
      const response = await fetch(endpoint, {
        cache: "no-store", // Always fetch fresh data, never use browser cache
      })

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const result = await response.json()

        // Only update if we got valid data
        if (Array.isArray(result)) {
          if (result.length > 0) {
            setData(result)
          }
          // If empty array, keep fallback data
        } else if (result && typeof result === "object") {
          setData(result)
        }

        setError(null)
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error")
        setError(error)
        // Keep using fallback data
        onError?.(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [endpoint, onError])

  return { data, isLoading, error }
}
