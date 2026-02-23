import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { mockUsePage } from '../setup'
import BookingsIndex from '~/pages/bookings/index'

const sampleBookings = {
  data: [
    {
      id: 1,
      checkIn: '2025-06-01',
      checkOut: '2025-06-05',
      status: 'confirmed',
      hotel: { id: 1, name: 'Grand Hotel', location: 'Paris' },
      user: { id: 1, pseudo: 'John', email: 'john@test.com' },
    },
    {
      id: 2,
      checkIn: '2025-07-01',
      checkOut: '2025-07-03',
      status: 'pending',
      hotel: { id: 2, name: 'Beach Resort', location: 'Nice' },
      user: { id: 2, pseudo: 'Jane', email: 'jane@test.com' },
    },
  ],
  meta: { total: 2, perPage: 10, currentPage: 1, lastPage: 1, firstPage: 1 },
}

const emptyBookings = {
  data: [],
  meta: { total: 0, perPage: 10, currentPage: 1, lastPage: 1, firstPage: 1 },
}

describe('Bookings Index Page', () => {
  it('renders My Bookings heading for regular user', () => {
    mockUsePage.mockReturnValue({
      props: { user: { id: 1, pseudo: 'User', email: 'user@test.com', role: 'user' }, flash: {} },
    })
    render(<BookingsIndex bookings={sampleBookings} filters={{ search: '' }} />)
    expect(screen.getByRole('heading', { name: 'My Bookings' })).toBeInTheDocument()
  })

  it('renders All Bookings heading for admin', () => {
    mockUsePage.mockReturnValue({
      props: { user: { id: 1, pseudo: 'Admin', email: 'admin@test.com', role: 'admin' }, flash: {} },
    })
    render(<BookingsIndex bookings={sampleBookings} filters={{ search: '' }} />)
    expect(screen.getByRole('heading', { name: 'All Bookings' })).toBeInTheDocument()
  })

  it('shows search bar for admin', () => {
    mockUsePage.mockReturnValue({
      props: { user: { id: 1, pseudo: 'Admin', email: 'admin@test.com', role: 'admin' }, flash: {} },
    })
    render(<BookingsIndex bookings={sampleBookings} filters={{ search: '' }} />)
    expect(screen.getByPlaceholderText('Search by booking ID, user name or email...')).toBeInTheDocument()
  })

  it('hides search bar for regular user', () => {
    mockUsePage.mockReturnValue({
      props: { user: { id: 1, pseudo: 'User', email: 'user@test.com', role: 'user' }, flash: {} },
    })
    render(<BookingsIndex bookings={sampleBookings} filters={{ search: '' }} />)
    expect(screen.queryByPlaceholderText('Search by booking ID, user name or email...')).not.toBeInTheDocument()
  })

  it('shows Guest column for admin', () => {
    mockUsePage.mockReturnValue({
      props: { user: { id: 1, pseudo: 'Admin', email: 'admin@test.com', role: 'admin' }, flash: {} },
    })
    render(<BookingsIndex bookings={sampleBookings} filters={{ search: '' }} />)
    // The column header is "Guest" in the current design
    expect(screen.getByText('Guest')).toBeInTheDocument()
  })

  it('displays booking status badges', () => {
    mockUsePage.mockReturnValue({
      props: { user: { id: 1, pseudo: 'User', email: 'user@test.com', role: 'user' }, flash: {} },
    })
    render(<BookingsIndex bookings={sampleBookings} filters={{ search: '' }} />)
    // Status labels are capitalized: "Confirmed", "Pending"
    expect(screen.getAllByText('Confirmed').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Pending').length).toBeGreaterThanOrEqual(1)
  })

  it('shows empty state when no bookings', () => {
    mockUsePage.mockReturnValue({
      props: { user: { id: 1, pseudo: 'User', email: 'user@test.com', role: 'user' }, flash: {} },
    })
    render(<BookingsIndex bookings={emptyBookings} filters={{ search: '' }} />)
    expect(screen.getByText('No bookings yet')).toBeInTheDocument()
  })

  it('renders New Booking link', () => {
    mockUsePage.mockReturnValue({
      props: { user: { id: 1, pseudo: 'User', email: 'user@test.com', role: 'user' }, flash: {} },
    })
    render(<BookingsIndex bookings={sampleBookings} filters={{ search: '' }} />)
    expect(screen.getByText('New Booking')).toBeInTheDocument()
  })
})
