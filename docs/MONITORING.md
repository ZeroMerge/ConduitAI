# Monitoring Setup

## Overview

ConduitAI includes monitoring setup for error tracking and analytics.

## PostHog Analytics

PostHog is configured for product analytics and feature flags.

### Setup

1. Sign up at https://posthog.com
2. Get your API key
3. Add to your environment:

```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_your_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### Features

- Automatic pageview tracking
- User identification
- Feature flags
- Session recording
- Event tracking

## Sentry Error Tracking (Optional)

Sentry can be added for error tracking and performance monitoring.

### Setup

1. Install Sentry:

```bash
npm install @sentry/nextjs
```

2. Create Sentry configuration files as shown in the main documentation

3. Add environment variables

4. Update `next.config.js` to always use Sentry config

See DEPLOYMENT.md for detailed setup instructions.

## Uptime Monitoring

For uptime monitoring, consider using:

- **Vercel Analytics**: Built into Vercel deployments
- **UptimeRobot**: Free tier available
- **Pingdom**: Enterprise solution

## Best Practices

1. **Error Tracking**: Always catch and log errors appropriately
2. **Privacy**: Respect user privacy, mask sensitive data
3. **Performance**: Monitor bundle size and loading times
4. **Alerts**: Set up alerts for critical errors
5. **Retention**: Configure data retention policies
