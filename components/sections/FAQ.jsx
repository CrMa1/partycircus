'use client'

import { useState } from 'react'
import { Plus, MessageCircle, HelpCircle } from 'lucide-react'
import { FAQ as FAQ_DATA } from '@/lib/config'
import { whatsappUrl } from '@/lib/whatsapp'

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="section-padding bg-cream">
      <div className="container-page">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <span className="eyebrow">Preguntas frecuentes</span>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl lg:text-display-md">
              Preguntas frecuentes
            </h2>
            <p className="mt-5 text-ink-soft text-base md:text-lg">
              Si necesitas más detalle, escríbenos por WhatsApp y te atendemos al momento.
            </p>

            <div className="mt-7 rounded-2xl bg-surface border border-border p-5 flex gap-4">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <HelpCircle className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display font-bold text-ink">¿No ves tu pregunta?</p>
                <p className="mt-1 text-sm text-ink-soft">Escríbenos por WhatsApp y un asesor responde al momento.</p>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-4">
                  <MessageCircle className="h-4 w-4" />
                  Hacer mi pregunta
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ul className="rounded-3xl bg-surface border border-border overflow-hidden divide-y divide-border">
              {FAQ_DATA.map((item, i) => {
                const isOpen = open === i
                return (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      className="w-full flex items-start justify-between gap-4 p-5 md:p-6 text-left hover:bg-cream/40 transition-colors"
                    >
                      <h3 className="font-display font-bold text-ink text-base md:text-lg pr-2 leading-snug">
                        {item.q}
                      </h3>
                      <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all ${isOpen ? 'bg-primary text-white rotate-45' : 'bg-cream-2 border border-border-strong text-ink'}`}>
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                    <div className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                      <div className="overflow-hidden">
                        <p className="px-5 md:px-6 pb-5 md:pb-6 text-ink-soft text-[15px] md:text-base leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
