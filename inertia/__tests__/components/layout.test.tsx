import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { mockUsePage } from '../setup'
import Layout from '~/components/layout'

const regularUser = { id: 1, pseudo: 'TestUser', email: 'test@test.com', role: 'user' }
const adminUser = { id: 2, pseudo: 'AdminUser', email: 'admin@test.com', role: 'admin' }
const employeeUser = { id: 3, pseudo: 'EmpUser', email: 'emp@test.com', role: 'employee' }

describe('Layout Component', () => {
  it('renders brand name', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    )
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
    mockUsePage.mockReturnValue({ props: { user: regularUser, flash: {} } })
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    )
    expect(screen.queryByText('Login')).not.toBeInTheDocument()
  })

  it('shows My Bookings link when authenticated', () => {
    mockUsePage.mockReturnValue({ props: { user: regularUser, flash: {} } })
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    )
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
    mockUsePage.mockReturnValue({ props: { user: regularUser, flash: {} } })
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
    expect(screen.getByText(/Akkor Hotel Ltd\. All rights reserved/)).toBeInTheDocument()
  })

  // Dropdown tests
  it('opens dropdown when clicking avatar button', () => {
    mockUsePage.mockReturnValue({ props: { user: regularUser, flash: {} } })
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    )
    // Dropdown content should not be visible initially
    expect(screen.queryByText('My Profile')).not.toBeInTheDocument()

    // Click the avatar button to open dropdown
    const avatarButton = screen.getByText('TE').closest('button')!
    fireEvent.click(avatarButton)

    // Dropdown content should now be visible
    expect(screen.getByText('My Profile')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })

  it('shows user email in dropdown', () => {
    mockUsePage.mockReturnValue({ props: { user: regularUser, flash: {} } })
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    )
    fireEvent.click(screen.getByText('TE').closest('button')!)
    expect(screen.getByText('test@test.com')).toBeInTheDocument()
  })

  it('shows user pseudo in dropdown header', () => {
    mockUsePage.mockReturnValue({ props: { user: regularUser, flash: {} } })
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    )
    fireEvent.click(screen.getByText('TE').closest('button')!)
    // Pseudo appears in dropdown header and in the nav bar
    const pseudoElements = screen.getAllByText('TestUser')
    expect(pseudoElements.length).toBeGreaterThanOrEqual(1)
  })

  it('does not show role badge for regular user in dropdown', () => {
    mockUsePage.mockReturnValue({ props: { user: regularUser, flash: {} } })
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    )
    fireEvent.click(screen.getByText('TE').closest('button')!)
    // No Administration or Staff sections for regular user
    expect(screen.queryByText('Administration')).not.toBeInTheDocument()
    expect(screen.queryByText('Staff')).not.toBeInTheDocument()
  })

  it('closes dropdown when clicking outside', () => {
    mockUsePage.mockReturnValue({ props: { user: regularUser, flash: {} } })
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    )
    fireEvent.click(screen.getByText('TE').closest('button')!)
    expect(screen.getByText('My Profile')).toBeInTheDocument()

    // Click outside the dropdown
    fireEvent.mouseDown(document.body)
    expect(screen.queryByText('My Profile')).not.toBeInTheDocument()
  })

  // Admin dropdown tests
  it('shows Administration section for admin user', () => {
    mockUsePage.mockReturnValue({ props: { user: adminUser, flash: {} } })
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    )
    fireEvent.click(screen.getByText('AD').closest('button')!)
    expect(screen.getByText('Administration')).toBeInTheDocument()
    expect(screen.getByText('Add Hotel')).toBeInTheDocument()
    expect(screen.getByText('Manage Users')).toBeInTheDocument()
  })

  it('shows admin role badge in dropdown', () => {
    mockUsePage.mockReturnValue({ props: { user: adminUser, flash: {} } })
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    )
    fireEvent.click(screen.getByText('AD').closest('button')!)
    expect(screen.getByText('admin')).toBeInTheDocument()
  })

  // Employee dropdown tests
  it('shows Staff section for employee user', () => {
    mockUsePage.mockReturnValue({ props: { user: employeeUser, flash: {} } })
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    )
    fireEvent.click(screen.getByText('EM').closest('button')!)
    expect(screen.getByText('Staff')).toBeInTheDocument()
    expect(screen.getByText('View Users')).toBeInTheDocument()
  })

  it('shows employee role badge in dropdown', () => {
    mockUsePage.mockReturnValue({ props: { user: employeeUser, flash: {} } })
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    )
    fireEvent.click(screen.getByText('EM').closest('button')!)
    expect(screen.getByText('employee')).toBeInTheDocument()
  })

  // Mobile menu tests
  it('opens mobile menu when clicking hamburger button', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    )
    // Find the mobile menu button (the one with the SVG hamburger icon)
    const buttons = screen.getAllByRole('button')
    const mobileMenuBtn = buttons[0] // First button is the mobile menu toggle
    fireEvent.click(mobileMenuBtn)

    // Mobile menu shows Login and Register links
    const loginLinks = screen.getAllByText('Login')
    expect(loginLinks.length).toBeGreaterThanOrEqual(2) // nav + mobile
  })

  it('shows mobile menu with user links when authenticated', () => {
    mockUsePage.mockReturnValue({ props: { user: regularUser, flash: {} } })
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    )
    // Click mobile menu button (first button before the avatar button)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])

    // Mobile menu shows user-specific links
    const profileLinks = screen.getAllByText('My Profile')
    expect(profileLinks.length).toBeGreaterThanOrEqual(1)
  })

  it('shows admin links in mobile menu for admin user', () => {
    mockUsePage.mockReturnValue({ props: { user: adminUser, flash: {} } })
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    )
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0]) // mobile menu

    // Open dropdown too to get admin links there
    const addHotelLinks = screen.getAllByText('Add Hotel')
    expect(addHotelLinks.length).toBeGreaterThanOrEqual(1)
    const manageUsersLinks = screen.getAllByText('Manage Users')
    expect(manageUsersLinks.length).toBeGreaterThanOrEqual(1)
  })

  // Flash message tests
  it('displays success flash message', () => {
    mockUsePage.mockReturnValue({
      props: { user: null, flash: { success: 'Operation completed successfully' } },
    })
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    )
    expect(screen.getByText('Operation completed successfully')).toBeInTheDocument()
  })

  it('displays error flash message as string', () => {
    mockUsePage.mockReturnValue({
      props: { user: null, flash: { errors: 'Something went wrong' } },
    })
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    )
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('displays error flash message as object', () => {
    mockUsePage.mockReturnValue({
      props: { user: null, flash: { errors: { email: 'Invalid email', name: 'Required' } } },
    })
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    )
    expect(screen.getByText('Invalid email, Required')).toBeInTheDocument()
  })

  // Footer links for authenticated users
  it('shows My Bookings in footer when authenticated', () => {
    mockUsePage.mockReturnValue({ props: { user: regularUser, flash: {} } })
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    )
    const bookingsLinks = screen.getAllByText('My Bookings')
    expect(bookingsLinks.length).toBeGreaterThanOrEqual(2) // nav + footer
  })

  it('renders Logout link in dropdown', () => {
    mockUsePage.mockReturnValue({ props: { user: regularUser, flash: {} } })
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    )
    fireEvent.click(screen.getByText('TE').closest('button')!)
    const logoutLink = screen.getByText('Logout')
    expect(logoutLink).toHaveAttribute('href', '/logout')
    expect(logoutLink).toHaveAttribute('data-method', 'post')
  })
})
