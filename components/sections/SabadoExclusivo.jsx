import { CalendarCheck, Clock, ShieldCheck, MessageCircle, Check } from 'lucide-react'
import { whatsappUrl } from '@/lib/whatsapp'

const BENEFITS = [
  { icon: Clock, label: 'Horario más flexible' },
  { icon: CalendarCheck, label: 'Un solo evento en sábado' },
  { icon: ShieldCheck, label: 'Confirmación por WhatsApp' },
]

const WHATSAPP_MESSAGE =
  'Hola Party Circus, me interesa la opción de Sábado exclusivo (+$3,000 MXN) para apartar todo el sábado. ¿Me pueden compartir disponibilidad?'

export default function SabadoExclusivo() {
  return (
    <div className="mt-12 md:mt-16">
      <article
        className="relative overflow-hidden rounded-3xl bg-surface border border-border shadow-[0_10px_30px_-18px_rgba(31,41,55,0.18)]"
      >
        {/* Acento amarillo discreto en el borde superior */}
        <span className="absolute inset-x-0 top-0 h-1 bg-accent" aria-hidden="true" />

        <div className="grid gap-8 lg:gap-10 p-6 sm:p-8 md:p-10 lg:grid-cols-12 lg:items-center">
          {/* Zona izquierda: identidad + título + descripción */}
          <header className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/25 text-primary-dark shrink-0">
                <CalendarCheck className="h-5 w-5" />
              </span>
              <span className="inline-flex items-center rounded-full bg-accent/25 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-dark">
                Beneficio premium
              </span>
            </div>

            <h3 className="font-display font-bold text-ink text-2xl md:text-[28px] leading-tight mt-4">
              Sábado exclusivo{' '}
              <span className="text-primary whitespace-nowrap">+$3,000 MXN</span>
            </h3>

            <p className="mt-3 text-ink-soft text-[15px] md:text-base leading-relaxed max-w-md">
              Aparta todo el sábado para tu evento, con horario más flexible y
              sin otro evento ese mismo día.
            </p>
          </header>

          {/* Zona central: lista limpia de beneficios */}
          <div className="lg:col-span-4 lg:border-l lg:border-border lg:pl-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
              Lo que incluye
            </p>
            <ul className="mt-4 space-y-3">
              {BENEFITS.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-[15px] text-ink">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Zona derecha: CTA + nota */}
          <div className="lg:col-span-3 flex flex-col gap-3 lg:items-end">
            <a
              href={whatsappUrl(WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full lg:w-auto"
            >
              <MessageCircle className="h-4 w-4" />
              Cotizar sábado por WhatsApp
            </a>
            <p className="text-[12px] text-muted leading-snug lg:text-right max-w-xs lg:max-w-[220px]">
              Disponible para eventos en sábado. Sujeto a confirmación por WhatsApp.
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}
