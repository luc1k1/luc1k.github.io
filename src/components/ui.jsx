import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform, animate } from 'framer-motion'

// Reveal on scroll
export function Reveal({ children, delay = 0, y = 40, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// Section title with per-letter animation
export function SectionTitle({ kicker, title }) {
  return (
    <div className="section-title">
      <Reveal>
        <span className="kicker">{kicker}</span>
      </Reveal>
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={{ show: { transition: { staggerChildren: 0.035 } } }}
      >
        {title.split('').map((ch, i) => (
          <motion.span
            key={i}
            style={{ display: 'inline-block', whiteSpace: 'pre' }}
            variants={{
              hidden: { opacity: 0, y: 30, rotateX: -90 },
              show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {ch}
          </motion.span>
        ))}
      </motion.h2>
    </div>
  )
}

// Number counter
export function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.8, ease: 'easeOut', onUpdate: (v) => setVal(Math.round(v)) })
    return () => c.stop()
  }, [inView, to])
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  )
}

// 3D card tilt following the cursor + glow
export function TiltCard({ children, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const rx = useSpring(useTransform(y, [0, 1], [10, -10]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(x, [0, 1], [-10, 10]), { stiffness: 200, damping: 20 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    x.set(px)
    y.set(py)
    ref.current.style.setProperty('--mx', `${px * 100}%`)
    ref.current.style.setProperty('--my', `${py * 100}%`)
  }
  const onLeave = () => {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      className={`tilt ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
    >
      {children}
    </motion.div>
  )
}

// Magnetic button
export function Magnetic({ children, className = '', ...props }) {
  const ref = useRef(null)
  const x = useSpring(0, { stiffness: 250, damping: 15 })
  const y = useSpring(0, { stiffness: 250, damping: 15 })
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.3)
    y.set((e.clientY - r.top - r.height / 2) * 0.3)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }
  return (
    <motion.a
      ref={ref}
      className={className}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      whileTap={{ scale: 0.94 }}
      {...props}
    >
      {children}
    </motion.a>
  )
}
