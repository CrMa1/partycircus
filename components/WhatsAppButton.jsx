'use client'

import { MessageCircle } from 'lucide-react'
import { whatsappUrl } from '@/lib/whatsapp'

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-safe right-4 md:right-6 z-50 inline-flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_18px_40px_-12px_rgba(34,197,94,0.65)] hover:bg-whatsapp-dark hover:scale-105 active:scale-95 transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-whatsapp/40"
    >
      <MessageCircle className="h-6 w-6 md:h-7 md:w-7" />
      <span className="sr-only">WhatsApp</span>
    </a>
  )
}
