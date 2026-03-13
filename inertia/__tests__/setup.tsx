import '@testing-library/jest-dom/vitest'

// Mock @inertiajs/react
const mockUsePage = vi.fn()
const mockRouter = {
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
  visit: vi.fn(),
}

// Allow tests to override useForm return values (errors, processing)
const mockUseFormOverrides: Record<string, any> = {}

vi.mock('@inertiajs/react', () => ({
  Head: ({ title }: { title: string }) => <title>{title}</title>,
  Link: ({ href, children, className, method, as, onClick, ...rest }: any) => (
    <a href={href} className={className} onClick={onClick} data-method={method} {...rest}>
      {children}
    </a>
  ),
  usePage: mockUsePage,
  useForm: (initial: any) => ({
    data: initial,
    setData: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    processing: false,
    errors: {},
    reset: vi.fn(),
    ...mockUseFormOverrides,
  }),
  router: mockRouter,
}))

// Export for test files to configure
export { mockUsePage, mockRouter, mockUseFormOverrides }
