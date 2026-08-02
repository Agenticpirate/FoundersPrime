#!/usr/bin/env node
/**
 * Generate the decorative brand artwork used inside emails.
 *
 *   node scripts/generate-email-art.mjs
 *
 * Email clients do not render SVG, so the brand motifs are rasterised to PNG at
 * 2x and displayed at half size for retina sharpness. Output lands in
 * public/email/ and is served from the production host by emailAssetBase().
 *
 * Two pieces, both built from the same geometric-mandala language as the site:
 *   divider-band.png     600x28 display — repeating rosette band, section rule
 *   mandala-medallion.png 110x110 display — radial motif for offer blocks
 */
import sharp from 'sharp'
import path from 'node:path'
import fs from 'node:fs'

const INK = '#111111'
const ACCENT = '#ffd700'
const OUT_DIR = path.join(process.cwd(), 'public', 'email')

fs.mkdirSync(OUT_DIR, { recursive: true })

/** One rosette of the repeating band: rings, spokes and a connecting rule. */
function bandUnit(offsetX, unit, height) {
  const cx = offsetX + unit / 2
  const cy = height / 2
  const spokes = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * Math.PI) / 4
    const x1 = cx + Math.cos(angle) * 20
    const y1 = cy + Math.sin(angle) * 20
    const x2 = cx + Math.cos(angle) * 25
    const y2 = cy + Math.sin(angle) * 25
    return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${ACCENT}" stroke-width="1.6" opacity="0.55"/>`
  }).join('')

  return `
    <line x1="${offsetX}" y1="${cy}" x2="${cx - 26}" y2="${cy}" stroke="${ACCENT}" stroke-width="1.2" opacity="0.28"/>
    <line x1="${cx + 26}" y1="${cy}" x2="${offsetX + unit}" y2="${cy}" stroke="${ACCENT}" stroke-width="1.2" opacity="0.28"/>
    <rect x="${offsetX + 6}" y="${cy - 3}" width="6" height="6" transform="rotate(45 ${offsetX + 9} ${cy})" fill="${ACCENT}" opacity="0.45"/>
    <circle cx="${cx}" cy="${cy}" r="20" fill="none" stroke="${ACCENT}" stroke-width="1.8" opacity="0.9"/>
    <circle cx="${cx}" cy="${cy}" r="11" fill="none" stroke="${ACCENT}" stroke-width="1.4" opacity="0.5"/>
    <circle cx="${cx}" cy="${cy}" r="3.4" fill="${ACCENT}"/>
    ${spokes}`
}

function dividerBandSvg() {
  const width = 1200
  const height = 56
  const unit = 100
  const units = Array.from({ length: width / unit }, (_, i) => bandUnit(i * unit, unit, height)).join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="${INK}"/>
    ${units}
  </svg>`
}

function medallionSvg() {
  const size = 220
  const c = size / 2

  const ticks = Array.from({ length: 24 }, (_, i) => {
    const angle = (i * Math.PI) / 12
    const inner = 74
    const outer = i % 2 === 0 ? 90 : 83
    const x1 = c + Math.cos(angle) * inner
    const y1 = c + Math.sin(angle) * inner
    const x2 = c + Math.cos(angle) * outer
    const y2 = c + Math.sin(angle) * outer
    return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${i % 2 === 0 ? INK : ACCENT}" stroke-width="${i % 2 === 0 ? 3 : 4}" stroke-linecap="round"/>`
  }).join('')

  const hexPoints = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * Math.PI) / 3 - Math.PI / 2
    return `${(c + Math.cos(angle) * 42).toFixed(1)},${(c + Math.sin(angle) * 42).toFixed(1)}`
  }).join(' ')

  const hexSpokes = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * Math.PI) / 3 - Math.PI / 2
    const x1 = c + Math.cos(angle) * 42
    const y1 = c + Math.sin(angle) * 42
    const x2 = c + Math.cos(angle) * 64
    const y2 = c + Math.sin(angle) * 64
    return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${INK}" stroke-width="2.4"/>`
  }).join('')

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <circle cx="${c}" cy="${c}" r="104" fill="none" stroke="${INK}" stroke-width="3"/>
    <circle cx="${c}" cy="${c}" r="97" fill="none" stroke="${ACCENT}" stroke-width="5" stroke-dasharray="7 7"/>
    ${ticks}
    <circle cx="${c}" cy="${c}" r="64" fill="none" stroke="${INK}" stroke-width="2.4"/>
    ${hexSpokes}
    <polygon points="${hexPoints}" fill="none" stroke="${ACCENT}" stroke-width="5"/>
    <circle cx="${c}" cy="${c}" r="24" fill="${INK}"/>
    <circle cx="${c}" cy="${c}" r="9" fill="${ACCENT}"/>
  </svg>`
}

const jobs = [
  { file: 'divider-band.png', svg: dividerBandSvg() },
  { file: 'mandala-medallion.png', svg: medallionSvg() },
]

for (const job of jobs) {
  const target = path.join(OUT_DIR, job.file)
  await sharp(Buffer.from(job.svg)).png({ compressionLevel: 9 }).toFile(target)
  const { size } = fs.statSync(target)
  const meta = await sharp(target).metadata()
  console.log(`${job.file.padEnd(24)} ${meta.width}x${meta.height}  ${(size / 1024).toFixed(1)} KB`)
}
