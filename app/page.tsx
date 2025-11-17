import Link from 'next/link'
import { Hero } from "@/components/sections/hero";
import { SectionHeader } from "@/components/sections/section-header";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CircleStackIcon, 
  CpuChipIcon, 
  RocketLaunchIcon, 
  BoltIcon,
  ShieldCheckIcon,
  UsersIcon
} from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        subtitle="Defense AI & Autonomous Systems"
        title="The World's Deepest Defense Algorithm Repository"
        description="Open orchestrator for collaborative autonomous systems. Manage desired effects, not individual systems. Built by veterans, scientists, and AI practitioners from NASA, MIT, DARPA, and GTRI."
        ctaPrimary={{
          label: "Book a Demo",
          href: "/demo",
        }}
        ctaSecondary={{
          label: "Our Platform",
          href: "/solutions",
        }}
      />

      {/* Trust Indicators */}
      <section className="py-12 bg-slate-900 border-y border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">Open</div>
              <div className="text-sm text-slate-400">Orchestrator</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">Agnostic</div>
              <div className="text-sm text-slate-400">Platform</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">Collaborative</div>
              <div className="text-sm text-slate-400">Effects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">Defense</div>
              <div className="text-sm text-slate-400">Focused</div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            subtitle="Capabilities"
            title="Autonomous Systems Orchestration"
            description="Deep defense algorithms enabling collaborative effects across multi-domain operations."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card href="/solutions">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CircleStackIcon className="w-12 h-12 text-primary" />
                  <Badge variant="success" size="sm">Algorithm Repository</Badge>
                </div>
                <h3 className="text-2xl font-bold mt-4">Defense Algorithms</h3>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  World's deepest repository of defense-focused algorithms for autonomous systems coordination.
                </p>
              </CardContent>
            </Card>

            <Card href="/solutions">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CpuChipIcon className="w-12 h-12 text-primary" />
                  <Badge variant="success" size="sm">Orchestration</Badge>
                </div>
                <h3 className="text-2xl font-bold mt-4">Open Orchestrator</h3>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  Platform-agnostic orchestration layer for managing collaborative autonomous effects.
                </p>
              </CardContent>
            </Card>

            <Card href="/solutions">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <RocketLaunchIcon className="w-12 h-12 text-primary" />
                  <Badge variant="success" size="sm">Multi-Domain</Badge>
                </div>
                <h3 className="text-2xl font-bold mt-4">Collaborative Effects</h3>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  Enable operators to manage desired mission effects across distributed autonomous systems.
                </p>
              </CardContent>
            </Card>

            <Card href="/solutions">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <BoltIcon className="w-12 h-12 text-primary" />
                  <Badge variant="success" size="sm">Algorithmic Warfare</Badge>
                </div>
                <h3 className="text-2xl font-bold mt-4">Next-Gen Autonomy</h3>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  Novel autonomy solutions designed for the new generation of algorithmic warfare.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-slate-950 rounded-lg transition-all duration-200"
            >
              Explore Platform →
            </Link>
          </div>
        </div>
      </section>

      {/* Why NODA */}
      <section className="py-20 bg-slate-900 border-y border-slate-800">
        <div className="container mx-auto px-4">
          <SectionHeader
            subtitle="Why NODA AI"
            title="Built by Veterans, Scientists, and AI Practitioners"
            description="From NASA, MIT, DARPA, and GTRI. Patriots focused on defense innovation."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-hover rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/50">
                <ShieldCheckIcon className="w-8 h-8 text-slate-950" />
              </div>
              <h3 className="text-xl font-bold mb-2">Agnostic & Open</h3>
              <p className="text-slate-300">
                Platform-agnostic, collaborative, and open architecture. No vendor lock-in.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-hover rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/50">
                <BoltIcon className="w-8 h-8 text-slate-950" />
              </div>
              <h3 className="text-xl font-bold mb-2">Mission Effects</h3>
              <p className="text-slate-300">
                Focus on desired mission effects, not individual system management.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-hover rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/50">
                <UsersIcon className="w-8 h-8 text-slate-950" />
              </div>
              <h3 className="text-xl font-bold mb-2">Country First</h3>
              <p className="text-slate-300">
                Deep and genuine commitment to national defense. Patriots building for patriots.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary to-primary-hover rounded-2xl p-12 text-center text-slate-950 shadow-2xl shadow-primary/30">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Advance Defense Capabilities?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join the future of collaborative autonomous systems and algorithmic warfare.
            </p>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-slate-950 text-primary hover:bg-slate-900 hover:shadow-lg rounded-lg transition-all duration-200"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
