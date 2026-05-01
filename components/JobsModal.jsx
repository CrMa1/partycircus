'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import Modal from './Modal'
import { whatsappUrl } from '@/lib/whatsapp'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function JobsModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', comment: '' })
  const [errors, setErrors] = useState({})

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Tu nombre es requerido.'
    if (!form.phone.trim()) next.phone = 'Tu teléfono es requerido.'
    if (!form.email.trim()) next.email = 'Tu correo es requerido.'
    else if (!EMAIL_RE.test(form.email.trim())) next.email = 'Ingresa un correo válido.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const message = [
      'Hola Party Circus, me interesa unirme a su equipo.',
      `Mi nombre es: ${form.name.trim()}`,
      `Mi teléfono es: ${form.phone.trim()}`,
      `Mi correo de contacto es: ${form.email.trim()}`,
      `Comentario: ${form.comment.trim() || 'Sin comentarios adicionales.'}`,
    ].join('\n')

    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Trabaja con nosotros" size="md">
      <p className="text-ink-soft text-[15px]">
        Déjanos tus datos y envíanos tu solicitud por WhatsApp.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
        <Field label="Nombre completo" error={errors.name} required>
          <input
            type="text"
            value={form.name}
            onChange={update('name')}
            className={inputCls(!!errors.name)}
            placeholder="Tu nombre"
            autoComplete="name"
          />
        </Field>

        <Field label="Teléfono" error={errors.phone} required>
          <input
            type="tel"
            inputMode="tel"
            value={form.phone}
            onChange={update('phone')}
            className={inputCls(!!errors.phone)}
            placeholder="55 1234 5678"
            autoComplete="tel"
          />
        </Field>

        <Field label="Correo de contacto" error={errors.email} required>
          <input
            type="email"
            inputMode="email"
            value={form.email}
            onChange={update('email')}
            className={inputCls(!!errors.email)}
            placeholder="tucorreo@ejemplo.com"
            autoComplete="email"
          />
        </Field>

        <Field label="Comentario (opcional)">
          <textarea
            value={form.comment}
            onChange={update('comment')}
            className={inputCls(false) + ' min-h-[88px] resize-y'}
            placeholder="Cuéntanos brevemente por qué quieres unirte"
          />
        </Field>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button type="submit" className="btn-whatsapp flex-1">
            <MessageCircle className="h-4 w-4" />
            Enviar solicitud por WhatsApp
          </button>
          <button type="button" onClick={onClose} className="btn-outline flex-1">
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  )
}

function Field({ label, error, required, children }) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
        {label} {required && <span className="text-primary">*</span>}
      </span>
      <div className="mt-2">{children}</div>
      {error && <span className="block mt-1 text-xs text-primary">{error}</span>}
    </label>
  )
}

function inputCls(hasError) {
  return `w-full rounded-xl border px-4 py-3 min-h-[48px] text-[15px] bg-surface focus:outline-none focus:ring-4 focus:ring-primary/15 transition-colors ${
    hasError ? 'border-primary' : 'border-border-strong focus:border-primary'
  }`
}
