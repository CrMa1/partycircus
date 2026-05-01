'use client'

import { useState } from 'react'
import { Check, MessageCircle, ArrowRight, Star, Eye } from 'lucide-react'
import SmartImage from '@/components/SmartImage'
import PackageDetailModal from '@/components/PackageDetailModal'
import { PACKAGES } from '@/lib/config'
import { whatsappUrl } from '@/lib/whatsapp'
import Cotizador from './Cotizador'
import SabadoExclusivo from './SabadoExclusivo'

export default function Paquetes() {
  const [detailPkg, setDetailPkg] = useState(null)

  return (
    <section id="paquetes" className="section-padding bg-surface">
      <div className="container-page">
        {/* Header editorial */}
        <div className="grid md:grid-cols-12 gap-6 md:gap-10 mb-10 md:mb-14">
          <div className="md:col-span-7 lg:col-span-6">
            <span className="eyebrow">Paquetes</span>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl lg:text-display-md">
              Paquetes para fiestas infantiles y eventos familiares
            </h2>
            <p className="mt-4 text-ink-soft text-base md:text-lg">
              Desde una celebración sencilla hasta una experiencia completa con
              alimentos, show, decoración y más.
            </p>
          </div>
          <div className="md:col-span-5 md:flex md:items-end">
            <p className="text-ink-soft text-base md:text-lg">
              Tenemos opciones para distintos tipos de celebración. Todos los
              paquetes incluyen <strong className="text-ink">5 hrs de evento</strong>,
              más 30 min de entrada y 30 min de salida. Elige el que mejor se
              adapte a tu fiesta y cotiza por WhatsApp.
            </p>
          </div>
        </div>

        {/* Cards de paquete */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6 items-stretch">
          {PACKAGES.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} onOpenDetail={() => setDetailPkg(pkg)} />
          ))}
        </div>

        <SabadoExclusivo />

        <Cotizador />
      </div>

      <PackageDetailModal open={!!detailPkg} onClose={() => setDetailPkg(null)} pkg={detailPkg} />
    </section>
  )
}

function PackageCard({ pkg, onOpenDetail }) {
  const featured = !!pkg.featured

  return (
    <article
      className={[
        'relative flex flex-col overflow-hidden rounded-3xl bg-surface transition-all',
        featured
          ? 'ring-2 ring-primary shadow-[var(--pc-shadow-pop)] md:-translate-y-2'
          : 'border border-border hover:border-border-strong hover:shadow-[var(--pc-shadow-soft)]',
      ].join(' ')}
    >
      <PackageHeader pkg={pkg} featured={featured} />

      {/* Cuerpo */}
      <div className="p-6 md:p-7 flex-1 flex flex-col">
        <p className="text-[15px] text-ink-soft leading-relaxed">{pkg.highlight}</p>

        <ul className="mt-5 space-y-2.5 flex-1">
          {pkg.includes.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[14.5px] text-ink leading-snug">
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={onOpenDetail}
          className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary hover:text-primary-dark"
        >
          <Eye className="h-3.5 w-3.5" />
          Ver todo lo que incluye
        </button>

        <div className="mt-6 pt-6 border-t border-border flex flex-col gap-2">
          <a
            href="#cotizador"
            className={featured ? 'btn-primary w-full' : 'btn-dark w-full'}
          >
            Cotizar este paquete
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={whatsappUrl(`Hola Party Circus, me interesa el paquete ${pkg.name}. ¿Me pueden compartir más información?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost w-full text-success hover:text-whatsapp-dark hover:bg-whatsapp/[0.06]"
          >
            <MessageCircle className="h-4 w-4" />
            Pregunta por WhatsApp
          </a>
        </div>
      </div>
    </article>
  )
}

function PackageHeader({ pkg, featured }) {
  return (
    <div className="relative h-[220px] sm:h-[240px] md:h-[260px] w-full overflow-hidden rounded-t-3xl">
      <SmartImage
        src={pkg.image}
        alt={`Paquete ${pkg.name} en Party Circus Valle Dorado`}
        className="absolute inset-0 w-full h-full"
        imgStyle={{ objectPosition: pkg.imagePosition || 'center' }}
        variant="cream"
        sizes="(min-width:768px) 33vw, 100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(120%_75%_at_0%_100%,rgba(17,24,39,0.8)_0%,rgba(17,24,39,0.5)_35%,rgba(17,24,39,0)_70%)]"
        aria-hidden="true"
      />

      {featured && (
        <span className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-dark shadow-[0_10px_24px_-10px_rgba(0,0,0,0.5)]">
          <Star className="h-3 w-3 fill-primary-dark" />
          Más completo
        </span>
      )}

      <div className="absolute left-5 right-5 bottom-5 md:left-6 md:right-6 md:bottom-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/80 [text-shadow:0_1px_2px_rgba(0,0,0,0.4)]">
          Paquete
        </p>
        <div className="mt-1 flex items-end justify-between gap-3">
          <h3 className="font-display font-bold text-white text-[28px] md:text-[32px] leading-none [text-shadow:0_2px_10px_rgba(0,0,0,0.55)]">
            Paquete {pkg.name}
          </h3>
          <span className="inline-flex flex-col items-end rounded-2xl bg-white/15 backdrop-blur-md ring-1 ring-white/30 px-3 py-1.5 text-white whitespace-nowrap">
            <span className="text-[12px] font-bold leading-tight">{pkg.duration}</span>
            {pkg.durationNote && (
              <span className="text-[10px] font-medium text-white/80 leading-tight">{pkg.durationNote}</span>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}
