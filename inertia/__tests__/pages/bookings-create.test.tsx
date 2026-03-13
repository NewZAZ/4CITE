import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'
import { mockUsePage, mockUseFormOverrides } from '../setup'
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

  afterEach(() => {
    Object.keys(mockUseFormOverrides).forEach((k) => delete mockUseFormOverrides[k])
  })

  it('displays hotelId error when present', () => {
    Object.assign(mockUseFormOverrides, { errors: { hotelId: 'Please select a hotel' } })
    render(<BookingCreate hotels={sampleHotels} selectedHotel={null} />)
    expect(screen.getByText('Please select a hotel')).toBeInTheDocument()
  })

  it('displays checkIn error when present', () => {
    Object.assign(mockUseFormOverrides, { errors: { checkIn: 'Check-in date is required' } })
    render(<BookingCreate hotels={sampleHotels} selectedHotel={null} />)
    expect(screen.getByText('Check-in date is required')).toBeInTheDocument()
  })

  it('displays checkOut error when present', () => {
    Object.assign(mockUseFormOverrides, { errors: { checkOut: 'Check-out date is required' } })
    render(<BookingCreate hotels={sampleHotels} selectedHotel={null} />)
    expect(screen.getByText('Check-out date is required')).toBeInTheDocument()
  })

  it('shows processing state on submit button', () => {
    Object.assign(mockUseFormOverrides, { processing: true })
    render(<BookingCreate hotels={sampleHotels} selectedHotel={null} />)
    expect(screen.getByRole('button', { name: 'Booking...' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Booking...' })).toBeDisabled()
  })

  it('calls post on form submit', () => {
    const postMock = vi.fn()
    Object.assign(mockUseFormOverrides, { post: postMock })
    render(<BookingCreate hotels={sampleHotels} selectedHotel={null} />)
    const form = screen.getByRole('button', { name: 'Confirm Booking' }).closest('form')!
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    expect(postMock).toHaveBeenCalledWith('/bookings')
  })

  it('shows selected hotel name and location in sidebar', () => {
    render(<BookingCreate hotels={sampleHotels} selectedHotel={sampleHotels[0]} />)
    // Hotel name in sidebar
    expect(screen.getByText('Grand Hotel')).toBeInTheDocument()
    expect(screen.getByText('Paris')).toBeInTheDocument()
  })

  it('displays nights count when dates are set', () => {
    Object.assign(mockUseFormOverrides, {
      data: { hotelId: '1', checkIn: '2026-06-01', checkOut: '2026-06-04' },
    })
    render(<BookingCreate hotels={sampleHotels} selectedHotel={null} />)
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('nights')).toBeInTheDocument()
  })

  it('displays formatted dates in sidebar when set', () => {
    Object.assign(mockUseFormOverrides, {
      data: { hotelId: '', checkIn: '2026-06-01', checkOut: '2026-06-04' },
    })
    render(<BookingCreate hotels={sampleHotels} selectedHotel={null} />)
    expect(screen.getByText('Jun 1')).toBeInTheDocument()
    expect(screen.getByText('Jun 4')).toBeInTheDocument()
  })

  it('triggers setData when changing form fields', () => {
    const setDataMock = vi.fn()
    Object.assign(mockUseFormOverrides, { setData: setDataMock })
    render(<BookingCreate hotels={sampleHotels} selectedHotel={null} />)
    fireEvent.change(screen.getByLabelText('Hotel'), { target: { value: '1' } })
    expect(setDataMock).toHaveBeenCalledWith('hotelId', '1')
    fireEvent.change(screen.getByLabelText('Check In'), { target: { value: '2026-06-01' } })
    expect(setDataMock).toHaveBeenCalledWith('checkIn', '2026-06-01')
    fireEvent.change(screen.getByLabelText('Check Out'), { target: { value: '2026-06-05' } })
    expect(setDataMock).toHaveBeenCalledWith('checkOut', '2026-06-05')
  })

  it('displays singular night for 1-night booking', () => {
    Object.assign(mockUseFormOverrides, {
      data: { hotelId: '1', checkIn: '2026-06-01', checkOut: '2026-06-02' },
    })
    render(<BookingCreate hotels={sampleHotels} selectedHotel={null} />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('night')).toBeInTheDocument()
  })
})
