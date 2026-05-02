'use client'

import { useEffect, useState } from 'react'
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import SmartImage from '@/components/SmartImage'
import { GALLERY, GALLERY_VIDEOS } from '@/lib/config'

function chunkHoneycomb(arr) {
  const rows = []
  let i = 0
  let big = true
  while (i < arr.length) {
    const size = big ? 3 : 2
    rows.push(arr.slice(i, i + size))
    i += size
    big = !big
  }
  return rows
}

export default function Galeria() {
  const [openIndex, setOpenIndex] = useState(null)
  const [activeVideo, setActiveVideo] = useState(null)

  useEffect(() => {
    if (openIndex == null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenIndex(null)
      if (e.key === 'ArrowRight') setOpenIndex((i) => (i + 1) % GALLERY.length)
      if (e.key === 'ArrowLeft') setOpenIndex((i) => (i - 1 + GALLERY.length) % GALLERY.length)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [openIndex])

  const rows = chunkHoneycomb(GALLERY)

  let cellIndex = 0

  return (
    <section id="galeria" className="section-padding bg-cream-2/40">
      <div className="container-page">
        <div className="grid md:grid-cols-12 gap-6 mb-10 md:mb-12">
          <div className="md:col-span-7">
            <span className="eyebrow">Galería</span>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl lg:text-display-md">
              Galería de eventos en Party Circus
            </h2>
          </div>
          <div className="md:col-span-5 md:flex md:items-end">
            <p className="text-ink-soft text-base">
              Una selección curada del salón y eventos celebrados con nosotros.
            </p>
          </div>
        </div>

        {/* Panal hexagonal */}
        <div className="hex-grid">
          {rows.map((row, rowIdx) => (
            <div key={rowIdx} className="hex-row">
              {row.map((img) => {
                const idx = cellIndex++
                return (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setOpenIndex(idx)}
                    className="hex-cell"
                    aria-label={`Abrir foto ${idx + 1}: ${img.alt}`}
                  >
                    <span className="hex-cell__inner">
                      <SmartImage
                        src={img.src}
                        alt={img.alt}
                        className="absolute inset-0 w-full h-full"
                        variant="cream"
                        sizes="(min-width:1024px) 200px, (min-width:768px) 22vw, 30vw"
                      />
                      <span className="hex-cell__overlay" aria-hidden="true" />
                    </span>
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        {/* Videos */}
        {GALLERY_VIDEOS.length > 0 && (
          <div className="mt-14 md:mt-20">
            <div className="flex items-end justify-between mb-5 md:mb-6">
              <span className="eyebrow">Videos</span>
            </div>
            <div className="grid md:grid-cols-3 gap-3 md:gap-4">
              {GALLERY_VIDEOS.map((v) => (
                <div key={v.id} className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-navy max-w-sm mx-auto w-full">
                  {activeVideo === v.id ? (
                    <video
                      src={v.src}
                      controls
                      autoPlay
                      playsInline
                      className="absolute inset-0 w-full h-full"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveVideo(v.id)}
                      className="group absolute inset-0 w-full h-full"
                      aria-label="Reproducir video"
                    >
                      <video
                        src={`${v.src}#t=0.1`}
                        muted
                        playsInline
                        preload="auto"
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent" />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-surface text-primary shadow-xl group-hover:scale-105 transition-transform">
                          <Play className="h-6 w-6 ml-0.5 fill-primary" />
                        </span>
                      </span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {openIndex != null && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-[60] bg-navy/95 flex items-center justify-center p-4" onClick={() => setOpenIndex(null)}>
          <button type="button" onClick={(e) => { e.stopPropagation(); setOpenIndex((i) => (i - 1 + GALLERY.length) % GALLERY.length) }}
            className="absolute left-3 md:left-8 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Anterior">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); setOpenIndex((i) => (i + 1) % GALLERY.length) }}
            className="absolute right-3 md:right-8 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Siguiente">
            <ChevronRight className="h-6 w-6" />
          </button>
          <button type="button" onClick={() => setOpenIndex(null)}
            className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Cerrar">
            <X className="h-5 w-5" />
          </button>
          <div className="relative w-full max-w-4xl aspect-[4/3]" onClick={(e) => e.stopPropagation()}>
            <SmartImage src={GALLERY[openIndex].src} alt={GALLERY[openIndex].alt} className="absolute inset-0 w-full h-full" imgClassName="object-contain" />
          </div>
        </div>
      )}
    </section>
  )
}
