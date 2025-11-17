'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

interface AdminNavProps {
  user: {
    name?: string | null
    email?: string | null
  }
}

export function AdminNav({ user }: AdminNavProps) {
  const pathname = usePathname()

  const navItems = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/case-studies', label: 'Case Studies' },
    { href: '/admin/blog', label: 'Blog Posts' },
    { href: '/admin/use-cases', label: 'Use Cases' },
  ]

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === href
    }
    return pathname?.startsWith(href)
  }

  return (
    <nav className="bg-slate-900 border-b border-slate-800">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-8">
            <Link href="/admin" className="text-xl font-bold text-primary">
              NODA AI Admin
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-slate-800 text-slate-50'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              target="_blank"
              className="text-sm text-slate-400 hover:text-slate-200"
            >
              View Site →
            </Link>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-slate-400">{user.email}</span>
              <button
                onClick={() => signOut({ callbackUrl: '/admin/login' })}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-slate-50 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
