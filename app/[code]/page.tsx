import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'

interface PageProps {
  params: Promise<{ code: string }>
}

export default async function RedirectPage({ params }: PageProps) {
  const { code } = await params
  const link = await prisma.link.findUnique({
    where: { code }
  })

  if (!link) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Link Not Found</h1>
          <p className="text-gray-600">The short link you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  // Update click count
  await prisma.link.update({
    where: { code },
    data: {
      clicks: { increment: 1 },
      lastClicked: new Date()
    }
  })

  redirect(link.targetUrl)
}