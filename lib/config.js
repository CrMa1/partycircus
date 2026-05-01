// lib/config.js — Datos del negocio. Editar aquí para personalizar la landing.

export const BUSINESS = {
  name: 'Party Circus Valle Dorado',
  shortName: 'Party Circus',
  tagline: 'Salón de fiestas infantiles en Valle Dorado, Tlalnepantla',
  description:
    'Cumpleaños, graduaciones y eventos sociales en un espacio colorido, divertido y familiar en Valle Dorado, Tlalnepantla.',

  phone: '55 2718 7435',
  phoneTel: '+525527187435',
  whatsapp: '5215527187435',
  whatsappDisplay: '+52 1 55 2718 7435',
  whatsappMessage:
    'Hola Party Circus, me gustaría recibir información sobre sus paquetes y disponibilidad.',
  email: 'contacto@partycircus.com.mx',
  website: 'https://partycircus.com.mx',

  address: 'Blvd. de las Naciones 118, planta alta, Col. Valle Dorado',
  addressFull:
    'Blvd. de las Naciones 118, planta alta, Col. Valle Dorado, Tlalnepantla, Estado de México, C.P. 54020',
  city: 'Tlalnepantla',
  zone: 'Valle Dorado',
  state: 'Estado de México',
  zip: '54020',
  country: 'MX',
  mapsEmbed:
    'https://www.google.com/maps?q=Blvd.+de+las+Naciones+118,+Valle+Dorado,+Tlalnepantla&output=embed',
  mapsLink:
    'https://www.google.com/maps/search/?api=1&query=Blvd.+de+las+Naciones+118+Valle+Dorado+Tlalnepantla',

  hours: [
    { days: 'Lunes a domingo', hours: '9:00 a.m. – 9:00 p.m.' },
  ],
  hoursShort: 'Lun – Dom · 9:00 a 21:00',

  social: {
    facebook: 'https://www.facebook.com/party.circusvd',
    instagram: 'https://www.instagram.com/party.circusvd/',
    tiktok: 'https://www.tiktok.com/@partycircusvd',
  },

  socialProof: {
    googleRating: 4.1,
    googleReviews: 189,
    facebookRecommend: 84,
  },

  seoTitle:
    'Party Circus Valle Dorado — Salón de fiestas infantiles en Tlalnepantla',
  seoDescription:
    'Salón de fiestas infantiles en Valle Dorado, Tlalnepantla. Cumpleaños, graduaciones y eventos sociales. Cotiza por WhatsApp al 55 2718 7435.',
}

