import { Head, Link, router, usePage } from '@inertiajs/react'
import Layout from '~/components/layout'
import Pagination from '~/components/pagination'
import type { SharedProps } from '@adonisjs/inertia/types'
import { useState } from 'react'

interface Hotel {
  id: number
  name: string
  location: string
  description: string
  pictureList: string[] | null
  createdAt: string
}

interface Props {
  hotels: {
    data: Hotel[]
    meta: {
      total: number
      perPage: number
      currentPage: number
      lastPage: number
      firstPage: number
    }
  }
  filters: {
    sort: string
    order: string
    search: string
    limit: number
  }
}

export default function HotelsIndex({ hotels, filters }: Props) {
  const { user } = usePage<SharedProps>().props
  const [search, setSearch] = useState(filters.search || '')

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    router.get(
      '/hotels',
      { search, sort: filters.sort, order: filters.order },
      { preserveState: true }
    )
  }

  function handleSort(column: string) {
    const order = filters.sort === column && filters.order === 'asc' ? 'desc' : 'asc'
    router.get(
      '/hotels',
      { sort: column, order, search: filters.search },
      { preserveState: true }
    )
  }

  const SortIcon = ({ col }: { col: string }) => {
    if (filters.sort !== col) return null
    return (
      <svg
        className={`w-3.5 h-3.5 inline ml-1 ${filters.order === 'desc' ? 'rotate-180' : ''}`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clipRule="evenodd"
        />
      </svg>
    )
  }

  return (
    <Layout>
      <Head title="Hotels" />

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">Hotels</h1>
          <p className="text-warm-gray text-sm mt-1">
            Browse our curated collection of {hotels.meta.total} properties
          </p>
        </div>
        {user?.role === 'admin' && (
          <Link
            href="/hotels/create"
            className="inline-flex items-center gap-2 bg-brass hover:bg-brass-light text-charcoal px-5 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all hover:shadow-lg hover:shadow-brass/20 shrink-0"
          >
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            Add Hotel
          </Link>
        )}
      </div>

      {/* Search bar */}
      <form
        onSubmit={handleSearch}
        className="mb-8 animate-fade-in animate-delay-1"
      >
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
            placeholder="Search by name or location..."
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

      {/* Hotels grid / cards */}
      {hotels.data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in animate-delay-2">
          {hotels.data.map((hotel) => (
            <Link
              key={hotel.id}
              href={`/hotels/${hotel.id}`}
              className="group bg-white rounded-2xl card-shadow overflow-hidden hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="h-48 bg-cream relative overflow-hidden">
                {hotel.pictureList && hotel.pictureList.length > 0 ? (
                  <img
                    src={hotel.pictureList[0]}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-charcoal/5 to-charcoal/10">
                    <svg
                      className="w-12 h-12 text-warm-gray-light"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                )}
                {/* Location badge */}
                <div className="absolute bottom-3 left-3 bg-charcoal/70 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                  <svg
                    className="w-3 h-3 text-brass-light"
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
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-charcoal group-hover:text-brass-dark transition-colors">
                  {hotel.name}
                </h3>
                <p className="text-sm text-warm-gray mt-1.5 line-clamp-2 leading-relaxed">
                  {hotel.description}
                </p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-cream">
                  <span className="text-xs text-warm-gray-light">
                    Added{' '}
                    {new Date(hotel.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="text-xs font-semibold text-brass-dark group-hover:text-brass transition-colors flex items-center gap-1">
                    View
                    <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
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
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <h3 className="text-lg font-semibold text-charcoal mb-2">No hotels found</h3>
          <p className="text-warm-gray text-sm">
            {filters.search
              ? `No results for "${filters.search}". Try a different search term.`
              : 'No hotels have been added yet.'}
          </p>
        </div>
      )}

      {/* Sort controls (table-style for power users) */}
      {hotels.data.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-warm-gray">
          <span>Sort by:</span>
          {[
            { col: 'name', label: 'Name' },
            { col: 'location', label: 'Location' },
            { col: 'created_at', label: 'Date' },
          ].map((s) => (
            <button
              key={s.col}
              onClick={() => handleSort(s.col)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filters.sort === s.col
                  ? 'bg-charcoal text-white'
                  : 'bg-cream hover:bg-ivory-dark text-charcoal-light'
              }`}
            >
              {s.label}
              <SortIcon col={s.col} />
            </button>
          ))}
        </div>
      )}

      <Pagination
        meta={hotels.meta}
        baseUrl="/hotels"
        queryParams={{ sort: filters.sort, order: filters.order, search: filters.search }}
      />
    </Layout>
  )
}
