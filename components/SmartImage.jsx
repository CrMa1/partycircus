'use client'

import { useState } from 'react'

/**
 * SmartImage — <img> con fallback elegante de marca cuando el archivo no existe.
 * Mantiene el aspect ratio del wrapper, sin reventar layout.
 */
export default function SmartImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  imgStyle,
  priority = false,
  sizes,
  variant = 'auto', // 'auto' | 'soft' | 'cream'
}) {
  const [errored, setErrored] = useState(false)

  if (errored || !src) {
    return <Placeholder className={className} alt={alt} variant={variant} />
  }

  return (
    <div className={`${className} relative overflow-hidden`}>
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        sizes={sizes}
        style={imgStyle}
        onError={() => setErrored(true)}
        className={`absolute inset-0 w-full h-full object-cover ${imgClassName}`}
      />
    </div>
  )
}

/**
 * Placeholder visual elegante. NO caja vacía. Mantiene identidad de Party Circus
 * con un patrón discreto, micrologo y leyenda corta.
 */
function Placeholder({ className = '', alt = '', variant = 'auto' }) {
  const tone =
    variant === 'soft'
      ? 'bg-cream'
      : variant === 'cream'
      ? 'bg-cream-2'
      : 'bg-surface-soft'

  return (
    <div
      className={`${className} relative overflow-hidden ${tone} border border-border flex items-center justify-center`}
      role="img"
      aria-label={alt || 'Imagen pendiente'}
    >
      {/* Patrón de carpa muy discreto */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.08]"
        viewBox="0 0 80 80"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="pc-tent" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 40 L20 0 L40 40 Z" fill="rgb(var(--color-primary))" />
            <path d="M40 40 L60 0 L80 40 Z" fill="rgb(var(--color-secondary))" transform="translate(-40 0)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pc-tent)" />
      </svg>

      {/* Cinta tricolor superior */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-1.5"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, rgb(var(--color-primary)) 0 12px, rgb(var(--color-accent)) 12px 24px, rgb(var(--color-secondary)) 24px 36px)',
        }}
      />

      <div className="relative flex flex-col items-center gap-2.5 px-6 text-center max-w-[85%]">
        <img
          src="/images/party-circus/logo/party-circus-logo-circular.png"
          alt=""
          aria-hidden="true"
          className="h-14 w-14 rounded-full shadow-md object-cover"
        />
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
          Party Circus
        </span>
        <span className="text-xs md:text-[13px] text-ink-soft leading-snug max-w-[28ch]">
          {alt || 'Imagen del salón'}
        </span>
      </div>
    </div>
  )
}
