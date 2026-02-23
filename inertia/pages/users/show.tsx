import { Head, Link, router, usePage } from '@inertiajs/react'
import Layout from '~/components/layout'
import type { SharedProps } from '@adonisjs/inertia/types'

interface TargetUser {
  id: number
  pseudo: string
  email: string
  role: string
  createdAt: string
}

interface RecentBooking {
  id: number
  checkIn: string
  checkOut: string
  status: string
  hotel: { id: number; name: string; location: string }
}

interface Props {
  targetUser: TargetUser
  recentBookings: RecentBooking[]
  totalBookings: number
}

export default function UserShow({ targetUser, recentBookings, totalBookings }: Props) {
  const { user } = usePage<SharedProps>().props

  const canEdit = user?.id === targetUser.id || user?.role === 'admin'
  const canDelete = user?.id === targetUser.id || user?.role === 'admin'
  const isOwnProfile = user?.id === targetUser.id

  const roleConfig: Record<string, { label: string; color: string }> = {
    admin: { label: 'Administrator', color: 'bg-brass/15 text-brass-dark' },
    employee: { label: 'Employee', color: 'bg-sky-badge text-sky-text' },
    user: { label: 'Member', color: 'bg-cream text-warm-gray' },
  }

  const statusColors: Record<string, string> = {
    pending: 'bg-amber-badge text-amber-text',
    confirmed: 'bg-emerald-light text-emerald',
    cancelled: 'bg-rose-light text-rose',
  }

  const initials = targetUser.pseudo.slice(0, 2).toUpperCase()
  const memberSince = new Date(targetUser.createdAt)
  const daysSinceJoin = Math.floor((Date.now() - memberSince.getTime()) / (1000 * 60 * 60 * 24))

  const confirmedCount = recentBookings.filter((b) => b.status === 'confirmed').length

  return (
    <Layout>
      <Head title={isOwnProfile ? 'My Profile' : `${targetUser.pseudo}'s Profile`} />

      <div className="w-full">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl card-shadow overflow-hidden animate-fade-in">
          {/* Charcoal gradient banner */}
          <div className="h-44 md:h-52 bg-gradient-to-br from-charcoal via-charcoal to-charcoal-light relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.05),transparent_70%)]" />
            {/* Decorative pattern */}
            <svg className="absolute bottom-0 right-0 w-72 h-72 opacity-[0.03] text-brass-light" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </div>

          {/* Profile content */}
          <div className="px-5 sm:px-8 lg:px-12 pb-8 sm:pb-10">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-5">
              {/* Avatar overlapping the banner */}
              <div className="-mt-12 sm:-mt-16 relative z-10">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-brass text-charcoal flex items-center justify-center text-3xl sm:text-4xl font-bold border-4 border-white card-shadow">
                  {initials}
                </div>
              </div>

              {/* User identity - pseudo displayed PROMINENTLY */}
              <div className="flex-1 sm:pb-2">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <h1 className="text-2xl sm:text-4xl font-bold text-charcoal">{targetUser.pseudo}</h1>
                  <span
                    className={`text-[11px] font-semibold px-3 py-1 rounded-full tracking-wider uppercase ${roleConfig[targetUser.role]?.color || 'bg-cream text-warm-gray'}`}
                  >
                    {roleConfig[targetUser.role]?.label || targetUser.role}
                  </span>
                </div>
                <p className="text-warm-gray text-sm mt-1">{targetUser.email}</p>
              </div>

              {/* Action buttons */}
              {canEdit && (
                <div className="flex items-center gap-2 sm:pb-1 w-full sm:w-auto">
                  <Link
                    href={`/users/${targetUser.id}/edit`}
                    className="inline-flex items-center justify-center gap-2 bg-cream hover:bg-ivory-dark text-charcoal-light px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex-1 sm:flex-initial"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                      <path d="m15 5 4 4" />
                    </svg>
                    Edit Profile
                  </Link>
                  {canDelete && (
                    <button
                      onClick={() => {
                        if (
                          confirm(
                            'Are you sure you want to delete this account? This action cannot be undone.'
                          )
                        ) {
                          router.delete(`/users/${targetUser.id}`)
                        }
                      }}
                      className="inline-flex items-center justify-center gap-2 bg-rose/10 hover:bg-rose-light text-rose px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex-1 sm:flex-initial"
                    >
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      </svg>
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {/* Account Info */}
          <div className="bg-white rounded-2xl card-shadow p-8 animate-fade-in animate-delay-1">
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
                Account Info
              </h3>
            </div>
            <dl className="space-y-4">
              <div>
                <dt className="text-xs text-warm-gray-light">Member since</dt>
                <dd className="text-sm font-medium text-charcoal mt-0.5">
                  {memberSince.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </dd>
              </div>
              <div className="gold-line" />
              <div>
                <dt className="text-xs text-warm-gray-light">Account age</dt>
                <dd className="text-sm font-medium text-charcoal mt-0.5">
                  {daysSinceJoin === 0
                    ? 'Joined today'
                    : daysSinceJoin === 1
                      ? '1 day'
                      : `${daysSinceJoin} days`}
                </dd>
              </div>
              <div className="gold-line" />
              <div>
                <dt className="text-xs text-warm-gray-light">Role</dt>
                <dd className="mt-1">
                  <span
                    className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full tracking-wider uppercase ${roleConfig[targetUser.role]?.color || 'bg-cream text-warm-gray'}`}
                  >
                    {roleConfig[targetUser.role]?.label || targetUser.role}
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          {/* Statistics */}
          <div className="bg-white rounded-2xl card-shadow p-8 animate-fade-in animate-delay-2">
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
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
              </svg>
              <h3 className="text-xs font-semibold text-warm-gray uppercase tracking-wider">
                Statistics
              </h3>
            </div>
            <div className="space-y-8">
              <div>
                <p className="text-5xl font-bold text-brass leading-none">{totalBookings}</p>
                <p className="text-sm text-warm-gray mt-2">Total bookings</p>
              </div>
              <div className="gold-line" />
              <div>
                <p className="text-5xl font-bold text-emerald leading-none">{confirmedCount}</p>
                <p className="text-sm text-warm-gray mt-2">Confirmed (recent)</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl card-shadow p-8 animate-fade-in animate-delay-3">
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
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              <h3 className="text-xs font-semibold text-warm-gray uppercase tracking-wider">
                Quick Actions
              </h3>
            </div>
            <div className="space-y-2.5">
              {isOwnProfile && (
                <>
                  <Link
                    href="/bookings/create"
                    className="flex items-center gap-3 w-full px-5 py-3.5 text-sm text-charcoal-light bg-ivory hover:bg-cream rounded-xl transition-colors group"
                  >
                    <svg
                      className="w-4 h-4 text-warm-gray group-hover:text-brass transition-colors"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8v8" />
                      <path d="M8 12h8" />
                    </svg>
                    New Booking
                  </Link>
                  <Link
                    href="/bookings"
                    className="flex items-center gap-3 w-full px-5 py-3.5 text-sm text-charcoal-light bg-ivory hover:bg-cream rounded-xl transition-colors group"
                  >
                    <svg
                      className="w-4 h-4 text-warm-gray group-hover:text-brass transition-colors"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    View All Bookings
                  </Link>
                  <Link
                    href={`/users/${targetUser.id}/edit`}
                    className="flex items-center gap-3 w-full px-5 py-3.5 text-sm text-charcoal-light bg-ivory hover:bg-cream rounded-xl transition-colors group"
                  >
                    <svg
                      className="w-4 h-4 text-warm-gray group-hover:text-brass transition-colors"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    </svg>
                    Edit Profile
                  </Link>
                </>
              )}
              <Link
                href="/hotels"
                className="flex items-center gap-3 w-full px-5 py-3.5 text-sm text-charcoal-light bg-ivory hover:bg-cream rounded-xl transition-colors group"
              >
                <svg
                  className="w-4 h-4 text-warm-gray group-hover:text-brass transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Browse Hotels
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Bookings Table */}
        {recentBookings.length > 0 && (
          <div className="mt-10 bg-white rounded-2xl card-shadow overflow-hidden animate-fade-in animate-delay-4">
            <div className="px-8 py-5 border-b border-cream flex items-center justify-between">
              <h3 className="text-sm font-semibold text-charcoal tracking-wide">
                Recent Bookings
              </h3>
              {isOwnProfile && totalBookings > recentBookings.length && (
                <Link
                  href="/bookings"
                  className="text-xs text-brass-dark hover:text-brass font-medium transition-colors"
                >
                  View all ({totalBookings})
                </Link>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-cream">
                    <th className="px-8 py-3.5 text-left text-xs font-semibold text-warm-gray uppercase tracking-wider">
                      Hotel
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-warm-gray uppercase tracking-wider">
                      Check In
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-warm-gray uppercase tracking-wider">
                      Check Out
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold text-warm-gray uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking, index) => (
                    <tr
                      key={booking.id}
                      className={`hover:bg-ivory/50 transition-colors ${index < recentBookings.length - 1 ? 'border-b border-cream/60' : ''}`}
                    >
                      <td className="px-8 py-4 text-sm">
                        <Link
                          href={`/hotels/${booking.hotel.id}`}
                          className="text-brass-dark hover:text-brass font-medium transition-colors"
                        >
                          {booking.hotel.name}
                        </Link>
                        <p className="text-xs text-warm-gray-light mt-0.5">
                          {booking.hotel.location}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-sm text-warm-gray">
                        {new Date(booking.checkIn).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-6 py-4 text-sm text-warm-gray">
                        {new Date(booking.checkOut).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 text-xs rounded-full font-semibold tracking-wide capitalize ${statusColors[booking.status] || 'bg-cream text-warm-gray'}`}
                        >
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty state when no bookings */}
        {recentBookings.length === 0 && (
          <div className="mt-8 bg-white rounded-2xl card-shadow p-12 text-center animate-fade-in animate-delay-4">
            <svg
              className="w-12 h-12 text-cream mx-auto mb-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <p className="text-warm-gray text-sm">No bookings yet.</p>
            {isOwnProfile && (
              <Link
                href="/bookings/create"
                className="inline-flex items-center gap-2 mt-4 bg-brass hover:bg-brass-light text-charcoal px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              >
                Book your first stay
              </Link>
            )}
          </div>
        )}
      </div>
    </Layout>
  )
}
