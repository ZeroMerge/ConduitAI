import { rateLimit } from '@/lib/rate-limit'

describe('Rate Limiting', () => {
  it('allows requests within limit', async () => {
    const identifier = 'test-user-1'
    const result = await rateLimit(identifier, { limit: 5, window: 60000 })

    expect(result.success).toBe(true)
    expect(result.limit).toBe(5)
    expect(result.remaining).toBe(4)
  })

  it('blocks requests exceeding limit', async () => {
    const identifier = 'test-user-2'
    
    // Make 5 requests (at limit)
    for (let i = 0; i < 5; i++) {
      await rateLimit(identifier, { limit: 5, window: 60000 })
    }

    // 6th request should fail
    const result = await rateLimit(identifier, { limit: 5, window: 60000 })
    expect(result.success).toBe(false)
    expect(result.remaining).toBe(0)
  })

  it('resets after window expires', async () => {
    const identifier = 'test-user-3'
    
    // Use a very short window for testing
    const result1 = await rateLimit(identifier, { limit: 2, window: 10 })
    expect(result1.success).toBe(true)

    // Wait for window to expire
    await new Promise(resolve => setTimeout(resolve, 20))

    // Should allow request again
    const result2 = await rateLimit(identifier, { limit: 2, window: 60000 })
    expect(result2.success).toBe(true)
    expect(result2.remaining).toBe(1)
  })
})
