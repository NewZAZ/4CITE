import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { mockUsePage, mockRouter } from '../setup'
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
      props: {
        user: { id: 1, pseudo: 'Admin', email: 'admin@test.com', role: 'admin' },
        flash: {},
      },
    })
    render(<BookingsIndex bookings={sampleBookings} filters={{ search: '' }} />)
    expect(screen.getByRole('heading', { name: 'All Bookings' })).toBeInTheDocument()
  })

  it('shows search bar for admin', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'Admin', email: 'admin@test.com', role: 'admin' },
        flash: {},
      },
    })
    render(<BookingsIndex bookings={sampleBookings} filters={{ search: '' }} />)
    expect(
      screen.getByPlaceholderText('Search by booking ID, user name or email...')
    ).toBeInTheDocument()
  })

  it('hides search bar for regular user', () => {
    mockUsePage.mockReturnValue({
      props: { user: { id: 1, pseudo: 'User', email: 'user@test.com', role: 'user' }, flash: {} },
    })
    render(<BookingsIndex bookings={sampleBookings} filters={{ search: '' }} />)
    expect(
      screen.queryByPlaceholderText('Search by booking ID, user name or email...')
    ).not.toBeInTheDocument()
  })

  it('shows Guest column for admin', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'Admin', email: 'admin@test.com', role: 'admin' },
        flash: {},
      },
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

  it('admin can submit search', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'Admin', email: 'admin@test.com', role: 'admin' },
        flash: {},
      },
    })
    render(<BookingsIndex bookings={sampleBookings} filters={{ search: '' }} />)
    const searchInput = screen.getByPlaceholderText('Search by booking ID, user name or email...')
    fireEvent.change(searchInput, { target: { value: 'John' } })
    fireEvent.click(screen.getByRole('button', { name: 'Search' }))
    expect(mockRouter.get).toHaveBeenCalledWith(
      '/bookings',
      { search: 'John' },
      { preserveState: true }
    )
  })

  it('shows search-specific empty message when searching', () => {
    mockUsePage.mockReturnValue({
      props: { user: { id: 1, pseudo: 'User', email: 'user@test.com', role: 'user' }, flash: {} },
    })
    render(<BookingsIndex bookings={emptyBookings} filters={{ search: 'nonexistent' }} />)
    expect(screen.getByText(/No results for "nonexistent"/)).toBeInTheDocument()
  })

  it('renders edit links for bookings', () => {
    mockUsePage.mockReturnValue({
      props: { user: { id: 1, pseudo: 'User', email: 'user@test.com', role: 'user' }, flash: {} },
    })
    render(<BookingsIndex bookings={sampleBookings} filters={{ search: '' }} />)
    const editLinks = screen.getAllByText('Edit')
    expect(editLinks.length).toBeGreaterThanOrEqual(2)
  })

  it('renders delete buttons for bookings', () => {
    mockUsePage.mockReturnValue({
      props: { user: { id: 1, pseudo: 'User', email: 'user@test.com', role: 'user' }, flash: {} },
    })
    render(<BookingsIndex bookings={sampleBookings} filters={{ search: '' }} />)
    const deleteButtons = screen.getAllByText('Delete')
    expect(deleteButtons.length).toBeGreaterThanOrEqual(2)
  })

  it('delete button calls confirm and router.delete', () => {
    mockUsePage.mockReturnValue({
      props: { user: { id: 1, pseudo: 'User', email: 'user@test.com', role: 'user' }, flash: {} },
    })
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    render(<BookingsIndex bookings={sampleBookings} filters={{ search: '' }} />)
    const deleteButtons = screen.getAllByText('Delete')
    fireEvent.click(deleteButtons[0])
    expect(window.confirm).toHaveBeenCalledWith('Cancel this booking?')
    expect(mockRouter.delete).toHaveBeenCalled()
    vi.restoreAllMocks()
  })

  it('shows admin total reservations count', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'Admin', email: 'admin@test.com', role: 'admin' },
        flash: {},
      },
    })
    render(<BookingsIndex bookings={sampleBookings} filters={{ search: '' }} />)
    expect(screen.getByText('2 total reservations')).toBeInTheDocument()
  })

  it('shows regular user subtitle', () => {
    mockUsePage.mockReturnValue({
      props: { user: { id: 1, pseudo: 'User', email: 'user@test.com', role: 'user' }, flash: {} },
    })
    render(<BookingsIndex bookings={sampleBookings} filters={{ search: '' }} />)
    expect(screen.getByText('Manage your reservations')).toBeInTheDocument()
  })
})
