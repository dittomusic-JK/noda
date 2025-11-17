import { prisma } from '@/lib/db/prisma'
import Link from 'next/link'

export default async function AdminDashboard() {
  // Get counts
  const [caseStudiesCount, blogPostsCount, useCasesCount, contactsCount] = await Promise.all([
    prisma.caseStudy.count(),
    prisma.post.count(),
    prisma.useCase.count(),
    prisma.contactSubmission.count({ where: { created_at: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } } }),
  ])

  const stats = [
    { label: 'Case Studies', value: caseStudiesCount, href: '/admin/case-studies', color: 'bg-blue-500' },
    { label: 'Blog Posts', value: blogPostsCount, href: '/admin/blog', color: 'bg-green-500' },
    { label: 'Use Cases', value: useCasesCount, href: '/admin/use-cases', color: 'bg-purple-500' },
    { label: 'Contacts (30d)', value: contactsCount, href: '/admin/contacts', color: 'bg-orange-500' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-slate-400">Welcome to the NODA AI content management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg opacity-20`}></div>
              <span className={`text-3xl font-bold ${stat.color.replace('bg-', 'text-')}`}>
                {stat.value}
              </span>
            </div>
            <h3 className="text-slate-300 font-medium">{stat.label}</h3>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/case-studies/new"
          className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-primary transition-colors group"
        >
          <div className="text-primary mb-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
            New Case Study
          </h3>
          <p className="text-sm text-slate-400">Create a new customer success story</p>
        </Link>

        <Link
          href="/admin/blog/new"
          className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-primary transition-colors group"
        >
          <div className="text-primary mb-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
            New Blog Post
          </h3>
          <p className="text-sm text-slate-400">Write and publish a new article</p>
        </Link>

        <Link
          href="/admin/use-cases/new"
          className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-primary transition-colors group"
        >
          <div className="text-primary mb-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
            New Use Case
          </h3>
          <p className="text-sm text-slate-400">Add a new solution use case</p>
        </Link>
      </div>
    </div>
  )
}
