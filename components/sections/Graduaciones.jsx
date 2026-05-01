import { MessageCircle, ArrowRight, GraduationCap, Heart, Sparkles, Users } from 'lucide-react'
import SmartImage from '@/components/SmartImage'
import { EVENTS_GALLERY } from '@/lib/config'
import { whatsappUrl } from '@/lib/whatsapp'

const CHIPS = [
  { icon: GraduationCap, label: 'Graduaciones' },
  { icon: Heart, label: 'Bautizos' },
  { icon: Sparkles, label: 'Confirmaciones' },
  { icon: Users, label: 'Eventos familiares' },
]

export default function Graduaciones() {
  return (
    <section id="graduaciones" className="section-padding bg-cream">
      <div className="container-page">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Mosaico */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="grid grid-cols-6 grid-rows-6 gap-2.5 md:gap-3 aspect-[4/5] sm:aspect-[6/5]">
              <Tile className="col-span-4 row-span-4" img={EVENTS_GALLERY[0]} />
              <Tile className="col-span-2 row-span-2" img={EVENTS_GALLERY[1]} />
              <Tile className="col-span-2 row-span-2" img={EVENTS_GALLERY[2]} />
              <Tile className="col-span-3 row-span-2" img={EVENTS_GALLERY[3]} />
              <Tile className="col-span-3 row-span-2" img={EVENTS_GALLERY[4]} />
            </div>
          </div>

          {/* Texto */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <span className="eyebrow">Eventos sociales</span>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl lg:text-display-md">
              Graduaciones, bautizos y eventos sociales
            </h2>
            <p className="mt-5 text-ink-soft text-base md:text-lg leading-relaxed">
              Party Circus también es opción para graduaciones, bautizos,
              confirmaciones y reuniones familiares en Tlalnepantla, usando
              los mismos paquetes del salón adaptados a tu evento.
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {CHIPS.map(({ icon: Icon, label }) => (
                <li key={label} className="pc-chip">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  {label}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappUrl('Hola Party Circus, me interesa cotizar una graduación o evento social. ¿Me pueden compartir información?')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <MessageCircle className="h-5 w-5" />
                Cotizar evento
              </a>
              <a href="#cotizador" className="btn-outline">
                Ir al cotizador
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Tile({ className = '', img }) {
  return (
    <div className={`relative rounded-2xl overflow-hidden ${className}`}>
      <SmartImage src={img?.src} alt={img?.alt || ''} className="absolute inset-0 w-full h-full" variant="cream" />
    </div>
  )
}
