import { GET } from '@/app/api/health/route'

describe('Health API', () => {
  it('returns ok status', async () => {
    const response = await GET()
    const data = await response.json()

    expect(data.status).toBe('ok')
    expect(data.timestamp).toBeDefined()
    expect(response.status).toBe(200)
  })

  it('returns ISO timestamp', async () => {
    const response = await GET()
    const data = await response.json()

    const timestamp = new Date(data.timestamp)
    expect(timestamp).toBeInstanceOf(Date)
    expect(timestamp.toISOString()).toBe(data.timestamp)
  })
})
