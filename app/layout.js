import { Open_Sans } from 'next/font/google'
import { PHProvider } from './providers'
import './globals.css'

const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'Iliad Translations',
  description: 'A site dedicated to Iliad translations.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta property="og:image" content='https://iliadtranslations.com/opengraph-image.png' />
        <meta name="twitter:image" content="https://iliadtranslations.com/opengraph-image.png" />
      </head>
      <PHProvider>
        <body className={`${openSans.className} text-lg py-5`}>{children}</body>
      </PHProvider>
    </html>
  )
}
