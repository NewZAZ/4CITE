import { Head, Link, usePage } from '@inertiajs/react'
import Layout from '~/components/layout'
import type { SharedProps } from '@adonisjs/inertia/types'

const destinations = [
  {
    city: 'Paris',
    country: 'France',
    gradient: 'linear-gradient(135deg, #2c1810 0%, #4a2c2a 30%, #6b3a3a 60%, #3d2b1f 100%)',
  },
  {
    city: 'Dubai',
    country: 'United Arab Emirates',
    gradient: 'linear-gradient(135deg, #4a3520 0%, #b5924c 30%, #c9a85e 60%, #6b4f28 100%)',
  },
  {
    city: 'Tokyo',
    country: 'Japan',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d44 30%, #3a3a5c 60%, #16213e 100%)',
  },
  {
    city: 'New York',
    country: 'United States',
    gradient: 'linear-gradient(135deg, #1c1917 0%, #292524 30%, #44403c 60%, #1c1917 100%)',
  },
  {
    city: 'Santorini',
    country: 'Greece',
    gradient: 'linear-gradient(135deg, #1a3a4a 0%, #2a5a6a 30%, #4a8a9a 60%, #1a3a5a 100%)',
  },
  {
    city: 'Marrakech',
    country: 'Morocco',
    gradient: 'linear-gradient(135deg, #5c2e0e 0%, #8b4513 30%, #cd853f 60%, #6b3a1f 100%)',
  },
]

