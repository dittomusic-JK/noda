import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { SectionHeader } from '@/components/sections/section-header'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { prisma } from '@/lib/db/prisma'

// Enable dynamic rendering when database is not available at build time
export const dynamic = 'force-dynamic'
export const dynamicParams = true

// Legacy data structure kept for reference - now loading from database
const useCasesDataLegacy: Record<string, any> = {
  'multi-domain-swarm-coordination': {
    title: 'Multi-Domain Swarm Coordination',
    badge: 'Swarm Intelligence',
    challenge: 'Modern warfare requires coordinated operations across air, land, sea, space, and cyber domains. Traditional command structures struggle with the complexity of managing hundreds of autonomous platforms simultaneously, leading to delayed decision-making and missed tactical opportunities in dynamic combat environments.',
    solution: 'NODA AI\'s open orchestrator enables distributed swarm intelligence across all domains. Autonomous platforms share mission objectives and coordinate actions through our deep algorithm repository, maintaining cohesion even in contested environments with degraded communications.',
    benefits: [
      {
        title: 'Cross-Domain Coordination',
        description: 'Seamlessly coordinate autonomous assets across air, land, sea, space, and cyber domains with unified mission objectives.',
      },
      {
        title: 'Distributed Autonomy',
        description: 'Swarms maintain coordination through peer-to-peer decision-making when centralized command is unavailable.',
      },
      {
        title: 'Collaborative Targeting',
        description: 'Multiple platforms dynamically share sensor data and coordinate engagement strategies in real-time.',
      },
      {
        title: 'Dynamic Re-Tasking',
        description: 'Swarms automatically adapt to changing mission parameters and battlefield conditions without manual intervention.',
      },
      {
        title: 'Scale Without Complexity',
        description: 'Manage hundreds of autonomous platforms through effects-based control rather than individual system commands.',
      },
    ],
    features: [
      'Multi-domain orchestration engine',
      'Distributed consensus algorithms for swarm coordination',
      'Real-time sensor fusion across platforms',
      'Collaborative mission planning and execution',
      'Platform-agnostic integration (air, ground, maritime, space)',
      'Resilient mesh networking for contested environments',
    ],
    stats: [
      { value: '10x', label: 'Platform Coordination Capacity' },
      { value: '<100ms', label: 'Swarm Decision Latency' },
      { value: '99.9%', label: 'Mission Continuity' },
    ],
  },
  'contested-environment-operations': {
    title: 'Contested Environment Operations',
    badge: 'Edge Computing',
    challenge: 'Military operations in near-peer contested environments face degraded, intermittent, and low-bandwidth (DIL) communications due to jamming, cyber attacks, and terrain. Traditional cloud-dependent systems fail when connectivity is lost, leaving platforms vulnerable and unable to complete missions.',
    solution: 'NODA AI deploys intelligence at the tactical edge, enabling autonomous platforms to make critical decisions locally without relying on constant connectivity. Our edge computing architecture maintains operational capability even when communications are completely severed.',
    benefits: [
      {
        title: 'Edge Autonomy',
        description: 'Platforms execute mission-critical algorithms locally, maintaining full capability in communications-denied environments.',
      },
      {
        title: 'Anti-Jam Communications',
        description: 'Resilient mesh networking and opportunistic data synchronization when links are available.',
      },
      {
        title: 'Offline Decision-Making',
        description: 'Continue autonomous operations for extended periods without any external connectivity.',
      },
      {
        title: 'Cyber Resilience',
        description: 'Distributed architecture eliminates single points of failure and resists adversarial cyber attacks.',
      },
      {
        title: 'Bandwidth Optimization',
        description: 'Intelligent data prioritization and compression maximizes effectiveness of limited bandwidth.',
      },
    ],
    features: [
      'Distributed edge computing architecture',
      'Local algorithm execution on tactical platforms',
      'Opportunistic synchronization and data replication',
      'Mesh networking with dynamic routing',
      'Encrypted communications with anti-jam capabilities',
      'Zero-trust security for contested cyber environments',
    ],
    stats: [
      { value: '100%', label: 'Uptime in DIL Environments' },
      { value: '90%', label: 'Bandwidth Reduction' },
      { value: 'Zero', label: 'Cloud Dependency' },
    ],
  },
  'mission-effects-orchestration': {
    title: 'Mission Effects Orchestration',
    badge: 'Effects-Based Operations',
    challenge: 'Operators are overwhelmed managing individual platforms and systems rather than focusing on desired mission outcomes. Traditional command-and-control requires micromanaging each asset, creating cognitive overload and slowing response to battlefield dynamics.',
    solution: 'NODA AI\'s effects-based orchestrator lets operators define desired mission effects while the system automatically coordinates distributed platforms to achieve those objectives. Focus on what needs to happen, not how each system should operate.',
    benefits: [
      {
        title: 'Intent-Based Control',
        description: 'Operators specify mission objectives and constraints; the orchestrator handles platform-level execution.',
      },
      {
        title: 'Automated Tasking',
        description: 'Intelligent task allocation across available platforms based on capabilities, position, and mission priority.',
      },
      {
        title: 'Resource Optimization',
        description: 'Dynamic reallocation of assets to maximize mission effectiveness and platform utilization.',
      },
      {
        title: 'Real-Time Adaptation',
        description: 'Automatically adjust platform coordination as battlefield conditions change without operator intervention.',
      },
      {
        title: 'Reduced Cognitive Load',
        description: 'Operators manage missions at the effects level, not individual system parameters.',
      },
    ],
    features: [
      'Effects-based mission language and planning',
      'Automated platform task allocation',
      'Real-time mission replanning and optimization',
      'Multi-platform resource coordination',
      'What-if scenario analysis',
      'Operator-in-the-loop override capabilities',
    ],
    stats: [
      { value: '75%', label: 'Reduction in Operator Workload' },
      { value: '3x', label: 'Faster Mission Execution' },
      { value: '50%', label: 'Better Resource Utilization' },
    ],
  },
  'algorithmic-warfare': {
    title: 'Algorithmic Warfare Platform',
    badge: 'Algorithm Repository',
    challenge: 'The future of warfare is algorithmic: autonomous systems executing sophisticated decision-making at machine speed. Defense organizations need access to proven, battle-tested algorithms for adversarial engagement, but most systems use proprietary, closed algorithms that can\'t be shared or validated.',
    solution: 'NODA AI provides the world\'s deepest defense algorithm repository - open, validated, and continuously updated by veterans, scientists, and AI practitioners from NASA, MIT, DARPA, and GTRI. Deploy proven algorithms across any autonomous platform through our vendor-neutral orchestrator.',
    benefits: [
      {
        title: 'Defense Algorithm Library',
        description: 'Access thousands of validated algorithms for swarm coordination, adversarial tactics, targeting, and mission execution.',
      },
      {
        title: 'Tactical AI',
        description: 'Machine-speed decision-making for autonomous engagement in dynamic combat scenarios.',
      },
      {
        title: 'Adversarial Adaptation',
        description: 'Algorithms that learn and adapt to enemy tactics, countermeasures, and battlefield evolution.',
      },
      {
        title: 'Multi-Platform Deployment',
        description: 'Deploy algorithms across any autonomous platform - vendor-agnostic and open by design.',
      },
      {
        title: 'Continuous Innovation',
        description: 'Repository constantly updated with cutting-edge research from premier defense institutions.',
      },
    ],
    features: [
      'Extensive algorithm repository for defense applications',
      'Swarm coordination and formation control',
      'Adversarial game theory and tactical planning',
      'Autonomous targeting and engagement logic',
      'Multi-agent reinforcement learning',
      'Open-source contribution and validation pipeline',
    ],
    stats: [
      { value: '1000+', label: 'Defense Algorithms' },
      { value: 'Open', label: 'Architecture Model' },
      { value: 'Platform', label: 'Agnostic' },
    ],
  },
}

