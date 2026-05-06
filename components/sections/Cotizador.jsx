'use client'

import { useEffect, useMemo, useState } from 'react'
import { Check, MessageCircle, Info, Calendar, Users, Clock, Tag, ArrowRight, CalendarCheck, ShieldCheck, Ticket, X as XIcon } from 'lucide-react'
import { PACKAGES, SCHEDULES, PEOPLE_OPTIONS } from '@/lib/config'
import { getPrice, formatMXN } from '@/lib/pricing'
import { whatsappUrl } from '@/lib/whatsapp'
import { calculateDiscount, findCoupon, hasEnabledCoupons } from '@/lib/coupon'
import { isHighTariffDate } from '@/lib/calendar'

const SCHEDULE_META = {
  lunjue: { tier: '', dot: 'bg-secondary' },
  vidofes: { tier: '', dot: 'bg-primary' },
  sabtarde: { tier: '', dot: 'bg-accent' },
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

function getDayOfWeek(dateString) {
  if (!dateString) return null
  const [year, month, day] = dateString.split('-').map(Number)
  if (!year || !month || !day) return null
  return new Date(year, month - 1, day).getDay()
}

// Devuelve los IDs de horario válidos para la fecha. null = sin restricción.
function getValidSchedulesForDate(dateString) {
  const dow = getDayOfWeek(dateString)
  if (dow == null) return null
  if (isHighTariffDate(dateString)) return ['vidofes'] // festivo o sin clases SEP
  if (dow === 6) return ['lunjue', 'sabtarde']         // sábado: mañana o tarde
  if (dow === 0 || dow === 5) return ['vidofes']       // domingo o viernes
  return ['lunjue']                                     // lunes a jueves
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
  const [couponInput, setCouponInput] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponError, setCouponError] = useState('')
  const [depositReserve, setDepositReserve] = useState(false)

  const dateIsSaturday = useMemo(() => isSaturday(date), [date])
  const validSchedules = useMemo(() => getValidSchedulesForDate(date), [date])

  // Si la fecha deja de ser sábado, desactivar el extra automáticamente
  useEffect(() => {
    if (!dateIsSaturday && saturdayExclusive) setSaturdayExclusive(false)
  }, [dateIsSaturday, saturdayExclusive])

  // Si el horario seleccionado no es válido para la fecha, ajustarlo al primero válido
  useEffect(() => {
    if (validSchedules && !validSchedules.includes(scheduleId)) {
      setScheduleId(validSchedules[0])
    }
  }, [validSchedules, scheduleId])

  const basePrice = useMemo(() => getPrice(packageId, scheduleId, people), [packageId, scheduleId, people])
  const extras = saturdayExclusive ? SATURDAY_EXCLUSIVE_FEE : 0
  const subtotal = (basePrice ?? 0) + extras

  const { amount: discountAmount, total: discountedTotal } = useMemo(
    () => (appliedCoupon ? calculateDiscount(subtotal, appliedCoupon) : { amount: 0, total: subtotal }),
    [appliedCoupon, subtotal]
  )

  const selectedPackage = PACKAGES.find((p) => p.id === packageId)
  const selectedSchedule = SCHEDULES.find((s) => s.id === scheduleId)
  const dateLong = formatDateLong(date)

  function handleApplyCoupon() {
    if (!hasEnabledCoupons()) return
    const match = findCoupon(couponInput)
    if (match) {
      setAppliedCoupon(match)
      setCouponError('')
    } else {
      setAppliedCoupon(null)
      setCouponError('Cupón no válido. Verifica el código e inténtalo de nuevo.')
    }
  }

  function handleRemoveCoupon() {
    setAppliedCoupon(null)
    setCouponInput('')
    setCouponError('')
  }

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
      `Total estimado: ${formatMXN(subtotal)}`,
    ]
    if (appliedCoupon && discountAmount > 0) {
      lines.push(
        `Cupón aplicado: ${appliedCoupon.code}`,
        `Descuento: -${formatMXN(discountAmount)}`,
        `Total con cupón: ${formatMXN(discountedTotal)}`,
        '',
        `Cupón: ${appliedCoupon.description}`,
      )
    }
    if (depositReserve) {
      lines.push('', 'Me interesa apartar mi fecha con $1,000 MXN.')
    }
    lines.push('', '¿Me pueden confirmar disponibilidad, horario y precio final?')
    return lines.join('\n')
  }, [selectedPackage, people, dateLong, selectedSchedule, saturdayExclusive, subtotal, appliedCoupon, discountAmount, discountedTotal, depositReserve])

  return (
    <div id="cotizador" className="mt-16 md:mt-24 scroll-mt-24">
      <div className="rounded-3xl bg-cream-2/60 border border-border p-4 sm:p-6 md:p-10 lg:p-12">
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
              <ScheduleSelector value={scheduleId} onChange={setScheduleId} validIds={validSchedules} />

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
              subtotal={subtotal}
              discountAmount={discountAmount}
              discountedTotal={discountedTotal}
              appliedCoupon={appliedCoupon}
              couponInput={couponInput}
              setCouponInput={setCouponInput}
              onApplyCoupon={handleApplyCoupon}
              onRemoveCoupon={handleRemoveCoupon}
              couponError={couponError}
              depositReserve={depositReserve}
              setDepositReserve={setDepositReserve}
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
            <h4 className="font-display font-bold text-ink text-lg md:text-2xl mt-3 leading-tight">
              Sábado exclusivo <span className="text-primary">+$3,000 MXN</span>
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
                  'hidden sm:inline text-[11px] font-bold uppercase tracking-wider transition-colors',
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
                'group relative h-full text-left rounded-2xl p-4 md:p-5 transition-all',
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
                {pkg.includes.slice(0, 4).map((inc) => {
                  const isInherit = inc.startsWith('Todo lo que incluye')
                  return (
                    <li key={inc} className="flex items-start gap-2">
                      <span className={`mt-1.5 h-1 w-1 rounded-full shrink-0 ${active ? 'bg-accent' : 'bg-ink/40'}`} />
                      <span className={isInherit ? `font-bold ${active ? 'text-accent' : 'text-primary-dark'}` : ''}>
                        {inc}
                      </span>
                    </li>
                  )
                })}
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
  const itsHigh = isHighTariffDate(value)
  return (
    <fieldset>
      <FieldHeader step="3" icon={Calendar} label="Fecha deseada" />
      <input
        type="date"
        value={value}
        min={todayISO()}
        onChange={(e) => onChange(e.target.value)}
        className="mt-3 block w-full min-w-0 max-w-full appearance-none rounded-2xl border border-border-strong bg-surface px-5 h-14 text-[15px] font-medium text-ink focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 transition-all"
      />
      <p className="mt-2 text-xs text-muted">
        La disponibilidad final se confirma por WhatsApp.
        {itsHigh && (
          <span className="block mt-1 text-primary font-semibold">
            Día festivo o sin clases — aplica tarifa alta.
          </span>
        )}
        {itsSat && !itsHigh && (
          <span className="block mt-1 text-primary font-semibold">
            Tu fecha cae en sábado: puedes agregar la opción Sábado exclusivo abajo.
          </span>
        )}
      </p>
    </fieldset>
  )
}

