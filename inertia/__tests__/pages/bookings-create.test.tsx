import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { mockUsePage } from '../setup'
import BookingCreate from '~/pages/bookings/create'

const sampleHotels = [
  { id: 1, name: 'Grand Hotel', location: 'Paris' },
  { id: 2, name: 'Beach Resort', location: 'Nice' },
]

describe('Booking Create Page', () => {
  beforeEach(() => {
    mockUsePage.mockReturnValue({
      props: { user: { id: 1, pseudo: 'User', email: 'user@test.com', role: 'user' }, flash: {} },
    })
  })

  it('renders New Booking heading', () => {
    render(<BookingCreate hotels={sampleHotels} selectedHotel={null} />)
    expect(screen.getByRole('heading', { name: 'New Booking' })).toBeInTheDocument()
  })

  it('renders hotel select with options', () => {
    render(<BookingCreate hotels={sampleHotels} selectedHotel={null} />)
    const select = screen.getByLabelText('Hotel')
    expect(select).toBeInTheDocument()
    expect(screen.getByText('Select a hotel')).toBeInTheDocument()
  })

  it('renders all hotel options in select', () => {
    render(<BookingCreate hotels={sampleHotels} selectedHotel={null} />)
    expect(screen.getByText('Grand Hotel — Paris')).toBeInTheDocument()
    expect(screen.getByText('Beach Resort — Nice')).toBeInTheDocument()
  })

  it('renders check-in date input', () => {
    render(<BookingCreate hotels={sampleHotels} selectedHotel={null} />)
    expect(screen.getByLabelText('Check In')).toBeInTheDocument()
    expect(screen.getByLabelText('Check In')).toHaveAttribute('type', 'date')
  })

  it('renders check-out date input', () => {
    render(<BookingCreate hotels={sampleHotels} selectedHotel={null} />)
    expect(screen.getByLabelText('Check Out')).toBeInTheDocument()
    expect(screen.getByLabelText('Check Out')).toHaveAttribute('type', 'date')
  })

  it('renders Confirm Booking submit button', () => {
    render(<BookingCreate hotels={sampleHotels} selectedHotel={null} />)
    expect(screen.getByRole('button', { name: 'Confirm Booking' })).toBeInTheDocument()
  })

  it('renders Cancel link to bookings', () => {
    render(<BookingCreate hotels={sampleHotels} selectedHotel={null} />)
    const cancelLink = screen.getByText('Cancel')
    expect(cancelLink).toHaveAttribute('href', '/bookings')
  })

  it('renders Back to bookings link', () => {
    render(<BookingCreate hotels={sampleHotels} selectedHotel={null} />)
    expect(screen.getByText('Back to bookings')).toBeInTheDocument()
  })

  it('renders Booking Summary sidebar', () => {
    render(<BookingCreate hotels={sampleHotels} selectedHotel={null} />)
    expect(screen.getByText('Booking Summary')).toBeInTheDocument()
  })

  it('shows Not selected when no hotel is chosen', () => {
    render(<BookingCreate hotels={sampleHotels} selectedHotel={null} />)
    expect(screen.getByText('Not selected')).toBeInTheDocument()
  })

  it('shows dash for dates when not set', () => {
    render(<BookingCreate hotels={sampleHotels} selectedHotel={null} />)
    const dashes = screen.getAllByText('—')
    expect(dashes.length).toBeGreaterThanOrEqual(2)
  })

  it('pre-selects hotel when selectedHotel is provided', () => {
    render(<BookingCreate hotels={sampleHotels} selectedHotel={sampleHotels[0]} />)
    const select = screen.getByLabelText('Hotel') as HTMLSelectElement
    expect(select.value).toBe('1')
  })

  it('marks hotel select, check-in and check-out as required', () => {
    render(<BookingCreate hotels={sampleHotels} selectedHotel={null} />)
    expect(screen.getByLabelText('Hotel')).toBeRequired()
    expect(screen.getByLabelText('Check In')).toBeRequired()
    expect(screen.getByLabelText('Check Out')).toBeRequired()
  })
})
