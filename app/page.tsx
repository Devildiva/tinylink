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
        
        {/* FIXED: Simple feature highlights (not cards) */}
        <div className="space-y-4 mb-8 text-left max-w-md mx-auto">
          <div className="flex items-start space-x-3">
            <span className="text-2xl mt-1">⚡</span>
            <div>
              <h3 className="font-semibold text-white">Instant Links</h3>
              <p className="text-blue-100 text-sm">Create short links in seconds</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <span className="text-2xl mt-1">📊</span>
            <div>
              <h3 className="font-semibold text-white">Track Analytics</h3>
              <p className="text-blue-100 text-sm">Monitor clicks and performance</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <span className="text-2xl mt-1">🔧</span>
            <div>
              <h3 className="font-semibold text-white">Custom Codes</h3>
              <p className="text-blue-100 text-sm">Use your own short codes</p>
            </div>
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