export const NAV_LINKS = [
  { label: 'Inicio', href: '#home' },
  { label: 'Paquetes', href: '#paquetes' },
  { label: 'Ludoteca', href: '#ludoteca' },
  { label: 'Graduaciones', href: '#graduaciones' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Ubicación', href: '#ubicacion' },
  { label: 'FAQ', href: '#faq' },
]

export const BENEFITS = [
  { icon: 'PartyPopper', title: 'Paquetes flexibles', text: 'Salón, Party y Circus para cada tipo de evento.' },
  { icon: 'CalendarDays', title: 'Lunes a domingo', text: 'Atención todos los días de 9 a 21 horas.' },
  { icon: 'MapPin', title: 'Valle Dorado', text: 'Ubicación céntrica en Tlalnepantla, fácil acceso.' },
  { icon: 'MessageCircle', title: 'Cotiza por WhatsApp', text: 'Respuesta rápida y trato personalizado.' },
]

// Todos los paquetes comparten la misma duración base.
// Si en el futuro varía, hacer override por paquete.
export const PACKAGE_DURATION = '5 hrs de evento'
export const PACKAGE_DURATION_NOTE = '+ 30 min entrada / 30 min salida'

export const PACKAGES = [
  {
    id: 'salon',
    name: 'Salón',
    duration: PACKAGE_DURATION,
    durationNote: PACKAGE_DURATION_NOTE,
    image: '/images/party-circus/paquetes/paquete-salon-party-circus.webp',
    imagePosition: 'center 40%',
    accent: 'secondary',
    highlight:
      'Ideal para reuniones familiares y eventos íntimos con acceso al área de juegos y servicios esenciales para tu celebración.',
    includes: [
      '5 hrs de evento',
      'Acceso a juegos: laberinto, alberca de pelotas, tobogán y cama elástica',
      'Mesas y sillas',
      'Bocina, micrófono y música',
      'Invitación digital',
      'Staff y coordinador',
      'Animación de piñata y pastel',
    ],
    fullIncludes: [
      '5 hrs de evento',
      '30 min de entrada y 30 min de salida',
      'Acceso a juegos: laberinto, alberca de pelotas, tobogán, cama elástica y más',
      'Mesas y sillas',
      'Bocina',
      'Micrófono',
      'Música',
      'Futbolitos',
      'Invitación digital',
      '2 personas de staff y un coordinador',
      'Animación de piñata',
      'Animación de pastel',
      'Higiene y limpieza antes y durante el evento',
    ],
  },
  {
    id: 'party',
    name: 'Party',
    duration: PACKAGE_DURATION,
    durationNote: PACKAGE_DURATION_NOTE,
    image: '/images/party-circus/paquetes/paquete-party-party-circus.webp',
    imagePosition: '85% 35%',
    accent: 'primary',
    highlight:
      'Ideal para cumpleaños y eventos familiares con alimentos, bebidas y actividades para una celebración más completa.',
    includes: [
      '5 hrs de evento',
      'Acceso a los juegos',
      'Taquiza de guisados y menú infantil',
      '20 L de agua de sabor',
      'Hielo ilimitado',
      '1 hr de pinta caritas',
      '3 personas de staff',
    ],
    fullIncludes: [
      '5 hrs de evento',
      '30 min de entrada y 30 min de salida',
      'Acceso a los juegos',
      'Comida: taquiza de guisados y menú infantil para los pequeños',
      'Música',
      'Micrófono',
      'Bocina',
      'Futbolitos',
      'Mesas y sillas',
      'Invitación digital',
      '20 L de agua de sabor',
      'Desechables para agua y comida: vasos, platos y servilletas',
      '3 personas de staff',
      'Hielo ilimitado',
      '1 hr de pinta caritas',
      'Animación de pastel',
      'Piñata sin dulces y animación',
      'Higiene y limpieza antes y durante el evento',
    ],
  },
  {
    id: 'circus',
    name: 'Circus',
    duration: PACKAGE_DURATION,
    durationNote: PACKAGE_DURATION_NOTE,
    image: '/images/party-circus/paquetes/paquete-circus-party-circus.webp',
    imagePosition: '85% 30%',
    accent: 'accent',
    highlight:
      'La experiencia más completa para celebraciones grandes, con alimentos, bebidas, show, decoración y servicios adicionales.',
    includes: [
      '5 hrs de evento',
      'Inflable 3 m × 3 m',
      'Taquiza o parrillada y menú infantil',
      'Refresco ilimitado y 40 L de agua',
      'Show con botarga o personaje',
      'Mesa de dulces',
      'Decoración tematizada',
      'Pastel, piñata y regalos',
    ],
    fullIncludes: [
      '5 hrs de evento',
      '30 min de entrada y 30 min de salida',
      'Inflable 3 m × 3 m',
      'Acceso a los juegos',
      'Comida: taquiza de guisados o parrillada y menú infantil',
      'Mesas y sillas',
      'Futbolitos',
      'Música',
      'Micrófono',
      'Bocina',
      'Desechables para agua, comida y pastel',
      'Refresco ilimitado',
      'Invitación digital',
      '40 L de agua de sabor',
      '1 hr de show, juegos y dinámicas con botarga o personaje',
      '10 regalos',
      '1 hr de pinta caritas',
      'Mesa de dulces',
      '3 personas de staff',
      'Hielo ilimitado',
      'Botana ilimitada al centro de mesas',
      'Decoración tematizada',
      'Piñata con dulces y bolsas',
      'Pastel con decoración sencilla',
      'Higiene y limpieza antes y durante el evento',
    ],
    featured: true,
  },
]

export const SCHEDULES = [
  { id: 'lunjue', label: 'Lunes a jueves y sábado mañana' },
  { id: 'vidofes', label: 'Viernes, domingo y festivos' },
  { id: 'sabtarde', label: 'Sábado tarde' },
]

export const PEOPLE_OPTIONS = [50, 60, 70, 80, 90, 100, 110, 120]

export const DIFFERENTIATORS = [
  { icon: 'HeartHandshake', title: 'Atención personalizada', text: 'Te acompañamos desde la cotización hasta el día del evento.' },
  { icon: 'Users', title: 'Ambiente familiar', text: 'Un espacio pensado para que toda la familia disfrute.' },
  { icon: 'Sparkles', title: 'Eventos infantiles y sociales', text: 'Cumpleaños, graduaciones, bautizos y reuniones.' },
  { icon: 'Zap', title: 'Cotización rápida', text: 'Resolvemos tu solicitud por WhatsApp en minutos.' },
]

const GALLERY_ALTS = [
  'Salón de fiestas infantiles Party Circus en Valle Dorado, Tlalnepantla',
  'Área de juegos infantiles en Party Circus Valle Dorado',
  'Cumpleaños infantil celebrado en Party Circus Tlalnepantla',
  'Mesas y montaje para fiesta infantil en Party Circus',
  'Decoración de evento familiar en Party Circus Valle Dorado',
  'Niños jugando en el salón Party Circus Tlalnepantla',
  'Evento social en salón infantil Party Circus',
  'Vista interior de Party Circus Valle Dorado',
]

export const GALLERY = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  src: `/images/party-circus/galeria/evento-party-circus-${i + 1}.webp`,
  alt: GALLERY_ALTS[i] ?? `Evento en Party Circus Valle Dorado — foto ${i + 1}`,
}))

