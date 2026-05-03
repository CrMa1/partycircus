// Cupones activos. Editar este array para agregar, quitar o desactivar cupones.
//   enabled:     true | false (por cupón)
//   code:        string (case-insensitive)
//   type:        "percentage" | "fixed"
//   value:       number (0–100 si es percentage; >= 0 si es fixed)
//   description: string que aparece al aplicarlo y en el mensaje de WhatsApp
export const ACTIVE_COUPONS = [
  {
    enabled: true,
    code: 'EFE102026',
    type: 'percentage',
    value: 10,
    description: '10% de descuento al pagar en efectivo',
  },
  {
    enabled: true,
    code: '15EFE2026',
    type: 'percentage',
    value: 15,
    description: '15% de descuento al pagar en efectivo',
  },
]

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

export function findCoupon(input) {
  const code = normalizeCouponCode(input)
  if (!code) return null
  return ACTIVE_COUPONS.find((c) => c.enabled && normalizeCouponCode(c.code) === code) || null
}

export function hasEnabledCoupons() {
  return ACTIVE_COUPONS.some((c) => c.enabled)
}
