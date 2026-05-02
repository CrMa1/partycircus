// lib/promo.js — Configuración del modal promocional.
// Para cambiar la promoción, edita solo este archivo.

export const PROMO_MODAL = {
  enabled: true,
  storageKey: 'pc-promo-2026-04', // cambia esta llave para volver a mostrarlo a usuarios que ya lo cerraron
  badge: 'PROMOCIÓN ESPECIAL',
  title: 'Haz tu evento aún más especial',
  description:
    'Pregunta por nuestras promociones disponibles para fiestas infantiles, graduaciones y eventos familiares en Party Circus. La promoción y disponibilidad se confirman por WhatsApp.',
  // ctaLabel: máximo recomendado 22 caracteres para que el botón no se corte en mobile <375px.
  ctaLabel: 'Saber más por WhatsApp',
  closeLabel: 'Cerrar',
  image: '/images/party-circus/promociones/promo-modal-party-circus.webp',
  imageAlt: 'Promoción especial Party Circus Valle Dorado',
  whatsappMessage: [
    'Hola Party Circus, vi la promoción en su página y quiero más información.',
    '',
    'Nombre:',
    'Fecha de mi evento:',
    'Paquete de interés:',
    'Número de personas:',
    'Comentarios:',
  ].join('\n'),
  // Retraso para abrir el modal (ms). Recomendado entre 800 y 1200.
  delayMs: 1000,
}
