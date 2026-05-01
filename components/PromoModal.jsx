'use client'

import { useEffect, useRef, useState } from 'react'
import { X, MessageCircle, Sparkles } from 'lucide-react'
import SmartImage from './SmartImage'
import { PROMO_MODAL } from '@/lib/promo'
import { whatsappUrl } from '@/lib/whatsapp'
import PromoBackgroundConfetti from './PromoBackgroundConfetti'
import PromoConfettiCannons from './PromoConfettiCannons'
import PromoMobileSplash from './PromoMobileSplash'

export default function PromoModal() {
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const dialogRef = useRef(null)
  const previouslyFocused = useRef(null)

  // Apertura programada — se muestra en cada carga de la página (refresh)
  useEffect(() => {
    if (!PROMO_MODAL.enabled) return
    if (typeof window === 'undefined') return
    const t = setTimeout(() => setOpen(true), PROMO_MODAL.delayMs ?? 1000)
    return () => clearTimeout(t)
  }, [])

  // Bloquear scroll, guardar foco previo y enfocar el diálogo
  useEffect(() => {
    if (!open) return
    previouslyFocused.current = document.activeElement
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => dialogRef.current?.focus(), 50)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
      if (previouslyFocused.current?.focus) previouslyFocused.current.focus()
    }
  }, [open])

  // Cerrar con Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  function handleClose() {
    if (closing) return
    setClosing(true)
    setTimeout(() => {
      setOpen(false)
      setClosing(false)
    }, 200)
  }

  if (!open) return null

  const state = closing ? 'closing' : 'open'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-title"
      aria-describedby="promo-description"
      data-state={state}
      className="pc-promo-backdrop fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-navy/65 backdrop-blur-sm"
      onClick={handleClose}
    >
      {/* Animaciones desktop — detrás del dialog, no bloquean interacción */}
      <PromoBackgroundConfetti isOpen={open} />
      <PromoConfettiCannons isOpen={open} />

      {/* Splash móvil — personaje + confetti durante 5s */}
      <PromoMobileSplash isOpen={open} />

      <div
        ref={dialogRef}
        tabIndex={-1}
        data-state={state}
        onClick={(e) => e.stopPropagation()}
        className="pc-promo-dialog relative z-[10] w-full sm:max-w-3xl max-h-[92dvh] flex flex-col sm:flex-row overflow-hidden rounded-t-3xl sm:rounded-3xl bg-surface shadow-2xl border border-border focus:outline-none"
      >
        {/* Cinta tricolor superior — identidad de marca */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1.5 z-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, rgb(var(--color-primary)) 0 14px, rgb(var(--color-accent)) 14px 28px, rgb(var(--color-secondary)) 28px 42px)',
          }}
        />

        {/* Botón cerrar */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Cerrar promoción"
          className="absolute top-3 right-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface/90 backdrop-blur text-ink hover:bg-ink hover:text-white border border-border-strong shadow-sm transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Imagen — arriba en mobile, izquierda en desktop */}
        <div className="relative w-full sm:w-[42%] aspect-[16/10] sm:aspect-auto sm:min-h-[360px] shrink-0">
          <SmartImage
            src={PROMO_MODAL.image}
            alt={PROMO_MODAL.imageAlt}
            className="absolute inset-0 w-full h-full"
            imgStyle={{ objectPosition: 'center' }}
            variant="cream"
            priority
          />
          {/* Overlay sutil solo en mobile para legibilidad de la X */}
          <div className="absolute inset-0 bg-gradient-to-b from-ink/25 via-transparent to-transparent sm:hidden" />
        </div>

        {/* Contenido */}
        <div className="relative flex-1 flex flex-col p-6 md:p-8 lg:p-10 pt-7 overflow-y-auto">
          {PROMO_MODAL.badge && (
            <span className="inline-flex self-start items-center gap-1.5 rounded-full bg-accent/30 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-dark">
              <Sparkles className="h-3 w-3" />
              {PROMO_MODAL.badge}
            </span>
          )}

          <h2
            id="promo-title"
            className="font-display font-bold text-ink text-2xl sm:text-3xl leading-tight mt-4"
          >
            {PROMO_MODAL.title}
          </h2>

          <p
            id="promo-description"
            className="mt-3 text-ink-soft text-[15px] md:text-base leading-relaxed"
          >
            {PROMO_MODAL.description}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
            <a
              href={whatsappUrl(PROMO_MODAL.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full sm:flex-1"
              onClick={handleClose}
            >
              <MessageCircle className="h-5 w-5" />
              {PROMO_MODAL.ctaLabel}
            </a>
            <button
              type="button"
              onClick={handleClose}
              className="btn-outline w-full sm:w-auto"
            >
              {PROMO_MODAL.closeLabel}
            </button>
          </div>

          <p className="mt-4 text-[12px] text-muted leading-snug">
            La promoción y disponibilidad se confirman por WhatsApp con un asesor.
          </p>
        </div>
      </div>
    </div>
  )
}
