import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { requireAuth } from '@/lib/auth/helpers'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth()
    const { id } = await params

    const caseStudy = await prisma.caseStudy.findUnique({
      where: { id },
    })

    if (!caseStudy) {
      return NextResponse.json(
        { error: 'Case study not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(caseStudy)
  } catch (error) {
    console.error('Error fetching case study:', error)
    return NextResponse.json(
      { error: 'Failed to fetch case study' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth()
    const { id } = await params
    const data = await request.json()

    // Check if case study exists
    const existing = await prisma.caseStudy.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Case study not found' },
        { status: 404 }
      )
    }

    // If slug is changing, check for conflicts
    if (data.slug && data.slug !== existing.slug) {
      const slugConflict = await prisma.caseStudy.findUnique({
        where: { slug: data.slug },
      })

      if (slugConflict) {
        return NextResponse.json(
          { error: 'A case study with this slug already exists' },
          { status: 400 }
        )
      }
    }

    const caseStudy = await prisma.caseStudy.update({
      where: { id },
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
        published: data.published,
        featured: data.featured,
      },
    })

    return NextResponse.json(caseStudy)
  } catch (error) {
    console.error('Error updating case study:', error)
    return NextResponse.json(
      { error: 'Failed to update case study' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth()
    const { id } = await params

    // Check if case study exists
    const existing = await prisma.caseStudy.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Case study not found' },
        { status: 404 }
      )
    }

    await prisma.caseStudy.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting case study:', error)
    return NextResponse.json(
      { error: 'Failed to delete case study' },
      { status: 500 }
    )
  }
}
