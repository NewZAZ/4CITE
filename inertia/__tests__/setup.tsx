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
  }),
  router: mockRouter,
}))

// Export for test files to configure
export { mockUsePage, mockRouter }
