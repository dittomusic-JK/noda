import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/sections/hero'
import { SectionHeader } from '@/components/sections/section-header'

export const metadata: Metadata = {
  title: 'About Us - Defense AI & Autonomous Systems',
  description: 'NODA AI is a venture-backed defense company building collaborative autonomous systems. Veterans, scientists, and AI practitioners from NASA, MIT, DARPA, and GTRI.',
  keywords: ['defense AI', 'autonomous systems', 'algorithmic warfare', 'defense technology', 'open orchestrator'],
}

export default function AboutPage() {
  return (
    <>
      <Hero
        subtitle="About NODA AI"
        title="Collaborative Autonomous Systems for Defense"
        description="Veterans, scientists, and AI practitioners from NASA, MIT, DARPA, and GTRI building the future of algorithmic warfare."
      />

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              subtitle="Our Mission"
              title="Advancing Defense Through Autonomous Systems"
              align="center"
            />
            <p className="text-lg text-[--foreground-muted] leading-relaxed text-center mb-8">
              NODA AI is building the world's deepest defense-focused algorithm repository for collaborative autonomous systems. We enable operators to manage desired effects, not individual systems - ushering in the next generation of algorithmic warfare.
            </p>
            <p className="text-lg text-[--foreground-muted] leading-relaxed text-center">
              We believe deeply and genuinely that country comes first. Our product will always be agnostic, collaborative, and open. We are patriots building for patriots.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-900 border-y border-slate-800">
        <div className="container mx-auto px-4">
          <SectionHeader
            subtitle="Our Values"
            title="Principles That Guide Our Work"
            description="Country comes first. Our product will always be agnostic, collaborative, and open."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-xl font-bold mb-3 text-slate-50">Country First</h3>
              <p className="text-slate-300">
                Deep and genuine commitment to national defense. We are patriots building for patriots.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-xl font-bold mb-3 text-slate-50">Agnostic & Open</h3>
              <p className="text-slate-300">
                Platform-agnostic architecture. No vendor lock-in. Open standards and collaborative integration.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-xl font-bold mb-3 text-slate-50">Mission Effects</h3>
              <p className="text-slate-300">
                Operators manage desired mission effects, not individual systems. Effects-based orchestration.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-xl font-bold mb-3 text-slate-50">Technical Excellence</h3>
              <p className="text-slate-300">
                Veterans, scientists, and AI practitioners from NASA, MIT, DARPA, and GTRI.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-xl font-bold mb-3 text-slate-50">Deep Defense Focus</h3>
              <p className="text-slate-300">
                World's deepest defense-focused algorithm repository for autonomous coordination.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-xl font-bold mb-3 text-slate-50">Collaborative Systems</h3>
              <p className="text-slate-300">
                Enable collaborative effects with autonomous systems across all domains.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Defense */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              subtitle="Why Defense"
              title="Built for Algorithmic Warfare"
              align="center"
            />
            <div className="space-y-6 text-slate-300">
              <p className="text-lg leading-relaxed">
                <strong className="text-slate-50">We understand the new generation of algorithmic warfare.</strong> The introduction of novel autonomy brings unprecedented challenges and opportunities. Our team (veterans, scientists, and AI practitioners from the most premiere institutions) is building the infrastructure for collaborative autonomous effects.
              </p>
              <p className="text-lg leading-relaxed">
                We're creating the world's deepest defense-focused algorithm repository. Not just another defense contractor, but a venture-backed company laser-focused on open orchestration for autonomous systems. Platform-agnostic. Vendor-neutral. Collaborative by design.
              </p>
              <p className="text-lg leading-relaxed">
                Our open orchestrator enables operators to manage desired mission effects across distributed autonomous platforms: air, land, sea, space, and cyber. Effects-based control for multi-domain operations in contested environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-hover text-slate-950">
        <div className="container mx-auto px-4">
          <SectionHeader
            subtitle="Platform"
            title="Open Orchestrator for Autonomous Systems"
            description="Platform-agnostic coordination across all domains."
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">Deep</div>
              <div className="text-sm opacity-90">Algorithm Repository</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">Open</div>
              <div className="text-sm opacity-90">Architecture</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">Multi</div>
              <div className="text-sm opacity-90">Domain Operations</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">Effects</div>
              <div className="text-sm opacity-90">Based Control</div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              subtitle="Capabilities"
              title="Next Generation of Warfare"
              align="center"
            />
            <p className="text-lg text-slate-300 leading-relaxed text-center mb-8">
              We deeply understand that the introduction of novel autonomy brings a new generation of algorithmic warfare. Our platform is built for this reality: enabling collaborative effects with autonomous systems at scale.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
                <h4 className="font-bold text-lg mb-2 text-slate-50">Swarm Coordination</h4>
                <p className="text-slate-300 text-sm">
                  Distributed autonomous swarm behavior algorithms for heterogeneous platforms with shared objectives.
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
                <h4 className="font-bold text-lg mb-2 text-slate-50">Contested Operations</h4>
                <p className="text-slate-300 text-sm">
                  Edge autonomy for degraded, intermittent, and low-bandwidth environments with anti-jam communications.
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
                <h4 className="font-bold text-lg mb-2 text-slate-50">Effects Orchestration</h4>
                <p className="text-slate-300 text-sm">
                  Intent-based operational planning with automated platform-to-effect mapping and dynamic resource allocation.
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
                <h4 className="font-bold text-lg mb-2 text-slate-50">Algorithm Repository</h4>
                <p className="text-slate-300 text-sm">
                  World's deepest defense-focused algorithm library for autonomous coordination and tactical decision-making.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Advance Defense Capabilities
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Connect with our team to explore how NODA AI can enable collaborative autonomous systems for your mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-primary text-slate-950 hover:bg-primary-hover rounded-lg transition-all duration-200"
            >
              Book a Demo
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-transparent text-primary hover:bg-slate-800 border-2 border-primary rounded-lg transition-all duration-200"
            >
              View Platform
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
