// Cupón activo del mes. Editar este objeto para cambiarlo o desactivarlo.
//   enabled:     true | false
//   code:        string (case-insensitive)
//   type:        "percentage" | "fixed"
//   value:       number (0–100 si es percentage; >= 0 si es fixed)
//   description: string que aparece al aplicarlo y en el mensaje de WhatsApp
export const ACTIVE_COUPON = {
  enabled: true,
  code: 'PARTY10',
  type: 'percentage',
  value: 10,
  description: '10% de descuento en tu evento',
}

export function normalizeCouponCode(input) {
  return String(input ?? '').trim().toUpperCase()
}

export function calculateDiscount(total, coupon) {
  const safeTotal = Number.isFinite(total) ? Math.max(0, total) : 0
  if (!coupon || !coupon.enabled) return { amount: 0, total: safeTotal }

  const value = Number(coupon.value)
  if (!Number.isFinite(value) || value <= 0) {
    return { amount: 0, total: safeTotal }
  }

  let amount = 0
  if (coupon.type === 'percentage') {
    const pct = Math.min(100, Math.max(0, value))
    amount = Math.round((safeTotal * pct) / 100)
  } else if (coupon.type === 'fixed') {
    amount = Math.max(0, Math.round(value))
  }

  amount = Math.min(amount, safeTotal)
  return { amount, total: safeTotal - amount }
}

export function isCouponMatch(input) {
  if (!ACTIVE_COUPON.enabled) return false
  return normalizeCouponCode(input) === normalizeCouponCode(ACTIVE_COUPON.code)
}
