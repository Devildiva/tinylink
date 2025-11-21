import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to TinyLink
        </h1>
        <p className="text-gray-600 mb-8">
          URL shortener application - Coming soon!
        </p>
        <div className="space-x-4">
          <Link 
            href="/dashboard" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Go to Dashboard
          </Link>
          <Link 
            href="/api/healthz"  // ← FIXED: healthz not health
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Check API Health
          </Link>
        </div>
      </div>
    </div>
  )
}