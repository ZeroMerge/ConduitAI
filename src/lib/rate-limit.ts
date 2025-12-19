/**
 * Rate limiting using a simple in-memory store
 * For production, use Redis with @upstash/ratelimit
 */

interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

// Simple in-memory rate limiter
const ratelimitMap = new Map<string, { count: number; resetTime: number }>()

export async function rateLimit(
  identifier: string,
  options: { limit?: number; window?: number } = {}
): Promise<RateLimitResult> {
  const limit = options.limit ?? 10 // requests per window
  const window = options.window ?? 60000 // 60 seconds in milliseconds

  const now = Date.now()
  const record = ratelimitMap.get(identifier)

  // Clean up old entries
  if (record && now > record.resetTime) {
    ratelimitMap.delete(identifier)
  }

  const currentRecord = ratelimitMap.get(identifier)

  if (!currentRecord) {
    // First request
    ratelimitMap.set(identifier, {
      count: 1,
      resetTime: now + window,
    })

    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: now + window,
    }
  }

  if (currentRecord.count >= limit) {
    // Rate limit exceeded
    return {
      success: false,
      limit,
      remaining: 0,
      reset: currentRecord.resetTime,
    }
  }

  // Increment counter
  currentRecord.count++
  ratelimitMap.set(identifier, currentRecord)

  return {
    success: true,
    limit,
    remaining: limit - currentRecord.count,
    reset: currentRecord.resetTime,
  }
}
