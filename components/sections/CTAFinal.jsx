import { MessageCircle, Phone, ArrowRight } from 'lucide-react'
import { BUSINESS } from '@/lib/config'
import { whatsappUrl } from '@/lib/whatsapp'

export default function CTAFinal() {
  return (
    <section className="relative overflow-hidden">
      <div className="pc-cta-bg text-white">
        <div className="container-page py-16 md:py-24 lg:py-28">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="eyebrow-on-dark">Cotiza tu evento</span>
              <h2 className="h-display mt-4 text-white text-3xl sm:text-4xl lg:text-display-md">
                Cotiza tu fiesta infantil en{' '}
                <span className="ink-mark text-white">Party Circus Valle Dorado</span>
              </h2>
              <p className="mt-5 text-white/85 text-base md:text-lg max-w-xl">
                Escríbenos por WhatsApp y un asesor confirma disponibilidad y precio
                final de tu evento en minutos. Sin compromiso.
              </p>
            </div>

            <div className="lg:col-span-5 lg:pl-6">
              <div className="rounded-3xl bg-surface text-ink p-6 md:p-7 shadow-[var(--pc-shadow-card)]">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Atención inmediata</p>
                <p className="font-display font-bold text-2xl mt-2 leading-snug">
                  Respondemos por WhatsApp en minutos.
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full">
                    <MessageCircle className="h-5 w-5" />
                    Cotizar por WhatsApp
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a href={`tel:${BUSINESS.phoneTel}`} className="btn-outline w-full">
                    <Phone className="h-4 w-4" />
                    Llamar al {BUSINESS.phone}
                  </a>
                </div>
                <p className="mt-4 text-xs text-muted">
                  Lun a Vie · 10:00 a 18:00 h - Sab y Dom · 11:00 a 16:00 h · Valle Dorado, Tlalnepantla
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pc-ribbon" aria-hidden="true" />
    </section>
  )
}
