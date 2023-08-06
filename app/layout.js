import { Open_Sans } from 'next/font/google'
import { PHProvider, PostHogPageview } from './providers'
import { Suspense } from 'react'
import './globals.css'

const openSans = Open_Sans({ subsets: ['latin'] })

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
        <body className={`${openSans.className} container`}>{children}</body>
      </PHProvider>
    </html>
  )
}
