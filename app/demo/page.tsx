import type { Metadata } from 'next'
import { Suspense } from 'react'
import { DemoForm } from '@/components/forms/demo-form'
import { CheckCircleIcon, ShieldCheckIcon, UserGroupIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Book a Demo | NODA AI',
  description: 'Schedule a personalized demonstration of NODA AI\'s autonomous systems platform. Connect with our team of defense experts from NASA, MIT, DARPA, and GTRI.',
}

export default function DemoPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              See NODA AI in Action
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8">
              Schedule a personalized demonstration tailored to your mission requirements and operational environment.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-300">
              <div className="flex items-center">
                <CheckCircleIcon className="w-5 h-5 text-primary mr-2" />
                <span>30-45 minute technical deep-dive</span>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="w-5 h-5 text-primary mr-2" />
                <span>Mission-specific use cases</span>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="w-5 h-5 text-primary mr-2" />
                <span>Live platform demonstration</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form Column */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">Request a Demo</h2>
                <p className="text-slate-300">
                  Complete the form below and our team will contact you within 24 hours to schedule your personalized demonstration.
                </p>
              </div>
              <Suspense fallback={
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 text-center">
                  <div className="animate-pulse">
                    <div className="h-8 bg-slate-800 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-slate-800 rounded w-1/2"></div>
                  </div>
                </div>
              }>
                <DemoForm />
              </Suspense>
            </div>

            {/* Benefits Column */}
            <div className="lg:pl-8">
              <h2 className="text-3xl font-bold mb-8">What to Expect</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-14 h-14 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <UserGroupIcon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-xl font-bold mb-2">Meet the Team</h3>
                    <p className="text-slate-300">
                      Connect directly with veterans, scientists, and AI practitioners from NASA, MIT, DARPA, and GTRI who understand defense operations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-14 h-14 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <RocketLaunchIcon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-xl font-bold mb-2">Live Platform Demo</h3>
                    <p className="text-slate-300">
                      See the open orchestrator in action: multi-domain swarm coordination, contested environment operations, and effects-based control.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-14 h-14 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ShieldCheckIcon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-xl font-bold mb-2">Mission-Specific Discussion</h3>
                    <p className="text-slate-300">
                      Discuss your operational requirements, integration needs, and specific use cases. We'll tailor the demonstration to your mission objectives.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-14 h-14 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircleIcon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-xl font-bold mb-2">Technical Deep-Dive</h3>
                    <p className="text-slate-300">
                      Explore our algorithm repository, edge computing architecture, and platform integration capabilities. Get answers to technical questions from our engineering team.
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 p-6 bg-slate-900 border border-slate-800 rounded-lg">
                <h3 className="text-lg font-bold mb-4">Trusted by Defense Organizations</h3>
                <div className="space-y-3 text-sm text-slate-300">
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                    <span>CAGE Code: 9YTA9 (Verified Defense Contractor)</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                    <span>Built by veterans from premier defense institutions</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                    <span>All communications handled with strict confidentiality</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                    <span>ITAR compliance and secure collaboration protocols</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-slate-900 border-y border-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Built for Defense Operators</h2>
            <p className="text-xl text-slate-300 mb-12">
              NODA AI is designed by defense professionals who understand the complexity of modern multi-domain operations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                <div className="text-slate-300">Defense Algorithms</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">Open</div>
                <div className="text-slate-300">Architecture Model</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-slate-300">Platform Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Demo FAQs</h2>
            
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-2">How long does the demo take?</h3>
                <p className="text-slate-300">
                  Typically 30-45 minutes, but we can extend to 60 minutes for in-depth technical discussions or specific mission requirements.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Can I bring my technical team?</h3>
                <p className="text-slate-300">
                  Absolutely. We encourage bringing system architects, operators, and program managers to get the most from the demonstration.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Is this demo classified or ITAR-controlled?</h3>
                <p className="text-slate-300">
                  The initial demonstration covers unclassified platform capabilities. For classified discussions or ITAR-controlled scenarios, we'll coordinate appropriate secure channels.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-2">What information should I prepare?</h3>
                <p className="text-slate-300">
                  Your operational environment, mission objectives, existing platforms, and specific challenges you're facing. This helps us tailor the demo to your needs.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-2">What happens after the demo?</h3>
                <p className="text-slate-300">
                  We'll provide technical documentation, answer follow-up questions, and discuss next steps including pilot programs, integration planning, or procurement processes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
