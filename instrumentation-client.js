import posthog from 'posthog-js'

posthog.init('phc_9jsDPJWGw09UKF4jBNCthimBdsAMFws7RXddqXaPEVo', {
  api_host: 'https://us.i.posthog.com',
  ui_host: 'https://us.posthog.com',
  defaults: '2025-11-30',
  disable_session_recording: true,
  autocapture: {
    dom_event_allowlist: ['click'], // only clicks, not change/submit
    element_allowlist: ['a'],       // only <a> tags (filter to external hrefs in PostHog for outbound clicks)
  },
  capture_pageleave: false,
  advanced_disable_flags: true,
});
