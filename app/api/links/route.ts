import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const links = await prisma.link.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(links)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch links' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { targetUrl, code } = await request.json()
    
    // Validation
    if (!targetUrl) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }
    
    try {
      new URL(targetUrl)
    } catch {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
    }

    if (code && !/^[A-Za-z0-9]{6,8}$/.test(code)) {
      return NextResponse.json({ error: 'Code must be 6-8 alphanumeric characters' }, { status: 400 })
    }

    // Check if code exists
    if (code) {
      const existingCode = await prisma.link.findUnique({ where: { code } })
      if (existingCode) {
        return NextResponse.json({ error: 'Code already exists' }, { status: 409 })
      }
    }

    // Check if URL already exists
    const existingUrl = await prisma.link.findFirst({ 
      where: { targetUrl } 
    })
    if (existingUrl) {
      return NextResponse.json({ error: 'URL already exists' }, { status: 409 })
    }

    const link = await prisma.link.create({
      data: {
        code: code || generateRandomCode(),
        targetUrl,
        clicks: 0
      }
    })

    return NextResponse.json(link, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create link' }, { status: 500 })
  }
}

function generateRandomCode(): string {
  return Math.random().toString(36).substring(2, 8)
}