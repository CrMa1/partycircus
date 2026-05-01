import sharp from 'sharp'

const SRC = 'public/images/animaciones/personajePrincipal.png'
const OUT = 'public/images/animaciones/personajePrincipal-transparent.png'

const RGB_NEAR_WHITE = 235
const SAT_TOLERANCE  = 12
const FEATHER_BAND   = 20

function isNearWhite(r, g, b) {
  if (r < RGB_NEAR_WHITE || g < RGB_NEAR_WHITE || b < RGB_NEAR_WHITE) return false
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  return (max - min) <= SAT_TOLERANCE
}

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const { width: w, height: h } = info
const buf = Buffer.from(data)

const total = w * h
const visited = new Uint8Array(total)
const stack = []

function pushIfWhite(x, y) {
  if (x < 0 || y < 0 || x >= w || y >= h) return
  const idx = y * w + x
  if (visited[idx]) return
  const i = idx * 4
  if (!isNearWhite(buf[i], buf[i+1], buf[i+2])) return
  visited[idx] = 1
  stack.push(idx)
}

for (let x = 0; x < w; x++) { pushIfWhite(x, 0); pushIfWhite(x, h-1) }
for (let y = 0; y < h; y++) { pushIfWhite(0, y); pushIfWhite(w-1, y) }

while (stack.length) {
  const idx = stack.pop()
  const x = idx % w, y = (idx - x) / w
  pushIfWhite(x+1, y)
  pushIfWhite(x-1, y)
  pushIfWhite(x, y+1)
  pushIfWhite(x, y-1)
}

let cleared = 0
for (let i = 0, p = 0; i < total; i++, p += 4) {
  if (visited[i]) {
    buf[p+3] = 0
    cleared++
  }
}

for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const idx = y * w + x
    if (visited[idx]) continue
    const i = idx * 4
    const r = buf[i], g = buf[i+1], b = buf[i+2]
    if (!isNearWhite(r, g, b)) continue
    let minDist = Infinity
    for (let dy = -FEATHER_BAND; dy <= FEATHER_BAND; dy++) {
      const ny = y + dy
      if (ny < 0 || ny >= h) continue
      for (let dx = -FEATHER_BAND; dx <= FEATHER_BAND; dx++) {
        const nx = x + dx
        if (nx < 0 || nx >= w) continue
        if (visited[ny * w + nx]) {
          const d = dx*dx + dy*dy
          if (d < minDist) minDist = d
        }
      }
    }
    if (minDist === Infinity) continue
    const dist = Math.sqrt(minDist)
    if (dist < FEATHER_BAND) {
      const t = dist / FEATHER_BAND
      buf[i+3] = Math.round(t * 255)
    }
  }
}

await sharp(buf, { raw: { width: w, height: h, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile(OUT)

console.log(`OK → ${OUT}`)
console.log(`Pixeles vueltos transparentes: ${cleared} / ${total} (${((cleared/total)*100).toFixed(1)}%)`)
