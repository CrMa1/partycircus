// lib/pricing.js — Tabla de precios por paquete, horario y número de personas.
// Fuente única para el cotizador. La cotización es estimada; precio final por WhatsApp.

export const PRICING = {
  salon: {
    lunjue: { 50: 7000, 60: 8000, 70: 9000, 80: 9500, 90: 10000, 100: 10500, 110: 11000, 120: 11500 },
    vidofes: { 50: 8000, 60: 9000, 70: 10000, 80: 10500, 90: 11000, 100: 11500, 110: 12000, 120: 12500 },
    sabtarde: { 50: 9000, 60: 10000, 70: 11000, 80: 11500, 90: 12000, 100: 12500, 110: 13000, 120: 13500 },
  },
  party: {
    lunjue: { 50: 18000, 60: 20000, 70: 22000, 80: 24000, 90: 26000, 100: 28000, 110: 30000, 120: 32000 },
    vidofes: { 50: 19000, 60: 21000, 70: 23000, 80: 25000, 90: 27000, 100: 29000, 110: 31000, 120: 33000 },
    sabtarde: { 50: 20000, 60: 22000, 70: 24000, 80: 26000, 90: 28000, 100: 30000, 110: 32000, 120: 34000 },
  },
  circus: {
    lunjue: { 50: 26000, 60: 28500, 70: 31000, 80: 33500, 90: 36000, 100: 38500, 110: 41000, 120: 43500 },
    vidofes: { 50: 28000, 60: 30500, 70: 33000, 80: 35500, 90: 38000, 100: 40500, 110: 43000, 120: 45500 },
    sabtarde: { 50: 30000, 60: 32500, 70: 35000, 80: 37500, 90: 40000, 100: 42500, 110: 45000, 120: 47500 },
  },
}

export function getPrice(packageId, scheduleId, people) {
  return PRICING?.[packageId]?.[scheduleId]?.[people] ?? null
}

export function formatMXN(value) {
  if (value == null) return '—'
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(value)
}
