import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'
import { mockUsePage, mockUseFormOverrides } from '../setup'
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

  afterEach(() => {
    Object.keys(mockUseFormOverrides).forEach((k) => delete mockUseFormOverrides[k])
  })

  it('displays pseudo error when present', () => {
    mockUsePage.mockReturnValue({
      props: { user: { id: 1, pseudo: 'JohnDoe', email: 'john@test.com', role: 'user' }, flash: {} },
    })
    Object.assign(mockUseFormOverrides, { errors: { pseudo: 'Pseudo is required' } })
    render(<UserEdit targetUser={targetUser} />)
    expect(screen.getByText('Pseudo is required')).toBeInTheDocument()
  })

  it('displays email error when present', () => {
    mockUsePage.mockReturnValue({
      props: { user: { id: 1, pseudo: 'JohnDoe', email: 'john@test.com', role: 'user' }, flash: {} },
    })
    Object.assign(mockUseFormOverrides, { errors: { email: 'Email already taken' } })
    render(<UserEdit targetUser={targetUser} />)
    expect(screen.getByText('Email already taken')).toBeInTheDocument()
  })

  it('displays password error when present', () => {
    mockUsePage.mockReturnValue({
      props: { user: { id: 1, pseudo: 'JohnDoe', email: 'john@test.com', role: 'user' }, flash: {} },
    })
    Object.assign(mockUseFormOverrides, { errors: { password: 'Too short' } })
    render(<UserEdit targetUser={targetUser} />)
    expect(screen.getByText('Too short')).toBeInTheDocument()
  })

  it('shows processing state on submit button', () => {
    mockUsePage.mockReturnValue({
      props: { user: { id: 1, pseudo: 'JohnDoe', email: 'john@test.com', role: 'user' }, flash: {} },
    })
    Object.assign(mockUseFormOverrides, { processing: true })
    render(<UserEdit targetUser={targetUser} />)
    expect(screen.getByRole('button', { name: 'Saving...' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Saving...' })).toBeDisabled()
  })

  it('calls put on form submit', () => {
    mockUsePage.mockReturnValue({
      props: { user: { id: 1, pseudo: 'JohnDoe', email: 'john@test.com', role: 'user' }, flash: {} },
    })
    const putMock = vi.fn()
    Object.assign(mockUseFormOverrides, { put: putMock })
    render(<UserEdit targetUser={targetUser} />)
    const form = screen.getByRole('button', { name: 'Save Changes' }).closest('form')!
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    expect(putMock).toHaveBeenCalledWith('/users/1')
  })

  it('shows Password will be updated when password is set', () => {
    mockUsePage.mockReturnValue({
      props: { user: { id: 1, pseudo: 'JohnDoe', email: 'john@test.com', role: 'user' }, flash: {} },
    })
    Object.assign(mockUseFormOverrides, {
      data: { pseudo: 'JohnDoe', email: 'john@test.com', password: 'newpassword' },
    })
    render(<UserEdit targetUser={targetUser} />)
    expect(screen.getByText('Password will be updated')).toBeInTheDocument()
  })

  it('triggers setData when changing form fields', () => {
    mockUsePage.mockReturnValue({
      props: { user: { id: 1, pseudo: 'JohnDoe', email: 'john@test.com', role: 'user' }, flash: {} },
    })
    const setDataMock = vi.fn()
    Object.assign(mockUseFormOverrides, { setData: setDataMock })
    render(<UserEdit targetUser={targetUser} />)
    fireEvent.change(screen.getByLabelText('Display Name'), { target: { value: 'NewName' } })
    expect(setDataMock).toHaveBeenCalledWith('pseudo', 'NewName')
    fireEvent.change(screen.getByLabelText('Email Address'), {
      target: { value: 'new@test.com' },
    })
    expect(setDataMock).toHaveBeenCalledWith('email', 'new@test.com')
    fireEvent.change(screen.getByLabelText('New Password'), { target: { value: 'pass1234' } })
    expect(setDataMock).toHaveBeenCalledWith('password', 'pass1234')
  })
})