export async function generateStaticParams() {
  try {
    const useCases = await prisma.useCase.findMany({
      where: { published: true },
      select: { slug: true },
    })
    
    return useCases.map((useCase) => ({
      slug: useCase.slug,
    }))
  } catch (error) {
    console.warn('Unable to fetch use cases at build time:', error)
    // Return empty array if database is not available at build time
    // Pages will be generated on-demand at runtime
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const useCase = await prisma.useCase.findUnique({
    where: { slug, published: true },
    select: {
      title: true,
      meta_description: true,
      challenge: true,
      hero_image: true,
      seo_keywords: true,
    },
  })
  
  if (!useCase) {
    return {
      title: 'Use Case Not Found',
    }
  }

  return {
    title: `${useCase.title} | NODA AI`,
    description: useCase.meta_description,
    keywords: useCase.seo_keywords,
    openGraph: {
      title: useCase.title,
      description: useCase.meta_description,
      images: useCase.hero_image ? [useCase.hero_image] : [],
    },
  }
}

export default async function UseCaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const useCase = await prisma.useCase.findUnique({
    where: { slug, published: true },
  })

  if (!useCase) {
    notFound()
  }

  const useCaseParam = useCase.use_case_param || 'other'
  const benefits = useCase.benefits as any[]
  const stats = useCase.stats as any[]

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="success" size="md">{useCase.badge}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              {useCase.title}
            </h1>
            {useCase.hero_subtitle && (
              <p className="text-xl text-slate-300">
                {useCase.hero_subtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {stats && stats.length > 0 && (
        <section className="py-12 bg-slate-900 border-y border-slate-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
              {stats.map((stat: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-slate-300 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Challenge Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              subtitle="The Challenge"
              title="Understanding the Problem"
              align="left"
            />
            <p className="text-lg text-slate-300 leading-relaxed">
              {useCase.challenge}
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              subtitle="The Solution"
              title="How NODA AI Enables This"
              align="left"
            />
            <p className="text-lg text-slate-300 leading-relaxed mb-12">
              {useCase.solution}
            </p>

            {useCase.features && useCase.features.length > 0 && (
              <>
                <h3 className="text-2xl font-bold mb-6">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {useCase.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <svg className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            subtitle="Benefits"
            title="Operational Impact"
            description="Measurable advantages for defense operations."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits && benefits.map((benefit: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <h3 className="text-xl font-bold">{benefit.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-emerald-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-950 mb-4">
            Ready to Deploy Autonomous Operations?
          </h2>
          <p className="text-xl text-slate-950/80 mb-8 max-w-2xl mx-auto">
            {useCase.cta_subtitle || 'Connect with our team to discuss mission-specific requirements and integration.'}
          </p>
          <Link
            href={`/demo?useCase=${useCaseParam}`}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-slate-950 text-primary hover:bg-slate-900 rounded-lg transition-all duration-200 shadow-lg"
          >
            {useCase.cta_label}
          </Link>
        </div>
      </section>

      {/* Related Use Cases */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            subtitle="Explore More"
            title="Related Defense Applications"
            description="Discover other autonomous systems capabilities."
          />
          
          <div className="text-center">
            <Link
              href="/use-cases"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold bg-slate-900 text-primary hover:bg-slate-800 rounded-lg transition-all duration-200 border border-slate-800"
            >
              View All Use Cases →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
