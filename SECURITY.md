# Security Documentation

This document outlines the security features and best practices implemented in ConduitAI.

## Security Features

### 1. Content Security Policy (CSP)

CSP headers are configured in `vercel.json` to prevent XSS attacks:

- `default-src 'self'`: Only allow resources from the same origin
- `script-src`: Allow scripts from trusted sources only
- `style-src`: Control CSS sources
- `img-src`: Control image sources
- `frame-ancestors 'none'`: Prevent clickjacking

### 2. Rate Limiting

API rate limiting is implemented in `src/middleware.ts`:

- Default: 10 requests per 60 seconds per IP
- Returns `429 Too Many Requests` when exceeded
- Rate limit headers included in response

For production with multiple servers, use Redis-based rate limiting:

```typescript
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'),
})
```

### 3. SQL Injection Prevention

Prisma ORM is used for all database queries, which automatically prevents SQL injection by using parameterized queries.

**DO:**
```typescript
await prisma.user.findUnique({
  where: { email: userInput }
})
```

**DON'T:**
```typescript
await prisma.$queryRaw`SELECT * FROM User WHERE email = ${userInput}`
```

### 4. Input Validation

Always validate and sanitize user input:

```typescript
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
})

const result = schema.safeParse(input)
if (!result.success) {
  return new Response('Invalid input', { status: 400 })
}
```

### 5. Environment Variables

- Never commit `.env` files
- Use `.env.example` for documentation
- Rotate secrets regularly
- Use different secrets for different environments

### 6. Error Handling

Sentry is configured to track errors without exposing sensitive information:

```typescript
import * as Sentry from '@sentry/nextjs'

try {
  // Your code
} catch (error) {
  Sentry.captureException(error)
  // Don't expose error details to users
  return new Response('An error occurred', { status: 500 })
}
```

### 7. HTTPS Only

- Vercel enforces HTTPS automatically
- `Strict-Transport-Security` header configured
- No mixed content warnings

### 8. Authentication Best Practices

When implementing authentication:

- Use secure session management
- Implement CSRF protection
- Use secure, httpOnly cookies
- Implement proper password hashing (bcrypt, argon2)
- Add MFA support

## Security Checklist

Before deploying to production:

- [ ] All environment variables are set securely
- [ ] CSP headers are configured
- [ ] Rate limiting is enabled
- [ ] SQL injection prevention is in place
- [ ] Input validation is implemented
- [ ] Error tracking is configured
- [ ] HTTPS is enforced
- [ ] Authentication is secure
- [ ] Dependencies are up to date (run `npm audit`)
- [ ] Secrets are rotated
- [ ] Access logs are enabled
- [ ] Monitoring and alerts are configured

## Reporting Security Issues

If you discover a security vulnerability, please email security@conduitai.com instead of using the issue tracker.

## Regular Security Tasks

### Weekly
- Review Dependabot alerts
- Check Sentry for unusual errors

### Monthly
- Run `npm audit`
- Review and rotate API keys
- Check rate limiting effectiveness

### Quarterly
- Security audit of codebase
- Review and update security policies
- Penetration testing (if applicable)
