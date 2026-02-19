import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Suulp - Hotel CMS, CRM & AI Support Platform',
  description: 'Suulp: Advanced SaaS platform for hotels offering CMS, CRM, and AI-powered voice support agents. Streamline your hotel operations with cutting-edge technology.',
  keywords: 'hotel CMS, hotel CRM, AI support, voice agents, hotel management, hospitality software',
  authors: [{ name: 'Suulp' }],
  creator: 'Suulp',
  publisher: 'Suulp',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://suulp.com',
    siteName: 'Suulp',
    title: 'Suulp - Hotel Management Platform',
    description: 'Advanced CMS, CRM, and AI support agents for modern hotels',
    images: [
      {
        url: 'https://suulp.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Suulp Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Suulp - Hotel Management Platform',
    description: 'CMS, CRM, and AI support for hotels',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#d4af37',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased overflow-x-hidden bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
