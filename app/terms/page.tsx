import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'NODA Intelligence terms of service and acceptable use policy for government agencies.',
}

export default function TermsPage() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
          <p className="text-[--color-gray-600] mb-8">
            Last Updated: January 1, 2025
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-[--color-gray-700] leading-relaxed">
                These Terms of Service ("Terms") govern your access to and use of NODA Intelligence's website, platform, and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy.
              </p>
              <p className="text-[--color-gray-700] leading-relaxed">
                If you are accessing the Services on behalf of a government agency or organization, you represent that you have the authority to bind that entity to these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Description of Services</h2>
              <p className="text-[--color-gray-700] leading-relaxed">
                NODA Intelligence provides artificial intelligence and machine learning solutions designed specifically for government agencies. Our Services include, but are not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[--color-gray-700] mt-4">
                <li>Operational intelligence and incident response automation</li>
                <li>Citizen service automation and conversational AI</li>
                <li>Policy and document analytics</li>
                <li>Predictive analytics and data-driven insights</li>
                <li>Related professional services and support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Eligibility and Account Registration</h2>
              <p className="text-[--color-gray-700] leading-relaxed mb-4">
                Our Services are intended for use by government agencies and authorized personnel. To access certain features, you may need to create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[--color-gray-700]">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Be responsible for all activities under your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Acceptable Use Policy</h2>
              <p className="text-[--color-gray-700] leading-relaxed mb-4">
                You agree to use the Services only for lawful purposes and in accordance with these Terms. You agree NOT to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[--color-gray-700]">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit malicious code or conduct security testing without authorization</li>
                <li>Interfere with or disrupt the Services</li>
                <li>Attempt to gain unauthorized access to any systems or data</li>
                <li>Use the Services for any unlawful or fraudulent purpose</li>
                <li>Reverse engineer or attempt to extract source code</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Government-Specific Terms</h2>
              <p className="text-[--color-gray-700] leading-relaxed">
                For government customers, these Terms are subject to applicable federal, state, and local procurement regulations. In the event of any conflict between these Terms and applicable government procurement regulations, the regulations shall take precedence to the extent required by law.
              </p>
              <p className="text-[--color-gray-700] leading-relaxed mt-4">
                Our Services are designed to comply with FedRAMP requirements and other relevant federal security standards.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Data Ownership and Usage</h2>
              <p className="text-[--color-gray-700] leading-relaxed mb-4">
                <strong>Your Data:</strong> You retain all rights, title, and interest in and to the data you provide to the Services ("Customer Data"). We do not claim ownership of Customer Data.
              </p>
              <p className="text-[--color-gray-700] leading-relaxed">
                <strong>Our Rights:</strong> Subject to your ownership rights, you grant us a limited license to use Customer Data solely to provide the Services and improve our platform (in aggregated, anonymized form).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Intellectual Property</h2>
              <p className="text-[--color-gray-700] leading-relaxed">
                The Services, including all software, content, trademarks, and other intellectual property, are owned by NODA Intelligence or our licensors. These Terms do not grant you any ownership rights in the Services.
              </p>
              <p className="text-[--color-gray-700] leading-relaxed mt-4">
                You may not copy, modify, distribute, sell, or lease any part of our Services without express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Service Level and Availability</h2>
              <p className="text-[--color-gray-700] leading-relaxed">
                We strive to maintain high availability of our Services. However, we do not guarantee uninterrupted access. We may suspend or restrict access for maintenance, security, or other operational reasons.
              </p>
              <p className="text-[--color-gray-700] leading-relaxed mt-4">
                Specific service level agreements (SLAs) are established in customer contracts with government agencies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
              <p className="text-[--color-gray-700] leading-relaxed">
                To the maximum extent permitted by law, NODA Intelligence shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Services.
              </p>
              <p className="text-[--color-gray-700] leading-relaxed mt-4">
                Our total liability for any claims arising from these Terms or the Services shall not exceed the amount paid by you for the Services in the 12 months preceding the claim.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Indemnification</h2>
              <p className="text-[--color-gray-700] leading-relaxed">
                You agree to indemnify and hold harmless NODA Intelligence from any claims, damages, losses, or expenses (including reasonable attorneys' fees) arising from your use of the Services or violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Term and Termination</h2>
              <p className="text-[--color-gray-700] leading-relaxed">
                These Terms remain in effect while you use the Services. We may suspend or terminate your access if you violate these Terms. Upon termination, your right to use the Services ceases immediately.
              </p>
              <p className="text-[--color-gray-700] leading-relaxed mt-4">
                Provisions that by their nature should survive termination (including ownership, warranty disclaimers, and limitations of liability) will continue to apply.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">12. Changes to Terms</h2>
              <p className="text-[--color-gray-700] leading-relaxed">
                We reserve the right to modify these Terms at any time. We will provide notice of material changes by posting the updated Terms on our website with a new "Last Updated" date. Your continued use of the Services after changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">13. Governing Law</h2>
              <p className="text-[--color-gray-700] leading-relaxed">
                These Terms are governed by the laws of the United States and the State of Delaware, without regard to conflict of law provisions. Any disputes shall be resolved in the federal or state courts located in Delaware.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">14. Miscellaneous</h2>
              <p className="text-[--color-gray-700] leading-relaxed mb-4">
                <strong>Entire Agreement:</strong> These Terms, together with our Privacy Policy and any applicable customer agreements, constitute the entire agreement between you and NODA Intelligence.
              </p>
              <p className="text-[--color-gray-700] leading-relaxed">
                <strong>Severability:</strong> If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
              </p>
              <p className="text-[--color-gray-700] leading-relaxed mt-4">
                <strong>Waiver:</strong> Our failure to enforce any right or provision shall not be considered a waiver of those rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">15. Contact Information</h2>
              <p className="text-[--color-gray-700] leading-relaxed">
                For questions about these Terms, please contact:
              </p>
              <div className="mt-4 p-6 bg-[--color-muted] rounded-lg">
                <p className="text-[--color-gray-700]">
                  <strong>NODA Intelligence</strong><br />
                  Email: legal@nodaintelligence.com<br />
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
