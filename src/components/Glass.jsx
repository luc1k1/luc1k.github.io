import { useEffect } from 'react'

// Liquid glass support:
// 1. an SVG displacement filter that bends the backdrop like a lens (Chromium only —
//    other browsers get the same frosted glass without the bend);
// 2. a light source that follows the pointer, so each .glass rim and sheen catches it.
export default function Glass() {
  useEffect(() => {
    const root = document.documentElement
    if (window.chrome && !/Firefox/.test(navigator.userAgent)) root.classList.add('lg-refract')
    if (window.matchMedia('(hover: none)').matches) return

    let raf = 0
    let x = 0
    let y = 0
    const update = () => {
      raf = 0
      for (const el of document.querySelectorAll('.glass')) {
        const r = el.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        el.style.setProperty('--gx', `${((x - r.left) / r.width) * 100}%`)
        el.style.setProperty('--gy', `${((y - r.top) / r.height) * 100}%`)
        el.style.setProperty('--ga', `${(Math.atan2(y - cy, x - cx) * 180) / Math.PI + 90}deg`)
      }
    }
    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      if (!raf) raf = requestAnimationFrame(update)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
      <filter id="lg-refract" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.006 0.012" numOctaves="2" seed="7" result="noise" />
        <feGaussianBlur in="noise" stdDeviation="2.5" result="soft" />
        <feDisplacementMap in="SourceGraphic" in2="soft" scale="26" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  )
}
