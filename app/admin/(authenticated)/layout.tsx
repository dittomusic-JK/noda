import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth/helpers'
import { AdminNav } from '@/components/admin/admin-nav'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  // Redirect to login if not authenticated
  // Note: /admin/login has its own layout that bypasses this check
  if (!session?.user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <AdminNav user={session.user} />
      <div className="flex">
        {/* Sidebar - we'll add this if needed */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
