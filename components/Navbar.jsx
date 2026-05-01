'use client'

import { useEffect, useState } from 'react'
import { Menu, X, MessageCircle } from 'lucide-react'
import SmartImage from './SmartImage'
import { BUSINESS, NAV_LINKS } from '@/lib/config'
import { whatsappUrl } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className={cn(
          'transition-colors duration-200',
          scrolled ? 'bg-surface/95 backdrop-blur shadow-[0_2px_20px_-10px_rgba(31,41,55,0.18)]' : 'bg-transparent'
        )}
      >
        {scrolled && <div className="pc-ribbon-thin" aria-hidden="true" />}
        <div className="container-page flex h-14 md:h-20 items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-2.5 min-w-0" onClick={() => setOpen(false)} aria-label={BUSINESS.name}>
            <SmartImage
              src="/images/party-circus/logo/party-circus-logo-circular.png"
              alt={`${BUSINESS.name} logo`}
              className="h-10 w-10 md:h-11 md:w-11 rounded-full ring-2 ring-primary/15 shrink-0"
              priority
            />
            <span className="font-display font-bold text-ink leading-tight text-[15px] md:text-base truncate">
              Party Circus
              <span className="hidden sm:block text-[11px] font-medium text-ink-soft -mt-0.5">Valle Dorado · Tlalnepantla</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="btn-ghost">{link.label}</a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex btn-primary px-5 min-h-[42px] md:min-h-[44px] text-[14px]"
            >
              <MessageCircle className="h-4 w-4" />
              Cotizar
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="sm:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-whatsapp text-white"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <button
              type="button"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-strong bg-surface text-ink"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-surface border-b border-border max-h-[calc(100vh-3.5rem)] overflow-y-auto">
          <nav className="container-page py-3 flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-2 py-3.5 text-base font-medium text-ink border-b border-border last:border-0 hover:text-primary"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp mt-4 w-full"
              onClick={() => setOpen(false)}
            >
              <MessageCircle className="h-5 w-5" />
              Cotizar por WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
