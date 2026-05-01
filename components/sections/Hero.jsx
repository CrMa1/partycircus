import { MessageCircle, Star, MapPin, Clock, ArrowRight, PartyPopper, Sparkles, Users } from 'lucide-react'
import SmartImage from '@/components/SmartImage'
import { BUSINESS } from '@/lib/config'
import { whatsappUrl } from '@/lib/whatsapp'

const QUICK_BENEFITS = [
  { icon: PartyPopper, label: 'Cumpleaños y graduaciones' },
  { icon: Users, label: 'De 50 a 120 personas' },
  { icon: Sparkles, label: 'Alimentos y bebidas' },
]

export default function Hero() {
  return (
    <section id="home" className="relative pc-hero-bg overflow-hidden">
      <div className="pc-ribbon" aria-hidden="true" />

      <div className="container-page pt-20 md:pt-28 pb-20 md:pb-28 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Texto */}
          <div className="lg:col-span-6 reveal">
            <span className="pc-tag">Salón en Valle Dorado · Tlalnepantla</span>

            <h1 className="h-display mt-5 text-4xl sm:text-5xl lg:text-display-lg">
              <span className="text-primary">Party Circus</span>, salón de
              fiestas infantiles en{' '}
              <span className="ink-mark text-ink">Valle Dorado</span>,
              Tlalnepantla
            </h1>

            <p className="mt-5 text-base md:text-lg text-ink-soft max-w-xl leading-relaxed">
              Cumpleaños, graduaciones y eventos familiares en un espacio
              colorido, seguro y preparado para celebrar. Arma tu paquete
              y cotiza por WhatsApp.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full sm:w-auto">
                <MessageCircle className="h-5 w-5" />
                Cotiza por WhatsApp
              </a>
              <a href="#paquetes" className="btn-outline w-full sm:w-auto">
                Ver paquetes
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Beneficios rápidos */}
            <ul className="mt-7 flex flex-wrap gap-2">
              {QUICK_BENEFITS.map(({ icon: Icon, label }) => (
                <li key={label} className="pc-chip">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  {label}
                </li>
              ))}
            </ul>

            {/* Datos rápidos */}
            <dl className="mt-8 grid grid-cols-3 gap-4 max-w-xl border-t border-border pt-6">
              <Stat icon={MapPin} label="Ubicación" value="Valle Dorado" />
              <Stat icon={Clock} label="Horario" value="9:00–21:00 h" />
              <Stat icon={Star} label="Calificación" value={`${BUSINESS.socialProof.googleRating} / 5 · ${BUSINESS.socialProof.googleReviews}`} />
            </dl>
          </div>

          {/* Imagen — composición editorial con sello */}
          <div className="lg:col-span-6 reveal">
            <div className="relative">
              <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] w-full rounded-[28px] overflow-hidden ring-1 ring-border-strong shadow-[var(--pc-shadow-card)]">
                <SmartImage
                  src="/images/party-circus/hero/party-circus-valle-dorado-salon-principal.webp"
                  alt="Salón de fiestas infantiles Party Circus en Valle Dorado, Tlalnepantla"
                  className="absolute inset-0 w-full h-full"
                  priority
                  sizes="(min-width:1024px) 600px, 100vw"
                />
              </div>

              {/* Sello rating flotante */}
              <div className="absolute -bottom-5 left-5 right-5 sm:left-auto sm:right-5 sm:max-w-xs">
                <div className="rounded-2xl bg-surface border border-border-strong shadow-[var(--pc-shadow-soft)] p-4 flex items-center gap-3">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.round(BUSINESS.socialProof.googleRating) ? 'fill-accent text-accent' : 'text-border-strong'}`} />
                      ))}
                    </div>
                    <p className="font-display font-bold text-ink mt-1 leading-none">
                      {BUSINESS.socialProof.googleRating} <span className="text-muted font-normal text-xs">/ 5 en Google</span>
                    </p>
                  </div>
                  <div className="h-9 w-px bg-border" />
                  <p className="text-[12px] text-ink-soft leading-tight">
                    <strong className="text-ink">{BUSINESS.socialProof.facebookRecommend}%</strong> recomendado<br/>en Facebook
                  </p>
                </div>
              </div>

              {/* Badge superior izquierdo */}
              <div className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full bg-surface/95 backdrop-blur border border-border-strong px-3.5 py-1.5 text-[12px] font-bold text-primary shadow-sm">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                Abierto · Lun a Dom
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Franja decorativa inferior — espejo de la franja superior, cierre visual del hero */}
      <div className="pc-ribbon" aria-hidden="true" />
    </section>
  )
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold text-muted">
        <Icon className="h-3 w-3" />
        {label}
      </dt>
      <dd className="mt-1 text-sm font-semibold text-ink">{value}</dd>
    </div>
  )
}
