import { useState, useCallback, useEffect } from 'react'

interface CarouselProps {
  images: string[]
  alt: string
}

export default function Carousel({ images, alt }: CarouselProps) {
  const [current, setCurrent] = useState(0)
  const hasMultiple = images.length > 1

  const goTo = useCallback(
    (index: number) => {
      if (index < 0) setCurrent(images.length - 1)
      else if (index >= images.length) setCurrent(0)
      else setCurrent(index)
    },
    [images.length]
  )

  const prev = useCallback(() => goTo(current - 1), [current, goTo])
  const next = useCallback(() => goTo(current + 1), [current, goTo])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    if (hasMultiple) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [prev, next, hasMultiple])

  // No images — decorative placeholder
  if (images.length === 0) {
    return (
      <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden bg-gradient-to-br from-cream to-ivory-dark flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-warm-gray-light">
          <svg
            className="w-20 h-20 opacity-40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M3 7l1.5-3h15L21 7" />
            <line x1="8" y1="11" x2="8" y2="16" />
            <line x1="12" y1="11" x2="12" y2="16" />
            <line x1="16" y1="11" x2="16" y2="16" />
            <line x1="6" y1="20" x2="6" y2="22" />
            <line x1="18" y1="20" x2="18" y2="22" />
          </svg>
          <span className="text-sm font-medium tracking-wide">No images available</span>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden group">
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${alt} ${i + 1}`}
            className="w-full h-full object-cover shrink-0"
          />
        ))}
      </div>

      {/* Previous arrow */}
      {hasMultiple && (
        <button
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-charcoal/60 hover:bg-brass text-white flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}

      {/* Next arrow */}
      {hasMultiple && (
        <button
          onClick={next}
          aria-label="Next image"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-charcoal/60 hover:bg-brass text-white flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}

      {/* Dot indicators */}
      {hasMultiple && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to image ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === current ? 'bg-brass' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
