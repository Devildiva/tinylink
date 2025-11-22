import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="text-center text-white max-w-2xl">
        <div className="mb-8">
          <div className="text-6xl mb-4">🔗</div>
          <h1 className="text-5xl font-bold mb-6">
            Welcome to TinyLink
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            Professional URL shortener application
          </p>
        </div>
        
        <div className="space-y-4 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <p className="text-lg">Create short links instantly</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <p className="text-lg">Track clicks and analytics</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <p className="text-lg">Custom short codes available</p>
          </div>
        </div>

        <div className="space-x-4">
          <Link 
            href="/dashboard" 
            className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Go to Dashboard
          </Link>
          <Link 
            href="/api/healthz"
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 font-semibold text-lg transition-all duration-200"
          >
            Check API Health
          </Link>
        </div>
      </div>
    </div>
  )
}