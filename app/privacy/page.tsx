import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'NODA Intelligence privacy policy and data protection practices for government agencies.',
}

export default function PrivacyPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-[--color-gray-600] mb-8">
            Last Updated: January 1, 2025
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-[--color-gray-700] leading-relaxed">
                NODA Intelligence ("we," "our," or "us") is committed to protecting the privacy and security of information collected through our website and platform. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website or use our services.
              </p>
              <p className="text-[--color-gray-700] leading-relaxed">
                As a provider of AI solutions to government agencies, we adhere to the highest standards of data protection, including FedRAMP requirements and federal privacy regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold mb-3">Information You Provide</h3>
              <ul className="list-disc pl-6 space-y-2 text-[--color-gray-700]">
                <li>Contact information (name, email, phone number, agency affiliation)</li>
                <li>Account credentials (username, password)</li>
                <li>Communications with our support team</li>
                <li>Information submitted through forms on our website</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">Automatically Collected Information</h3>
              <ul className="list-disc pl-6 space-y-2 text-[--color-gray-700]">
                <li>Log data (IP address, browser type, operating system)</li>
                <li>Usage data (pages visited, time spent, navigation patterns)</li>
                <li>Device information</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
              <p className="text-[--color-gray-700] leading-relaxed mb-4">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[--color-gray-700]">
                <li>Provide, maintain, and improve our services</li>
                <li>Respond to inquiries and provide customer support</li>
                <li>Send administrative information and service updates</li>
                <li>Analyze usage patterns to enhance user experience</li>
                <li>Comply with legal obligations and enforce our terms</li>
                <li>Prevent fraud and maintain platform security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Data Sharing and Disclosure</h2>
              <p className="text-[--color-gray-700] leading-relaxed mb-4">
                We do not sell your personal information. We may share information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[--color-gray-700]">
                <li><strong>Service Providers:</strong> With vendors who perform services on our behalf</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with mergers or acquisitions</li>
                <li><strong>With Consent:</strong> When you explicitly authorize disclosure</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
              <p className="text-[--color-gray-700] leading-relaxed">
                We implement industry-standard security measures to protect your information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[--color-gray-700] mt-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and audits</li>
                <li>Access controls and authentication mechanisms</li>
                <li>FedRAMP-compliant security controls</li>
                <li>Continuous monitoring and incident response procedures</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Data Retention</h2>
              <p className="text-[--color-gray-700] leading-relaxed">
                We retain personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When information is no longer needed, we securely delete or anonymize it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Your Rights</h2>
              <p className="text-[--color-gray-700] leading-relaxed mb-4">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[--color-gray-700]">
                <li><strong>Access:</strong> Request copies of your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request transfer of your information</li>
                <li><strong>Objection:</strong> Object to certain processing activities</li>
              </ul>
              <p className="text-[--color-gray-700] leading-relaxed mt-4">
                To exercise these rights, please contact us at privacy@nodaintelligence.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Cookies and Tracking</h2>
              <p className="text-[--color-gray-700] leading-relaxed">
                We use cookies and similar technologies to enhance your experience. You can control cookies through your browser settings. Note that disabling cookies may affect website functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Children's Privacy</h2>
              <p className="text-[--color-gray-700] leading-relaxed">
                Our services are not directed to individuals under 18. We do not knowingly collect personal information from children. If we learn we have collected information from a child, we will delete it promptly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Changes to This Policy</h2>
              <p className="text-[--color-gray-700] leading-relaxed">
                We may update this Privacy Policy periodically. We will notify you of material changes by posting the new policy on this page with an updated "Last Updated" date. Your continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
              <p className="text-[--color-gray-700] leading-relaxed">
                For questions about this Privacy Policy or our data practices, please contact:
              </p>
              <div className="mt-4 p-6 bg-[--color-muted] rounded-lg">
                <p className="text-[--color-gray-700]">
                  <strong>NODA Intelligence</strong><br />
                  Email: privacy@nodaintelligence.com<br />
                  Phone: +1 (800) 555-1234<br />
                  Address: 1600 Pennsylvania Avenue NW, Washington, DC 20500
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
