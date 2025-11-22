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
        
        <div className="space-y-4 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <p className="text-base md:text-lg">Create short links instantly</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <p className="text-base md:text-lg">Track clicks and analytics</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <p className="text-base md:text-lg">Custom short codes available</p>
          </div>
        </div>

        {/* FIXED: Better mobile button layout */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/dashboard" 
            className="bg-white text-blue-600 px-6 py-4 rounded-lg hover:bg-gray-100 font-semibold text-base md:text-lg transition-all duration-200 shadow-lg hover:shadow-xl text-center"
          >
            Go to Dashboard
          </Link>
          <Link 
            href="/api/healthz"
            className="bg-transparent border-2 border-white text-white px-6 py-4 rounded-lg hover:bg-white/10 font-semibold text-base md:text-lg transition-all duration-200 text-center"
          >
            Check API Health
          </Link>
        </div>
      </div>
    </div>
  )
}