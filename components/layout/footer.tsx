import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company */}
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-slate-300 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-slate-300 hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-bold text-lg mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/solutions" className="text-slate-300 hover:text-primary transition-colors">
                  Platform Overview
                </Link>
              </li>
              <li>
                <Link href="/use-cases/multi-domain-swarm-coordination" className="text-slate-300 hover:text-primary transition-colors">
                  Swarm Coordination
                </Link>
              </li>
              <li>
                <Link href="/use-cases/contested-environment-operations" className="text-slate-300 hover:text-primary transition-colors">
                  Contested Operations
                </Link>
              </li>
              <li>
                <Link href="/use-cases/mission-effects-orchestration" className="text-slate-300 hover:text-primary transition-colors">
                  Effects Orchestration
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-slate-300 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-300 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-300 hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Get In Touch</h3>
            <p className="text-slate-300 text-sm mb-4">
              Connect with our team to learn about collaborative autonomous systems.
            </p>
            <Link href="/demo" className="inline-block">
              <button className="px-4 py-2 bg-primary hover:bg-primary-hover text-slate-950 rounded-lg font-semibold transition-all">
                Book a Demo
              </button>
            </Link>
            <p className="text-slate-400 text-xs mt-4">
              CAGE Code: 9YTA9
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} NODA AI. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-6">
              <a
                href="https://www.linkedin.com/company/nodaintelligence"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
