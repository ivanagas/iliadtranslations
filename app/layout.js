import { Inter } from 'next/font/google'
import { PHProvider, PostHogPageview } from './providers'
import { Suspense } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Iliad Translations',
  description: 'A site dedicated to Iliad translations.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <Suspense>
        <PostHogPageview />
      </Suspense>
      <PHProvider>
        <body className={inter.className}>{children}</body>
      </PHProvider>
    </html>
  )
}