const steps = [
  {
    title: 'Search & Discover',
    description:
      'Browse our curated collection of luxury hotels worldwide. Filter by destination, amenities, and style to find your perfect match.',
    icon: (
      <svg className="w-7 h-7 text-charcoal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
  },
  {
    title: 'Book Instantly',
    description:
      'Select your dates, choose your room, and confirm your reservation in just a few clicks. Secure booking with instant confirmation.',
    icon: (
      <svg className="w-7 h-7 text-charcoal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="m9 16 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Enjoy Your Stay',
    description:
      'Arrive to a world-class experience. From concierge services to bespoke amenities, every detail is crafted for your comfort.',
    icon: (
      <svg className="w-7 h-7 text-charcoal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
]

const testimonials = [
  {
    quote:
      'An absolutely unforgettable experience. The attention to detail at every touchpoint made our anniversary trip truly special. We will be returning.',
    name: 'Alexandra M.',
    rating: 5,
  },
  {
    quote:
      'From the seamless booking process to the impeccable service on-site, Akkor Hotel exceeded every expectation. The concierge recommendations were spot on.',
    name: 'James & Sarah T.',
    rating: 5,
  },
  {
    quote:
      'I travel extensively for business and Akkor has become my go-to platform. The consistency of quality across their properties is remarkable.',
    name: 'David K.',
    rating: 5,
  },
]

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

export default function Home() {
  const { user } = usePage<SharedProps>().props

  return (
    <Layout>
      <Head title="Luxury Hotel Booking | Akkor Hotel" />

      {/* ================================================================ */}
      {/* HERO SECTION                                                     */}
      {/* ================================================================ */}
      <section className="hero-gradient -mx-4 sm:-mx-6 lg:-mx-8 -mt-10 px-4 sm:px-6 lg:px-8 py-28 md:py-36 relative overflow-hidden">
        {/* Decorative art-deco SVG patterns */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Top-left corner geometric */}
          <svg className="absolute top-0 left-0 w-64 h-64 opacity-[0.04]" viewBox="0 0 200 200" fill="none">
            <rect x="20" y="20" width="160" height="160" stroke="currentColor" strokeWidth="0.5" className="text-brass-light" />
            <rect x="40" y="40" width="120" height="120" stroke="currentColor" strokeWidth="0.5" className="text-brass-light" />
            <rect x="60" y="60" width="80" height="80" stroke="currentColor" strokeWidth="0.5" className="text-brass-light" />
            <line x1="20" y1="20" x2="60" y2="60" stroke="currentColor" strokeWidth="0.5" className="text-brass-light" />
            <line x1="180" y1="20" x2="140" y2="60" stroke="currentColor" strokeWidth="0.5" className="text-brass-light" />
            <line x1="20" y1="180" x2="60" y2="140" stroke="currentColor" strokeWidth="0.5" className="text-brass-light" />
            <line x1="180" y1="180" x2="140" y2="140" stroke="currentColor" strokeWidth="0.5" className="text-brass-light" />
          </svg>

          {/* Bottom-right corner geometric */}
          <svg className="absolute bottom-0 right-0 w-72 h-72 opacity-[0.04]" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.5" className="text-brass-light" />
            <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.5" className="text-brass-light" />
            <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="0.5" className="text-brass-light" />
            <line x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="0.5" className="text-brass-light" />
            <line x1="10" y1="100" x2="190" y2="100" stroke="currentColor" strokeWidth="0.5" className="text-brass-light" />
            <line x1="30" y1="30" x2="170" y2="170" stroke="currentColor" strokeWidth="0.5" className="text-brass-light" />
            <line x1="170" y1="30" x2="30" y2="170" stroke="currentColor" strokeWidth="0.5" className="text-brass-light" />
          </svg>

          {/* Top-right fan motif */}
          <svg className="absolute -top-10 right-1/4 w-48 h-48 opacity-[0.03]" viewBox="0 0 200 200" fill="none">
            <path d="M100 200 L100 0" stroke="currentColor" strokeWidth="0.5" className="text-brass-light" />
            <path d="M100 200 L40 10" stroke="currentColor" strokeWidth="0.5" className="text-brass-light" />
            <path d="M100 200 L160 10" stroke="currentColor" strokeWidth="0.5" className="text-brass-light" />
            <path d="M100 200 L10 60" stroke="currentColor" strokeWidth="0.5" className="text-brass-light" />
            <path d="M100 200 L190 60" stroke="currentColor" strokeWidth="0.5" className="text-brass-light" />
            <path d="M100 200 L0 120" stroke="currentColor" strokeWidth="0.5" className="text-brass-light" />
            <path d="M100 200 L200 120" stroke="currentColor" strokeWidth="0.5" className="text-brass-light" />
            <path d="M100 200 Q100 100 40 10" stroke="currentColor" strokeWidth="0.3" className="text-brass-light" />
            <path d="M100 200 Q100 100 160 10" stroke="currentColor" strokeWidth="0.3" className="text-brass-light" />
          </svg>

          {/* Bottom-left diamond pattern */}
          <svg className="absolute bottom-10 left-10 w-40 h-40 opacity-[0.03]" viewBox="0 0 100 100" fill="none">
            <polygon points="50,5 95,50 50,95 5,50" stroke="currentColor" strokeWidth="0.5" className="text-brass-light" />
            <polygon points="50,20 80,50 50,80 20,50" stroke="currentColor" strokeWidth="0.5" className="text-brass-light" />
            <polygon points="50,35 65,50 50,65 35,50" stroke="currentColor" strokeWidth="0.5" className="text-brass-light" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-brass-light text-sm font-semibold tracking-[0.25em] uppercase mb-6 animate-fade-in">
            Luxury Redefined
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 animate-fade-in animate-delay-1 leading-[1.1]">
            Discover{' '}
            <span className="text-brass-light">Extraordinary</span>{' '}
            Stays
          </h1>
          <p className="text-lg md:text-xl text-white/50 mb-12 max-w-2xl mx-auto animate-fade-in animate-delay-2 leading-relaxed font-light">
            Curated luxury accommodations across the world's most coveted destinations.
            Where impeccable service meets timeless elegance.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in animate-delay-3">
            <Link
              href="/hotels"
              className="bg-brass hover:bg-brass-light text-charcoal px-10 py-4 rounded-lg text-sm font-semibold tracking-wide transition-all hover:shadow-lg hover:shadow-brass/20"
            >
              Browse Hotels
            </Link>
            {!user && (
              <Link
                href="/register"
                className="border border-white/20 hover:border-brass-light/50 text-white hover:text-brass-light px-10 py-4 rounded-lg text-sm font-semibold tracking-wide transition-all"
              >
                Create Account
              </Link>
            )}
          </div>
        </div>

        {/* Stats bar */}
        <div className="max-w-3xl mx-auto mt-20 md:mt-24 animate-fade-in animate-delay-4">
          <div className="border-t border-white/10 pt-10">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-3xl md:text-4xl font-bold text-brass-light font-display">500+</p>
                <p className="text-xs md:text-sm text-white/40 mt-1 tracking-wide uppercase font-light">Hotels</p>
              </div>
              <div className="border-x border-white/10">
                <p className="text-3xl md:text-4xl font-bold text-brass-light font-display">10,000+</p>
                <p className="text-xs md:text-sm text-white/40 mt-1 tracking-wide uppercase font-light">Happy Guests</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-brass-light font-display">50+</p>
                <p className="text-xs md:text-sm text-white/40 mt-1 tracking-wide uppercase font-light">Destinations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FEATURED DESTINATIONS                                            */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28">
        <div className="text-center mb-14">
          <p className="text-brass text-xs font-semibold tracking-[0.2em] uppercase mb-3">Explore the World</p>
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal gold-line mx-auto inline-block animate-fade-in">
            Popular Destinations
          </h2>
          <p className="text-warm-gray mt-8 max-w-xl mx-auto leading-relaxed">
            From sun-drenched coastlines to vibrant metropolises, discover our most sought-after locations handpicked for the discerning traveler.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {destinations.map((dest) => (
            <Link
              key={dest.city}
              href="/hotels"
              className="group relative h-64 md:h-72 rounded-xl overflow-hidden cursor-pointer transition-transform duration-500 hover:scale-[1.02]"
              style={{ background: dest.gradient }}
            >
              {/* Overlay for hover darkening */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />

              {/* Subtle inner border */}
              <div className="absolute inset-3 border border-white/10 rounded-lg group-hover:border-brass-light/20 transition-colors duration-500" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:text-brass-light transition-colors duration-300">
                  {dest.city}
                </h3>
                <p className="text-sm text-white/60 tracking-wide">{dest.country}</p>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-4 right-4">
                <svg className="w-6 h-6 text-white/10 group-hover:text-brass-light/30 transition-colors duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================================================================ */}
      {/* HOW IT WORKS                                                     */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 border-t border-cream">
        <div className="text-center mb-16">
          <p className="text-brass text-xs font-semibold tracking-[0.2em] uppercase mb-3">Simple Process</p>
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal gold-line mx-auto inline-block animate-fade-in">
            How It Works
          </h2>
          <p className="text-warm-gray mt-8 max-w-xl mx-auto leading-relaxed">
            Your journey from inspiration to experience in three effortless steps.
          </p>
        </div>

        <div className="relative">
          {/* Connecting dotted line (hidden on mobile) */}
          <div className="hidden md:block absolute top-16 left-1/2 -translate-x-1/2 w-2/3 border-t-2 border-dashed border-brass/15" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="text-center relative">
                {/* Step number */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-ivory border-2 border-brass/20 flex items-center justify-center z-10">
                  <span className="text-[10px] font-bold text-brass">{index + 1}</span>
                </div>

                {/* Icon circle */}
                <div className="w-28 h-28 rounded-full bg-brass/10 flex items-center justify-center mx-auto mb-6 mt-4 relative">
                  <div className="w-20 h-20 rounded-full bg-brass/15 flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-charcoal mb-3">{step.title}</h3>
                <p className="text-warm-gray text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* TESTIMONIALS                                                     */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 border-t border-cream">
        <div className="text-center mb-14">
          <p className="text-brass text-xs font-semibold tracking-[0.2em] uppercase mb-3">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal gold-line mx-auto inline-block animate-fade-in">
            What Our Guests Say
          </h2>
          <p className="text-warm-gray mt-8 max-w-xl mx-auto leading-relaxed">
            Hear from travelers who have experienced the Akkor difference firsthand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white rounded-xl p-8 card-shadow hover:card-shadow-hover transition-shadow duration-300 relative"
            >
              {/* Large decorative quote mark */}
              <span className="text-6xl leading-none text-brass/20 font-display absolute top-4 left-6 select-none">
                &ldquo;
              </span>

              {/* Star rating */}
              <div className="flex gap-0.5 mb-5 pt-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 text-brass" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-charcoal-light italic leading-relaxed mb-6 text-[15px]">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="border-t border-cream pt-5">
                <p className="font-semibold text-charcoal text-sm">{testimonial.name}</p>
                <p className="text-xs text-brass tracking-wide mt-0.5">Verified Guest</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================ */}
      {/* CTA SECTION                                                      */}
      {/* ================================================================ */}
      <section className="hero-gradient -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative overflow-hidden">
        {/* Decorative geometric accents */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute top-1/2 left-10 -translate-y-1/2 w-32 h-32 opacity-[0.03]" viewBox="0 0 100 100" fill="none">
            <polygon points="50,5 95,50 50,95 5,50" stroke="currentColor" strokeWidth="0.5" className="text-brass-light" />
            <polygon points="50,25 75,50 50,75 25,50" stroke="currentColor" strokeWidth="0.5" className="text-brass-light" />
          </svg>
          <svg className="absolute top-1/2 right-10 -translate-y-1/2 w-32 h-32 opacity-[0.03]" viewBox="0 0 100 100" fill="none">
            <polygon points="50,5 95,50 50,95 5,50" stroke="currentColor" strokeWidth="0.5" className="text-brass-light" />
            <polygon points="50,25 75,50 50,75 25,50" stroke="currentColor" strokeWidth="0.5" className="text-brass-light" />
          </svg>
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight animate-fade-in">
            Ready for Your Next{' '}
            <span className="text-brass-light">Adventure</span>?
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto leading-relaxed font-light">
            Join thousands of discerning travelers who trust Akkor Hotel to deliver extraordinary experiences, every time.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/hotels"
              className="bg-brass hover:bg-brass-light text-charcoal px-10 py-4 rounded-lg text-sm font-semibold tracking-wide transition-all hover:shadow-lg hover:shadow-brass/20"
            >
              Explore Hotels
            </Link>
            {!user && (
              <Link
                href="/register"
                className="border border-white/20 hover:border-brass-light/50 text-white hover:text-brass-light px-10 py-4 rounded-lg text-sm font-semibold tracking-wide transition-all"
              >
                Sign Up Free
              </Link>
            )}
          </div>
        </div>
      </section>
    </Layout>
  )
}
