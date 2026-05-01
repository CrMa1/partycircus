import sharp from 'sharp'

const file = process.argv[2] || 'public/images/animaciones/personajePrincipal.png'
const img = sharp(file)
const meta = await img.metadata()
console.log('format:', meta.format)
console.log('size:', meta.width + 'x' + meta.height)
console.log('channels:', meta.channels)
console.log('hasAlpha:', meta.hasAlpha)

const { data, info } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const w = info.width, h = info.height
const corners = [
  [0,0],[w-1,0],[0,h-1],[w-1,h-1]
]
for (const [x,y] of corners) {
  const i = (y*w + x) * 4
  console.log(`corner (${x},${y}): r=${data[i]} g=${data[i+1]} b=${data[i+2]} a=${data[i+3]}`)
}

let transparent = 0, total = 0
for (let y = 0; y < h; y += 10) {
  for (let x = 0; x < w; x += 10) {
    const i = (y*w + x) * 4
    if (data[i+3] < 5) transparent++
    total++
  }
}
console.log(`transparent_sample: ${transparent}/${total}`)
