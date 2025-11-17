import type { Metadata } from 'next'
import { Hero } from '@/components/sections/hero'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  CubeTransparentIcon,
  ShieldCheckIcon,
  CursorArrowRaysIcon,
  BoltIcon
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Defense Use Cases | NODA AI',
  description: 'Autonomous systems orchestration for multi-domain operations, swarm coordination, contested environments, and mission effects management.',
}

const useCases = [
  {
    slug: 'multi-domain-swarm-coordination',
    title: 'Multi-Domain Swarm Coordination',
    badge: 'Swarm Intelligence',
    description: 'Coordinate autonomous swarms across air, land, sea, space, and cyber domains with distributed decision-making and shared mission objectives.',
    benefits: ['Cross-domain coordination', 'Distributed autonomy', 'Collaborative targeting', 'Dynamic re-tasking'],
    Icon: CubeTransparentIcon,
  },
  {
    slug: 'contested-environment-operations',
    title: 'Contested Environment Operations',
    badge: 'Edge Computing',
    description: 'Maintain autonomous operations in degraded, intermittent, and low-bandwidth (DIL) environments with edge-based intelligence and resilient communications.',
    benefits: ['Edge autonomy', 'Anti-jam comms', 'Offline decision-making', 'Cyber resilience'],
    Icon: ShieldCheckIcon,
  },
  {
    slug: 'mission-effects-orchestration',
    title: 'Mission Effects Orchestration',
    badge: 'Effects-Based Operations',
    description: 'Define desired mission effects and let the orchestrator coordinate distributed platforms to achieve objectives without micromanaging individual systems.',
    benefits: ['Intent-based control', 'Automated tasking', 'Resource optimization', 'Real-time adaptation'],
    Icon: CursorArrowRaysIcon,
  },
  {
    slug: 'algorithmic-warfare',
    title: 'Algorithmic Warfare Platform',
    badge: 'Algorithm Repository',
    description: 'Deploy proven defense algorithms from the world\'s deepest repository for autonomous coordination, adversarial engagement, and tactical decision-making.',
    benefits: ['Defense algorithm library', 'Tactical AI', 'Adversarial adaptation', 'Multi-platform deployment'],
    Icon: BoltIcon,
  },
]

export default function UseCasesPage() {
  return (
    <>
      <Hero
        subtitle="Defense Applications"
        title="Autonomous Systems Use Cases"
        description="Real-world defense applications powered by NODA AI's open orchestrator and deep algorithm repository."
        ctaPrimary={{
          label: 'Book a Demo',
          href: '/demo',
        }}
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase) => (
              <Card key={useCase.slug} href={`/use-cases/${useCase.slug}`}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <useCase.Icon className="w-12 h-12 text-primary" />
                    <Badge variant="success" size="sm">
                      {useCase.badge}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold">{useCase.title}</h3>
                </CardHeader>
                
                <CardContent>
                  <p className="text-slate-300 mb-4">
                    {useCase.description}
                  </p>
                  
                  <div className="space-y-2">
                    {useCase.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center text-sm text-slate-50">
                        <svg className="w-4 h-4 text-primary mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {benefit}
                      </div>
                    ))}
                  </div>
                </CardContent>

                <CardFooter>
                  <span className="text-primary font-semibold text-sm">
                    Learn more →
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 border-y border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Deploy Autonomous Operations?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Connect with our team to discuss how NODA AI can enable collaborative autonomous systems for your mission.
          </p>
          <a
            href="/demo"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-primary text-slate-950 hover:bg-primary-hover rounded-lg transition-all duration-200 shadow-lg"
          >
            Book a Demo
          </a>
        </div>
      </section>
    </>
  )
}
