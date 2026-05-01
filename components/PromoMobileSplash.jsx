'use client'

import { useEffect, useRef, useState } from 'react'

const SPLASH_COLORS = ['#e73343', '#ffd233', '#0066d6', '#1fb6ff', '#ff7a00', '#8d2de2', '#ffffff']
const DURATION_MS = 5000
const SPAWN_INTERVAL_MS = 250
const BURST_BASE = 14

const BURST_ORIGINS = [
  { x: 15, y: 25 },
  { x: 85, y: 25 },
  { x: 10, y: 55 },
  { x: 90, y: 55 },
  { x: 25, y: 82 },
  { x: 75, y: 82 },
]

function rnd(min, max) {
  return Math.random() * (max - min) + min
}

function makeParticle(originXPct, originYPct, key) {
  const angle = rnd(0, Math.PI * 2)
  const speed = rnd(70, 240)
  const gravity = rnd(40, 160)
  const finalX = Math.cos(angle) * speed
  const finalY = Math.sin(angle) * speed + gravity
  const rotate = rnd(-720, 720)
  const w = rnd(6, 12)
  const h = Math.max(2, w * rnd(0.35, 0.6))
  const color = SPLASH_COLORS[Math.floor(Math.random() * SPLASH_COLORS.length)]
  const duration = rnd(900, 1500)
  const shapeRnd = Math.random()
  const shape = shapeRnd > 0.88 ? 'star' : shapeRnd > 0.7 ? 'circle' : 'rect'
  return {
    id: key,
    shape,
    style: {
      left: `${originXPct}%`,
      top: `${originYPct}%`,
      width: `${w}px`,
      height: `${h}px`,
      backgroundColor: color,
      '--x': `${finalX}px`,
      '--y': `${finalY}px`,
      '--rotate': `${rotate}deg`,
      animationDuration: `${duration}ms`,
    },
  }
}

function makeBatch(timeLeft, batchId) {
  const ratio = Math.max(0, timeLeft / DURATION_MS)
  const count = Math.max(3, Math.round(BURST_BASE * ratio))
  const a = BURST_ORIGINS[Math.floor(Math.random() * BURST_ORIGINS.length)]
  let b = BURST_ORIGINS[Math.floor(Math.random() * BURST_ORIGINS.length)]
  if (b === a) b = BURST_ORIGINS[(BURST_ORIGINS.indexOf(a) + 3) % BURST_ORIGINS.length]
  const out = []
  for (let i = 0; i < count; i++) {
    out.push(makeParticle(a.x, a.y, `${batchId}-A-${i}`))
    out.push(makeParticle(b.x, b.y, `${batchId}-B-${i}`))
  }
  return out
}

export default function PromoMobileSplash({ isOpen }) {
  const [active, setActive] = useState(false)
  const [closing, setClosing] = useState(false)
  const [pieces, setPieces] = useState([])
  const timers = useRef([])
  const spawnInterval = useRef(null)

  useEffect(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    if (spawnInterval.current) {
      clearInterval(spawnInterval.current)
      spawnInterval.current = null
    }

    if (!isOpen) {
      setActive(false)
      setClosing(false)
      setPieces([])
      return
    }

    setActive(true)
    setClosing(false)
    setPieces([])

    const startedAt = Date.now()
    let batchCount = 0

    spawnInterval.current = setInterval(() => {
      const timeLeft = DURATION_MS - (Date.now() - startedAt)
      if (timeLeft <= 0) {
        clearInterval(spawnInterval.current)
        spawnInterval.current = null
        return
      }
      const batch = makeBatch(timeLeft, `b${batchCount++}`)
      setPieces((prev) => [...prev, ...batch])
    }, SPAWN_INTERVAL_MS)

    const tFadeOut = setTimeout(() => setClosing(true), DURATION_MS - 400)
    const tEnd = setTimeout(() => {
      setActive(false)
      setClosing(false)
      setPieces([])
    }, DURATION_MS)
    timers.current.push(tFadeOut, tEnd)

    return () => {
      timers.current.forEach(clearTimeout)
      timers.current = []
      if (spawnInterval.current) {
        clearInterval(spawnInterval.current)
        spawnInterval.current = null
      }
    }
  }, [isOpen])

  if (!active) return null

  return (
    <div
      aria-hidden="true"
      data-state={closing ? 'closing' : 'open'}
      className="pc-splash-mobile md:hidden fixed inset-0 z-[90] pointer-events-none overflow-hidden"
    >
      <div className="pc-splash-mobile__bg absolute inset-0" />
      <img
        src="/images/animaciones/personajePrincipal-transparent.png"
        alt=""
        className="pc-splash-mobile__hero"
      />
      <div className="absolute inset-0 overflow-hidden">
        {pieces.map((p) => (
          <span
            key={p.id}
            className={[
              'pc-splash-burst',
              p.shape === 'circle' ? 'pc-splash-burst--circle' : '',
              p.shape === 'star'   ? 'pc-splash-burst--star'   : '',
            ].join(' ').trim()}
            style={p.style}
          />
        ))}
      </div>
    </div>
  )
}
