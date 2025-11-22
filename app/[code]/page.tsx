import { redirect } from 'next/navigation'
import { notFound } from 'next/navigation'
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
    // Return proper 404 status code instead of custom page
    notFound()
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