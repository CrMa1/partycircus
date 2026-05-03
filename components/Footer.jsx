'use client'

import { useState } from 'react'
import { MessageCircle, Facebook, Instagram, MapPin, Clock, Phone, ArrowUpRight } from 'lucide-react'
import SmartImage from './SmartImage'
import { BUSINESS, NAV_LINKS } from '@/lib/config'
import { whatsappUrl } from '@/lib/whatsapp'
import PrivacyModal from './PrivacyModal'
import JobsModal from './JobsModal'

export default function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [jobsOpen, setJobsOpen] = useState(false)

  return (
    <footer className="pc-footer-bg text-white pb-safe">
      <div className="container-page py-14 md:py-20">
        <div className="grid md:grid-cols-12 gap-10 md:gap-12">
          {/* Marca */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <SmartImage
                src="/images/party-circus/logo/party-circus-logo-circular.png"
                alt={`${BUSINESS.name} logo`}
                className="h-12 w-12 rounded-full ring-2 ring-white/20"
              />
              <div>
                <p className="font-display font-bold text-lg leading-tight">Party Circus</p>
                <p className="text-xs text-white/65">Valle Dorado · Tlalnepantla</p>
              </div>
            </div>
            <p className="mt-5 text-sm text-white/75 max-w-md leading-relaxed">
              Salón de fiestas infantiles y eventos sociales en Valle Dorado,
              Tlalnepantla, Estado de México. Cumpleaños, graduaciones y reuniones
              familiares con todo lo necesario incluido.
            </p>

            <div className="mt-6 flex gap-2">
              {BUSINESS.social.facebook && (
                <a href={BUSINESS.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-accent hover:text-ink transition-colors">
                  <Facebook className="h-4 w-4" />
                </a>
              )}
              {BUSINESS.social.instagram && (
                <a href={BUSINESS.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-accent hover:text-ink transition-colors">
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {BUSINESS.social.tiktok && (
                <a href={BUSINESS.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-accent hover:text-ink transition-colors">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M19.5 7.5a6.5 6.5 0 0 1-3.8-1.2v7.4a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v2.6a3 3 0 1 0 2.1 2.9V2h2.6a4 4 0 0 0 3.8 3.8v1.7z"/></svg>
                </a>
              )}
            </div>
          </div>

          {/* Navegación */}
          <div className="md:col-span-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">Navegación</p>
            <ul className="mt-4 space-y-3 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-white/85 hover:text-white">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="md:col-span-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">Contacto</p>
            <ul className="mt-4 space-y-3.5 text-sm text-white/85">
              <li className="flex gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                <span className="leading-relaxed">{BUSINESS.address}, {BUSINESS.city}</span>
              </li>
              <li className="flex gap-2.5">
                <Clock className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                <span>Lun a Vie · 10:00 a 18:00 h - Sab y Dom · 11:00 a 16:00 h</span>
              </li>
              <li className="flex gap-2.5">
                <Phone className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                <a href={`tel:${BUSINESS.phoneTel}`} className="hover:text-white">{BUSINESS.phone}</a>
              </li>
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-2 rounded-full bg-whatsapp hover:bg-whatsapp-dark text-white px-5 h-11 text-sm font-bold transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  Cotizar por WhatsApp
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Sub-barra */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs">
          <p className="text-white/60">© {new Date().getFullYear()} {BUSINESS.name}. Todos los derechos reservados.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-white/75">
            <button type="button" onClick={() => setJobsOpen(true)} className="hover:text-white">Trabaja con nosotros</button>
            <button type="button" onClick={() => setPrivacyOpen(true)} className="hover:text-white">Aviso de privacidad</button>
          </div>
        </div>
      </div>

      <PrivacyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <JobsModal open={jobsOpen} onClose={() => setJobsOpen(false)} />
    </footer>
  )
}
