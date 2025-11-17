import { prisma } from './prisma'

// Use Cases
export async function getPublishedUseCases() {
  return prisma.useCase.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
  })
}

export async function getUseCaseSummaries() {
  return prisma.useCase.findMany({
    where: { published: true },
    select: {
      id: true,
      slug: true,
      title: true,
      meta_description: true,
      hero_image: true,
    },
    orderBy: { order: 'asc' },
  })
}

export async function getUseCaseBySlug(slug: string) {
  return prisma.useCase.findUnique({
    where: { slug },
  })
}

// Blog Posts
export async function getPublishedPosts(limit?: number) {
  return prisma.post.findMany({
    where: { published: true },
    orderBy: { published_at: 'desc' },
    take: limit,
  })
}

export async function getPostBySlug(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
  })
}

export async function getPostsByTag(tag: string) {
  return prisma.post.findMany({
    where: {
      published: true,
      tags: {
        has: tag,
      },
    },
    orderBy: { published_at: 'desc' },
  })
}

// Pages
export async function getPageBySlug(slug: string) {
  return prisma.page.findUnique({
    where: { slug, published: true },
  })
}

// Contact Submissions
export async function createContactSubmission(data: {
  name: string
  email: string
  company?: string
  message: string
  source?: string
}) {
  return prisma.contactSubmission.create({
    data,
  })
}

export async function getUnsynedContactSubmissions() {
  return prisma.contactSubmission.findMany({
    where: { synced_to_hubspot: false },
    orderBy: { created_at: 'asc' },
  })
}

export async function markContactSubmissionSynced(id: string, hubspotId: string) {
  return prisma.contactSubmission.update({
    where: { id },
    data: {
      synced_to_hubspot: true,
      hubspot_id: hubspotId,
    },
  })
}