export const GALLERY_VIDEOS = [
  { id: 'v1', src: '/videos/party-circus/galeria-evento-01.mp4', poster: '/images/party-circus/galeria/party-circus-galeria-01.webp' },
  { id: 'v2', src: '/videos/party-circus/galeria-evento-02.mp4', poster: '/images/party-circus/galeria/party-circus-galeria-04.webp' },
  { id: 'v3', src: '/videos/party-circus/galeria-evento-03.mp4', poster: '/images/party-circus/galeria/party-circus-galeria-07.webp' },
]

export const EVENTS_GALLERY = [
  { src: '/images/party-circus/graduaciones/graduacion-party-circus-1.webp', alt: 'Graduación infantil celebrada en Party Circus Valle Dorado' },
  { src: '/images/party-circus/graduaciones/graduacion-party-circus-2.webp', alt: 'Salón para graduaciones infantiles en Tlalnepantla' },
  { src: '/images/party-circus/graduaciones/bautizo-party-circus-1.webp', alt: 'Salón para bautizos en Valle Dorado, Tlalnepantla' },
  { src: '/images/party-circus/graduaciones/confirmacion-party-circus-1.webp', alt: 'Salón para confirmaciones en Tlalnepantla' },
  { src: '/images/party-circus/graduaciones/evento-social-party-circus-1.webp', alt: 'Evento social familiar en Party Circus Valle Dorado' },
]

export const FAQ = [
  {
    q: '¿Dónde está Party Circus Valle Dorado?',
    a: 'Estamos en Blvd. de las Naciones 118, planta alta, Col. Valle Dorado, Tlalnepantla, Estado de México, C.P. 54020.',
  },
  {
    q: '¿Party Circus está cerca de Satélite o Mundo E?',
    a: 'Sí. Por nuestra ubicación en Valle Dorado, somos una opción práctica para familias de Tlalnepantla, Satélite, Mundo E, Arboledas, Naucalpan y Atizapán.',
  },
  {
    q: '¿Cómo puedo cotizar mi evento?',
    a: 'Usa el cotizador de la sección Paquetes o escríbenos directamente por WhatsApp. Te respondemos con disponibilidad y precio final en minutos.',
  },
  {
    q: '¿La fecha queda apartada desde la landing?',
    a: 'No. La fecha que seleccionas en el cotizador es solo una fecha deseada. La disponibilidad, precio final y apartado se confirman únicamente por WhatsApp con un asesor.',
  },
  {
    q: '¿Qué incluye cada paquete?',
    a: 'Cada paquete incluye 5 hrs de evento, más 30 min de entrada y 30 min de salida. El Paquete Salón incluye acceso a juegos y servicios esenciales; Paquete Party agrega alimentos, bebidas y pinta caritas; Paquete Circus es la opción más completa con inflable, show, decoración, mesa de dulces, pastel, piñata y más. Los detalles finales se confirman por WhatsApp.',
  },
  {
    q: '¿Los paquetes incluyen alimentos y bebidas?',
    a: 'Paquete Party y Paquete Circus incluyen alimentos y bebidas según el paquete seleccionado. Paquete Salón incluye servicios esenciales del espacio. La disponibilidad y detalles finales se confirman por WhatsApp.',
  },
  {
    q: '¿Tienen ludoteca entre semana?',
    a: 'Sí. La ludoteca de Party Circus está disponible de lunes a jueves de 10:00 a.m. a 6:00 p.m. en Valle Dorado, Tlalnepantla. Los costos, disponibilidad y detalles se confirman por WhatsApp.',
  },
  {
    q: '¿Atienden graduaciones y eventos sociales?',
    a: 'Sí. Recibimos graduaciones, bautizos, confirmaciones y reuniones familiares en Tlalnepantla. Para estos eventos usamos los mismos paquetes del salón, adaptados a tu celebración.',
  },
  {
    q: '¿Cuál es el horario de atención?',
    a: 'Atendemos de lunes a domingo, de 9:00 a.m. a 9:00 p.m.',
  },
  {
    q: '¿Cómo me comunico con ustedes?',
    a: 'Por WhatsApp al +52 1 55 2718 7435 o por teléfono al 55 2718 7435. También puedes escribirnos por nuestras redes sociales en Facebook, Instagram y TikTok.',
  },
]
