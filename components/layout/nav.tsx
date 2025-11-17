'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { NavLinkItem } from '@/types/components'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'

const navLinks: NavLinkItem[] = [
  { label: 'Solutions', href: '/solutions' },
  {
    label: 'Use Cases',
    href: '/use-cases',
    children: [
      { label: 'Multi-Domain Swarm Coordination', href: '/use-cases/multi-domain-swarm-coordination' },
      { label: 'Contested Environment Operations', href: '/use-cases/contested-environment-operations' },
      { label: 'Mission Effects Orchestration', href: '/use-cases/mission-effects-orchestration' },
      { label: 'Algorithmic Warfare Platform', href: '/use-cases/algorithmic-warfare' },
    ],
  },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
]

export function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/')

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 border-b border-slate-800 shadow-xl backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image 
              src="/noda_logo.png" 
              alt="NODA AI" 
              width={120} 
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary',
                    isActive(link.href)
                      ? 'text-primary'
                      : 'text-slate-300'
                  )}
                >
                  {link.label}
                </Link>
                
                {/* Dropdown for Use Cases */}
                {link.children && (
                  <div className="absolute left-0 top-full pt-2 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                    <div className="bg-slate-900 rounded-lg shadow-2xl border border-slate-800 py-3 overflow-hidden">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-5 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-primary transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant="primary" onClick={() => window.location.href = '/demo'}>
              Book a Demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-800">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'block py-2 font-medium',
                      isActive(link.href)
                        ? 'text-primary'
                        : 'text-slate-300'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="ml-4 mt-2 space-y-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block py-1 text-sm text-slate-400 hover:text-primary"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Button
                variant="primary"
                className="w-full"
                onClick={() => {
                  setMobileMenuOpen(false)
                  window.location.href = '/demo'
                }}
              >
                Book a Demo
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
