import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getSession } from '@/lib/auth/helpers'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const useCase = await prisma.useCase.findUnique({
      where: { id },
    })

    if (!useCase) {
      return NextResponse.json({ error: 'Use case not found' }, { status: 404 })
    }

    return NextResponse.json(useCase)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { 
      title, 
      slug, 
      challenge, 
      solution, 
      benefits, 
      seo_keywords, 
      meta_description, 
      hero_image,
      cta_label,
      pdf_download_url,
      published,
      order 
    } = body

    // Validate required fields
    if (!title || !slug || !challenge || !solution || !meta_description || !hero_image) {
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, challenge, solution, meta_description, hero_image' },
        { status: 400 }
      )
    }

    if (!benefits || benefits.length === 0) {
      return NextResponse.json(
        { error: 'At least one benefit is required' },
        { status: 400 }
      )
    }

    // Check for duplicate slug (excluding current use case)
    const existing = await prisma.useCase.findFirst({
      where: { slug, NOT: { id } },
    })
    if (existing) {
      return NextResponse.json(
        { error: 'Another use case with this slug already exists' },
        { status: 400 }
      )
    }

    const useCase = await prisma.useCase.update({
      where: { id },
      data: {
        title,
        slug,
        challenge,
        solution,
        benefits: benefits || [],
        seo_keywords: seo_keywords || [],
        meta_description,
        hero_image,
        cta_label: cta_label || 'Book a Demo',
        pdf_download_url: pdf_download_url || null,
        published: published || false,
        order: order || 0,
      },
    })

    return NextResponse.json(useCase)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    await prisma.useCase.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
