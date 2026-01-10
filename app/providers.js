'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from '@posthog/react'

export function PHProvider({ children }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
