import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/sections/hero'
import { SectionHeader } from '@/components/sections/section-header'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LinkIcon, ShieldCheckIcon, BoltIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Defense Autonomous Systems Platform | NODA AI',
  description: 'Open orchestrator for collaborative autonomous systems. World\'s deepest defense algorithm repository enabling operators to manage mission effects, not individual systems.',
  keywords: ['defense autonomous systems', 'open orchestrator', 'algorithmic warfare', 'multi-domain operations', 'defense AI platform'],
  openGraph: {
    title: 'Defense Autonomous Systems Platform | NODA AI',
    description: 'Open orchestrator for collaborative autonomous systems and algorithmic warfare.',
  },
}

export default function SolutionsPage() {
  return (
    <>
      <Hero
        subtitle="Open Orchestrator Platform"
        title="The World's Deepest Defense Algorithm Repository"
        description="Platform-agnostic orchestration for collaborative autonomous systems. Enable operators to manage desired mission effects across distributed autonomous platforms. Built for the new generation of algorithmic warfare."
        ctaPrimary={{
          label: 'Book a Demo',
          href: '/demo',
        }}
        ctaSecondary={{
          label: 'Learn More',
          href: '/about',
        }}
      />

      {/* Platform Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            subtitle="Platform Principles"
            title="Open, Agnostic, Collaborative"
            description="Built for interoperability, vendor neutrality, and multi-domain coordination."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[--color-primary] to-[--color-primary-dark] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-[--background]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Open Architecture</h3>
              <p className="text-[--foreground-muted] text-sm">
                No vendor lock-in. Platform-agnostic integration across all defense systems.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[--color-primary] to-[--color-primary-dark] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-[--background]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Effects-Based</h3>
              <p className="text-[--foreground-muted] text-sm">
                Operators manage desired mission effects, not individual platforms.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[--color-primary] to-[--color-primary-dark] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-[--background]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Deep Repository</h3>
              <p className="text-[--foreground-muted] text-sm">
                World's deepest defense-focused algorithm library for autonomous coordination.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[--color-primary] to-[--color-primary-dark] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-[--background]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Multi-Domain</h3>
              <p className="text-[--foreground-muted] text-sm">
                Coordinate autonomous systems across air, land, sea, space, and cyber.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-20 bg-[--background-elevated] border-y border-[--border]">
        <div className="container mx-auto px-4">
          <SectionHeader
            subtitle="Core Capabilities"
            title="Orchestration for the Next Generation of Warfare"
            description="Deep algorithm repository built for collaborative autonomous systems and mission effects orchestration."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <Badge variant="success" size="sm">Swarm Intelligence</Badge>
                <h3 className="text-2xl font-bold mt-4">Multi-Platform Coordination</h3>
              </CardHeader>
              <CardContent>
                <p className="text-[--foreground-muted] mb-4">
                  Coordinate heterogeneous autonomous platforms as unified swarms with shared objectives and distributed decision-making.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start text-sm">
                    <svg className="w-5 h-5 text-[--color-primary] mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Distributed autonomous swarm behavior algorithms
                  </li>
                  <li className="flex items-start text-sm">
                    <svg className="w-5 h-5 text-[--color-primary] mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Real-time mission re-tasking and adaptation
                  </li>
                  <li className="flex items-start text-sm">
                    <svg className="w-5 h-5 text-[--color-primary] mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Resilient operation in contested environments
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Badge variant="success" size="sm">Effects Orchestration</Badge>
                <h3 className="text-2xl font-bold mt-4">Mission-Based Control</h3>
              </CardHeader>
              <CardContent>
                <p className="text-[--foreground-muted] mb-4">
                  Define and manage desired mission effects while the orchestrator coordinates individual platforms to achieve objectives.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start text-sm">
                    <svg className="w-5 h-5 text-[--color-primary] mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Intent-based operational planning
                  </li>
                  <li className="flex items-start text-sm">
                    <svg className="w-5 h-5 text-[--color-primary] mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Automated platform-to-effect mapping
                  </li>
                  <li className="flex items-start text-sm">
                    <svg className="w-5 h-5 text-[--color-primary] mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Dynamic resource allocation optimization
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Badge variant="success" size="sm">Algorithm Repository</Badge>
                <h3 className="text-2xl font-bold mt-4">Deep Defense Library</h3>
              </CardHeader>
              <CardContent>
                <p className="text-[--foreground-muted] mb-4">
                  Access the world's deepest collection of defense-focused algorithms for autonomous coordination and mission execution.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start text-sm">
                    <svg className="w-5 h-5 text-[--color-primary] mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Multi-domain tactical algorithms
                  </li>
                  <li className="flex items-start text-sm">
                    <svg className="w-5 h-5 text-[--color-primary] mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Adversarial environment adaptation
                  </li>
                  <li className="flex items-start text-sm">
                    <svg className="w-5 h-5 text-[--color-primary] mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Collaborative engagement strategies
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Badge variant="success" size="sm">Edge Computing</Badge>
                <h3 className="text-2xl font-bold mt-4">Contested Operations</h3>
              </CardHeader>
              <CardContent>
                <p className="text-[--foreground-muted] mb-4">
                  Maintain autonomous operations in degraded, intermittent, and low-bandwidth (DIL) communication environments.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start text-sm">
                    <svg className="w-5 h-5 text-[--color-primary] mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Edge-based decision making without connectivity
                  </li>
                  <li className="flex items-start text-sm">
                    <svg className="w-5 h-5 text-[--color-primary] mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Anti-jam and cyber-resilient communications
                  </li>
                  <li className="flex items-start text-sm">
                    <svg className="w-5 h-5 text-[--color-primary] mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Low-latency tactical processing at the edge
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold bg-[--color-primary] text-[--background] hover:bg-[--color-primary-dark] rounded-lg transition-all duration-200 shadow-lg"
            >
              Learn About Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Deployment & Integration */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            subtitle="Deployment & Integration"
            title="Platform-Agnostic Architecture"
            description="Built to integrate with any defense platform or system without vendor lock-in."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <LinkIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-50">Open Standards</h3>
              <p className="text-sm text-slate-300">
                Built on open standards and APIs for seamless integration across all defense platforms and vendors.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheckIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-50">Secure by Design</h3>
              <p className="text-sm text-slate-300">
                Zero-trust architecture with defense-grade encryption and secure communications protocols.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BoltIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-50">Real-Time Performance</h3>
              <p className="text-sm text-slate-300">
                Low-latency orchestration optimized for time-critical mission execution and tactical decision-making.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[--color-primary] to-[--color-primary-dark]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[--background] mb-4">
            Ready to Advance Autonomous Warfare?
          </h2>
          <p className="text-xl text-[--background]/90 mb-8 max-w-2xl mx-auto">
            Connect with our team to explore how NODA AI's open orchestrator can transform your autonomous operations.
          </p>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-slate-950 text-primary hover:bg-slate-900 hover:shadow-lg rounded-lg transition-all duration-200 shadow-xl"
            >
              Book a Demo
            </Link>
        </div>
      </section>
    </>
  )
}
