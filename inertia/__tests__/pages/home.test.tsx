import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { mockUsePage } from '../setup'
import Home from '~/pages/home'

describe('Home Page', () => {
  it('renders hero heading', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    render(<Home />)
    // Heading is split: "Discover " + <span>"Extraordinary"</span> + " Stays"
    expect(screen.getByText('Extraordinary')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders Browse Hotels link', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    render(<Home />)
    const browseLinks = screen.getAllByText(/Browse Hotels/)
    expect(browseLinks.length).toBeGreaterThanOrEqual(1)
  })

  it('shows Create Account button when not logged in', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    render(<Home />)
    const createLinks = screen.getAllByText('Create Account')
    expect(createLinks.length).toBeGreaterThanOrEqual(1)
  })

  it('hides hero Create Account button when logged in', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'Test', email: 'test@test.com', role: 'user' },
        flash: {},
      },
    })
    render(<Home />)
    // The hero CTA "Create Account" should not appear when logged in
    expect(screen.queryByText('Create Account')).not.toBeInTheDocument()
  })

  it('renders How It Works section', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    render(<Home />)
    expect(screen.getByText('How It Works')).toBeInTheDocument()
  })

  it('renders destination cards', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    render(<Home />)
    expect(screen.getByText('Paris')).toBeInTheDocument()
    expect(screen.getByText('Tokyo')).toBeInTheDocument()
    expect(screen.getByText('Dubai')).toBeInTheDocument()
  })

  it('renders testimonials section', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    render(<Home />)
    expect(screen.getByText(/What Our Guests Say/)).toBeInTheDocument()
  })
})
