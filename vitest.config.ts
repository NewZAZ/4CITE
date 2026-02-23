import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~/': resolve(__dirname, 'inertia') + '/',
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['inertia/__tests__/setup.tsx'],
    include: ['inertia/__tests__/**/*.test.tsx'],
  },
})
