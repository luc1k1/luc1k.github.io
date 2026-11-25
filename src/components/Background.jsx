import { useEffect, useRef } from 'react'

// Animated particle "neural network" that reacts to the cursor
export default function Background() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w, h, dpr, particles, raf
    const mouse = { x: -9999, y: -9999 }

    const init = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.width = window.innerWidth * dpr
      h = canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      const count = Math.min(90, Math.floor((window.innerWidth * window.innerHeight) / 16000))
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
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        const dxm = p.x - mouse.x * dpr
        const dym = p.y - mouse.y * dpr
        const dm = Math.hypot(dxm, dym)
        if (dm < 160 * dpr) {
          p.x += (dxm / dm) * 0.9
          p.y += (dym / dm) * 0.9
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(196, 167, 255, 0.8)'
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const d = Math.hypot(p.x - q.x, p.y - q.y)
          if (d < maxDist) {
            ctx.strokeStyle = `rgba(139, 92, 246, ${(1 - d / maxDist) * 0.35})`
            ctx.lineWidth = dpr * 0.8
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }
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
    window.addEventListener('mousemove', onMove)
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
