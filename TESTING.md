# Testing Guide

This document describes the testing setup for ConduitAI.

## Test Stack

- **Jest**: Test runner
- **React Testing Library**: Component testing
- **MSW (Mock Service Worker)**: API mocking

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Run tests with coverage
```bash
npm run test:coverage
```

## Writing Tests

### Component Tests

Example test for a React component:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MyComponent from '@/components/MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('handles user interaction', async () => {
    const user = userEvent.setup()
    render(<MyComponent />)
    
    const button = screen.getByRole('button')
    await user.click(button)
    
    expect(screen.getByText('Clicked!')).toBeInTheDocument()
  })
})
```

### API Route Tests

Example test for an API route:

```tsx
import { GET } from '@/app/api/myroute/route'

describe('My API Route', () => {
  it('returns expected data', async () => {
    const response = await GET()
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(data).toEqual({ key: 'value' })
  })
})
```

### Mocking API Calls

Add handlers to `src/mocks/handlers.ts`:

```tsx
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ])
  }),
]
```

### Testing Hooks

Example test for a custom hook:

```tsx
import { renderHook, act } from '@testing-library/react'
import useCounter from '@/hooks/useCounter'

describe('useCounter', () => {
  it('increments counter', () => {
    const { result } = renderHook(() => useCounter())
    
    act(() => {
      result.current.increment()
    })
    
    expect(result.current.count).toBe(1)
  })
})
```

## Test Organization

- Place tests next to the files they test, or in `__tests__` directories
- Use descriptive test names that explain what is being tested
- Group related tests with `describe` blocks
- Keep tests isolated and independent

## Coverage Goals

- Aim for >80% code coverage
- Focus on testing critical paths and edge cases
- Don't aim for 100% coverage at the expense of test quality

## Continuous Integration

Tests are automatically run on every push and pull request via GitHub Actions. See `.github/workflows/ci.yml` for the CI configuration.
