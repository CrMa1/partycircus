import { CalendarDays, Clock, MapPin, MessageCircle, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react'
import SmartImage from '@/components/SmartImage'
import { whatsappUrl } from '@/lib/whatsapp'

const WHATSAPP_MESSAGE = [
  'Hola Party Circus, quiero información sobre la ludoteca.',
  '',
  'Día de interés:',
  'Horario aproximado:',
  'Nombre:',
  'Edad del niño/niña:',
  'Comentarios:',
  '',
  '¿Me pueden compartir costos, disponibilidad y detalles?',
].join('\n')

const HIGHLIGHTS = [
  { icon: CalendarDays, label: 'Días', value: 'Lunes a jueves' },
  { icon: Clock, label: 'Horario', value: '10:00 a.m. – 6:00 p.m.' },
  { icon: MapPin, label: 'Sede', value: 'Valle Dorado, Tlalnepantla' },
]

const PERKS = [
  { icon: Sparkles, label: 'Espacio colorido y divertido' },
  { icon: ShieldCheck, label: 'Ambiente seguro y supervisado' },
  { icon: MessageCircle, label: 'Disponibilidad por WhatsApp' },
]

export default function Ludoteca() {
  return (
    <section id="ludoteca" className="section-padding bg-cream">
      <div className="container-page">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Texto + datos destacados */}
          <div className="lg:col-span-6">
            <span className="eyebrow">Ludoteca</span>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl lg:text-display-md">
              Ludoteca de lunes a jueves en{' '}
              <span className="ink-mark text-ink">Valle Dorado</span>
            </h2>
            <p className="mt-5 text-ink-soft text-base md:text-lg leading-relaxed max-w-xl">
              Trae a tus peques a divertirse en un espacio seguro, colorido y
              pensado para jugar, convivir y pasar un buen rato entre semana en
              Tlalnepantla.
            </p>

            {/* Datos destacados como mini cards */}
            <ul className="mt-7 grid sm:grid-cols-3 gap-3">
              {HIGHLIGHTS.map(({ icon: Icon, label, value }) => (
                <li
                  key={label}
                  className="rounded-2xl bg-surface border border-border p-4"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                      <Icon className="h-4 w-4" />
                    </span>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                      {label}
                    </p>
                  </div>
                  <p className="mt-2.5 text-[14px] font-semibold text-ink leading-snug">
                    {value}
                  </p>
                </li>
              ))}
            </ul>

            {/* Beneficios cortos */}
            <ul className="mt-5 flex flex-wrap gap-2">
              {PERKS.map(({ icon: Icon, label }) => (
                <li key={label} className="pc-chip">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  {label}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappUrl(WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full sm:w-auto"
              >
                <MessageCircle className="h-5 w-5 shrink-0" />
                <span className="sm:hidden">Cotizar ludoteca</span>
                <span className="hidden sm:inline">Cotizar ludoteca por WhatsApp</span>
              </a>
              <a href="#paquetes" className="btn-outline w-full sm:w-auto">
                Ver paquetes de evento
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-3 text-xs text-muted">
              Costos, cupo y detalles se confirman por WhatsApp con un asesor.
            </p>
          </div>

          {/* Collage visual */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-6 grid-rows-7 gap-2.5 md:gap-3 aspect-[4/5] sm:aspect-[1/1] lg:aspect-[5/6]">
              <Tile
                className="col-span-4 row-span-4"
                src="/images/party-circus/ludoteca/ludoteca-party-circus-valle-dorado.webp"
                alt="Ludoteca de Party Circus en Valle Dorado, Tlalnepantla"
              />
              <Tile
                className="col-span-2 row-span-4"
                src="/images/party-circus/ludoteca/area-juegos-ludoteca-party-circus.webp"
                alt="Área de juegos infantil en la ludoteca de Party Circus"
              />
              <Tile
                className="col-span-6 row-span-3"
                src="/images/party-circus/ludoteca/ninos-jugando-party-circus-ludoteca.webp"
                alt="Niños jugando en la ludoteca de Party Circus, Valle Dorado"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Tile({ className = '', src, alt }) {
  return (
    <div className={`relative rounded-2xl overflow-hidden ${className}`}>
      <SmartImage src={src} alt={alt} className="absolute inset-0 w-full h-full" variant="cream" />
    </div>
  )
}
