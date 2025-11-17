import { prisma } from '@/lib/db/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default async function CaseStudiesListPage() {
  const caseStudies = await prisma.caseStudy.findMany({
    orderBy: { created_at: 'desc' },
    select: {
      id: true,
      title: true,
      client: true,
      industry: true,
      published: true,
      featured: true,
      created_at: true,
      updated_at: true,
    },
  })

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Case Studies</h1>
          <p className="text-slate-400">Manage customer success stories</p>
        </div>
        <Link href="/admin/case-studies/new">
          <Button size="lg">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Case Study
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-slate-50">{caseStudies.length}</div>
          <div className="text-sm text-slate-400">Total Case Studies</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-primary">
            {caseStudies.filter(cs => cs.published).length}
          </div>
          <div className="text-sm text-slate-400">Published</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-orange-400">
            {caseStudies.filter(cs => !cs.published).length}
          </div>
          <div className="text-sm text-slate-400">Draft</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-400">
            {caseStudies.filter(cs => cs.featured).length}
          </div>
          <div className="text-sm text-slate-400">Featured</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        {caseStudies.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-slate-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-slate-400 mb-4">No case studies yet</p>
            <Link href="/admin/case-studies/new">
              <Button>Create Your First Case Study</Button>
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-800/50 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Client</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Industry</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Updated</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-200">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {caseStudies.map((caseStudy) => (
                <tr key={caseStudy.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-50">{caseStudy.title}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{caseStudy.client}</td>
                  <td className="px-6 py-4 text-slate-300">{caseStudy.industry}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {caseStudy.published ? (
                        <Badge variant="success">Published</Badge>
                      ) : (
                        <Badge variant="warning">Draft</Badge>
                      )}
                      {caseStudy.featured && <Badge variant="default">Featured</Badge>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">
                    {new Date(caseStudy.updated_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/case-studies/${caseStudy.id}/edit`}>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
