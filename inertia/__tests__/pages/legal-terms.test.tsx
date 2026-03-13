import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { mockUsePage } from '../setup'
import Terms from '~/pages/legal/terms'

describe('Terms of Service Page', () => {
  beforeEach(() => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
  })

  it('renders the Terms of Service heading', () => {
    render(<Terms />)
    expect(screen.getByRole('heading', { name: 'Terms of Service' })).toBeInTheDocument()
  })

  it('renders all 8 sections', () => {
    render(<Terms />)
    expect(screen.getByText('1. Acceptance of Terms')).toBeInTheDocument()
    expect(screen.getByText('2. Account Registration')).toBeInTheDocument()
    expect(screen.getByText('3. Bookings')).toBeInTheDocument()
    expect(screen.getByText('4. User Conduct')).toBeInTheDocument()
    expect(screen.getByText('5. Account Termination')).toBeInTheDocument()
    expect(screen.getByText('6. Limitation of Liability')).toBeInTheDocument()
    expect(screen.getByText('7. Changes to Terms')).toBeInTheDocument()
    expect(screen.getByText('8. Contact')).toBeInTheDocument()
  })

  it('renders contact email', () => {
    render(<Terms />)
    expect(screen.getByText('legal@akkor-hotel.com')).toBeInTheDocument()
  })

  it('renders Back to home link', () => {
    render(<Terms />)
    const backLink = screen.getByText('Back to home')
    expect(backLink).toHaveAttribute('href', '/')
  })
})
