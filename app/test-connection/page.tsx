"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle2, XCircle, AlertCircle } from "lucide-react"

export default function TestConnectionPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const testConnection = async () => {
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/test-supabase")
      const data = await response.json()
      setResult(data)
    } catch (error: any) {
      setResult({
        success: false,
        error: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    testConnection()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-coral/10 via-mint/10 to-sky/10 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">Supabase Connection Test</h1>
          <p className="text-gray-600">Testing your database connection and setup</p>
        </div>

        <Card className="p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Connection Status</h2>
            <Button onClick={testConnection} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : (
                "Test Again"
              )}
            </Button>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-coral" />
            </div>
          )}

          {result && !loading && (
            <div className="space-y-6">
              {/* Overall Status */}
              <div className={`flex items-center gap-3 rounded-lg p-4 ${result.success ? "bg-green-50" : "bg-red-50"}`}>
                {result.success ? (
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-600" />
                )}
                <div>
                  <p className={`font-semibold ${result.success ? "text-green-900" : "text-red-900"}`}>
                    {result.success ? "Connection Successful!" : "Connection Failed"}
                  </p>
                  <p className={`text-sm ${result.success ? "text-green-700" : "text-red-700"}`}>
                    {result.message || result.error}
                  </p>
                </div>
              </div>

              {/* Detailed Results */}
              {result.results && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Test Results:</h3>

                  {/* Authentication */}
                  <div className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Authentication</span>
                    </div>
                    <p className="text-sm text-gray-600">{result.results.authentication}</p>
                    {result.results.currentUser && (
                      <p className="text-sm text-gray-500">Current user: {result.results.currentUser}</p>
                    )}
                  </div>

                  {/* Tables */}
                  <div className="rounded-lg border p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Database Tables</span>
                    </div>
                    <div className="space-y-2">
                      {Object.entries(result.results.tables).map(([table, status]: [string, any]) => (
                        <div key={table} className="flex items-center justify-between text-sm">
                          <span className="font-mono text-gray-700">{table}</span>
                          <span className={status.includes("Not found") ? "text-orange-600" : "text-green-600"}>
                            {status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Next Steps */}
                  {result.results.nextSteps && (
                    <div className="rounded-lg bg-blue-50 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-blue-600" />
                        <span className="font-semibold text-blue-900">Next Steps</span>
                      </div>
                      <p className="text-sm text-blue-800">{result.results.nextSteps}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Error Details */}
              {result.details && (
                <div className="rounded-lg bg-red-50 p-4">
                  <p className="text-sm text-red-800">{result.details}</p>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Instructions */}
        <Card className="mt-6 p-6">
          <h3 className="mb-3 font-semibold text-gray-900">Setup Instructions</h3>
          <ol className="space-y-2 text-sm text-gray-600">
            <li>1. Make sure your Supabase environment variables are set in Vercel</li>
            <li>
              2. Run the SQL scripts in the <code className="rounded bg-gray-100 px-2 py-1">scripts/</code> folder
            </li>
            <li>3. Create your first admin user in Supabase Authentication</li>
            <li>4. Add your user ID to the admin_users table</li>
            <li>
              5. Visit <code className="rounded bg-gray-100 px-2 py-1">/admin/login</code> to access the CMS
            </li>
          </ol>
        </Card>
      </div>
    </div>
  )
}
