import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { mockUsePage } from '../setup'
import UserEdit from '~/pages/users/edit'

const targetUser = {
  id: 1,
  pseudo: 'JohnDoe',
  email: 'john@test.com',
  role: 'user',
}

const adminUser = {
  id: 2,
  pseudo: 'AdminUser',
  email: 'admin@test.com',
  role: 'admin',
}

describe('User Edit Page', () => {
  it('renders Edit Profile heading', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'JohnDoe', email: 'john@test.com', role: 'user' },
        flash: {},
      },
    })
    render(<UserEdit targetUser={targetUser} />)
    expect(screen.getByRole('heading', { name: 'Edit Profile' })).toBeInTheDocument()
  })

  it('shows "your" when editing own profile', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'JohnDoe', email: 'john@test.com', role: 'user' },
        flash: {},
      },
    })
    render(<UserEdit targetUser={targetUser} />)
    expect(screen.getByText(/Update your account information/)).toBeInTheDocument()
  })

  it('shows user name when admin edits another profile', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 2, pseudo: 'AdminUser', email: 'admin@test.com', role: 'admin' },
        flash: {},
      },
    })
    render(<UserEdit targetUser={targetUser} />)
    expect(screen.getByText(/Update JohnDoe's account information/)).toBeInTheDocument()
  })

  it('renders Display Name input with pre-filled value', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'JohnDoe', email: 'john@test.com', role: 'user' },
        flash: {},
      },
    })
    render(<UserEdit targetUser={targetUser} />)
    expect(screen.getByLabelText('Display Name')).toHaveValue('JohnDoe')
  })

  it('renders Email Address input with pre-filled value', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'JohnDoe', email: 'john@test.com', role: 'user' },
        flash: {},
      },
    })
    render(<UserEdit targetUser={targetUser} />)
    expect(screen.getByLabelText('Email Address')).toHaveValue('john@test.com')
  })

  it('renders password input with placeholder', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'JohnDoe', email: 'john@test.com', role: 'user' },
        flash: {},
      },
    })
    render(<UserEdit targetUser={targetUser} />)
    const passwordInput = screen.getByLabelText('New Password')
    expect(passwordInput).toHaveAttribute('type', 'password')
    expect(passwordInput).toHaveAttribute('placeholder', 'Leave blank to keep current password')
  })

  it('renders password hint text', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'JohnDoe', email: 'john@test.com', role: 'user' },
        flash: {},
      },
    })
    render(<UserEdit targetUser={targetUser} />)
    expect(
      screen.getByText('Must be at least 8 characters. Leave blank to keep your current password.')
    ).toBeInTheDocument()
  })

  it('renders password input with minLength 8', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'JohnDoe', email: 'john@test.com', role: 'user' },
        flash: {},
      },
    })
    render(<UserEdit targetUser={targetUser} />)
    const passwordInput = screen.getByLabelText('New Password')
    expect(passwordInput).toHaveAttribute('minLength', '8')
  })

  it('renders Save Changes button', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'JohnDoe', email: 'john@test.com', role: 'user' },
        flash: {},
      },
    })
    render(<UserEdit targetUser={targetUser} />)
    expect(screen.getByRole('button', { name: 'Save Changes' })).toBeInTheDocument()
  })

  it('renders Cancel link to user profile', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'JohnDoe', email: 'john@test.com', role: 'user' },
        flash: {},
      },
    })
    render(<UserEdit targetUser={targetUser} />)
    const cancelLink = screen.getByText('Cancel')
    expect(cancelLink).toHaveAttribute('href', '/users/1')
  })

  it('renders Back to profile link', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'JohnDoe', email: 'john@test.com', role: 'user' },
        flash: {},
      },
    })
    render(<UserEdit targetUser={targetUser} />)
    expect(screen.getByText('Back to profile')).toBeInTheDocument()
  })

  it('renders Preview sidebar with user initials', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'JohnDoe', email: 'john@test.com', role: 'user' },
        flash: {},
      },
    })
    render(<UserEdit targetUser={targetUser} />)
    expect(screen.getByText('Preview')).toBeInTheDocument()
    expect(screen.getAllByText('JO').length).toBeGreaterThanOrEqual(1)
  })

  it('displays the user role badge', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'JohnDoe', email: 'john@test.com', role: 'user' },
        flash: {},
      },
    })
    render(<UserEdit targetUser={targetUser} />)
    expect(screen.getByText('user')).toBeInTheDocument()
  })

  it('displays admin role for admin user', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 2, pseudo: 'AdminUser', email: 'admin@test.com', role: 'admin' },
        flash: {},
      },
    })
    render(<UserEdit targetUser={adminUser} />)
    expect(screen.getByText('admin')).toBeInTheDocument()
  })

  it('shows Password unchanged in security section', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'JohnDoe', email: 'john@test.com', role: 'user' },
        flash: {},
      },
    })
    render(<UserEdit targetUser={targetUser} />)
    expect(screen.getByText('Password unchanged')).toBeInTheDocument()
  })

  it('marks display name and email as required', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'JohnDoe', email: 'john@test.com', role: 'user' },
        flash: {},
      },
    })
    render(<UserEdit targetUser={targetUser} />)
    expect(screen.getByLabelText('Display Name')).toBeRequired()
    expect(screen.getByLabelText('Email Address')).toBeRequired()
  })

  it('does not mark password as required', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'JohnDoe', email: 'john@test.com', role: 'user' },
        flash: {},
      },
    })
    render(<UserEdit targetUser={targetUser} />)
    expect(screen.getByLabelText('New Password')).not.toBeRequired()
  })
})
