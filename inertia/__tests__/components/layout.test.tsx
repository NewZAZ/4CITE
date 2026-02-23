import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { mockUsePage } from '../setup'
import Layout from '~/components/layout'

describe('Layout Component', () => {
  it('renders brand name', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    )
    // Brand appears in nav and footer
    const brandLinks = screen.getAllByText('Akkor Hotel')
    expect(brandLinks.length).toBeGreaterThanOrEqual(1)
  })

  it('renders Hotels link in nav', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    )
    expect(screen.getByText('Hotels')).toBeInTheDocument()
  })

  it('shows Login and Register when not authenticated', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    )
    expect(screen.getByText('Login')).toBeInTheDocument()
    expect(screen.getByText('Register')).toBeInTheDocument()
  })

  it('hides Login/Register when authenticated', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'Test', email: 'test@test.com', role: 'user' },
        flash: {},
      },
    })
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    )
    expect(screen.queryByText('Login')).not.toBeInTheDocument()
    // Register still appears in footer links but not in nav auth section
  })

  it('shows My Bookings link when authenticated', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'Test', email: 'test@test.com', role: 'user' },
        flash: {},
      },
    })
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    )
    // My Bookings in nav (desktop) and in dropdown
    const bookingsLinks = screen.getAllByText('My Bookings')
    expect(bookingsLinks.length).toBeGreaterThanOrEqual(1)
  })

  it('hides My Bookings link when not authenticated', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    )
    // My Bookings should not appear in nav
    expect(screen.queryByText('My Bookings')).not.toBeInTheDocument()
  })

  it('renders children content', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('renders user initials in avatar', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'TestUser', email: 'test@test.com', role: 'user' },
        flash: {},
      },
    })
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    )
    expect(screen.getByText('TE')).toBeInTheDocument()
  })

  it('renders footer with social links', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    )
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument()
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument()
    expect(screen.getByLabelText('Facebook')).toBeInTheDocument()
  })

  it('renders footer legal links', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    )
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByText('Terms of Service')).toBeInTheDocument()
  })

  it('renders copyright notice', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    )
    expect(
      screen.getByText(/Akkor Hotel Ltd\. All rights reserved/)
    ).toBeInTheDocument()
  })
})
