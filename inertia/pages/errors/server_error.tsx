import { Head, Link } from '@inertiajs/react'
import Layout from '~/components/layout'

export default function ServerError(props: { error: any }) {
  return (
    <Layout>
      <Head title="Server Error" />
      <div className="text-center py-20 animate-fade-in">
        <p className="text-rose font-semibold text-sm tracking-[0.2em] uppercase mb-4">Error 500</p>
        <h1 className="text-7xl font-bold text-charcoal/10 mb-2">500</h1>
        <h2 className="text-2xl font-semibold text-charcoal mb-3">Server Error</h2>
        <p className="text-warm-gray mb-8">{props.error?.message || 'Something went wrong.'}</p>
        <Link href="/" className="bg-charcoal hover:bg-charcoal-light text-white px-8 py-3 rounded-lg text-sm font-semibold tracking-wide transition-colors">
          Go Home
        </Link>
      </div>
    </Layout>
  )
}
