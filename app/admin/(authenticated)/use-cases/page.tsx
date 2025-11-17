import { prisma } from '@/lib/db/prisma'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

export default async function UseCasesPage() {
  const useCases = await prisma.useCase.findMany({
    orderBy: { order: 'asc' },
    select: {
      id: true,
      slug: true,
      title: true,
      challenge: true,
      hero_image: true,
      published: true,
      order: true,
      created_at: true,
      updated_at: true,
      seo_keywords: true,
    },
  })

  const stats = {
    total: useCases.length,
    published: useCases.filter(uc => uc.published).length,
    draft: useCases.filter(uc => !uc.published).length,
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Use Cases</h1>
          <p className="text-slate-400">
            Manage AI solution use cases for government organizations
          </p>
        </div>
        <Link
          href="/admin/use-cases/new"
          className="px-6 py-3 bg-primary hover:bg-primary/90 text-slate-950 font-semibold rounded-lg transition-colors"
        >
          Create New Use Case
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-slate-50">{stats.total}</div>
          <div className="text-sm text-slate-400">Total Use Cases</div>
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

      {/* Use Cases List */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800/50">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300">Order</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300">Title</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300">Challenge Preview</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300">Status</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-300">Updated</th>
              <th className="text-right py-4 px-6 text-sm font-semibold text-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {useCases.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-400">
                  No use cases yet. Create your first use case to get started.
                </td>
              </tr>
            ) : (
              useCases.map((useCase) => (
                <tr key={useCase.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-6">
                    <div className="text-sm font-mono text-slate-300">{useCase.order}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium text-slate-50">{useCase.title}</div>
                      <div className="text-xs text-slate-500 mt-1">/{useCase.slug}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-slate-400 line-clamp-2 max-w-md">
                      {useCase.challenge.substring(0, 100)}...
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <Badge variant={useCase.published ? 'success' : 'default'}>
                      {useCase.published ? 'Published' : 'Draft'}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-slate-400">
                      {new Date(useCase.updated_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      {useCase.published && (
                        <Link
                          href={`/use-cases/${useCase.slug}`}
                          target="_blank"
                          className="text-sm text-slate-400 hover:text-primary transition-colors"
                        >
                          View
                        </Link>
                      )}
                      <Link
                        href={`/admin/use-cases/${useCase.id}/edit`}
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
