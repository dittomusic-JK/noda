import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getSession } from '@/lib/auth/helpers'

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const useCases = await prisma.useCase.findMany({
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(useCases)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { 
      title, 
      slug, 
      badge,
      challenge, 
      solution, 
      benefits,
      features,
      stats,
      seo_keywords, 
      meta_description, 
      hero_image,
      hero_subtitle,
      cta_label,
      cta_subtitle,
      use_case_param,
      published,
      order 
    } = body

    // Validate required fields
    if (!title || !slug || !challenge || !solution || !meta_description) {
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, challenge, solution, meta_description' },
        { status: 400 }
      )
    }

    // Check for duplicate slug
    const existing = await prisma.useCase.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json(
        { error: 'A use case with this slug already exists' },
        { status: 400 }
      )
    }

    const useCase = await prisma.useCase.create({
      data: {
        title,
        slug,
        badge: badge || 'AI Solution',
        challenge,
        solution,
        benefits: benefits || [],
        features: features || [],
        stats: stats || [],
        seo_keywords: seo_keywords || [],
        meta_description,
        hero_image: hero_image || null,
        hero_subtitle: hero_subtitle || null,
        cta_label: cta_label || 'Book a Demo',
        cta_subtitle: cta_subtitle || null,
        use_case_param: use_case_param || null,
        published: published || false,
        order: order || 0,
      },
    })

    return NextResponse.json(useCase, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
