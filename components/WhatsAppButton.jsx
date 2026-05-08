'use client'

import { Facebook, Instagram } from 'lucide-react'
import { whatsappUrl } from '@/lib/whatsapp'
import { BUSINESS } from '@/lib/config'
import WhatsAppIcon from './WhatsAppIcon'

function TikTokIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M19.5 7.5a6.5 6.5 0 0 1-3.8-1.2v7.4a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v2.6a3 3 0 1 0 2.1 2.9V2h2.6a4 4 0 0 0 3.8 3.8v1.7z"/>
    </svg>
  )
}

const socialButtonBase =
  'inline-flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full text-white shadow-lg hover:scale-110 active:scale-95 transition-all focus:outline-none focus-visible:ring-4'

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-safe right-4 md:right-6 z-50 flex flex-col items-end gap-3">
      {BUSINESS.social.facebook && (
        <a
          href={BUSINESS.social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Síguenos en Facebook"
          className={`${socialButtonBase} bg-[#1877F2] hover:bg-[#0E5FCC] focus-visible:ring-[#1877F2]/40`}
        >
          <Facebook className="h-5 w-5" fill="currentColor" />
          <span className="sr-only">Facebook</span>
        </a>
      )}
      {BUSINESS.social.instagram && (
        <a
          href={BUSINESS.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Síguenos en Instagram"
          className={`${socialButtonBase} bg-gradient-to-tr from-[#FEDA77] via-[#DD2A7B] to-[#8134AF] hover:opacity-90 focus-visible:ring-[#DD2A7B]/40`}
        >
          <Instagram className="h-5 w-5" />
          <span className="sr-only">Instagram</span>
        </a>
      )}
      {BUSINESS.social.tiktok && (
        <a
          href={BUSINESS.social.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Síguenos en TikTok"
          className={`${socialButtonBase} bg-black hover:bg-zinc-800 focus-visible:ring-black/40`}
        >
          <TikTokIcon className="h-5 w-5" />
          <span className="sr-only">TikTok</span>
        </a>
      )}
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className={`${socialButtonBase} bg-whatsapp hover:bg-whatsapp-dark focus-visible:ring-whatsapp/40`}
      >
        <WhatsAppIcon className="h-5 w-5" />
        <span className="sr-only">WhatsApp</span>
      </a>
    </div>
  )
}
