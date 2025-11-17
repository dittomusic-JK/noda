import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/sections/hero'
import { SectionHeader } from '@/components/sections/section-header'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CpuChipIcon, BoltIcon, LockOpenIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Insights & Resources - Defense AI Blog',
  description: 'Expert insights on autonomous systems, algorithmic warfare, defense AI implementation, and multi-domain operations.',
  keywords: ['defense AI blog', 'autonomous systems', 'algorithmic warfare', 'defense technology', 'multi-domain operations'],
}

// Mock blog posts - would come from database in production
const featuredPosts = [
  {
    slug: 'autonomous-swarm-coordination',
    title: 'Multi-Domain Autonomous Swarm Coordination',
    excerpt: 'How distributed autonomous systems achieve collaborative effects through algorithmic coordination across air, land, sea, and cyber domains.',
    category: 'Technology',
    author: 'Dr. James Carter',
    date: '2025-01-15',
    readTime: '8 min read',
    Icon: CpuChipIcon,
  },
  {
    slug: 'algorithmic-warfare-future',
    title: 'The Future of Algorithmic Warfare',
    excerpt: 'Understanding the paradigm shift from traditional command and control to effect-based autonomous operations in modern defense.',
    category: 'Strategy',
    author: 'Col. Sarah Mitchell (Ret.)',
    date: '2025-01-10',
    readTime: '6 min read',
    Icon: BoltIcon,
  },
  {
    slug: 'open-architecture-defense',
    title: 'Open Architecture for Defense Systems',
    excerpt: 'Why platform-agnostic orchestration is critical for future defense capabilities and how NODA AI enables vendor-neutral integration.',
    category: 'Architecture',
    author: 'Dr. Michael Chen',
    date: '2025-01-05',
    readTime: '10 min read',
    Icon: LockOpenIcon,
  },
]

const recentPosts = [
  {
    slug: 'mission-effects-orchestration',
    title: 'From Systems to Effects: Modern Command Paradigms',
    excerpt: 'How effect-based operations enable commanders to focus on outcomes rather than managing individual platforms.',
    category: 'Operations',
    date: '2024-12-28',
    readTime: '5 min read',
  },
  {
    slug: 'autonomous-ethics-defense',
    title: 'Ethical Frameworks for Autonomous Defense Systems',
    excerpt: 'Balancing autonomy with accountability in lethal and non-lethal defense applications.',
    category: 'Ethics',
    date: '2024-12-20',
    readTime: '7 min read',
  },
  {
    slug: 'edge-ai-battlefield',
    title: 'Edge AI for Contested Environments',
    excerpt: 'Deploying autonomous algorithms in communications-denied and GPS-denied battlespace.',
    category: 'Technology',
    date: '2024-12-15',
    readTime: '9 min read',
  },
]

const categories = [
  'All Posts',
  'Technology',
  'Strategy',
  'Operations',
  'Architecture',
  'Ethics',
  'Multi-Domain',
]

export default function BlogPage() {
  return (
    <>
      <Hero
        subtitle="Insights & Resources"
        title="Advancing Defense Through Autonomous Systems"
        description="Expert insights on algorithmic warfare, multi-domain operations, and the future of collaborative autonomous systems."
      />

      {/* Featured Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            subtitle="Featured"
            title="Latest Insights"
            description="In-depth articles on algorithmic warfare, autonomous systems, and defense AI."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <Card key={post.slug} href={`/blog/${post.slug}`}>
                <CardHeader>
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <post.Icon className="w-8 h-8 text-primary" />
                  </div>
                  <Badge variant="success" size="sm">{post.category}</Badge>
                  <h3 className="text-xl font-bold mt-3 leading-tight">
                    {post.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 text-sm mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <time className="text-sm text-slate-400">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-slate-900 border-y border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full text-sm font-medium transition-colors bg-slate-900 border border-slate-800 text-slate-50 hover:bg-primary hover:text-slate-950 hover:border-primary shadow-sm hover:shadow-md"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            subtitle="Recent"
            title="More From Our Blog"
            description="Additional resources on defense autonomous systems and algorithmic warfare."
          />

          <div className="max-w-4xl mx-auto space-y-6">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block bg-slate-900 border border-slate-800 rounded-lg p-6 hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="default" size="sm">{post.category}</Badge>
                  <span className="text-sm text-slate-400">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-300 mb-3">
                  {post.excerpt}
                </p>
                <time className="text-sm text-slate-400">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-6 py-3 text-base font-semibold bg-primary text-slate-950 hover:bg-primary/90 hover:shadow-lg rounded-lg transition-all">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-emerald-500">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center text-slate-950">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Deploy Autonomous Operations?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Connect with our team to discuss how NODA AI can enable collaborative autonomous systems for your mission.
            </p>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-slate-950 text-primary hover:bg-slate-900 rounded-lg transition-all duration-200 shadow-lg"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
