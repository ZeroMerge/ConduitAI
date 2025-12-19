import { http, HttpResponse } from 'msw'

export const handlers = [
  // Mock health check endpoint
  http.get('/api/health', () => {
    return HttpResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
    })
  }),

  // Add more API mocks here as needed
]
