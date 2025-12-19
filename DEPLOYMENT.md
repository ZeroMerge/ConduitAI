# Deployment Guide

This document describes how to deploy ConduitAI to production.

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- Vercel account (for hosting)
- Sentry account (for error tracking)
- PostHog account (for analytics)

## Environment Variables

Copy `.env.example` to `.env` and fill in the required values:

```bash
cp .env.example .env
```

### Required Variables

- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: Random string for session encryption
- `NEXT_PUBLIC_SENTRY_DSN`: Sentry DSN for error tracking
- `NEXT_PUBLIC_POSTHOG_KEY`: PostHog API key for analytics

## Vercel Deployment

### Initial Setup

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Link your project:
```bash
vercel link
```

3. Add environment variables:
```bash
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
vercel env add NEXT_PUBLIC_SENTRY_DSN
vercel env add NEXT_PUBLIC_POSTHOG_KEY
```

### Deploy to Production

```bash
vercel --prod
```

### Deploy Preview (Automatic on PR)

Preview deployments are automatically created when you open a pull request, thanks to the GitHub Actions workflow in `.github/workflows/preview.yml`.

## Database Setup

1. Run Prisma migrations:
```bash
npx prisma migrate deploy
```

2. Generate Prisma client:
```bash
npx prisma generate
```

## Post-Deployment

### Monitoring Setup

1. **Sentry**: Configure alerts in Sentry dashboard
2. **PostHog**: Set up dashboards for key metrics
3. **Vercel**: Enable Vercel Analytics and Speed Insights

### Security Checklist

- [ ] CSP headers configured (see `vercel.json`)
- [ ] Rate limiting enabled (see `src/middleware.ts`)
- [ ] Environment variables set securely
- [ ] Database connection pooling enabled
- [ ] HTTPS enforced

## Performance Optimization

### Bundle Analysis

Run the bundle analyzer:
```bash
npm run analyze
```

This will generate a report showing the size of your JavaScript bundles.

### Image Optimization

Images are automatically optimized by Next.js. Make sure to use the `next/image` component:

```tsx
import Image from 'next/image'

<Image src="/image.jpg" alt="Description" width={500} height={300} />
```

## Troubleshooting

### Build Failures

Check the GitHub Actions logs or Vercel build logs for errors.

### Database Connection Issues

Ensure your `DATABASE_URL` is correct and the database is accessible from Vercel's servers.

### Rate Limiting Not Working

For production, consider using Redis with Upstash for distributed rate limiting. See `src/lib/rate-limit.ts` for implementation notes.
