import { prisma } from '@/lib/db/prisma'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

export default async function BlogPostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { created_at: 'desc' },
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      author: true,
      published: true,
      published_at: true,
      tags: true,
      created_at: true,
      updated_at: true,
    },
  })

  const stats = {
    total: posts.length,
    published: posts.filter(p => p.published).length,
    draft: posts.filter(p => !p.published).length,
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Blog Posts</h1>
          <p className="text-slate-400">
            Manage your blog content and articles
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="px-6 py-3 bg-primary hover:bg-primary/90 text-slate-950 font-semibold rounded-lg transition-colors"
        >
          Create New Post
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-slate-50">{stats.total}</div>
          <div className="text-sm text-slate-400">Total Posts</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-400">{stats.published}</div>
          <div className="text-sm text-slate-400">Published</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-orange-400">{stats.draft}</div>
          <div className="text-sm text-slate-400">Drafts</div>
        </div>
      </div>

      {/* Posts List */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800/50">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300">Title</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300">Author</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300">Tags</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300">Status</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300">Date</th>
              <th className="text-right py-4 px-6 text-sm font-semibold text-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {posts.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-400">
                  No blog posts yet. Create your first post to get started.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium text-slate-50">{post.title}</div>
                      {post.excerpt && (
                        <div className="text-sm text-slate-400 mt-1 line-clamp-1">
                          {post.excerpt}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-slate-300">{post.author}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="default" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 2 && (
                        <Badge variant="default" className="text-xs">
                          +{post.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <Badge variant={post.published ? 'success' : 'default'}>
                      {post.published ? 'Published' : 'Draft'}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-slate-400">
                      {post.published_at 
                        ? new Date(post.published_at).toLocaleDateString()
                        : new Date(post.created_at).toLocaleDateString()
                      }
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      {post.published && (
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="text-sm text-slate-400 hover:text-primary transition-colors"
                        >
                          View
                        </Link>
                      )}
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className="text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
