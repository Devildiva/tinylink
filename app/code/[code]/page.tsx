'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface LinkData {
  id: string
  code: string
  targetUrl: string
  clicks: number
  lastClicked: string | null
  createdAt: string
}

interface PageProps {
  params: Promise<{ code: string }>
}

export default function StatsPage({ params }: PageProps) {
  const [link, setLink] = useState<LinkData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const { code } = await params
        const res = await fetch(`/api/links/${code}`)
        if (!res.ok) {
          throw new Error('Failed to fetch link')
        }
        const data = await res.json()
        setLink(data)
      } catch (error) {
        console.error('Failed to fetch link')
      } finally {
        setLoading(false)
      }
    }
    
    fetchLink()
  }, [params])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-2">Loading stats...</p>
        </div>
      </div>
    )
  }

  if (!link) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Link Not Found</h1>
          <Link href="/dashboard" className="text-blue-600 hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const shortUrl = `${window.location.origin}/${link.code}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl)
    alert('Copied to clipboard!')
  }

  const testRedirect = () => {
    window.open(shortUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/dashboard" className="inline-block text-blue-600 hover:text-blue-800 mb-4 font-medium">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📊 Stats for {link.code}</h1>
          <p className="text-gray-600">Track your link performance</p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          
          {/* Left Column */}
          <div className="space-y-6">
            {/* Short URL Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">🔗 Short URL</h3>
              <div className="bg-gray-100 p-3 rounded-lg">
                <code className="text-blue-700 font-mono break-all font-semibold">{shortUrl}</code>
              </div>
              <button
                onClick={copyToClipboard}
                className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Copy URL
              </button>
            </div>

            {/* Target URL Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">🎯 Target URL</h3>
              <a 
                href={link.targetUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-700 hover:text-green-900 break-all underline font-medium"
              >
                {link.targetUrl}
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Clicks Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">👆 Total Clicks</h3>
              <div className="text-4xl font-bold text-purple-600">{link.clicks}</div>
              <p className="text-gray-700 text-sm mt-2 font-medium">
                {link.clicks === 0 ? 'No clicks yet' : 
                 link.clicks === 1 ? '1 click total' : 
                 `${link.clicks} clicks total`}
              </p>
            </div>

            {/* Dates Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">📅 Timeline</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-700 font-medium">Created</p>
                  <p className="font-semibold text-gray-900 text-lg">
                    {new Date(link.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-700 font-medium">Last Clicked</p>
                  <p className="font-semibold text-gray-900 text-lg">
                    {link.lastClicked ? 
                      new Date(link.lastClicked).toLocaleDateString() : 
                      'Never'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={testRedirect}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Test Redirect
            </button>
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Create New Link
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}