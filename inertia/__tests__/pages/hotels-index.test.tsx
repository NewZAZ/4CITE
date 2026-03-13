import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { mockUsePage, mockRouter } from '../setup'
import HotelsIndex from '~/pages/hotels/index'

const emptyHotels = {
  data: [],
  meta: { total: 0, perPage: 10, currentPage: 1, lastPage: 1, firstPage: 1 },
}

const sampleHotels = {
  data: [
    {
      id: 1,
      name: 'Grand Hotel',
      location: 'Paris',
      description: 'A nice hotel',
      pictureList: null,
      createdAt: '2025-01-01',
    },
    {
      id: 2,
      name: 'Beach Resort',
      location: 'Nice',
      description: 'By the sea',
      pictureList: null,
      createdAt: '2025-01-02',
    },
  ],
  meta: { total: 2, perPage: 10, currentPage: 1, lastPage: 1, firstPage: 1 },
}

const defaultFilters = { sort: '', order: '', search: '', limit: 10 }

describe('Hotels Index Page', () => {
  it('renders hotels heading', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    render(<HotelsIndex hotels={sampleHotels} filters={defaultFilters} />)
    expect(screen.getByRole('heading', { name: 'Hotels' })).toBeInTheDocument()
  })

  it('renders hotel list', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    render(<HotelsIndex hotels={sampleHotels} filters={defaultFilters} />)
    expect(screen.getByText('Grand Hotel')).toBeInTheDocument()
    expect(screen.getByText('Beach Resort')).toBeInTheDocument()
  })

  it('shows empty state when no hotels', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    render(<HotelsIndex hotels={emptyHotels} filters={defaultFilters} />)
    expect(screen.getByText('No hotels found')).toBeInTheDocument()
  })

  it('shows Add Hotel button for admin', () => {
    mockUsePage.mockReturnValue({
      props: {
        user: { id: 1, pseudo: 'Admin', email: 'admin@test.com', role: 'admin' },
        flash: {},
      },
    })
    render(<HotelsIndex hotels={sampleHotels} filters={defaultFilters} />)
    const addHotelLinks = screen.getAllByText('Add Hotel')
    expect(addHotelLinks.length).toBeGreaterThanOrEqual(1)
  })

  it('hides Add Hotel button for regular user', () => {
    mockUsePage.mockReturnValue({
      props: { user: { id: 1, pseudo: 'User', email: 'user@test.com', role: 'user' }, flash: {} },
    })
    render(<HotelsIndex hotels={sampleHotels} filters={defaultFilters} />)
    const addHotelLinks = screen.queryAllByText('Add Hotel')
    expect(addHotelLinks.length).toBe(0)
  })

  it('renders search input', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    render(<HotelsIndex hotels={sampleHotels} filters={defaultFilters} />)
    expect(screen.getByPlaceholderText('Search by name or location...')).toBeInTheDocument()
  })

  it('renders sortable column headers', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    render(<HotelsIndex hotels={sampleHotels} filters={defaultFilters} />)
    expect(screen.getByText(/Name/)).toBeInTheDocument()
    expect(screen.getByText(/Location/)).toBeInTheDocument()
    expect(screen.getByText(/Date/)).toBeInTheDocument()
  })

  it('submits search form', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    render(<HotelsIndex hotels={sampleHotels} filters={defaultFilters} />)
    const searchInput = screen.getByPlaceholderText('Search by name or location...')
    fireEvent.change(searchInput, { target: { value: 'Paris' } })
    const searchButton = screen.getByRole('button', { name: 'Search' })
    fireEvent.click(searchButton)
    expect(mockRouter.get).toHaveBeenCalledWith(
      '/hotels',
      { search: 'Paris', sort: '', order: '' },
      { preserveState: true }
    )
  })

  it('clicking sort button calls router.get', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    render(<HotelsIndex hotels={sampleHotels} filters={defaultFilters} />)
    const nameSort = screen.getByRole('button', { name: /Name/ })
    fireEvent.click(nameSort)
    expect(mockRouter.get).toHaveBeenCalledWith(
      '/hotels',
      { sort: 'name', order: 'asc', search: '' },
      { preserveState: true }
    )
  })

  it('toggles sort order when clicking same column', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    const sortedFilters = { sort: 'name', order: 'asc', search: '', limit: 10 }
    render(<HotelsIndex hotels={sampleHotels} filters={sortedFilters} />)
    const nameSort = screen.getByRole('button', { name: /Name/ })
    fireEvent.click(nameSort)
    expect(mockRouter.get).toHaveBeenCalledWith(
      '/hotels',
      { sort: 'name', order: 'desc', search: '' },
      { preserveState: true }
    )
  })

  it('renders hotel with picture', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    const hotelsWithPics = {
      ...sampleHotels,
      data: [
        { ...sampleHotels.data[0], pictureList: ['https://example.com/img.jpg'] },
        sampleHotels.data[1],
      ],
    }
    render(<HotelsIndex hotels={hotelsWithPics} filters={defaultFilters} />)
    const img = screen.getByAltText('Grand Hotel')
    expect(img).toBeInTheDocument()
  })

  it('shows search message in empty state when searching', () => {
    mockUsePage.mockReturnValue({ props: { user: null, flash: {} } })
    render(
      <HotelsIndex hotels={emptyHotels} filters={{ ...defaultFilters, search: 'nonexistent' }} />
    )
    expect(screen.getByText(/No results for "nonexistent"/)).toBeInTheDocument()
  })
})
