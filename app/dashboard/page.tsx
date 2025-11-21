'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Link {
  id: string
  code: string
  targetUrl: string
  clicks: number
  lastClicked: string | null
  createdAt: string
}

export default function Dashboard() {
  const [links, setLinks] = useState<Link[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ targetUrl: '', code: '' })
  const [error, setError] = useState('')
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    fetchLinks()
  }, [])

  const fetchLinks = async () => {
    try {
      const res = await fetch('/api/links')
      const data = await res.json()
      setLinks(data)
    } catch (err) {
      console.error('Failed to fetch links')
    } finally {
      setLoading(false)
    }
  }

  const validateForm = () => {
    if (!formData.targetUrl.trim()) {
      setError('Please enter a URL')
      return false
    }
    
    try {
      new URL(formData.targetUrl)
    } catch {
      setError('Please enter a valid URL (include http:// or https://)')
      return false
    }

    if (formData.code && !/^[A-Za-z0-9]{6,8}$/.test(formData.code)) {
      setError('Custom code must be 6-8 letters/numbers only')
      return false
    }
    
    setError('')
    return true
  }

  const createLink = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    
    setCreating(true)
    setError('')
    
    try {
      const res = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to create link')
      }

      await fetchLinks()
      setFormData({ targetUrl: '', code: '' })
      setShowForm(false)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setCreating(false)
    }
  }

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/${code}`)
    alert('Copied to clipboard!')
  }

  const deleteLink = async (code: string) => {
    if (!confirm('Are you sure you want to delete this link?')) return

    try {
      const res = await fetch(`/api/links/${code}`, { method: 'DELETE' })
      if (res.ok) {
        await fetchLinks()
      } else {
        setError('Failed to delete link')
      }
    } catch (err) {
      setError('Failed to delete link')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">TinyLink Dashboard</h1>
          <p className="text-gray-600">Manage your short URLs</p>
        </header>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Links</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              {showForm ? 'Cancel' : 'Add Link'}
            </button>
          </div>

          {showForm && (
            <form onSubmit={createLink} className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Destination URL *</label>
                  <input
                    type="url"
                    required
                    value={formData.targetUrl}
                    onChange={(e) => setFormData({ ...formData, targetUrl: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Custom Code (optional)</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="my-link"
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-2">6-8 alphanumeric characters (letters and numbers only)</p>
                </div>
              </div>
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}
              
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={creating}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed transition-colors"
                >
                  {creating ? 'Creating...' : 'Create Link'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setError('')
                    setFormData({ targetUrl: '', code: '' })
                  }}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 mt-2">Loading links...</p>
            </div>
          ) : links.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">🔗</div>
              <h3 className="text-lg font-medium mb-2">No links yet</h3>
              <p className="mb-4">Create your first short link to get started!</p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Your First Link
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-3 text-sm font-medium text-gray-700">Short Code</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-700">Target URL</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-700">Clicks</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-700">Last Clicked</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {links.map((link) => (
                    <tr key={link.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm border border-blue-200 font-semibold">
                            {link.code}
                          </span>
                          <button
                            onClick={() => copyToClipboard(link.code)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                            title="Copy short URL"
                          >
                            Copy
                          </button>
                        </div>
                      </td>
                      <td className="p-3 max-w-xs">
                        <div className="truncate text-gray-600" title={link.targetUrl}>
                          {link.targetUrl}
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="font-semibold text-gray-900">{link.clicks}</span>
                      </td>
                      <td className="p-3 text-sm text-gray-600">
                        {link.lastClicked ? new Date(link.lastClicked).toLocaleString() : 'Never'}
                      </td>
                      <td className="p-3">
                        <div className="flex gap-3">
                          <Link
                            href={`/code/${link.code}`}
                            className="text-green-600 hover:text-green-800 text-sm font-medium transition-colors"
                          >
                            Stats
                          </Link>
                          <button
                            onClick={() => deleteLink(link.code)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}