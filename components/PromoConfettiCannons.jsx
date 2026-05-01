'use client'

import { useEffect, useRef, useState } from 'react'

const BURST_COLORS = ['#e73343', '#ffd233', '#0066d6', '#1fb6ff', '#ff7a00', '#8d2de2', '#ffffff']

const MUZZLE_OFFSET = { x: 0.92, y: 0.06 } // Punto de origen del disparo relativo al tamaño del cañón (92% ancho, 6% alto desde el top)
const SPREAD_RAD = 0.35
const GRAVITY_MIN = 80
const GRAVITY_MAX = 360

function rnd(min, max) {
  return Math.random() * (max - min) + min
}

function generateBurst({ originX, originY, angleDeg, amount, key }) {
  const baseRad = (angleDeg * Math.PI) / 180
  return Array.from({ length: amount }, (_, i) => {
    const size = rnd(7, 15)
    const height = rnd(8, 22)
    const color = BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)]
    const duration = rnd(1000, 2200)
    const shapeRnd = Math.random()
    const shape = shapeRnd > 0.9 ? 'star' : shapeRnd > 0.78 ? 'circle' : 'rect'
    const rad = baseRad + rnd(-SPREAD_RAD, SPREAD_RAD)
    const speed = rnd(380, 820)
    const gravity = rnd(GRAVITY_MIN, GRAVITY_MAX)
    const finalX = Math.cos(rad) * speed
    const finalY = Math.sin(rad) * speed + gravity
    const rotate = rnd(-900, 900)

    return {
      id: `${key}-${i}-${Date.now()}`,
      originX,
      originY,
      size,
      height,
      color,
      duration,
      shape,
      finalX,
      finalY,
      rotate,
    }
  })
}

export default function PromoConfettiCannons({ isOpen }) {
  const [cannonVisible, setCannonVisible] = useState(false)
  const [firing, setFiring] = useState(false)
  const [pieces, setPieces] = useState([])
  const [flashes, setFlashes] = useState([])
  const timers = useRef([])
  const layerRef = useRef(null)
  const leftCannonRef = useRef(null)
  const rightCannonRef = useRef(null)

  useEffect(() => {
    // Limpiar siempre los timers del ciclo anterior
    timers.current.forEach(clearTimeout)
    timers.current = []

    if (!isOpen) {
      setCannonVisible(false)
      setFiring(false)
      setPieces([])
      setFlashes([])
      return
    }

    const add = (fn, delay) => {
      const t = setTimeout(fn, delay)
      timers.current.push(t)
    }

    // 1. Cañones entran (slide-in via CSS transition)
    add(() => setCannonVisible(true), 100)

    // 2. Disparo a los 750 ms
    add(() => {
      const layer = layerRef.current
      const leftImg = leftCannonRef.current
      const rightImg = rightCannonRef.current
      if (!layer || !leftImg || !rightImg) return

      const layerRect = layer.getBoundingClientRect()
      const leftRect  = leftImg.getBoundingClientRect()
      const rightRect = rightImg.getBoundingClientRect()

      const leftOrigin = {
        x: leftRect.left - layerRect.left + leftRect.width  * MUZZLE_OFFSET.x,
        y: leftRect.top  - layerRect.top  + leftRect.height * MUZZLE_OFFSET.y,
      }
      const rightOrigin = {
        x: rightRect.left - layerRect.left + rightRect.width  * (1 - MUZZLE_OFFSET.x),
        y: rightRect.top  - layerRect.top  + rightRect.height * MUZZLE_OFFSET.y,
      }

      setFiring(true)
      setPieces([
        ...generateBurst({ originX: leftOrigin.x,  originY: leftOrigin.y,  angleDeg: -25,  amount: 120, key: 'L' }),
        ...generateBurst({ originX: rightOrigin.x, originY: rightOrigin.y, angleDeg: -155, amount: 120, key: 'R' }),
      ])
      setFlashes([
        { id: `fl-${Date.now()}`, x: leftOrigin.x,  y: leftOrigin.y  },
        { id: `fr-${Date.now()}`, x: rightOrigin.x, y: rightOrigin.y },
      ])

      // Flash desaparece rápido
      add(() => setFlashes([]), 450)
      // Partículas se limpian del DOM cuando terminan sus animaciones
      add(() => setPieces([]), 2600)
    }, 750)

    // 3. Cañones se esconden (slide-out via CSS transition)
    add(() => setCannonVisible(false), 2200)

    // 4. Resetear estado de disparo
    add(() => setFiring(false), 3400)

    return () => {
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
  }, [isOpen])

  // Sólo renderiza en md+ (768px+)
  return (
    <div className="hidden md:block" aria-hidden="true">
      {/* Capa de partículas y flashes — cubre toda la pantalla */}
      <div
        ref={layerRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 3 }}
      >
        {flashes.map((f) => (
          <span
            key={f.id}
            className="pc-cannon-flash"
            style={{ left: f.x, top: f.y }}
          />
        ))}
        {pieces.map((p) => (
          <span
            key={p.id}
            className={[
              'pc-cannon-confetti',
              p.shape === 'circle' ? 'pc-cannon-confetti--circle' : '',
              p.shape === 'star'   ? 'pc-cannon-confetti--star'   : '',
            ].join(' ').trim()}
            style={{
              left: p.originX,
              top: p.originY,
              '--size':     `${p.size}px`,
              '--height':   `${p.height}px`,
              '--color':    p.color,
              '--duration': `${p.duration}ms`,
              '--x':        `${p.finalX}px`,
              '--y':        `${p.finalY}px`,
              '--rotate':   `${p.rotate}deg`,
            }}
          />
        ))}
      </div>

      {/* Cañón izquierdo */}
      <div
        className={[
          'pc-cannon pc-cannon-left',
          cannonVisible ? 'pc-cannon--visible' : '',
          firing        ? 'pc-cannon--shoot'   : '',
        ].join(' ').trim()}
        style={{ zIndex: 4, '--kick-x': '-12%', '--kick-rotate': '-11deg' }}
      >
        <img
          ref={leftCannonRef}
          src="/images/animaciones/cañon-removebg-preview.png"
          alt=""
          style={{ width: 'clamp(170px, 28vw, 360px)' }}
        />
      </div>

      {/* Cañón derecho (imagen espejada con CSS en globals) */}
      <div
        className={[
          'pc-cannon pc-cannon-right',
          cannonVisible ? 'pc-cannon--visible' : '',
          firing        ? 'pc-cannon--shoot'   : '',
        ].join(' ').trim()}
        style={{ zIndex: 4, '--kick-x': '12%', '--kick-rotate': '11deg' }}
      >
        <img
          ref={rightCannonRef}
          src="/images/animaciones/cañon-removebg-preview.png"
          alt=""
          style={{ width: 'clamp(170px, 28vw, 360px)' }}
        />
      </div>
    </div>
  )
}
