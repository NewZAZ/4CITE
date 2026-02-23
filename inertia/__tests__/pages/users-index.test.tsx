import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { mockUsePage } from '../setup'
import UsersIndex from '~/pages/users/index'

const sampleUsers = [
  { id: 1, pseudo: 'Admin', email: 'admin@test.com', role: 'admin', createdAt: '2025-01-01' },
  {
    id: 2,
    pseudo: 'Employee',
    email: 'emp@test.com',
    role: 'employee',
    createdAt: '2025-01-02',
  },
  { id: 3, pseudo: 'TestUser', email: 'user@test.com', role: 'user', createdAt: '2025-01-03' },
]

describe('Users Index Page', () => {
  beforeEach(() => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'Admin', email: 'admin@test.com', role: 'admin' },
        flash: {},
      },
    })
  })

  it('renders Users heading', () => {
    render(<UsersIndex users={sampleUsers} />)
    expect(screen.getByRole('heading', { name: 'Users' })).toBeInTheDocument()
  })

  it('renders user list', () => {
    render(<UsersIndex users={sampleUsers} />)
    // Use getAllByText since "Admin" appears in nav AND in the table
    expect(screen.getAllByText('Admin').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('Employee')).toBeInTheDocument()
    expect(screen.getByText('TestUser')).toBeInTheDocument()
  })

  it('displays user emails', () => {
    render(<UsersIndex users={sampleUsers} />)
    expect(screen.getByText('admin@test.com')).toBeInTheDocument()
    expect(screen.getByText('emp@test.com')).toBeInTheDocument()
  })

  it('displays role badges', () => {
    render(<UsersIndex users={sampleUsers} />)
    expect(screen.getByText('admin')).toBeInTheDocument()
    expect(screen.getByText('employee')).toBeInTheDocument()
    expect(screen.getByText('user')).toBeInTheDocument()
  })

  it('renders View links for each user', () => {
    render(<UsersIndex users={sampleUsers} />)
    const viewLinks = screen.getAllByText('View')
    expect(viewLinks).toHaveLength(3)
  })

  it('renders table headers', () => {
    render(<UsersIndex users={sampleUsers} />)
    // "User" header exists in table (may also match nav pseudo text)
    expect(screen.getAllByText('User').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Role')).toBeInTheDocument()
    expect(screen.getByText('Joined')).toBeInTheDocument()
  })

  it('shows user initials avatars', () => {
    render(<UsersIndex users={sampleUsers} />)
    // "AD" appears in table avatar AND nav avatar (logged-in user is Admin)
    expect(screen.getAllByText('AD').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('EM')).toBeInTheDocument()
    expect(screen.getByText('TE')).toBeInTheDocument()
  })
})
