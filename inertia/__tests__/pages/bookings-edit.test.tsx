import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { mockUsePage } from '../setup'
import BookingEdit from '~/pages/bookings/edit'

const sampleBooking = {
  id: 1,
  checkIn: '2026-06-01T00:00:00.000Z',
  checkOut: '2026-06-05T00:00:00.000Z',
  status: 'confirmed',
  hotel: { id: 1, name: 'Grand Hotel', location: 'Paris' },
}

const pendingBooking = {
  id: 2,
  checkIn: '2026-07-10T00:00:00.000Z',
  checkOut: '2026-07-12T00:00:00.000Z',
  status: 'pending',
  hotel: { id: 2, name: 'Beach Resort', location: 'Nice' },
}

describe('Booking Edit Page', () => {
  beforeEach(() => {
    mockUsePage.mockReturnValue({
      props: { user: { id: 1, pseudo: 'User', email: 'user@test.com', role: 'user' }, flash: {} },
    })
  })

  it('renders Edit Booking heading', () => {
    render(<BookingEdit booking={sampleBooking} />)
    expect(screen.getByRole('heading', { name: 'Edit Booking' })).toBeInTheDocument()
  })

  it('displays hotel name and location', () => {
    render(<BookingEdit booking={sampleBooking} />)
    expect(screen.getByText('Grand Hotel — Paris')).toBeInTheDocument()
  })

  it('renders check-in date input with pre-filled value', () => {
    render(<BookingEdit booking={sampleBooking} />)
    const checkIn = screen.getByLabelText('Check In') as HTMLInputElement
    expect(checkIn).toHaveAttribute('type', 'date')
    expect(checkIn.value).toBe('2026-06-01')
  })

  it('renders check-out date input with pre-filled value', () => {
    render(<BookingEdit booking={sampleBooking} />)
    const checkOut = screen.getByLabelText('Check Out') as HTMLInputElement
    expect(checkOut).toHaveAttribute('type', 'date')
    expect(checkOut.value).toBe('2026-06-05')
  })

  it('renders status select with all options', () => {
    render(<BookingEdit booking={sampleBooking} />)
    const status = screen.getByLabelText('Status') as HTMLSelectElement
    expect(status).toBeInTheDocument()
    // Options exist in both the select and the sidebar badge, so use getAllByText
    expect(screen.getAllByText('Pending').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Confirmed').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Cancelled').length).toBeGreaterThanOrEqual(1)
  })

  it('pre-selects the current booking status', () => {
    render(<BookingEdit booking={sampleBooking} />)
    const status = screen.getByLabelText('Status') as HTMLSelectElement
    expect(status.value).toBe('confirmed')
  })

  it('pre-selects pending status for pending booking', () => {
    render(<BookingEdit booking={pendingBooking} />)
    const status = screen.getByLabelText('Status') as HTMLSelectElement
    expect(status.value).toBe('pending')
  })

  it('renders Save Changes button', () => {
    render(<BookingEdit booking={sampleBooking} />)
    expect(screen.getByRole('button', { name: 'Save Changes' })).toBeInTheDocument()
  })

  it('renders Cancel link to bookings', () => {
    render(<BookingEdit booking={sampleBooking} />)
    const cancelLink = screen.getByText('Cancel')
    expect(cancelLink).toHaveAttribute('href', '/bookings')
  })

  it('renders Back to bookings link', () => {
    render(<BookingEdit booking={sampleBooking} />)
    expect(screen.getByText('Back to bookings')).toBeInTheDocument()
  })

  it('renders Booking Summary sidebar', () => {
    render(<BookingEdit booking={sampleBooking} />)
    expect(screen.getByText('Booking Summary')).toBeInTheDocument()
  })

  it('displays hotel info in sidebar', () => {
    render(<BookingEdit booking={sampleBooking} />)
    // Hotel name appears in both the form subtitle and sidebar
    const hotelNames = screen.getAllByText('Grand Hotel')
    expect(hotelNames.length).toBeGreaterThanOrEqual(1)
  })

  it('displays nights count when dates are valid', () => {
    render(<BookingEdit booking={sampleBooking} />)
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('nights')).toBeInTheDocument()
  })

  it('displays singular night for 1-night booking', () => {
    const oneNightBooking = {
      ...sampleBooking,
      checkIn: '2026-06-01T00:00:00.000Z',
      checkOut: '2026-06-02T00:00:00.000Z',
    }
    render(<BookingEdit booking={oneNightBooking} />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('night')).toBeInTheDocument()
  })
})
