import { MapPin, Phone, Clock, MessageCircle, Navigation, Facebook, Instagram } from 'lucide-react'
import { BUSINESS } from '@/lib/config'
import { whatsappUrl } from '@/lib/whatsapp'
import { NEARBY_ZONES, EXTENDED_REFERENCES } from '@/lib/seo'

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
              <p className="text-ink-soft">Lun a Vie · 10:00 a 18:00 h · Sab y Dom · 11:00 a 16:00 h</p>
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

        {/* Zonas de cobertura — bloque SEO local */}
        <div className="mt-10 md:mt-12 rounded-2xl bg-cream-2/40 border border-border p-5 md:p-6">
          <div className="md:max-w-2xl">
            <h3 className="font-display font-bold text-ink text-lg md:text-xl">Zonas de cobertura</h3>
            <p className="mt-2 text-sm md:text-[15px] text-ink-soft leading-relaxed">
              Recibimos familias de distintas zonas del Estado de México y CDMX.
              Por nuestra ubicación en Valle Dorado, somos una opción cómoda
              para familias de Tlalnepantla, Atizapán, Naucalpan, Cuautitlán
              Izcalli, Tultitlán, Nicolás Romero, Gustavo A. Madero{' '}
              <strong className="text-ink">y zonas cercanas</strong>.
            </p>
          </div>

          <div className="mt-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
              Municipios y zonas principales
            </p>
            <ul className="mt-2.5 flex flex-wrap gap-2">
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

          <div className="mt-5 pt-4 border-t border-border">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
              Colonias y referencias cercanas
            </p>
            <p className="mt-1.5 text-[13px] text-ink-soft leading-relaxed">
              También nos visitan desde {EXTENDED_REFERENCES.slice(0, -1).join(', ')} y {EXTENDED_REFERENCES.slice(-1)[0]}, entre otras zonas cercanas.
            </p>
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
