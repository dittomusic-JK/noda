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
    const post = await prisma.post.findUnique({
      where: { id },
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json(post)
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
    const { title, slug, excerpt, content, author, tags, meta_description, og_image_url, published, published_at } = body

    // Validate required fields
    if (!title || !slug || !content || !author) {
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, content, author' },
        { status: 400 }
      )
    }

    // Check for duplicate slug (excluding current post)
    const existing = await prisma.post.findFirst({
      where: { slug, NOT: { id } },
    })
    if (existing) {
      return NextResponse.json(
        { error: 'Another post with this slug already exists' },
        { status: 400 }
      )
    }

    const post = await prisma.post.update({
      where: { id },
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

    return NextResponse.json(post)
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
    await prisma.post.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
