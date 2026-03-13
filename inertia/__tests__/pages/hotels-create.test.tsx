import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { mockUsePage } from '../setup'
import HotelCreate from '~/pages/hotels/create'

describe('Hotel Create Page', () => {
  beforeEach(() => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'Admin', email: 'admin@test.com', role: 'admin' },
        flash: {},
      },
    })
  })

  it('renders page heading', () => {
    render(<HotelCreate />)
    expect(screen.getByRole('heading', { name: 'Add New Hotel' })).toBeInTheDocument()
  })

  it('renders Hotel Name input', () => {
    render(<HotelCreate />)
    expect(screen.getByLabelText('Hotel Name')).toBeInTheDocument()
  })

  it('renders Location input', () => {
    render(<HotelCreate />)
    expect(screen.getByLabelText('Location')).toBeInTheDocument()
  })

  it('renders Description textarea', () => {
    render(<HotelCreate />)
    expect(screen.getByLabelText('Description')).toBeInTheDocument()
  })

  it('renders Photos section with URL input', () => {
    render(<HotelCreate />)
    expect(screen.getByPlaceholderText('Paste image URL and click Add')).toBeInTheDocument()
  })

  it('renders Add button for images', () => {
    render(<HotelCreate />)
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
  })

  it('renders Create Hotel submit button', () => {
    render(<HotelCreate />)
    expect(screen.getByRole('button', { name: 'Create Hotel' })).toBeInTheDocument()
  })

  it('renders Cancel link', () => {
    render(<HotelCreate />)
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  it('renders Back to hotels link', () => {
    render(<HotelCreate />)
    expect(screen.getByText('Back to hotels')).toBeInTheDocument()
  })

  it('renders tips sidebar', () => {
    render(<HotelCreate />)
    expect(screen.getByText('Tips')).toBeInTheDocument()
  })

  it('renders preview sidebar with default placeholders', () => {
    render(<HotelCreate />)
    expect(screen.getByText('Preview')).toBeInTheDocument()
    expect(screen.getByText('Description will appear here...')).toBeInTheDocument()
  })

  it('marks name, location, and description as required', () => {
    render(<HotelCreate />)
    expect(screen.getByLabelText('Hotel Name')).toBeRequired()
    expect(screen.getByLabelText('Location')).toBeRequired()
    expect(screen.getByLabelText('Description')).toBeRequired()
  })

  it('renders image URL input as type url', () => {
    render(<HotelCreate />)
    const urlInput = screen.getByPlaceholderText('Paste image URL and click Add')
    expect(urlInput).toHaveAttribute('type', 'url')
  })
})
