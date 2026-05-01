import { MapPin, Phone, Clock, MessageCircle, Navigation, Facebook, Instagram } from 'lucide-react'
import { BUSINESS } from '@/lib/config'
import { whatsappUrl } from '@/lib/whatsapp'
import { NEARBY_ZONES } from '@/lib/seo'

export default function Ubicacion() {
  return (
    <section id="ubicacion" className="section-padding bg-surface">
      <div className="container-page">
        <div className="grid md:grid-cols-12 gap-6 mb-10">
          <div className="md:col-span-7">
            <span className="eyebrow">Ubicación</span>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl lg:text-display-md">
              Ubicación y contacto en Valle Dorado
            </h2>
          </div>
          <div className="md:col-span-5 md:flex md:items-end">
            <p className="text-ink-soft text-base">
              Estamos en Blvd. de las Naciones 118, planta alta, Col. Valle Dorado,
              Tlalnepantla, Estado de México. Una zona práctica para familias que
              buscan un salón de fiestas infantiles cerca de Satélite, Mundo E,
              Arboledas, Naucalpan y Atizapán.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-5 lg:gap-6">
          {/* Mapa */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-border bg-cream-2/50">
            <div className="relative aspect-[16/11] w-full">
              <iframe
                src={BUSINESS.mapsEmbed}
                title="Mapa de Party Circus en Valle Dorado, Tlalnepantla"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          {/* Info + acciones */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <Row icon={MapPin} title="Dirección">
              <p className="text-ink-soft leading-relaxed">{BUSINESS.addressFull}</p>
            </Row>
            <Row icon={Clock} title="Horario">
              <p className="text-ink-soft">Lunes a domingo · 9:00 a 21:00 h</p>
            </Row>
            <Row icon={Phone} title="Contacto">
              <a href={`tel:${BUSINESS.phoneTel}`} className="block text-ink-soft hover:text-primary">{BUSINESS.phone}</a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-ink-soft hover:text-primary"
                aria-label="Cotizar por WhatsApp con Party Circus Valle Dorado"
              >
                WhatsApp · {BUSINESS.whatsappDisplay}
              </a>
            </Row>

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full"
                aria-label="Cotizar por WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href={`tel:${BUSINESS.phoneTel}`}
                className="btn-primary w-full"
                aria-label={`Llamar al ${BUSINESS.phone}`}
              >
                <Phone className="h-4 w-4" />
                Llamar
              </a>
              <a
                href={BUSINESS.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-info w-full"
                aria-label="Cómo llegar a Party Circus en Google Maps"
              >
                <Navigation className="h-4 w-4" />
                Ver Ruta
              </a>
            </div>

            {/* Redes */}
            <div className="mt-3 flex items-center gap-3 pt-3 border-t border-border">
              <span className="text-xs uppercase tracking-wider font-semibold text-muted">Síguenos</span>
              {BUSINESS.social.facebook && (
                <a href={BUSINESS.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook de Party Circus Valle Dorado"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-soft hover:text-primary hover:bg-cream">
                  <Facebook className="h-4 w-4" />
                </a>
              )}
              {BUSINESS.social.instagram && (
                <a href={BUSINESS.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram de Party Circus Valle Dorado"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-soft hover:text-primary hover:bg-cream">
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {BUSINESS.social.tiktok && (
                <a href={BUSINESS.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok de Party Circus Valle Dorado"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-soft hover:text-primary hover:bg-cream">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M19.5 7.5a6.5 6.5 0 0 1-3.8-1.2v7.4a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v2.6a3 3 0 1 0 2.1 2.9V2h2.6a4 4 0 0 0 3.8 3.8v1.7z"/></svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Zonas cercanas — bloque SEO local */}
        <div className="mt-10 md:mt-12 rounded-2xl bg-cream-2/40 border border-border p-5 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            <div className="md:max-w-md">
              <h3 className="font-display font-bold text-ink text-lg md:text-xl">Zonas de referencia</h3>
              <p className="mt-2 text-sm md:text-[15px] text-ink-soft leading-relaxed">
                Recibimos familias de toda la zona metropolitana. Por nuestra
                ubicación en Valle Dorado, somos una opción cómoda si vienes de
                Tlalnepantla, Satélite, Mundo E, Arboledas, Naucalpan, Atizapán,
                Lomas Verdes <strong className="text-ink">o cualquier otra zona</strong>.
              </p>
            </div>
            <ul className="flex flex-wrap gap-2 md:flex-1">
              {NEARBY_ZONES.map((zone) => (
                <li key={zone}>
                  <span className="pc-chip">
                    <MapPin className="h-3 w-3 text-primary" aria-hidden="true" />
                    {zone}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function Row({ icon: Icon, title, children }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 flex gap-4">
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary" aria-hidden="true">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 text-[15px]">
        <h3 className="font-display font-bold text-ink">{title}</h3>
        <div className="mt-1 break-words">{children}</div>
      </div>
    </div>
  )
}
