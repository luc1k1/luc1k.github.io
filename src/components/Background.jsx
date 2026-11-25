import { useEffect, useRef } from 'react'

// Animated particle "neural network" that reacts to the cursor
export default function Background() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true })
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w, h, dpr, particles, raf
    const mouse = { x: -9999, y: -9999 }

    const init = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = canvas.width = window.innerWidth * dpr
      h = canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      const count = Math.min(window.innerWidth < 700 ? 40 : 85, Math.floor((window.innerWidth * window.innerHeight) / 16000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35 * dpr,
        vy: (Math.random() - 0.5) * 0.35 * dpr,
        r: (Math.random() * 1.6 + 0.6) * dpr,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const maxDist = 140 * dpr
      const maxD2 = maxDist * maxDist
      const repel2 = (160 * dpr) ** 2
      const mx = mouse.x * dpr
      const my = mouse.y * dpr
      // bucket lines by opacity so we stroke a few paths instead of hundreds
      const buckets = [[], [], [], []]
      ctx.fillStyle = 'rgba(196, 167, 255, 0.8)'
      ctx.beginPath()
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        const dxm = p.x - mx
        const dym = p.y - my
        const dm2 = dxm * dxm + dym * dym
        if (dm2 < repel2 && dm2 > 0) {
          const dm = Math.sqrt(dm2)
          p.x += (dxm / dm) * 0.9
          p.y += (dym / dm) * 0.9
        }

        ctx.moveTo(p.x + p.r, p.y)
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const d2 = dx * dx + dy * dy
          if (d2 < maxD2) {
            const k = Math.min(3, Math.floor((1 - Math.sqrt(d2) / maxDist) * 4))
            buckets[k].push(p.x, p.y, q.x, q.y)
          }
        }
      }
      ctx.fill()
      ctx.lineWidth = dpr * 0.8
      for (let k = 0; k < 4; k++) {
        const b = buckets[k]
        if (!b.length) continue
        ctx.strokeStyle = `rgba(139, 92, 246, ${((k + 0.5) / 4) * 0.35})`
        ctx.beginPath()
        for (let n = 0; n < b.length; n += 4) {
          ctx.moveTo(b[n], b[n + 1])
          ctx.lineTo(b[n + 2], b[n + 3])
        }
        ctx.stroke()
      }
      if (!reduce) raf = requestAnimationFrame(draw)
    }

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onResize = () => init()

    init()
    draw()
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <>
      <div className="bg-gradient" aria-hidden />
      <div className="blob blob-1" aria-hidden />
      <div className="blob blob-2" aria-hidden />
      <div className="blob blob-3" aria-hidden />
      <canvas ref={ref} className="bg-canvas" aria-hidden />
      <div className="bg-noise" aria-hidden />
    </>
  )
}
