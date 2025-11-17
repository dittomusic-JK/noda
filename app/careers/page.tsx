import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Careers - Join NODA AI',
  description: 'Build the future of defense autonomy. Join veterans, scientists, and AI practitioners from NASA, MIT, DARPA, and GTRI.',
  keywords: 'defense AI careers, autonomous systems jobs, robotics jobs, defense technology careers, algorithmic warfare',
}

// Job listings are managed in Ashby and embedded via iframe
// Visit https://www.nodaintelligence.ai/careers/ to see live listings

const benefits = [
  {
    title: 'Defense Impact',
    description: 'Work on cutting-edge autonomous systems that advance national defense capabilities.',
  },
  {
    title: 'World-Class Team',
    description: 'Collaborate with veterans and scientists from NASA, MIT, DARPA, and GTRI.',
  },
  {
    title: 'Technical Excellence',
    description: 'Access to premiere research, unlimited learning budget, and conference attendance.',
  },
  {
    title: 'Competitive Package',
    description: 'Market-rate salaries, equity in a venture-backed company, and performance bonuses.',
  },
  {
    title: 'Flexible Work',
    description: 'Hybrid and remote options, flexible schedules, unlimited PTO, and family leave.',
  },
  {
    title: 'Comprehensive Benefits',
    description: 'Full medical, dental, vision, mental health coverage, and 401k matching.',
  },
]

const values = [
  {
    title: 'Country First',
    description: 'Deep and genuine commitment to national defense. Patriots building for patriots.',
  },
  {
    title: 'Technical Excellence',
    description: 'We build world-class autonomous systems with the deepest defense algorithm repository.',
  },
  {
    title: 'Open & Agnostic',
    description: 'Platform-agnostic architecture. Vendor-neutral. Collaborative by design.',
  },
  {
    title: 'Mission Effects',
    description: 'Focus on desired mission effects, not individual system management.',
  },
]

export default function CareersPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary to-primary-hover text-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Build the Future of Defense Autonomy
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Join veterans, scientists, and AI practitioners from NASA, MIT, DARPA, and GTRI building collaborative autonomous systems.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#open-positions">
                <Button size="lg" className="bg-slate-950 text-primary hover:bg-slate-900 hover:shadow-xl">
                  View Open Positions
                </Button>
              </a>
              <a href="https://www.linkedin.com/company/nodaintelligence" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-2 border-slate-950 text-slate-950 hover:bg-slate-950 hover:text-primary">
                  Follow on LinkedIn
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Why NODA AI?</h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Work on next-generation autonomous systems and algorithmic warfare with a team of patriots who put country first.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <Card key={benefit.title}>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-slate-300">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-slate-900 border-y border-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-slate-300">
              The principles that guide our work and culture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value) => (
              <div key={value.title} className="bg-slate-900 border border-slate-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-slate-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings - Ashby Embed */}
      <section id="open-positions" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
            <p className="text-lg text-slate-300">
              We're hiring talented individuals across autonomy, robotics, defense AI, and system architecture.
            </p>
          </div>

          {/* Ashby Jobs Embed */}
          <div className="max-w-4xl mx-auto">
            <iframe 
              src="https://jobs.ashbyhq.com/nodaintelligence" 
              width="100%" 
              height="800px" 
              style={{ border: 'none' }}
              title="NODA AI Job Listings"
            />
          </div>
        </div>
      </section>

      {/* Equal Opportunity */}
      <section className="py-20 bg-slate-900 border-y border-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Equal Opportunity Employer</h2>
            <p className="text-lg text-slate-300 mb-8">
              NODA AI is committed to creating a diverse and inclusive workplace. We are an equal opportunity employer and do not discriminate based on race, color, religion, sex, national origin, age, disability, veteran status, sexual orientation, gender identity, or any other protected characteristic.
            </p>
            <p className="text-lg text-slate-300">
              We believe that diverse teams build better defense systems. If you need accommodations during the application process, please contact us at <a href="mailto:careers@nodaai.com" className="text-primary hover:underline">careers@nodaai.com</a>.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Interested in NODA AI?</h2>
            <p className="text-lg text-slate-300 mb-8">
              Connect with our team to learn more about opportunities and our mission.
            </p>
            <a href="https://www.linkedin.com/company/nodaintelligence" target="_blank" rel="noopener noreferrer">
              <Button size="lg">Connect on LinkedIn</Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
