import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { mockUsePage } from '../setup'
import Privacy from '~/pages/legal/privacy'

describe('Privacy Policy Page', () => {
  beforeEach(() => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
  })

  it('renders the Privacy Policy heading', () => {
    render(<Privacy />)
    expect(screen.getByRole('heading', { name: 'Privacy Policy' })).toBeInTheDocument()
  })

  it('renders all 7 sections', () => {
    render(<Privacy />)
    expect(screen.getByText('1. Information We Collect')).toBeInTheDocument()
    expect(screen.getByText('2. How We Use Your Information')).toBeInTheDocument()
    expect(screen.getByText('3. Data Sharing')).toBeInTheDocument()
    expect(screen.getByText('4. Data Security')).toBeInTheDocument()
    expect(screen.getByText('5. Your Rights')).toBeInTheDocument()
    expect(screen.getByText('6. Cookies')).toBeInTheDocument()
    expect(screen.getByText('7. Contact')).toBeInTheDocument()
  })

  it('renders contact email', () => {
    render(<Privacy />)
    expect(screen.getByText('privacy@akkor-hotel.com')).toBeInTheDocument()
  })

  it('renders Back to home link', () => {
    render(<Privacy />)
    const backLink = screen.getByText('Back to home')
    expect(backLink).toHaveAttribute('href', '/')
  })
})
