import { Head, Link, useForm } from '@inertiajs/react'
import Layout from '~/components/layout'

interface Booking {
  id: number
  checkIn: string
  checkOut: string
  status: string
  hotel: { id: number; name: string; location: string }
}

interface Props {
  booking: Booking
}

export default function BookingEdit({ booking }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    checkIn: booking.checkIn.split('T')[0],
    checkOut: booking.checkOut.split('T')[0],
    status: booking.status,
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    put(`/bookings/${booking.id}`)
  }

  const statusConfig: Record<string, { label: string; color: string }> = {
    pending: { label: 'Pending', color: 'bg-amber-badge text-amber-text' },
    confirmed: { label: 'Confirmed', color: 'bg-emerald-light text-emerald' },
    cancelled: { label: 'Cancelled', color: 'bg-rose-light text-rose' },
  }

  const nights =
    data.checkIn && data.checkOut
      ? Math.max(
          0,
          Math.ceil(
            (new Date(data.checkOut).getTime() - new Date(data.checkIn).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0

  return (
    <Layout>
      <Head title="Edit Booking" />

      <div className="mb-8 animate-fade-in">
        <Link
          href="/bookings"
          className="text-brass-dark hover:text-brass text-sm font-medium inline-flex items-center gap-1.5 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
              clipRule="evenodd"
            />
          </svg>
          Back to bookings
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in animate-delay-1">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl card-shadow overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-brass to-brass-light" />
            <div className="p-8 lg:p-10">
              <h1 className="text-3xl font-bold text-charcoal mb-2">Edit Booking</h1>
              <p className="text-warm-gray text-sm mb-10 flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-brass"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.274 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                    clipRule="evenodd"
                  />
                </svg>
                {booking.hotel.name} — {booking.hotel.location}
              </p>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="checkIn"
                      className="block text-sm font-medium text-charcoal-light mb-2"
                    >
                      Check In
                    </label>
                    <input
                      id="checkIn"
                      type="date"
                      value={data.checkIn}
                      onChange={(e) => setData('checkIn', e.target.value)}
                      className="block w-full rounded-lg border border-cream bg-ivory/50 px-4 py-3 text-charcoal focus:border-brass focus:ring-1 focus:ring-brass focus:outline-none transition-colors"
                    />
                    {errors.checkIn && (
                      <p className="mt-1.5 text-sm text-rose">{errors.checkIn}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="checkOut"
                      className="block text-sm font-medium text-charcoal-light mb-2"
                    >
                      Check Out
                    </label>
                    <input
                      id="checkOut"
                      type="date"
                      value={data.checkOut}
                      onChange={(e) => setData('checkOut', e.target.value)}
                      className="block w-full rounded-lg border border-cream bg-ivory/50 px-4 py-3 text-charcoal focus:border-brass focus:ring-1 focus:ring-brass focus:outline-none transition-colors"
                    />
                    {errors.checkOut && (
                      <p className="mt-1.5 text-sm text-rose">{errors.checkOut}</p>
                    )}
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-charcoal-light mb-2"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    value={data.status}
                    onChange={(e) => setData('status', e.target.value)}
                    className="block w-full rounded-lg border border-cream bg-ivory/50 px-4 py-3 text-charcoal focus:border-brass focus:ring-1 focus:ring-brass focus:outline-none transition-colors"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  {errors.status && (
                    <p className="mt-1.5 text-sm text-rose">{errors.status}</p>
                  )}
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
                    href="/bookings"
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
        <div className="lg:col-span-1">
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
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <h3 className="text-xs font-semibold text-warm-gray uppercase tracking-wider">
                Booking Summary
              </h3>
            </div>

            <div className="space-y-4">
              {/* Hotel */}
              <div className="rounded-xl bg-ivory p-4">
                <p className="text-xs text-warm-gray-light mb-1">Hotel</p>
                <p className="font-semibold text-charcoal text-sm">{booking.hotel.name}</p>
                <p className="text-xs text-warm-gray mt-0.5 flex items-center gap-1">
                  <svg className="w-3 h-3 text-brass" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.274 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {booking.hotel.location}
                </p>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-ivory p-4">
                  <p className="text-xs text-warm-gray-light mb-1">Check in</p>
                  <p className="font-medium text-charcoal text-sm">
                    {data.checkIn
                      ? new Date(data.checkIn + 'T00:00').toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })
                      : '—'}
                  </p>
                </div>
                <div className="rounded-xl bg-ivory p-4">
                  <p className="text-xs text-warm-gray-light mb-1">Check out</p>
                  <p className="font-medium text-charcoal text-sm">
                    {data.checkOut
                      ? new Date(data.checkOut + 'T00:00').toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })
                      : '—'}
                  </p>
                </div>
              </div>

              {/* Duration */}
              {nights > 0 && (
                <div className="rounded-xl bg-brass/10 p-4 text-center">
                  <p className="text-2xl font-bold text-brass">{nights}</p>
                  <p className="text-xs text-brass-dark">night{nights !== 1 ? 's' : ''}</p>
                </div>
              )}

              {/* Status */}
              <div className="rounded-xl bg-ivory p-4">
                <p className="text-xs text-warm-gray-light mb-1.5">Status</p>
                <span
                  className={`inline-block px-3 py-1 text-xs rounded-full font-semibold tracking-wide capitalize ${statusConfig[data.status]?.color || 'bg-cream text-warm-gray'}`}
                >
                  {statusConfig[data.status]?.label || data.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
