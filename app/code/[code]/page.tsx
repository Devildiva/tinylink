import Link from 'next/link'
import { prisma } from '@/lib/db'

interface PageProps {
  params: Promise<{ code: string }>
}

export default async function StatsPage({ params }: PageProps) {
  const { code } = await params
  const link = await prisma.link.findUnique({
    where: { code }
  })

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="mb-8">
          <Link href="/dashboard" className="text-blue-600 hover:underline mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Stats for {link.code}</h1>
        </header>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Short URL</h3>
              <p className="font-mono bg-gray-100 p-2 rounded">
                http://localhost:3000/{link.code}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Target URL</h3>
              <p className="break-all">{link.targetUrl}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Total Clicks</h3>
              <p className="text-2xl font-bold">{link.clicks}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Last Clicked</h3>
              <p>{link.lastClicked ? new Date(link.lastClicked).toLocaleString() : 'Never'}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Created</h3>
              <p>{link.createdAt.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}