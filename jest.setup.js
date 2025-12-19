// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Polyfill for Next.js API routes
import { TextEncoder, TextDecoder } from 'util'
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Mock Next.js router
jest.mock('next/router', () => require('next-router-mock'))

// Setup MSW if available
try {
  const { server } = require('./src/mocks/server')
  beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())
} catch (e) {
  // MSW not available, skip
}