function ScheduleSelector({ value, onChange, validIds }) {
  const restricted = Array.isArray(validIds)
  return (
    <fieldset>
      <FieldHeader step="4" icon={Clock} label="Horario" />
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
        {SCHEDULES.map((s) => {
          const active = value === s.id
          const meta = SCHEDULE_META[s.id]
          const disabled = restricted && !validIds.includes(s.id)
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => { if (!disabled) onChange(s.id) }}
              aria-pressed={active}
              aria-disabled={disabled}
              disabled={disabled}
              className={[
                'relative text-left rounded-xl border p-4 transition-all',
                'focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20',
                disabled
                  ? 'bg-cream-2/40 border-border text-muted cursor-not-allowed opacity-60'
                  : active
                    ? 'bg-primary border-primary text-white'
                    : 'bg-surface border-border-strong text-ink hover:border-primary',
              ].join(' ')}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`h-2 w-2 rounded-full ${disabled ? 'bg-border-strong' : active ? 'bg-accent' : meta.dot}`} />
                <span className={`text-[10px] font-bold uppercase tracking-[0.16em] ${active && !disabled ? 'text-white/80' : 'text-muted'}`}>{meta.tier}</span>
              </div>
              <p className={`text-sm font-semibold leading-snug ${disabled ? 'text-muted' : active ? 'text-white' : 'text-ink'}`}>{s.label}</p>
              {disabled && (
                <p className="mt-1.5 text-[11px] text-muted leading-tight">No aplica para la fecha elegida</p>
              )}
            </button>
          )
        })}
      </div>
      {restricted && (
        <p className="mt-2 text-xs text-muted">
          Mostramos solo los horarios disponibles para la fecha seleccionada.
        </p>
      )}
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
function QuoteSummary({
  subtotal,
  discountAmount,
  discountedTotal,
  appliedCoupon,
  couponInput,
  setCouponInput,
  onApplyCoupon,
  onRemoveCoupon,
  couponError,
  depositReserve,
  setDepositReserve,
  pkg,
  people,
  schedule,
  dateLong,
  saturdayExclusive,
  message,
}) {
  const meta = SCHEDULE_META[schedule?.id]
  const hasDiscount = !!appliedCoupon && discountAmount > 0
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

          {hasDiscount && (
            <p className="mt-4 text-sm text-white/55 line-through">
              {formatMXN(subtotal)}
            </p>
          )}
          <p className={`${hasDiscount ? 'mt-1' : 'mt-5'} font-display font-bold text-5xl md:text-[3.5rem] leading-none tracking-tight`}>
            {formatMXN(hasDiscount ? discountedTotal : subtotal)}
          </p>
          <p className="mt-2 text-sm text-white/60">
            MXN · {hasDiscount ? 'total con cupón aplicado' : 'estimado total del evento'}
          </p>

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
            {hasDiscount && (
              <div className="pt-3 mt-1 border-t border-white/10 space-y-2">
                <Row k="Total antes" v={formatMXN(subtotal)} />
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-emerald-300 font-semibold inline-flex items-center gap-1.5">
                    <Ticket className="h-3.5 w-3.5" />
                    Cupón {appliedCoupon.code}
                  </dt>
                  <dd className="text-right font-bold text-emerald-300">-{formatMXN(discountAmount)}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-3 pt-2 border-t border-white/10">
                  <dt className="font-bold text-white">Total con cupón</dt>
                  <dd className="text-right font-display font-bold text-accent text-lg">{formatMXN(discountedTotal)}</dd>
                </div>
              </div>
            )}
          </dl>

          {hasEnabledCoupons() && (
            <CouponField
              value={couponInput}
              onChange={setCouponInput}
              onApply={onApplyCoupon}
              onRemove={onRemoveCoupon}
              appliedCoupon={appliedCoupon}
              error={couponError}
              discountAmount={discountAmount}
            />
          )}

          <label
            className={[
              'mt-5 rounded-2xl border p-3.5 flex items-start gap-3 cursor-pointer select-none transition-colors',
              depositReserve
                ? 'border-accent/60 bg-accent/15'
                : 'border-white/15 bg-white/5 hover:bg-white/10',
            ].join(' ')}
          >
            <input
              type="checkbox"
              checked={depositReserve}
              onChange={(e) => setDepositReserve(e.target.checked)}
              className="sr-only peer"
              aria-label="Quiero apartar mi fecha con $1,000 MXN"
            />
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-bold text-white leading-snug">
                Aparta tu fecha con{' '}
                <span className="text-accent font-display text-[16px] tracking-tight">
                  $1,000 MXN
                </span>
              </p>
              <p className="mt-1 text-[12px] text-white/70 leading-snug">
                El anticipo se toma a cuenta de tu evento. La disponibilidad final se confirma por WhatsApp.
              </p>
            </div>
            <span className="relative inline-block h-7 w-12 shrink-0 mt-0.5">
              <span
                className={[
                  'absolute inset-0 rounded-full transition-colors',
                  depositReserve ? 'bg-accent' : 'bg-white/20',
                ].join(' ')}
              />
              <span
                className={[
                  'absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-200',
                  depositReserve ? 'translate-x-5' : '',
                ].join(' ')}
              />
            </span>
          </label>

          <a
            href={whatsappUrl(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex w-full items-center justify-center gap-1.5 sm:gap-2 rounded-2xl bg-whatsapp hover:bg-whatsapp-dark text-white font-bold h-14 px-3 text-[14px] sm:text-[15px] transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-whatsapp/40"
          >
            <MessageCircle className="h-5 w-5 shrink-0" />
            <span className="sm:hidden">Cotizar por WhatsApp</span>
            <span className="hidden sm:inline">Enviar cotización por WhatsApp</span>
            <ArrowRight className="hidden sm:inline-block h-4 w-4 transition-transform group-hover:translate-x-0.5" />
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

/* ─── Campo de cupón ────────────────────────────────────────────────────── */
function CouponField({ value, onChange, onApply, onRemove, appliedCoupon, error, discountAmount }) {
  if (appliedCoupon) {
    return (
      <div className="mt-6 rounded-2xl border border-emerald-300/30 bg-emerald-400/10 p-3.5">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300 shrink-0">
            <Ticket className="h-4 w-4" />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-bold text-emerald-200">
              Cupón {appliedCoupon.code} aplicado
            </p>
            <p className="text-[12px] text-emerald-200/80 leading-snug truncate">
              {appliedCoupon.description} · -{formatMXN(discountAmount)}
            </p>
          </div>
          <button
            type="button"
            onClick={onRemove}
            aria-label="Quitar cupón"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors shrink-0"
          >
            <XIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-6">
      <label htmlFor="coupon-input" className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] text-white/70">
        <Ticket className="h-3.5 w-3.5 text-accent" />
        ¿Tienes un cupón?
      </label>
      <div className="mt-2 flex gap-2">
        <input
          id="coupon-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onApply() } }}
          placeholder="Ingresa tu código"
          autoComplete="off"
          spellCheck="false"
          className="flex-1 min-w-0 rounded-xl bg-white/10 border border-white/15 px-3.5 sm:px-4 h-11 text-[13px] sm:text-[14px] font-medium text-white placeholder-white/40 uppercase tracking-wide focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/20 transition-all"
        />
        <button
          type="button"
          onClick={onApply}
          disabled={!value.trim()}
          className="rounded-xl bg-accent text-primary-dark font-bold px-3 sm:px-4 h-11 text-[13px] uppercase tracking-wide sm:tracking-wider hover:bg-accent/85 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
        >
          Aplicar
        </button>
      </div>
      {error && (
        <p className="mt-2 text-[12px] text-red-300 flex items-center gap-1.5">
          <XIcon className="h-3.5 w-3.5" />
          {error}
        </p>
      )}
    </div>
  )
}

function Row({ k, v }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-white/55 shrink-0">{k}</dt>
      <dd className="text-right font-medium text-white max-w-[65%] leading-snug line-clamp-2 sm:line-clamp-none sm:truncate">{v ?? '—'}</dd>
    </div>
  )
}
