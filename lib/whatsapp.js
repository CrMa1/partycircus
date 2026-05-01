// lib/whatsapp.js — Helpers para construir links de WhatsApp.
import { BUSINESS } from './config'

export function whatsappUrl(message = BUSINESS.whatsappMessage) {
  const text = encodeURIComponent(message)
  return `https://wa.me/${BUSINESS.whatsapp}?text=${text}`
}
