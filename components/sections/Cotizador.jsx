'use client'

import { useEffect, useMemo, useState } from 'react'
import { Check, MessageCircle, Info, Calendar, Users, Clock, Tag, ArrowRight, CalendarCheck, ShieldCheck } from 'lucide-react'
import { PACKAGES, SCHEDULES, PEOPLE_OPTIONS } from '@/lib/config'
import { getPrice, formatMXN } from '@/lib/pricing'
import { whatsappUrl } from '@/lib/whatsapp'

const SCHEDULE_META = {
  lunjue: { tier: 'Tarifa base', dot: 'bg-secondary' },
  vidofes: { tier: 'Tarifa alta', dot: 'bg-primary' },
  sabtarde: { tier: 'Tarifa especial', dot: 'bg-accent' },
}

const SATURDAY_EXCLUSIVE_FEE = 3000

function todayISO() { return new Date().toISOString().split('T')[0] }

function isSaturday(dateString) {
  if (!dateString) return false
  const [year, month, day] = dateString.split('-').map(Number)
  if (!year || !month || !day) return false
  const date = new Date(year, month - 1, day)
  return date.getDay() === 6
}

function formatDateLong(iso) {
  if (!iso) return null
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('es-MX', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default function Cotizador() {
  const [packageId, setPackageId] = useState('party')
  const [people, setPeople] = useState(80)
  const [date, setDate] = useState('')
  const [scheduleId, setScheduleId] = useState('lunjue')
  const [saturdayExclusive, setSaturdayExclusive] = useState(false)

  const dateIsSaturday = useMemo(() => isSaturday(date), [date])

  // Si la fecha deja de ser sábado, desactivar el extra automáticamente
  useEffect(() => {
    if (!dateIsSaturday && saturdayExclusive) setSaturdayExclusive(false)
  }, [dateIsSaturday, saturdayExclusive])

  const basePrice = useMemo(() => getPrice(packageId, scheduleId, people), [packageId, scheduleId, people])
  const extras = saturdayExclusive ? SATURDAY_EXCLUSIVE_FEE : 0
  const total = (basePrice ?? 0) + extras

  const selectedPackage = PACKAGES.find((p) => p.id === packageId)
  const selectedSchedule = SCHEDULES.find((s) => s.id === scheduleId)
  const dateLong = formatDateLong(date)

  const message = useMemo(() => {
    const lines = [
      'Hola Party Circus, quiero cotizar un evento.',
      '',
      `Paquete: ${selectedPackage?.name ?? '-'}`,
      `Personas: ${people} invitados`,
      `Fecha deseada: ${dateLong ?? 'Por definir'}`,
      `Horario: ${selectedSchedule?.label ?? '-'}`,
      `Sábado exclusivo: ${
        saturdayExclusive
          ? 'Sí, quiero apartar todo el sábado (+$3,000 MXN)'
          : 'No seleccionado'
      }`,
      `Cotización estimada: ${formatMXN(total)}`,
      '',
      '¿Me pueden confirmar disponibilidad, horario y precio final?',
    ]
    return lines.join('\n')
  }, [selectedPackage, people, dateLong, selectedSchedule, saturdayExclusive, total])

  return (
    <div id="cotizador" className="mt-16 md:mt-24 scroll-mt-24">
      <div className="rounded-3xl bg-cream-2/60 border border-border p-5 md:p-10 lg:p-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Formulario */}
          <div className="lg:col-span-7">
            <span className="eyebrow">Cotizador</span>
            <h2 className="h-display mt-3 text-3xl md:text-4xl">
              Cotiza tu evento por WhatsApp
            </h2>
            <p className="mt-3 text-ink-soft text-base md:text-[17px] max-w-2xl">
              Selecciona tu paquete, la cantidad de personas y la fecha deseada.
              El precio final y la disponibilidad se confirman por WhatsApp.
            </p>

            <div className="mt-8 space-y-7">
              <PackageSelector value={packageId} onChange={setPackageId} />
              <PeopleSelector value={people} onChange={setPeople} />
              <DateSelector value={date} onChange={setDate} />
              <ScheduleSelector value={scheduleId} onChange={setScheduleId} />

              {/* Extra: Sábado exclusivo — solo si la fecha es sábado */}
              {dateIsSaturday && (
                <SaturdayExclusiveToggle
                  checked={saturdayExclusive}
                  onChange={setSaturdayExclusive}
                />
              )}
            </div>
          </div>

          {/* Resumen */}
          <div className="lg:col-span-5">
            <QuoteSummary
              basePrice={basePrice}
              total={total}
              pkg={selectedPackage}
              people={people}
              schedule={selectedSchedule}
              dateLong={dateLong}
              saturdayExclusive={saturdayExclusive}
              message={message}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Toggle: Sábado exclusivo ──────────────────────────────────────────── */
function SaturdayExclusiveToggle({ checked, onChange }) {
  return (
    <div
      className={[
        'pc-saturday-enter pc-saturday-pulse',
        'relative overflow-hidden rounded-3xl border transition-colors',
        checked
          ? 'border-primary/60 bg-accent/15 shadow-[0_18px_40px_-22px_rgba(214,40,40,0.45)]'
          : 'border-border-strong bg-cream-2/50 shadow-[0_10px_28px_-18px_rgba(31,41,55,0.18)]',
      ].join(' ')}
    >
      {/* Franja decorativa superior con la línea multicolor de marca */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-2.5"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, rgb(var(--color-primary)) 0 14px, rgb(var(--color-accent)) 14px 28px, rgb(var(--color-secondary)) 28px 42px)',
        }}
      />

      <div className="p-5 md:p-6 pt-6 md:pt-7">
        {/* Encabezado: eyebrow + título + precio */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/30 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-dark">
              <CalendarCheck className="h-3 w-3" />
              Beneficio premium
            </span>
            <h4 className="font-display font-bold text-ink text-xl md:text-2xl mt-3 leading-tight">
              Sábado exclusivo{' '}
              <span className="text-primary whitespace-nowrap">+$3,000 MXN</span>
            </h4>
          </div>

          {/* Switch — más visible, con label flotante de estado */}
          <label className="shrink-0 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => onChange(e.target.checked)}
              className="sr-only peer"
              aria-label="Agregar sábado exclusivo"
            />
            <span
              className={[
                'flex items-center gap-2 rounded-full px-2 py-1.5 transition-colors',
                checked ? 'bg-primary/10' : 'bg-surface',
              ].join(' ')}
            >
              <span
                className={[
                  'text-[11px] font-bold uppercase tracking-wider transition-colors',
                  checked ? 'text-primary' : 'text-muted',
                ].join(' ')}
              >
                {checked ? 'Activo' : 'Agregar'}
              </span>
              <span className="relative inline-block h-7 w-12 shrink-0">
                <span
                  className={[
                    'absolute inset-0 rounded-full transition-colors',
                    checked ? 'bg-primary' : 'bg-border-strong',
                  ].join(' ')}
                />
                <span
                  className={[
                    'absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-200',
                    checked ? 'translate-x-5' : '',
                  ].join(' ')}
                />
              </span>
            </span>
          </label>
        </div>

        {/* Descripción */}
        <p className="mt-4 text-[14px] md:text-[15px] text-ink-soft leading-relaxed max-w-xl">
          Aparta todo el sábado para tu evento, con horario más flexible y sin
          otro evento ese mismo día.
        </p>

        {/* Beneficios */}
        <ul className="mt-5 grid sm:grid-cols-3 gap-2.5">
          {[
            { icon: Clock, label: 'Horario más flexible' },
            { icon: CalendarCheck, label: 'Un solo evento en sábado' },
            { icon: ShieldCheck, label: 'Confirmación por WhatsApp' },
          ].map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-2.5 rounded-xl bg-surface border border-border px-3 py-2.5"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                <Icon className="h-3.5 w-3.5" />
              </span>
              <span className="text-[13px] font-medium text-ink leading-tight">
                {label}
              </span>
            </li>
          ))}
        </ul>

        {/* Confirmación visual cuando está activo */}
        {checked && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-primary/10 border border-primary/30 px-3 py-2.5 text-[13px] text-primary-dark">
            <Check className="h-4 w-4 shrink-0" strokeWidth={3} />
            <span>
              <strong>Sábado exclusivo agregado.</strong> Se sumarán $3,000 MXN al total estimado.
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Selectores ────────────────────────────────────────────────────────── */
function PackageSelector({ value, onChange }) {
  return (
    <fieldset>
      <FieldHeader step="1" icon={Tag} label="Paquete" />
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {PACKAGES.map((pkg) => {
          const active = value === pkg.id
          return (
            <button
              key={pkg.id}
              type="button"
              onClick={() => onChange(pkg.id)}
              aria-pressed={active}
              className={[
                'group relative text-left rounded-2xl p-4 md:p-5 transition-all',
                'focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20',
                active
                  ? 'bg-primary text-white shadow-[0_18px_40px_-20px_rgba(214,40,40,0.5)] ring-1 ring-primary'
                  : 'bg-surface text-ink ring-1 ring-border hover:ring-primary/40 hover:-translate-y-0.5',
              ].join(' ')}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-[0.18em] ${active ? 'text-accent' : 'text-muted'}`}>Paquete</p>
                  <h4 className="font-display font-bold text-2xl mt-0.5">{pkg.name}</h4>
                  <p className={`text-xs mt-0.5 ${active ? 'text-white/75' : 'text-muted'}`}>{pkg.duration}</p>
                  {pkg.durationNote && (
                    <p className={`text-[10px] mt-0.5 ${active ? 'text-white/65' : 'text-muted'}`}>{pkg.durationNote}</p>
                  )}
                </div>
                <span
                  aria-hidden="true"
                  className={[
                    'inline-flex h-6 w-6 items-center justify-center rounded-full',
                    active ? 'bg-accent text-primary-dark' : 'bg-cream border border-border-strong text-transparent',
                  ].join(' ')}
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
              </div>
              <ul className={`mt-4 space-y-1.5 text-[13px] ${active ? 'text-white/90' : 'text-ink-soft'}`}>
                {pkg.includes.slice(0, 4).map((inc) => (
                  <li key={inc} className="flex items-start gap-2">
                    <span className={`mt-1.5 h-1 w-1 rounded-full shrink-0 ${active ? 'bg-accent' : 'bg-ink/40'}`} />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

function PeopleSelector({ value, onChange }) {
  return (
    <fieldset>
      <FieldHeader step="2" icon={Users} label="Número de personas" />
      <div className="mt-3 flex flex-wrap gap-2">
        {PEOPLE_OPTIONS.map((n) => {
          const active = value === n
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              aria-pressed={active}
              className={[
                'inline-flex items-center justify-center rounded-full border px-4 min-w-[64px] h-11 text-sm font-bold transition-colors',
                'focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20',
                active ? 'bg-primary border-primary text-white' : 'bg-surface border-border-strong text-ink hover:border-primary',
              ].join(' ')}
            >
              {n}
            </button>
          )
        })}
      </div>
      <p className="mt-2 text-xs text-muted">Capacidad estándar del salón.</p>
    </fieldset>
  )
}

function DateSelector({ value, onChange }) {
  const itsSat = isSaturday(value)
  return (
    <fieldset>
      <FieldHeader step="3" icon={Calendar} label="Fecha deseada" />
      <input
        type="date"
        value={value}
        min={todayISO()}
        onChange={(e) => onChange(e.target.value)}
        className="mt-3 w-full rounded-2xl border border-border-strong bg-surface px-5 h-14 text-[15px] font-medium text-ink focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 transition-all"
      />
      <p className="mt-2 text-xs text-muted">
        La disponibilidad final se confirma por WhatsApp.
        {itsSat && (
          <span className="block mt-1 text-primary font-semibold">
            Tu fecha cae en sábado: puedes agregar la opción Sábado exclusivo abajo.
          </span>
        )}
      </p>
    </fieldset>
  )
}

function ScheduleSelector({ value, onChange }) {
  return (
    <fieldset>
      <FieldHeader step="4" icon={Clock} label="Horario" />
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
        {SCHEDULES.map((s) => {
          const active = value === s.id
          const meta = SCHEDULE_META[s.id]
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onChange(s.id)}
              aria-pressed={active}
              className={[
                'relative text-left rounded-xl border p-4 transition-all',
                'focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20',
                active ? 'bg-primary border-primary text-white' : 'bg-surface border-border-strong text-ink hover:border-primary',
              ].join(' ')}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`h-2 w-2 rounded-full ${active ? 'bg-accent' : meta.dot}`} />
                <span className={`text-[10px] font-bold uppercase tracking-[0.16em] ${active ? 'text-white/80' : 'text-muted'}`}>{meta.tier}</span>
              </div>
              <p className={`text-sm font-semibold leading-snug ${active ? 'text-white' : 'text-ink'}`}>{s.label}</p>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

function FieldHeader({ step, icon: Icon, label }) {
  return (
    <legend className="flex items-center gap-2.5 w-full">
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-[11px] font-bold shrink-0">
        {step}
      </span>
      <Icon className="h-4 w-4 text-muted" />
      <span className="font-display font-bold text-ink text-[15px]">{label}</span>
    </legend>
  )
}

/* ─── Resumen ───────────────────────────────────────────────────────────── */
function QuoteSummary({ basePrice, total, pkg, people, schedule, dateLong, saturdayExclusive, message }) {
  const meta = SCHEDULE_META[schedule?.id]
  return (
    <div className="lg:sticky lg:top-24">
      <div className="relative overflow-hidden rounded-3xl bg-navy text-white p-6 md:p-7 shadow-[var(--pc-shadow-card)]">
        <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary/30 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-secondary/25 blur-3xl" aria-hidden="true" />

        <div className="relative">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">Cotización estimada</span>
            {meta && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                {meta.tier}
              </span>
            )}
          </div>

          <p className="mt-5 font-display font-bold text-5xl md:text-[3.5rem] leading-none tracking-tight">
            {formatMXN(total)}
          </p>
          <p className="mt-2 text-sm text-white/60">MXN · estimado total del evento</p>

          <dl className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm">
            <Row k="Paquete" v={pkg?.name} />
            <Row k="Duración" v={pkg?.duration} />
            <Row k="Personas" v={`${people} invitados`} />
            <Row k="Horario" v={schedule?.label} />
            <Row k="Fecha deseada" v={dateLong || 'Por definir'} />
            {saturdayExclusive && (
              <div className="flex items-baseline justify-between gap-3 pt-3 mt-1 border-t border-white/10">
                <dt className="text-accent font-semibold inline-flex items-center gap-1.5">
                  <CalendarCheck className="h-3.5 w-3.5" />
                  Sábado exclusivo
                </dt>
                <dd className="text-right font-bold text-accent">+{formatMXN(3000)}</dd>
              </div>
            )}
          </dl>

          <a
            href={whatsappUrl(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-whatsapp hover:bg-whatsapp-dark text-white font-bold h-14 text-[15px] transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-whatsapp/40"
          >
            <MessageCircle className="h-5 w-5" />
            Enviar cotización por WhatsApp
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      <div className="mt-4 flex gap-2.5 rounded-2xl border border-border bg-surface p-4">
        <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
        <p className="text-[13px] text-ink-soft leading-relaxed">
          La fecha deseada, el horario y el precio final se confirman por WhatsApp con un asesor.
          Esta estimación <strong className="text-ink">no aparta la fecha</strong>.
        </p>
      </div>
    </div>
  )
}

function Row({ k, v }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-white/55">{k}</dt>
      <dd className="text-right font-medium text-white truncate max-w-[60%]">{v ?? '—'}</dd>
    </div>
  )
}
