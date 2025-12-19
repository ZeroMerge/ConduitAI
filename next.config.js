const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Image optimization
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Environment variables available to the browser
  env: {
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  },
}

// Only use Sentry if configured
let config = withBundleAnalyzer(nextConfig)

if (process.env.SENTRY_AUTH_TOKEN) {
  const { withSentryConfig } = require('@sentry/nextjs')
  const sentryWebpackPluginOptions = {
    silent: true,
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
    authToken: process.env.SENTRY_AUTH_TOKEN,
  }
  config = withSentryConfig(config, sentryWebpackPluginOptions)
}

module.exports = config
