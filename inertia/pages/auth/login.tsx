import { Head, Link, useForm } from '@inertiajs/react'
import Layout from '~/components/layout'

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    post('/login')
  }

  return (
    <Layout>
      <Head title="Login" />
      <div className="max-w-md mx-auto animate-fade-in">
        <div className="bg-white rounded-xl card-shadow overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-brass to-brass-light" />
          <div className="p-8">
            <h1 className="text-3xl font-bold text-charcoal mb-2">Welcome back</h1>
            <p className="text-warm-gray text-sm mb-8">Sign in to your account</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-charcoal-light mb-1.5">Email</label>
                <input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="block w-full rounded-lg border border-cream bg-ivory/50 px-4 py-2.5 text-charcoal placeholder:text-warm-gray-light focus:border-brass focus:ring-1 focus:ring-brass focus:outline-none transition-colors" required />
                {errors.email && <p className="mt-1.5 text-sm text-rose">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-charcoal-light mb-1.5">Password</label>
                <input id="password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} className="block w-full rounded-lg border border-cream bg-ivory/50 px-4 py-2.5 text-charcoal placeholder:text-warm-gray-light focus:border-brass focus:ring-1 focus:ring-brass focus:outline-none transition-colors" required />
                {errors.password && <p className="mt-1.5 text-sm text-rose">{errors.password}</p>}
              </div>
              <button type="submit" disabled={processing} className="w-full bg-charcoal hover:bg-charcoal-light text-white font-semibold py-3 px-4 rounded-lg disabled:opacity-50 transition-colors tracking-wide">
                {processing ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-warm-gray">
              Don't have an account?{' '}
              <Link href="/register" className="text-brass-dark hover:text-brass font-medium">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
