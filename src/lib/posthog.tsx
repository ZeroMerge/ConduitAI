'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from '@posthog/react'
import { useEffect, ReactNode } from 'react'

if (typeof window !== 'undefined') {
  if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
      capture_pageview: false, // Disable automatic pageview capture
    })
  }
}

export function PostHogProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Track pageviews
    const handleRouteChange = () => posthog.capture('$pageview')
    handleRouteChange()
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}
