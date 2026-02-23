import { Head, Link } from '@inertiajs/react'
import Layout from '~/components/layout'

export default function Privacy() {
  return (
    <Layout>
      <Head title="Privacy Policy" />

      <div className="mb-6 animate-fade-in">
        <Link
          href="/"
          className="text-brass-dark hover:text-brass text-sm font-medium inline-flex items-center gap-1"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
              clipRule="evenodd"
            />
          </svg>
          Back to home
        </Link>
      </div>

      <div className="max-w-3xl animate-fade-in animate-delay-1">
        <div className="bg-white rounded-xl card-shadow overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-brass to-brass-light" />
          <div className="p-8 md:p-12">
            <h1 className="text-4xl font-bold text-charcoal mb-2">Privacy Policy</h1>
            <p className="text-warm-gray text-sm mb-10">Last updated: February 2026</p>

            <div className="prose prose-warm-gray max-w-none space-y-8 text-charcoal-light text-sm leading-relaxed">
              <section>
                <h2 className="text-xl font-semibold text-charcoal mb-3">1. Information We Collect</h2>
                <p>
                  When you create an account on Akkor Hotel, we collect your pseudonym, email address,
                  and password (stored securely using industry-standard hashing). When you make a booking,
                  we collect the reservation details including check-in and check-out dates.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-charcoal mb-3">2. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process and manage your hotel bookings</li>
                  <li>Send you booking confirmations and updates</li>
                  <li>Communicate with you about your account</li>
                  <li>Ensure the security of our platform</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-charcoal mb-3">3. Data Sharing</h2>
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties.
                  Your data is shared only with the hotel properties you book with, strictly for the purpose
                  of fulfilling your reservation.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-charcoal mb-3">4. Data Security</h2>
                <p>
                  We implement industry-standard security measures to protect your personal information.
                  Passwords are hashed using scrypt and are never stored in plain text. All communications
                  are encrypted in transit.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-charcoal mb-3">5. Your Rights</h2>
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                  <li>Access your personal data through your profile page</li>
                  <li>Update your information at any time via account settings</li>
                  <li>Delete your account and all associated data</li>
                  <li>Request a copy of your data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-charcoal mb-3">6. Cookies</h2>
                <p>
                  We use session cookies to maintain your authentication state. These cookies are
                  essential for the functioning of our service and are automatically deleted when
                  you log out or your session expires.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-charcoal mb-3">7. Contact</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at{' '}
                  <span className="text-brass-dark font-medium">privacy@akkor-hotel.com</span>.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
