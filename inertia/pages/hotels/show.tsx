import { Head, Link, router, usePage } from '@inertiajs/react'
import Layout from '~/components/layout'
import Carousel from '~/components/carousel'
import type { SharedProps } from '@adonisjs/inertia/types'

interface Hotel {
  id: number
  name: string
  location: string
  description: string
  pictureList: string[] | null
  createdAt: string
}

interface Props {
  hotel: Hotel
}

export default function HotelShow({ hotel }: Props) {
  const { user } = usePage<SharedProps>().props

  return (
    <Layout>
      <Head title={hotel.name} />

      <div className="mb-6 animate-fade-in">
        <Link
          href="/hotels"
          className="text-brass-dark hover:text-brass text-sm font-medium inline-flex items-center gap-1.5 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
              clipRule="evenodd"
            />
          </svg>
          Back to hotels
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in animate-delay-1">
        {/* Main content - 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          {/* Carousel */}
          <div className="rounded-2xl overflow-hidden card-shadow">
            <Carousel images={hotel.pictureList || []} alt={hotel.name} />
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl card-shadow p-8">
            <h2 className="text-xl font-semibold text-charcoal mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-brass"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              About this hotel
            </h2>
            <p className="text-warm-gray leading-relaxed whitespace-pre-wrap">
              {hotel.description}
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Hotel info card */}
          <div className="bg-white rounded-2xl card-shadow p-6 sticky top-24">
            <h1 className="text-2xl font-bold text-charcoal mb-2">{hotel.name}</h1>
            <p className="text-warm-gray flex items-center gap-1.5 mb-6">
              <svg
                className="w-4 h-4 text-brass shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.274 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                  clipRule="evenodd"
                />
              </svg>
              {hotel.location}
            </p>

            <div className="space-y-3">
              {user && (
                <Link
                  href={`/bookings/create?hotelId=${hotel.id}`}
                  className="flex items-center justify-center gap-2 w-full bg-brass hover:bg-brass-light text-charcoal py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all hover:shadow-lg hover:shadow-brass/20"
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
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Book Now
                </Link>
              )}

              {!user && (
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 w-full bg-cream hover:bg-ivory-dark text-charcoal-light py-3.5 rounded-xl text-sm font-medium transition-colors"
                >
                  Sign in to book
                </Link>
              )}

              {user?.role === 'admin' && (
                <>
                  <Link
                    href={`/hotels/${hotel.id}/edit`}
                    className="flex items-center justify-center gap-2 w-full bg-cream hover:bg-ivory-dark text-charcoal-light py-3 rounded-xl text-sm font-medium transition-colors"
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
                    </svg>
                    Edit
                  </Link>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this hotel?'))
                        router.delete(`/hotels/${hotel.id}`)
                    }}
                    className="flex items-center justify-center gap-2 w-full bg-rose/10 hover:bg-rose-light text-rose py-3 rounded-xl text-sm font-medium transition-colors"
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
                </>
              )}
            </div>

            {/* Hotel details */}
            <div className="mt-6 pt-6 border-t border-cream space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <svg
                  className="w-4 h-4 text-warm-gray-light shrink-0"
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
                <span className="text-warm-gray">
                  Listed{' '}
                  {new Date(hotel.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <svg
                  className="w-4 h-4 text-warm-gray-light shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span className="text-warm-gray">
                  {hotel.pictureList?.length || 0} photo{(hotel.pictureList?.length || 0) !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
