import { Link } from '@inertiajs/react'

interface PaginationMeta {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  firstPage: number
}

interface Props {
  meta: PaginationMeta
  baseUrl: string
  queryParams?: Record<string, string>
}

export default function Pagination({ meta, baseUrl, queryParams = {} }: Props) {
  if (meta.lastPage <= 1) return null

  const buildUrl = (page: number) => {
    const params = new URLSearchParams({ ...queryParams, page: String(page) })
    return `${baseUrl}?${params.toString()}`
  }

  const pages = Array.from({ length: meta.lastPage }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-between mt-8">
      <p className="text-sm text-warm-gray">
        Page <span className="font-semibold text-charcoal">{meta.currentPage}</span> of{' '}
        <span className="font-semibold text-charcoal">{meta.lastPage}</span>
        <span className="text-warm-gray-light ml-1">({meta.total} results)</span>
      </p>
      <div className="flex space-x-1">
        {meta.currentPage > 1 && (
          <Link
            href={buildUrl(meta.currentPage - 1)}
            className="px-3 py-1.5 text-sm border border-cream rounded-lg hover:bg-cream text-charcoal-light transition-colors"
          >
            Previous
          </Link>
        )}
        {pages.map((page) => (
          <Link
            key={page}
            href={buildUrl(page)}
            className={`px-3 py-1.5 text-sm border rounded-lg transition-colors ${
              page === meta.currentPage
                ? 'bg-charcoal text-white border-charcoal'
                : 'border-cream hover:bg-cream text-charcoal-light'
            }`}
          >
            {page}
          </Link>
        ))}
        {meta.currentPage < meta.lastPage && (
          <Link
            href={buildUrl(meta.currentPage + 1)}
            className="px-3 py-1.5 text-sm border border-cream rounded-lg hover:bg-cream text-charcoal-light transition-colors"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  )
}
