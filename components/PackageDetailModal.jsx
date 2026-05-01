import { Check, MessageCircle, Info, Clock } from 'lucide-react'
import Modal from './Modal'
import { whatsappUrl } from '@/lib/whatsapp'

export default function PackageDetailModal({ open, onClose, pkg }) {
  if (!pkg) return null

  const message = `Hola Party Circus, me interesa el Paquete ${pkg.name}. ¿Me pueden compartir disponibilidad y detalles?`

  return (
    <Modal open={open} onClose={onClose} title={`Paquete ${pkg.name}`} size="lg">
      <div className="flex items-center gap-2 text-[13px] font-semibold text-ink-soft">
        <Clock className="h-4 w-4 text-primary" />
        <span>
          {pkg.duration}
          {pkg.durationNote && (
            <span className="text-muted font-normal"> · {pkg.durationNote}</span>
          )}
        </span>
      </div>

      <p className="mt-4 text-ink-soft text-[15px] leading-relaxed">
        {pkg.highlight}
      </p>

      <h3 className="mt-6 font-display font-bold text-ink text-base">
        Lo que incluye
      </h3>
      <ul className="mt-3 grid sm:grid-cols-2 gap-x-5 gap-y-2.5">
        {(pkg.fullIncludes || pkg.includes).map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[14px] text-ink">
            <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex gap-2.5 rounded-2xl border border-border bg-cream-2/40 p-4">
        <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
        <p className="text-[13px] text-ink-soft leading-relaxed">
          La disponibilidad, fecha deseada y precio final se confirman por WhatsApp con un asesor.
        </p>
      </div>

      <div className="mt-5 flex flex-col sm:flex-row gap-3">
        <a
          href={whatsappUrl(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp flex-1"
        >
          <MessageCircle className="h-5 w-5" />
          Cotizar este paquete por WhatsApp
        </a>
        <button type="button" onClick={onClose} className="btn-outline flex-1">
          Cerrar
        </button>
      </div>
    </Modal>
  )
}
