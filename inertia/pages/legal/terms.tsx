import { Head, Link } from '@inertiajs/react'
import Layout from '~/components/layout'

export default function Terms() {
  return (
    <Layout>
      <Head title="Terms of Service" />

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
            <h1 className="text-4xl font-bold text-charcoal mb-2">Terms of Service</h1>
            <p className="text-warm-gray text-sm mb-10">Last updated: February 2026</p>

            <div className="prose prose-warm-gray max-w-none space-y-8 text-charcoal-light text-sm leading-relaxed">
              <section>
                <h2 className="text-xl font-semibold text-charcoal mb-3">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using the Akkor Hotel platform, you agree to be bound by these
                  Terms of Service. If you do not agree with any part of these terms, you may not
                  use our services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-charcoal mb-3">2. Account Registration</h2>
                <p>
                  To make bookings, you must create an account with a valid email address and a
                  password of at least 8 characters. You are responsible for maintaining the
                  confidentiality of your account credentials and for all activities under your account.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-charcoal mb-3">3. Bookings</h2>
                <p>
                  When you make a booking through our platform, you enter into a direct agreement
                  with the hotel property. Akkor Hotel acts as an intermediary to facilitate
                  the reservation process. Bookings are subject to availability and the hotel's
                  own terms and conditions.
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                  <li>Bookings can be created, modified, or cancelled through your account</li>
                  <li>Check-in date must be in the future at the time of booking</li>
                  <li>Check-out date must be after the check-in date</li>
                  <li>Cancellation policies may vary by property</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-charcoal mb-3">4. User Conduct</h2>
                <p>You agree not to:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                  <li>Use the service for any unlawful purpose</li>
                  <li>Attempt to gain unauthorized access to other accounts</li>
                  <li>Interfere with the proper functioning of the platform</li>
                  <li>Submit false or misleading information</li>
                  <li>Use automated tools to scrape or interact with the service</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-charcoal mb-3">5. Account Termination</h2>
                <p>
                  You may delete your account at any time through your profile settings. We reserve
                  the right to suspend or terminate accounts that violate these terms. Upon deletion,
                  all your personal data and booking history will be permanently removed.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-charcoal mb-3">6. Limitation of Liability</h2>
                <p>
                  Akkor Hotel provides the platform &ldquo;as is&rdquo; without warranties of any kind.
                  We are not liable for any direct, indirect, incidental, or consequential damages
                  arising from your use of the service or any hotel stay booked through our platform.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-charcoal mb-3">7. Changes to Terms</h2>
                <p>
                  We may update these Terms of Service from time to time. We will notify users of
                  significant changes via email or through the platform. Continued use of the
                  service after changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-charcoal mb-3">8. Contact</h2>
                <p>
                  For questions about these Terms of Service, contact us at{' '}
                  <span className="text-brass-dark font-medium">legal@akkor-hotel.com</span>.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
