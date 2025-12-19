import { ReactNode } from 'react'
import { PostHogProvider } from '@/lib/posthog'
import './globals.css'

export const metadata = {
  title: 'ConduitAI - Automation Co-pilot',
  description: 'AI co-pilot that allows freelancers to describe workflows in plain English',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  )
}
