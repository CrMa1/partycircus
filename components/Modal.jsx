'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, children, size = 'md' }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const widths = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-3xl' }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-navy/60 backdrop-blur-sm reveal"
      onClick={onClose}
    >
      <div
        className={`relative w-full ${widths[size]} max-h-[92dvh] flex flex-col rounded-t-2xl sm:rounded-2xl bg-surface shadow-2xl text-ink overflow-hidden border border-border`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between gap-4 p-5 md:p-6 border-b border-border">
          <h2 id="modal-title" className="font-display text-xl md:text-2xl font-semibold pr-2">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted hover:text-ink hover:bg-background shrink-0 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-5 md:p-6 pb-safe">{children}</div>
      </div>
    </div>
  )
}
