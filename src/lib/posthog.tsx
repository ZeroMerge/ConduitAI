'use client'

import posthog from 'posthog-js'
import { useEffect, ReactNode } from 'react'

if (typeof window !== 'undefined') {
  if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
      capture_pageview: false, // Disable automatic pageview capture
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') posthog.debug()
      },
    })
  }
}

export function PostHogProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Track pageviews
    const handleRouteChange = () => {
      if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
        posthog.capture('$pageview')
      }
    }
    handleRouteChange()
  }, [])

  return <>{children}</>
}
