import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'
import { mockUsePage, mockUseFormOverrides } from '../setup'
import Login from '~/pages/auth/login'

describe('Login Page', () => {
  beforeEach(() => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
  })

  afterEach(() => {
    Object.keys(mockUseFormOverrides).forEach((k) => delete mockUseFormOverrides[k])
  })

  it('renders login heading', () => {
    render(<Login />)
    expect(screen.getByRole('heading', { name: 'Welcome back' })).toBeInTheDocument()
  })

  it('renders email input', () => {
    render(<Login />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('renders password input', () => {
    render(<Login />)
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<Login />)
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument()
  })

  it('renders link to register page', () => {
    render(<Login />)
    const registerLinks = screen.getAllByText('Register')
    expect(registerLinks.length).toBeGreaterThanOrEqual(1)
  })

  it('displays email error when present', () => {
    Object.assign(mockUseFormOverrides, { errors: { email: 'Invalid email address' } })
    render(<Login />)
    expect(screen.getByText('Invalid email address')).toBeInTheDocument()
  })

  it('displays password error when present', () => {
    Object.assign(mockUseFormOverrides, { errors: { password: 'Password is required' } })
    render(<Login />)
    expect(screen.getByText('Password is required')).toBeInTheDocument()
  })

  it('shows processing state on submit button', () => {
    Object.assign(mockUseFormOverrides, { processing: true })
    render(<Login />)
    expect(screen.getByRole('button', { name: 'Signing in...' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Signing in...' })).toBeDisabled()
  })

  it('calls post on form submit', () => {
    const postMock = vi.fn()
    Object.assign(mockUseFormOverrides, { post: postMock })
    render(<Login />)
    const form = screen.getByRole('button', { name: 'Sign In' }).closest('form')!
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    expect(postMock).toHaveBeenCalledWith('/login')
  })

  it('triggers setData when typing in form fields', () => {
    const setDataMock = vi.fn()
    Object.assign(mockUseFormOverrides, { setData: setDataMock })
    render(<Login />)
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@test.com' } })
    expect(setDataMock).toHaveBeenCalledWith('email', 'test@test.com')
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } })
    expect(setDataMock).toHaveBeenCalledWith('password', 'password')
  })
})
