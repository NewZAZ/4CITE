import { Head, Link, useForm, usePage } from '@inertiajs/react'
import Layout from '~/components/layout'
import type { SharedProps } from '@adonisjs/inertia/types'

interface TargetUser {
  id: number
  pseudo: string
  email: string
  role: string
}

interface Props {
  targetUser: TargetUser
}

export default function UserEdit({ targetUser }: Props) {
  const { user } = usePage<SharedProps>().props
  const { data, setData, put, processing, errors } = useForm({
    pseudo: targetUser.pseudo,
    email: targetUser.email,
    password: '',
  })

  const isOwnProfile = user?.id === targetUser.id
  const initials = targetUser.pseudo.slice(0, 2).toUpperCase()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    put(`/users/${targetUser.id}`)
  }

  return (
    <Layout>
      <Head title={`Edit ${targetUser.pseudo}`} />

      <div className="mb-8 animate-fade-in">
        <Link
          href={`/users/${targetUser.id}`}
          className="text-brass-dark hover:text-brass text-sm font-medium inline-flex items-center gap-1.5 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
              clipRule="evenodd"
            />
          </svg>
          Back to profile
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 animate-fade-in animate-delay-1">
        {/* Form */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl card-shadow overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-brass to-brass-light" />
            <div className="p-8 lg:p-12">
              <h1 className="text-4xl font-bold text-charcoal mb-2">Edit Profile</h1>
              <p className="text-warm-gray text-sm mb-10">
                Update {isOwnProfile ? 'your' : `${targetUser.pseudo}'s`} account information
              </p>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="pseudo"
                      className="block text-sm font-medium text-charcoal-light mb-2"
                    >
                      Display Name
                    </label>
                    <input
                      id="pseudo"
                      type="text"
                      value={data.pseudo}
                      onChange={(e) => setData('pseudo', e.target.value)}
                      className="block w-full rounded-lg border border-cream bg-ivory/50 px-4 py-3 text-charcoal placeholder:text-warm-gray-light focus:border-brass focus:ring-1 focus:ring-brass focus:outline-none transition-colors"
                      required
                    />
                    {errors.pseudo && <p className="mt-1.5 text-sm text-rose">{errors.pseudo}</p>}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-charcoal-light mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={data.email}
                      onChange={(e) => setData('email', e.target.value)}
                      className="block w-full rounded-lg border border-cream bg-ivory/50 px-4 py-3 text-charcoal placeholder:text-warm-gray-light focus:border-brass focus:ring-1 focus:ring-brass focus:outline-none transition-colors"
                      required
                    />
                    {errors.email && <p className="mt-1.5 text-sm text-rose">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-charcoal-light mb-2"
                  >
                    New Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    placeholder="Leave blank to keep current password"
                    className="block w-full rounded-lg border border-cream bg-ivory/50 px-4 py-3 text-charcoal placeholder:text-warm-gray-light focus:border-brass focus:ring-1 focus:ring-brass focus:outline-none transition-colors"
                    minLength={8}
                  />
                  {errors.password && (
                    <p className="mt-1.5 text-sm text-rose">{errors.password}</p>
                  )}
                  <p className="mt-1.5 text-xs text-warm-gray-light">
                    Must be at least 8 characters. Leave blank to keep your current password.
                  </p>
                </div>

                <div className="flex gap-3 pt-4 border-t border-cream">
                  <button
                    type="submit"
                    disabled={processing}
                    className="bg-brass hover:bg-brass-light text-charcoal font-semibold py-3 px-8 rounded-lg disabled:opacity-50 transition-all hover:shadow-lg hover:shadow-brass/20 tracking-wide"
                  >
                    {processing ? 'Saving...' : 'Save Changes'}
                  </button>
                  <Link
                    href={`/users/${targetUser.id}`}
                    className="bg-cream hover:bg-ivory-dark text-charcoal-light font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile preview card */}
          <div className="bg-white rounded-2xl card-shadow p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-5">
              <svg
                className="w-4 h-4 text-brass"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <h3 className="text-xs font-semibold text-warm-gray uppercase tracking-wider">
                Preview
              </h3>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-brass text-charcoal flex items-center justify-center text-2xl font-bold mx-auto">
                {(data.pseudo || 'U').slice(0, 2).toUpperCase()}
              </div>
              <p className="mt-4 font-semibold text-charcoal text-lg">
                {data.pseudo || 'Display Name'}
              </p>
              <p className="text-sm text-warm-gray mt-0.5">{data.email || 'email@example.com'}</p>
              <span className="inline-block mt-2 text-[11px] font-semibold px-2.5 py-1 rounded-full tracking-wider uppercase bg-cream text-warm-gray">
                {targetUser.role}
              </span>
            </div>

            <div className="mt-6 pt-5 border-t border-cream">
              <h4 className="text-xs font-semibold text-warm-gray uppercase tracking-wider mb-3">
                Security
              </h4>
              <div className="flex items-center gap-2 text-sm">
                <svg
                  className={`w-4 h-4 ${data.password ? 'text-emerald' : 'text-warm-gray-light'}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span className={data.password ? 'text-emerald' : 'text-warm-gray-light'}>
                  {data.password ? 'Password will be updated' : 'Password unchanged'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
