// lib/seo.js — Configuración SEO centralizada. Editar aquí para cambiar todo el SEO.
import { BUSINESS } from './config'

export const SITE_URL = 'https://partycircus.com.mx'

export const SEO = {
  title: 'Party Circus Valle Dorado | Salón de fiestas infantiles en Tlalnepantla',
  titleTemplate: '%s | Party Circus Valle Dorado',
  description:
    'Celebra cumpleaños, graduaciones y eventos familiares en Party Circus Valle Dorado. Salón de fiestas infantiles en Tlalnepantla con paquetes flexibles y cotización por WhatsApp.',
  ogDescription:
    'Cumpleaños, graduaciones y eventos familiares en Valle Dorado, Tlalnepantla. Arma tu paquete y cotiza por WhatsApp.',
  keywords: [
    'Party Circus Valle Dorado',
    'salón de fiestas infantiles Tlalnepantla',
    'salón infantil Valle Dorado',
    'fiestas infantiles Tlalnepantla',
    'graduaciones infantiles Tlalnepantla',
    'eventos familiares Valle Dorado',
    'salón para bautizos Tlalnepantla',
    'salón para confirmaciones Tlalnepantla',
    'salón infantil cerca de Satélite',
    'salón infantil cerca de Mundo E',
    'salón de fiestas Naucalpan',
    'salón infantil Atizapán',
  ],
  locale: 'es_MX',
  ogImage: '/images/party-circus/seo/og-party-circus-valle-dorado.jpg',
  twitterImage: '/images/party-circus/seo/twitter-party-circus-valle-dorado.jpg',
}

export const NEARBY_ZONES = [
  'Valle Dorado',
  'Tlalnepantla',
  'Satélite',
  'Mundo E',
  'Arboledas',
  'Naucalpan',
  'Atizapán',
  'Lomas Verdes',
]

/* ─── JSON-LD builders ──────────────────────────────────────────────────── */

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EventVenue',
    '@id': `${SITE_URL}/#business`,
    name: BUSINESS.name,
    description:
      'Salón de fiestas infantiles y eventos sociales en Valle Dorado, Tlalnepantla, Estado de México. Cumpleaños, graduaciones, bautizos, confirmaciones y reuniones familiares.',
    url: SITE_URL,
    image: `${SITE_URL}${SEO.ogImage}`,
    logo: `${SITE_URL}/images/party-circus/logo/party-circus-logo-circular.png`,
    telephone: BUSINESS.phoneTel,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Blvd. de las Naciones 118, planta alta',
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.state,
      postalCode: BUSINESS.zip,
      addressCountry: BUSINESS.country,
    },
    areaServed: NEARBY_ZONES.map((z) => ({
      '@type': 'Place',
      name: z,
    })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '09:00',
        closes: '21:00',
      },
    ],
    sameAs: [BUSINESS.social.facebook, BUSINESS.social.instagram, BUSINESS.social.tiktok].filter(Boolean),
    // NOTA: aggregateRating se puede activar verificando manualmente que los números siguen vigentes en Google.
    // aggregateRating: {
    //   '@type': 'AggregateRating',
    //   ratingValue: BUSINESS.socialProof.googleRating,
    //   reviewCount: BUSINESS.socialProof.googleReviews,
    // },
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BUSINESS.name,
    inLanguage: 'es-MX',
    publisher: { '@id': `${SITE_URL}/#business` },
  }
}

export function faqSchema(faqList) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#faq`,
    mainEntity: faqList.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}
