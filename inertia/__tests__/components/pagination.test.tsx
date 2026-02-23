import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Pagination from '~/components/pagination'

describe('Pagination Component', () => {
  it('renders nothing when only one page', () => {
    const { container } = render(
      <Pagination
        meta={{ total: 5, perPage: 10, currentPage: 1, lastPage: 1, firstPage: 1 }}
        baseUrl="/hotels"
      />
    )
    expect(container.innerHTML).toBe('')
  })

  it('renders pagination when multiple pages', () => {
    render(
      <Pagination
        meta={{ total: 25, perPage: 10, currentPage: 1, lastPage: 3, firstPage: 1 }}
        baseUrl="/hotels"
      />
    )
    // Text is split across spans: "Page <span>1</span> of <span>3</span> <span>(25 results)</span>"
    expect(screen.getByText('1', { selector: 'span' })).toBeInTheDocument()
    expect(screen.getByText('3', { selector: 'span' })).toBeInTheDocument()
    expect(screen.getByText('(25 results)')).toBeInTheDocument()
  })

  it('renders page numbers', () => {
    render(
      <Pagination
        meta={{ total: 25, perPage: 10, currentPage: 1, lastPage: 3, firstPage: 1 }}
        baseUrl="/hotels"
      />
    )
    // Page number links
    expect(screen.getByRole('link', { name: '1' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '2' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '3' })).toBeInTheDocument()
  })

  it('shows Next button when not on last page', () => {
    render(
      <Pagination
        meta={{ total: 25, perPage: 10, currentPage: 1, lastPage: 3, firstPage: 1 }}
        baseUrl="/hotels"
      />
    )
    expect(screen.getByText('Next')).toBeInTheDocument()
    expect(screen.queryByText('Previous')).not.toBeInTheDocument()
  })

  it('shows Previous button when not on first page', () => {
    render(
      <Pagination
        meta={{ total: 25, perPage: 10, currentPage: 2, lastPage: 3, firstPage: 1 }}
        baseUrl="/hotels"
      />
    )
    expect(screen.getByText('Previous')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
  })

  it('hides Next button on last page', () => {
    render(
      <Pagination
        meta={{ total: 25, perPage: 10, currentPage: 3, lastPage: 3, firstPage: 1 }}
        baseUrl="/hotels"
      />
    )
    expect(screen.queryByText('Next')).not.toBeInTheDocument()
    expect(screen.getByText('Previous')).toBeInTheDocument()
  })

  it('includes query params in page links', () => {
    render(
      <Pagination
        meta={{ total: 25, perPage: 10, currentPage: 1, lastPage: 3, firstPage: 1 }}
        baseUrl="/hotels"
        queryParams={{ search: 'paris' }}
      />
    )
    const nextLink = screen.getByText('Next')
    expect(nextLink.getAttribute('href')).toContain('search=paris')
  })
})
