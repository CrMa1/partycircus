import './globals.css'
import { Inter, Baloo_2 } from 'next/font/google'
import { BUSINESS, FAQ } from '@/lib/config'
import { SEO, SITE_URL, localBusinessSchema, websiteSchema, faqSchema } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const baloo = Baloo_2({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700', '800'],
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO.title,
    template: SEO.titleTemplate,
  },
  description: SEO.description,
  keywords: SEO.keywords,
  applicationName: BUSINESS.name,
  authors: [{ name: BUSINESS.name }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  category: 'Salón de fiestas infantiles',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: SEO.locale,
    url: SITE_URL,
    siteName: BUSINESS.name,
    title: SEO.title,
    description: SEO.ogDescription,
    images: [
      {
        url: SEO.ogImage,
        width: 1200,
        height: 630,
        alt: 'Party Circus Valle Dorado — Salón de fiestas infantiles en Tlalnepantla',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.title,
    description: SEO.ogDescription,
    images: [SEO.twitterImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
}

export const viewport = {
  themeColor: '#D62828',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="es-MX" className={`${inter.variable} ${baloo.variable}`}>
      <body>
        <JsonLd data={localBusinessSchema()} />
        <JsonLd data={websiteSchema()} />
        <JsonLd data={faqSchema(FAQ)} />
        {children}
      </body>
    </html>
  )
}
