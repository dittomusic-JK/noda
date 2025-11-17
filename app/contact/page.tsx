import type { Metadata } from 'next'
import { ContactForm } from '@/components/forms/contact-form'
import { SectionHeader } from '@/components/sections/section-header'

export const metadata: Metadata = {
  title: 'Contact Us | NODA AI',
  description: 'Connect with NODA AI for partnerships, press inquiries, careers, or general questions. Reach our team of defense AI experts.',
}

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact NODA AI
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Connect with our team for partnerships, press inquiries, careers, or general questions.
            </p>
            <a
              href="/demo"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-primary text-slate-950 hover:bg-primary/90 rounded-lg transition-all duration-200 shadow-lg"
            >
              Book a Demo →
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Send a Message</h2>
              <p className="text-slate-300 mb-8">
                For product demonstrations, please use our <a href="/demo" className="text-primary hover:underline">Book a Demo</a> page. For other inquiries, reach out below.
              </p>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div className="lg:pl-12">
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-8">
                {/* Email */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold mb-1">Email</h3>
                    <a href="mailto:contact@nodaai.com" className="text-primary hover:underline">
                      contact@nodaai.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold mb-1">Phone</h3>
                    <a href="tel:+18005551234" className="text-primary hover:underline">
                      +1 (800) 555-1234
                    </a>
                    <p className="text-sm text-slate-400">Mon-Fri 9am-6pm EST</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold mb-1">Careers</h3>
                    <a href="mailto:careers@nodaai.com" className="text-primary hover:underline">
                      careers@nodaai.com
                    </a>
                    <p className="text-sm text-slate-400 mt-1">Join our team of veterans and scientists</p>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-12 p-6 bg-slate-900 border border-slate-800 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-3">Ready for a Demo?</h3>
                <p className="text-slate-300 mb-4">
                  Schedule a personalized demonstration of the NODA AI platform tailored to your mission requirements.
                </p>
                <a
                  href="/demo"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold bg-primary text-slate-950 hover:bg-primary/90 rounded-lg transition-all duration-200 w-full"
                >
                  Book a Demo
                </a>
              </div>

              {/* LinkedIn */}
              <div className="mt-8 p-6 bg-slate-900 border border-slate-800 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-3">Follow Us</h3>
                <a
                  href="https://www.linkedin.com/company/nodaintelligence"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:underline"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-900 border-y border-slate-800">
        <div className="container mx-auto px-4">
          <SectionHeader
            subtitle="FAQs"
            title="Common Questions"
            description="Quick answers to questions you may have."
          />
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <h3 className="text-lg font-bold mb-2">How do I schedule a product demo?</h3>
              <p className="text-slate-300">
                Visit our <a href="/demo" className="text-primary hover:underline">Book a Demo</a> page to request a personalized demonstration. Our team will contact you within 24 hours.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <h3 className="text-lg font-bold mb-2">Are you hiring?</h3>
              <p className="text-slate-300">
                Yes! Visit our <a href="/careers" className="text-primary hover:underline">Careers page</a> to view open positions. We're looking for veterans, scientists, and AI practitioners passionate about defense.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <h3 className="text-lg font-bold mb-2">How do I contact you for press/media inquiries?</h3>
              <p className="text-slate-300">
                Email us at <a href="mailto:contact@nodaai.com" className="text-primary hover:underline">contact@nodaai.com</a> with "Press Inquiry" in the subject line.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <h3 className="text-lg font-bold mb-2">Do you have a partnership program?</h3>
              <p className="text-slate-300">
                We collaborate with defense primes, platform vendors, and research institutions. Contact us at <a href="mailto:contact@nodaai.com" className="text-primary hover:underline">contact@nodaai.com</a> to discuss partnership opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
