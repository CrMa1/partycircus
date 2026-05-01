'use client'

import { useEffect, useState } from 'react'

const COLORS = ['#d13447', '#ffbf00', '#263672']

function generatePieces(count) {
  return Array.from({ length: count }, (_, i) => {
    const w = Math.floor(Math.random() * 8) + 5           // 5–12 px
    const h = Math.max(1, Math.round(w * 0.4))
    const l = Math.random() * 100
    const startY = Math.random() * 120 - 20
    const drift = Math.random() * 20 - 10
    const rot = Math.floor(Math.random() * 360)
    const delay = -(Math.random() * 5)                    // delay negativo → flujo continuo desde el inicio
    const color = COLORS[Math.floor(Math.random() * COLORS.length)]
    const opacity = 0.6 + Math.random() * 0.4

    return {
      id: i,
      style: {
        width: `${w}px`,
        height: `${h}px`,
        backgroundColor: color,
        left: `${l}%`,
        top: `${startY}%`,
        opacity,
        '--rot': `${rot}deg`,
        '--rot-end': `${rot + 360}deg`,
        '--drift': `${drift}vw`,
        animationDelay: `${delay}s`,
      },
    }
  })
}

export default function PromoBackgroundConfetti({ isOpen }) {
  const [pieces, setPieces] = useState(null)

  // Generar en cliente para evitar mismatch de hidratación (Math.random en server ≠ client)
  useEffect(() => {
    setPieces(generatePieces(150))
  }, [])

  if (!isOpen || !pieces) return null

  return (
    <div
      aria-hidden="true"
      className="hidden md:block absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {pieces.map((p) => (
        <div key={p.id} className="pc-bg-confetti-piece" style={p.style} />
      ))}
    </div>
  )
}
