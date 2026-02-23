import { Link, usePage } from '@inertiajs/react'
import type { SharedProps } from '@adonisjs/inertia/types'
import type { ReactNode } from 'react'
import { useState, useRef, useEffect } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  const { user, flash } = usePage<SharedProps>().props
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const initials = user?.pseudo ? user.pseudo.slice(0, 2).toUpperCase() : ''

  return (
    <div className="min-h-screen bg-ivory flex flex-col overflow-x-hidden">
      {/* Navigation */}
      <nav className="bg-charcoal text-white/90 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Left nav */}
            <div className="flex items-center space-x-1">
              <Link
                href="/"
                className="font-display text-xl font-semibold text-brass-light tracking-wide mr-8"
              >
                Akkor Hotel
              </Link>
              <div className="hidden sm:flex items-center space-x-1">
                <Link
                  href="/hotels"
                  className="text-white/70 hover:text-white px-3 py-2 rounded text-sm font-medium tracking-wide transition-colors"
                >
                  Hotels
                </Link>
                {user && (
                  <Link
                    href="/bookings"
                    className="text-white/70 hover:text-white px-3 py-2 rounded text-sm font-medium tracking-wide transition-colors"
                  >
                    My Bookings
                  </Link>
                )}
              </div>
            </div>

            {/* Right nav */}
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="sm:hidden p-2 rounded text-white/70 hover:text-white transition-colors mr-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {mobileMenuOpen ? (
                    <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                  ) : (
                    <><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></>
                  )}
                </svg>
              </button>

              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2.5 p-1.5 rounded-full hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-brass focus:ring-offset-2 focus:ring-offset-charcoal"
                  >
                    <div className="w-8 h-8 rounded-full bg-brass text-charcoal flex items-center justify-center text-xs font-bold">
                      {initials}
                    </div>
                    <span className="hidden sm:block text-sm text-white/80 font-medium">
                      {user.pseudo}
                    </span>
                    <svg
                      className={`w-4 h-4 text-white/50 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 sm:w-72 bg-white rounded-xl card-shadow border border-cream py-1 z-50">
                      {/* User info header */}
                      <div className="px-4 py-3 border-b border-cream">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-brass text-charcoal flex items-center justify-center text-sm font-bold shrink-0">
                            {initials}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-charcoal truncate">
                              {user.pseudo}
                            </p>
                            <p className="text-xs text-warm-gray truncate">{user.email}</p>
                            {user.role !== 'user' && (
                              <span
                                className={`inline-block mt-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded tracking-wider uppercase ${
                                  user.role === 'admin'
                                    ? 'bg-brass/15 text-brass-dark'
                                    : 'bg-sky-badge text-sky-text'
                                }`}
                              >
                                {user.role}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Menu items */}
                      <div className="py-1">
                        <Link
                          href={`/users/${user.id}`}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-charcoal-light hover:bg-ivory transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <svg className="w-4 h-4 text-warm-gray" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                          My Profile
                        </Link>
                        <Link
                          href="/bookings"
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-charcoal-light hover:bg-ivory transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <svg className="w-4 h-4 text-warm-gray" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                          My Bookings
                        </Link>
                        <Link
                          href={`/users/${user.id}/edit`}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-charcoal-light hover:bg-ivory transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <svg className="w-4 h-4 text-warm-gray" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
                          Settings
                        </Link>
                      </div>

                      {/* Admin section */}
                      {user.role === 'admin' && (
                        <>
                          <div className="border-t border-cream" />
                          <div className="py-1">
                            <p className="px-4 py-1 text-[10px] font-semibold text-warm-gray-light uppercase tracking-widest">
                              Administration
                            </p>
                            <Link
                              href="/hotels/create"
                              className="flex items-center gap-2.5 px-4 py-2 text-sm text-charcoal-light hover:bg-ivory transition-colors"
                              onClick={() => setDropdownOpen(false)}
                            >
                              <svg className="w-4 h-4 text-warm-gray" viewBox="0 0 20 20" fill="currentColor"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" /></svg>
                              Add Hotel
                            </Link>
                            <Link
                              href="/users"
                              className="flex items-center gap-2.5 px-4 py-2 text-sm text-charcoal-light hover:bg-ivory transition-colors"
                              onClick={() => setDropdownOpen(false)}
                            >
                              <svg className="w-4 h-4 text-warm-gray" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                              Manage Users
                            </Link>
                          </div>
                        </>
                      )}

                      {/* Employee section */}
                      {user.role === 'employee' && (
                        <>
                          <div className="border-t border-cream" />
                          <div className="py-1">
                            <p className="px-4 py-1 text-[10px] font-semibold text-warm-gray-light uppercase tracking-widest">
                              Staff
                            </p>
                            <Link
                              href="/users"
                              className="flex items-center gap-2.5 px-4 py-2 text-sm text-charcoal-light hover:bg-ivory transition-colors"
                              onClick={() => setDropdownOpen(false)}
                            >
                              <svg className="w-4 h-4 text-warm-gray" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                              View Users
                            </Link>
                          </div>
                        </>
                      )}

                      {/* Logout */}
                      <div className="border-t border-cream">
                        <div className="py-1">
                          <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-rose hover:bg-rose-light/50 transition-colors"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                            Logout
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/login"
                    className="text-white/70 hover:text-white text-sm font-medium tracking-wide"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-brass hover:bg-brass-light text-charcoal px-4 py-2 rounded-lg text-sm font-semibold tracking-wide transition-colors"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-white/10 px-4 py-3 space-y-1">
            <Link
              href="/hotels"
              className="block text-white/70 hover:text-white px-3 py-2.5 rounded text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Hotels
            </Link>
            {user && (
              <>
                <Link
                  href="/bookings"
                  className="block text-white/70 hover:text-white px-3 py-2.5 rounded text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Bookings
                </Link>
                <Link
                  href={`/users/${user.id}`}
                  className="block text-white/70 hover:text-white px-3 py-2.5 rounded text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Profile
                </Link>
                {user.role === 'admin' && (
                  <>
                    <div className="border-t border-white/10 my-2" />
                    <Link
                      href="/hotels/create"
                      className="block text-white/70 hover:text-white px-3 py-2.5 rounded text-sm font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Add Hotel
                    </Link>
                    <Link
                      href="/users"
                      className="block text-white/70 hover:text-white px-3 py-2.5 rounded text-sm font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Manage Users
                    </Link>
                  </>
                )}
                <div className="border-t border-white/10 my-2" />
                <Link
                  href="/logout"
                  method="post"
                  as="button"
                  className="block w-full text-left text-rose/80 hover:text-rose px-3 py-2.5 rounded text-sm font-medium"
                >
                  Logout
                </Link>
              </>
            )}
            {!user && (
              <div className="flex gap-3 pt-2 pb-1 px-3">
                <Link
                  href="/login"
                  className="flex-1 text-center text-white/80 hover:text-white border border-white/20 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="flex-1 text-center bg-brass hover:bg-brass-light text-charcoal px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Flash messages */}
      {flash && Object.keys(flash).length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          {(flash as Record<string, any>).success && (
            <div className="bg-emerald-light border border-emerald/20 text-emerald px-4 py-3 rounded-lg text-sm font-medium">
              {(flash as Record<string, any>).success}
            </div>
          )}
          {(flash as Record<string, any>).errors && (
            <div className="bg-rose-light border border-rose/20 text-rose px-4 py-3 rounded-lg text-sm font-medium">
              {typeof (flash as Record<string, any>).errors === 'string'
                ? (flash as Record<string, any>).errors
                : Object.values((flash as Record<string, any>).errors).join(', ')}
            </div>
          )}
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex-1 w-full">{children}</main>

      {/* Footer */}
      <footer className="bg-charcoal text-white/70 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main footer content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link href="/" className="font-display text-2xl font-semibold text-brass-light tracking-wide">
                Akkor Hotel
              </Link>
              <p className="mt-4 text-sm text-white/50 leading-relaxed">
                Discover extraordinary stays around the world. From boutique hideaways to grand
                luxury resorts, we curate the finest hotel experiences.
              </p>
              {/* Social icons */}
              <div className="flex gap-3 mt-6">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-brass/20 flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-brass/20 flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-brass/20 flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
              </div>
            </div>

            {/* Explore */}
            <div>
              <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
                Explore
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/hotels" className="text-sm hover:text-brass-light transition-colors">
                    Browse Hotels
                  </Link>
                </li>
                <li>
                  <Link href="/hotels" className="text-sm hover:text-brass-light transition-colors">
                    Destinations
                  </Link>
                </li>
                {user && (
                  <li>
                    <Link href="/bookings" className="text-sm hover:text-brass-light transition-colors">
                      My Bookings
                    </Link>
                  </li>
                )}
                <li>
                  <Link href="/api-docs" className="text-sm hover:text-brass-light transition-colors">
                    API Documentation
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
                Company
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/" className="text-sm hover:text-brass-light transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-sm hover:text-brass-light transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-sm hover:text-brass-light transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
                Legal
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/legal/privacy" className="text-sm hover:text-brass-light transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/legal/terms" className="text-sm hover:text-brass-light transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/legal/terms" className="text-sm hover:text-brass-light transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">
              &copy; {new Date().getFullYear()} Akkor Hotel Ltd. All rights reserved.
            </p>
            <div className="w-12 h-[1px] bg-brass/30" />
          </div>
        </div>
      </footer>
    </div>
  )
}
