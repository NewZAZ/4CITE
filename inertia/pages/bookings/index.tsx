import { Head, Link, router, usePage } from '@inertiajs/react'
import Layout from '~/components/layout'
import Pagination from '~/components/pagination'
import type { SharedProps } from '@adonisjs/inertia/types'
import { useState } from 'react'

interface Booking {
  id: number
  checkIn: string
  checkOut: string
  status: string
  hotel: { id: number; name: string; location: string }
  user: { id: number; pseudo: string; email: string }
}

interface Props {
  bookings: {
    data: Booking[]
    meta: {
      total: number
      perPage: number
      currentPage: number
      lastPage: number
      firstPage: number
    }
  }
  filters: { search: string }
}

export default function BookingsIndex({ bookings, filters }: Props) {
  const { user } = usePage<SharedProps>().props
  const [search, setSearch] = useState(filters.search || '')

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    router.get('/bookings', { search }, { preserveState: true })
  }

  const statusConfig: Record<string, { label: string; color: string; dot: string }> = {
    pending: { label: 'Pending', color: 'bg-amber-badge text-amber-text', dot: 'bg-amber-text' },
    confirmed: { label: 'Confirmed', color: 'bg-emerald-light text-emerald', dot: 'bg-emerald' },
    cancelled: { label: 'Cancelled', color: 'bg-rose-light text-rose', dot: 'bg-rose' },
  }

  return (
    <Layout>
      <Head title="My Bookings" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">
            {user?.role === 'admin' ? 'All Bookings' : 'My Bookings'}
          </h1>
          <p className="text-warm-gray text-sm mt-1">
            {user?.role === 'admin'
              ? `${bookings.meta.total} total reservations`
              : 'Manage your reservations'}
          </p>
        </div>
        <Link
          href="/bookings/create"
          className="inline-flex items-center gap-2 bg-brass hover:bg-brass-light text-charcoal px-5 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all hover:shadow-lg hover:shadow-brass/20 shrink-0"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
          New Booking
        </Link>
      </div>

      {/* Admin search */}
      {user?.role === 'admin' && (
        <form onSubmit={handleSearch} className="mb-8 animate-fade-in animate-delay-1">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray-light"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by booking ID, user name or email..."
              className="w-full rounded-xl border border-cream bg-white pl-11 pr-28 py-3.5 text-charcoal placeholder:text-warm-gray-light focus:border-brass focus:ring-1 focus:ring-brass focus:outline-none transition-colors card-shadow"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-charcoal hover:bg-charcoal-light text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Search
            </button>
          </div>
        </form>
      )}

      {/* Bookings cards for mobile, table for desktop */}
      {bookings.data.length > 0 ? (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-white rounded-2xl card-shadow overflow-hidden animate-fade-in animate-delay-2">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-cream">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-warm-gray uppercase tracking-wider">
                      Hotel
                    </th>
                    {user?.role === 'admin' && (
                      <th className="px-6 py-4 text-left text-xs font-semibold text-warm-gray uppercase tracking-wider">
                        Guest
                      </th>
                    )}
                    <th className="px-6 py-4 text-left text-xs font-semibold text-warm-gray uppercase tracking-wider">
                      Check In
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-warm-gray uppercase tracking-wider">
                      Check Out
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-warm-gray uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.data.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-b border-cream/60 hover:bg-ivory/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <Link
                          href={`/hotels/${booking.hotel.id}`}
                          className="text-sm font-medium text-brass-dark hover:text-brass transition-colors"
                        >
                          {booking.hotel.name}
                        </Link>
                        <p className="text-xs text-warm-gray-light mt-0.5">
                          {booking.hotel.location}
                        </p>
                      </td>
                      {user?.role === 'admin' && (
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-charcoal">
                            {booking.user.pseudo}
                          </p>
                          <p className="text-xs text-warm-gray-light mt-0.5">
                            {booking.user.email}
                          </p>
                        </td>
                      )}
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
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full font-semibold tracking-wide ${statusConfig[booking.status]?.color || 'bg-cream text-warm-gray'}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${statusConfig[booking.status]?.dot || 'bg-warm-gray'}`}
                          />
                          {statusConfig[booking.status]?.label || booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <Link
                            href={`/bookings/${booking.id}/edit`}
                            className="text-charcoal-light hover:text-charcoal text-sm font-medium transition-colors"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => {
                              if (confirm('Cancel this booking?')) {
                                router.delete(`/bookings/${booking.id}`)
                              }
                            }}
                            className="text-rose/70 hover:text-rose text-sm font-medium transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4 animate-fade-in animate-delay-2">
            {bookings.data.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-2xl card-shadow p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <Link
                      href={`/hotels/${booking.hotel.id}`}
                      className="font-semibold text-charcoal hover:text-brass-dark transition-colors"
                    >
                      {booking.hotel.name}
                    </Link>
                    <p className="text-xs text-warm-gray mt-0.5">{booking.hotel.location}</p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full font-semibold ${statusConfig[booking.status]?.color || 'bg-cream text-warm-gray'}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${statusConfig[booking.status]?.dot || 'bg-warm-gray'}`}
                    />
                    {statusConfig[booking.status]?.label || booking.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-warm-gray mb-4">
                  <span>
                    {new Date(booking.checkIn).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  <svg className="w-4 h-4 text-warm-gray-light" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                  <span>
                    {new Date(booking.checkOut).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-cream">
                  <Link
                    href={`/bookings/${booking.id}/edit`}
                    className="text-charcoal-light hover:text-charcoal text-sm font-medium transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => {
                      if (confirm('Cancel this booking?')) {
                        router.delete(`/bookings/${booking.id}`)
                      }
                    }}
                    className="text-rose/70 hover:text-rose text-sm font-medium transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-2xl card-shadow p-16 text-center animate-fade-in animate-delay-2">
          <svg
            className="w-16 h-16 text-cream mx-auto mb-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <h3 className="text-lg font-semibold text-charcoal mb-2">No bookings yet</h3>
          <p className="text-warm-gray text-sm mb-6">
            {filters.search
              ? `No results for "${filters.search}".`
              : 'Start by browsing our hotels and booking your first stay.'}
          </p>
          <Link
            href="/hotels"
            className="inline-flex items-center gap-2 bg-brass hover:bg-brass-light text-charcoal px-6 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all hover:shadow-lg hover:shadow-brass/20"
          >
            Browse Hotels
          </Link>
        </div>
      )}

      <Pagination
        meta={bookings.meta}
        baseUrl="/bookings"
        queryParams={{ search: filters.search }}
      />
    </Layout>
  )
}
