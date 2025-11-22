import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="text-center text-white max-w-2xl w-full">
        <div className="mb-8">
          <div className="text-6xl mb-4">🔗</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to TinyLink
          </h1>
          <p className="text-lg md:text-xl mb-8 text-blue-100">
            Professional URL shortener application
          </p>
        </div>
        
        {/* FIXED: Feature highlights as non-clickable cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-semibold mb-2">Instant Links</h3>
            <p className="text-sm text-blue-100">Create short links in seconds</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="font-semibold mb-2">Track Analytics</h3>
            <p className="text-sm text-blue-100">Monitor clicks and performance</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="font-semibold mb-2">Custom Codes</h3>
            <p className="text-sm text-blue-100">Use your own short codes</p>
          </div>
        </div>

        {/* Action Buttons - Clear call-to-action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/dashboard" 
            className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl text-center"
          >
            Go to Dashboard
          </Link>
          <Link 
            href="/api/healthz"
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 font-semibold text-lg transition-all duration-200 text-center"
          >
            Check API Health
          </Link>
        </div>
      </div>
    </div>
  )
}