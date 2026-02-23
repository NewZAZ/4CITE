import { Head, Link } from '@inertiajs/react'
import Layout from '~/components/layout'

export default function NotFound() {
  return (
    <Layout>
      <Head title="Page Not Found" />
      <div className="text-center py-20 animate-fade-in">
        <p className="text-brass font-semibold text-sm tracking-[0.2em] uppercase mb-4">Error 404</p>
        <h1 className="text-7xl font-bold text-charcoal/10 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-charcoal mb-3">Page not found</h2>
        <p className="text-warm-gray mb-8">The page you're looking for doesn't exist.</p>
        <Link href="/" className="bg-charcoal hover:bg-charcoal-light text-white px-8 py-3 rounded-lg text-sm font-semibold tracking-wide transition-colors">
          Go Home
        </Link>
      </div>
    </Layout>
  )
}
