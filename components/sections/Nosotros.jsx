import { Star, ThumbsUp, MessageCircle, HeartHandshake, Users, Sparkles, Zap } from 'lucide-react'
import SmartImage from '@/components/SmartImage'
import { BUSINESS } from '@/lib/config'
import { whatsappUrl } from '@/lib/whatsapp'

const DIFFERENTIATORS = [
  { icon: HeartHandshake, title: 'Atención personalizada', text: 'Te acompañamos desde la cotización hasta el cierre del evento, sin intermediarios.' },
  { icon: Users, title: 'Ambiente familiar', text: 'Un salón pensado para que niños y adultos disfruten en confianza.' },
  { icon: Sparkles, title: 'Eventos completos', text: 'Cumpleaños, graduaciones, bautizos y reuniones, con todo lo necesario incluido.' },
  { icon: Zap, title: 'Cotización por WhatsApp', text: 'Resolvemos disponibilidad y dudas en minutos por chat.' },
]

export default function Nosotros() {
  return (
    <section id="nosotros" className="section-padding bg-surface">
      <div className="container-page">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Imagen + sello */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden ring-1 ring-border-strong shadow-[var(--pc-shadow-card)]">
              <SmartImage
                src="/images/party-circus/nosotros/equipo-party-circus.webp"
                alt="Equipo y ambiente familiar de Party Circus Valle Dorado, Tlalnepantla"
                className="absolute inset-0 w-full h-full"
                variant="cream"
                sizes="(min-width:1024px) 50vw, 100vw"
              />
            </div>

            {/* Sello flotante: años / abierto */}
            <div className="hidden md:block absolute -bottom-6 -right-6 lg:right-6 rounded-2xl bg-primary text-white px-5 py-4 shadow-[var(--pc-shadow-pop)]">
              <p className="font-display font-bold  leading-none">10-18 h · 11-16 h</p>
              <p className="text-xs text-white/85 mt-1">Lun a Vie - Sab y Dom</p>
            </div>
          </div>

          {/* Texto */}
          <div className="lg:col-span-6">
            <span className="eyebrow">Nosotros</span>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl lg:text-display-md">
              Nosotros: Party Circus Valle Dorado
            </h2>
            <p className="mt-5 text-ink-soft text-base md:text-lg leading-relaxed">
              Party Circus es un salón de fiestas infantiles y eventos sociales
              en Valle Dorado, Tlalnepantla, Estado de México, pensado para que
              cumpleaños, graduaciones y reuniones sean fáciles de organizar y
              disfrutar.
            </p>

            {/* Diferenciales en grid 2x2 */}
            <ul className="mt-8 grid sm:grid-cols-2 gap-4">
              {DIFFERENTIATORS.map(({ icon: Icon, title, text }) => (
                <li key={title} className="rounded-2xl bg-cream-2/50 border border-border p-5">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-3 font-display font-bold text-ink text-base">{title}</h3>
                  <p className="mt-1 text-[14px] text-ink-soft leading-snug">{text}</p>
                </li>
              ))}
            </ul>

            {/* Prueba social */}
            <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
              <Proof icon={Star} value={`${BUSINESS.socialProof.googleRating} / 5`} label={`${BUSINESS.socialProof.googleReviews} opiniones en Google`} />
              <Proof icon={ThumbsUp} value={`${BUSINESS.socialProof.facebookRecommend}%`} label="Recomendado en Facebook" />
            </div>

            <div className="mt-8">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                <MessageCircle className="h-5 w-5" />
                Hablar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Proof({ icon: Icon, value, label }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <Icon className="h-4 w-4 text-primary fill-accent" />
      <p className="mt-2 font-display font-bold text-2xl text-ink leading-none">{value}</p>
      <p className="mt-1.5 text-xs text-muted leading-snug">{label}</p>
    </div>
  )
}
