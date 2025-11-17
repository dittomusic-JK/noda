import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const useCasesData = {
  'multi-domain-swarm-coordination': {
    title: 'Multi-Domain Swarm Coordination',
    badge: 'Swarm Intelligence',
    hero_subtitle: 'Advanced autonomous systems capabilities for modern defense operations.',
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
    use_case_param: 'multi-domain-swarm',
    hero_image: '/images/use-cases/multi-domain-swarm.jpg',
    order: 1,
  },
  'contested-environment-operations': {
    title: 'Contested Environment Operations',
    badge: 'Edge Computing',
    hero_subtitle: 'Advanced autonomous systems capabilities for modern defense operations.',
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
    use_case_param: 'contested-ops',
    hero_image: '/images/use-cases/contested-environment.jpg',
    order: 2,
  },
  'mission-effects-orchestration': {
    title: 'Mission Effects Orchestration',
    badge: 'Effects-Based Operations',
    hero_subtitle: 'Advanced autonomous systems capabilities for modern defense operations.',
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
    use_case_param: 'effects-orchestration',
    hero_image: '/images/use-cases/mission-effects.jpg',
    order: 3,
  },
  'algorithmic-warfare': {
    title: 'Algorithmic Warfare Platform',
    badge: 'Algorithm Repository',
    hero_subtitle: 'Advanced autonomous systems capabilities for modern defense operations.',
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
    use_case_param: 'algorithmic-warfare',
    hero_image: '/images/use-cases/algorithmic-warfare.jpg',
    order: 4,
  },
}

async function main() {
  console.log('Migrating use cases to database...\n')

  for (const [slug, data] of Object.entries(useCasesData)) {
    console.log(`Migrating: ${data.title}`)
    
    try {
      const useCase = await prisma.useCase.upsert({
        where: { slug },
        update: {
          title: data.title,
          badge: data.badge,
          hero_subtitle: data.hero_subtitle,
          hero_image: data.hero_image,
          challenge: data.challenge,
          solution: data.solution,
          benefits: data.benefits,
          features: data.features,
          stats: data.stats,
          meta_description: data.challenge.substring(0, 160),
          seo_keywords: [
            data.badge.toLowerCase(),
            'autonomous systems',
            'defense',
            'AI',
          ],
          cta_label: 'Book a Demo',
          cta_subtitle: 'Connect with our team to discuss mission-specific requirements and integration.',
          use_case_param: data.use_case_param,
          published: true,
          order: data.order,
        },
        create: {
          slug,
          title: data.title,
          badge: data.badge,
          hero_subtitle: data.hero_subtitle,
          hero_image: data.hero_image,
          challenge: data.challenge,
          solution: data.solution,
          benefits: data.benefits,
          features: data.features,
          stats: data.stats,
          meta_description: data.challenge.substring(0, 160),
          seo_keywords: [
            data.badge.toLowerCase(),
            'autonomous systems',
            'defense',
            'AI',
          ],
          cta_label: 'Book a Demo',
          cta_subtitle: 'Connect with our team to discuss mission-specific requirements and integration.',
          use_case_param: data.use_case_param,
          published: true,
          order: data.order,
        },
      })
      
      console.log(`✅ ${useCase.title} (${useCase.slug})`)
    } catch (error: any) {
      console.error(`❌ Error migrating ${slug}:`, error.message)
    }
  }

  console.log('\n✅ Use cases migration complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
