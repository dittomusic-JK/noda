import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { requireAuth } from '@/lib/auth/helpers'

export async function GET() {
  try {
    await requireAuth()

    const caseStudies = await prisma.caseStudy.findMany({
      orderBy: { created_at: 'desc' },
    })

    return NextResponse.json(caseStudies)
  } catch (error) {
    console.error('Error fetching case studies:', error)
    return NextResponse.json(
      { error: 'Failed to fetch case studies' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireAuth()
    const data = await request.json()

    // Validate required fields
    if (!data.title || !data.slug || !data.client || !data.industry) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existing = await prisma.caseStudy.findUnique({
      where: { slug: data.slug },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'A case study with this slug already exists' },
        { status: 400 }
      )
    }

    const caseStudy = await prisma.caseStudy.create({
      data: {
        slug: data.slug,
        title: data.title,
        client: data.client,
        industry: data.industry,
        excerpt: data.excerpt,
        challenge: data.challenge,
        solution: data.solution,
        results: data.results,
        hero_image: data.hero_image || null,
        logo_image: data.logo_image || null,
        tags: data.tags || [],
        metrics: data.metrics || null,
        meta_description: data.meta_description || null,
        published: data.published || false,
        featured: data.featured || false,
        created_by: session.user.id,
      },
    })

    return NextResponse.json(caseStudy, { status: 201 })
  } catch (error) {
    console.error('Error creating case study:', error)
    return NextResponse.json(
      { error: 'Failed to create case study' },
      { status: 500 }
    )
  }
}
