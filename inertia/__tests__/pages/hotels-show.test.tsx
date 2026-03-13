import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { mockUsePage, mockRouter } from '../setup'
import HotelShow from '~/pages/hotels/show'

// Mock the Carousel component
vi.mock('~/components/carousel', () => ({
  default: ({ images, alt }: { images: string[]; alt: string }) => (
    <div data-testid="carousel" data-images={JSON.stringify(images)} data-alt={alt}>
      {images.map((src: string, i: number) => (
        <img key={i} src={src} alt={`${alt} ${i + 1}`} />
      ))}
    </div>
  ),
}))

const sampleHotel = {
  id: 1,
  name: 'Grand Hotel',
  location: 'Paris',
  description: 'A luxurious hotel in the heart of Paris.',
  pictureList: ['https://example.com/img1.jpg'],
  createdAt: '2025-01-01',
}

describe('Hotel Show Page', () => {
  it('renders hotel name', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    render(<HotelShow hotel={sampleHotel} />)
    expect(screen.getByText('Grand Hotel')).toBeInTheDocument()
  })

  it('renders hotel location', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    render(<HotelShow hotel={sampleHotel} />)
    expect(screen.getByText('Paris')).toBeInTheDocument()
  })

  it('renders hotel description', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    render(<HotelShow hotel={sampleHotel} />)
    expect(screen.getByText('A luxurious hotel in the heart of Paris.')).toBeInTheDocument()
  })

  it('shows Book Now button when logged in', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'User', email: 'user@test.com', role: 'user' },
        flash: {},
      },
    })
    render(<HotelShow hotel={sampleHotel} />)
    expect(screen.getByText('Book Now')).toBeInTheDocument()
  })

  it('hides Book Now button when not logged in', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    render(<HotelShow hotel={sampleHotel} />)
    expect(screen.queryByText('Book Now')).not.toBeInTheDocument()
  })

  it('shows Edit and Delete buttons for admin', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'Admin', email: 'admin@test.com', role: 'admin' },
        flash: {},
      },
    })
    render(<HotelShow hotel={sampleHotel} />)
    expect(screen.getByText('Edit')).toBeInTheDocument()
    expect(screen.getByText('Delete')).toBeInTheDocument()
  })

  it('hides Edit and Delete buttons for regular user', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'User', email: 'user@test.com', role: 'user' },
        flash: {},
      },
    })
    render(<HotelShow hotel={sampleHotel} />)
    expect(screen.queryByText('Edit')).not.toBeInTheDocument()
    expect(screen.queryByText('Delete')).not.toBeInTheDocument()
  })

  it('renders back to hotels link', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    render(<HotelShow hotel={sampleHotel} />)
    expect(screen.getByText(/Back to hotels/)).toBeInTheDocument()
  })

  it('passes images to carousel', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    render(<HotelShow hotel={sampleHotel} />)
    const carousel = screen.getByTestId('carousel')
    expect(carousel).toBeInTheDocument()
    expect(carousel.getAttribute('data-images')).toBe(
      JSON.stringify(['https://example.com/img1.jpg'])
    )
  })

  it('passes empty array to carousel when pictureList is null', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    render(<HotelShow hotel={{ ...sampleHotel, pictureList: null }} />)
    const carousel = screen.getByTestId('carousel')
    expect(carousel.getAttribute('data-images')).toBe('[]')
  })

  it('shows sign in prompt when not logged in', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    render(<HotelShow hotel={sampleHotel} />)
    expect(screen.getByText('Sign in to book')).toBeInTheDocument()
  })

  it('admin delete button calls confirm and router.delete', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'Admin', email: 'admin@test.com', role: 'admin' },
        flash: {},
      },
    })
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    render(<HotelShow hotel={sampleHotel} />)
    fireEvent.click(screen.getByText('Delete'))
    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this hotel?')
    expect(mockRouter.delete).toHaveBeenCalledWith('/hotels/1')
    vi.restoreAllMocks()
  })

  it('admin delete button does not delete when confirm is cancelled', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'Admin', email: 'admin@test.com', role: 'admin' },
        flash: {},
      },
    })
    vi.spyOn(window, 'confirm').mockReturnValue(false)
    mockRouter.delete.mockClear()
    render(<HotelShow hotel={sampleHotel} />)
    fireEvent.click(screen.getByText('Delete'))
    expect(mockRouter.delete).not.toHaveBeenCalled()
    vi.restoreAllMocks()
  })

  it('renders photo count', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    render(<HotelShow hotel={sampleHotel} />)
    expect(screen.getByText('1 photo')).toBeInTheDocument()
  })

  it('renders plural photo count', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    render(
      <HotelShow
        hotel={{ ...sampleHotel, pictureList: ['https://a.jpg', 'https://b.jpg'] }}
      />
    )
    expect(screen.getByText('2 photos')).toBeInTheDocument()
  })
})
