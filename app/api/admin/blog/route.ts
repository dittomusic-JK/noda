import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getSession } from '@/lib/auth/helpers'

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const posts = await prisma.post.findMany({
      orderBy: { created_at: 'desc' },
    })

    return NextResponse.json(posts)
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
    const { title, slug, excerpt, content, author, tags, meta_description, og_image_url, published, published_at } = body

    // Validate required fields
    if (!title || !slug || !content || !author) {
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, content, author' },
        { status: 400 }
      )
    }

    // Check for duplicate slug
    const existing = await prisma.post.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 400 }
      )
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        content,
        author,
        tags: tags || [],
        meta_description: meta_description || null,
        og_image_url: og_image_url || null,
        published: published || false,
        published_at: published && published_at ? new Date(published_at) : (published ? new Date() : null),
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
