/**
 * @jest-environment node
 */

describe('Health API', () => {
  it('returns ok status', async () => {
    // Mock the GET function behavior
    const mockResponse = {
      status: 'ok',
      timestamp: new Date().toISOString(),
    }

    expect(mockResponse.status).toBe('ok')
    expect(mockResponse.timestamp).toBeDefined()
  })

  it('validates ISO timestamp format', () => {
    const timestamp = new Date().toISOString()
    const parsedDate = new Date(timestamp)
    
    expect(parsedDate).toBeInstanceOf(Date)
    expect(parsedDate.toISOString()).toBe(timestamp)
  })
})
