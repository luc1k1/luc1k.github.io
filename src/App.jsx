import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Background from './components/Background.jsx'
import ProjectArt from './components/ProjectArt.jsx'
import { Magnetic, TiltCard } from './components/ui.jsx'
import { education, experience, languages, profile, skills } from './data.js'
import { projects } from './projects.js'

const ease = [0.22, 1, 0.36, 1]

// Each bento tile pops in with a short stagger — everything is on screen in < 1s
function Tile({ i = 0, className = '', children, tilt = false, ...rest }) {
  const inner = tilt ? <TiltCard className="tile-inner glass">{children}</TiltCard> : <div className="tile-inner glass">{children}</div>
  return (
    <motion.div
      className={`tile ${className}`}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay: 0.05 + i * 0.06, ease }}
      {...rest}
    >
      {inner}
    </motion.div>
  )
}

function CursorGlow() {
  const ref = useRef(null)
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0
    const tick = () => {
      cx += (x - cx) * 0.18
      cy += (y - cy) * 0.18
      if (ref.current) ref.current.style.transform = `translate3d(${cx - 300}px, ${cy - 300}px, 0)`
      raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.5 ? requestAnimationFrame(tick) : 0
    }
    const move = (e) => {
      x = e.clientX
      y = e.clientY
      if (!raf) raf = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])
  return <div ref={ref} className="cursor-glow" aria-hidden />
}

const Icon = {
  mail: (
    <svg viewBox="0 0 24 24" aria-hidden><path d="M3 6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5v-11Zm2.2-.3 6.8 5.2 6.8-5.2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" aria-hidden><path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.06c.53-.96 1.83-1.97 3.77-1.97 4.03 0 4.77 2.55 4.77 5.86V21h-4v-5.1c0-1.22-.02-2.78-1.74-2.78-1.74 0-2.01 1.33-2.01 2.7V21h-4V9.75Z" /></svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" aria-hidden><path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" /></svg>
  ),
}

function Hero() {
  return (
    <Tile i={0} className="t-hero">
      <div className="badge">
        <span className="dot" /> Open to work
      </div>
      <h1>
        Rasul <span className="grad">Eyvazli</span>
      </h1>
      <p className="hero-role">
        {profile.roles.map((r, i) => (
          <span key={r} className="role-item">
            {i > 0 && <i>·</i>}
            {r}
          </span>
        ))}
      </p>
      <p className="hero-sub">{profile.summary}</p>
      <div className="hero-cta">
        <Magnetic href={profile.cv} download className="btn primary">
          Download CV <span>↓</span>
        </Magnetic>
        <Magnetic href={`mailto:${profile.email}`} className="btn ghost icon" aria-label="Email">
          {Icon.mail}
        </Magnetic>
        <Magnetic href={profile.linkedin} target="_blank" rel="noreferrer" className="btn ghost icon" aria-label="LinkedIn">
          {Icon.linkedin}
        </Magnetic>
        <Magnetic href={profile.github} target="_blank" rel="noreferrer" className="btn ghost icon" aria-label="GitHub">
          {Icon.github}
        </Magnetic>
      </div>
    </Tile>
  )
}

function Monogram() {
  return (
    <Tile i={1} className="t-mono">
      {profile.photo ? (
        <img className="photo" src={profile.photo} alt={profile.name} />
      ) : (
        <div className="mono-art" aria-hidden>
          <motion.div className="ring r1" animate={{ rotate: 360 }} transition={{ duration: 16, repeat: Infinity, ease: 'linear' }} />
          <motion.div className="ring r2" animate={{ rotate: -360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }} />
          <motion.div className="mono-letters" animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
            RE
          </motion.div>
        </div>
      )}
    </Tile>
  )
}

function ProjectTile({ p, i, onOpen }) {
  return (
    <Tile i={i} className={`t-project t-p${i - 1}`} tilt>
      <button className="project-btn" onClick={() => onOpen(p)} aria-label={`${p.title} — details`}>
        <div className="project-media">
          {p.image ? <img src={p.image} alt="" loading="lazy" /> : <ProjectArt name={p.art} />}
          {p.badge && <span className="pbadge">{p.badge}</span>}
        </div>
        <div className="project-body">
          <div className="project-head">
            <h3>{p.title}</h3>
            <span className="more">Details →</span>
          </div>
          <p>{p.summary}</p>
          {p.metrics && (
            <div className="metrics" style={{ gridTemplateColumns: `repeat(${Math.min(p.metrics.length, 4)}, 1fr)` }}>
              {p.metrics.slice(0, 4).map((m) => (
                <div key={m.label}>
                  <b>{m.value}</b>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </button>
    </Tile>
  )
}

function ProjectModal({ p, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])
  return (
    <motion.div className="modal-bg" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        className="modal glass"
        role="dialog"
        aria-modal="true"
        aria-label={p.title}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.35, ease }}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        <div className="modal-media">
          {p.image ? <img src={p.image} alt="" /> : <ProjectArt name={p.art} />}
        </div>
        <div className="modal-body">
          <div className="modal-title">
            <h3>{p.title}</h3>
            {p.badge && <span className="pbadge static">{p.badge}</span>}
          </div>
          <p>{p.description}</p>
          {p.metrics && (
            <div className="metrics wide">
              {p.metrics.map((m) => (
                <div key={m.label}>
                  <b>{m.value}</b>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
          )}
          {p.paper && (
            <div className="paper">
              <span>📄 Research paper</span>
              <i>{p.paper}</i>
              {p.authors && <small>{p.authors}</small>}
            </div>
          )}
          {p.tags && (
            <div className="chips">
              {p.tags.map((t) => (
                <span className="chip sm" key={t}>{t}</span>
              ))}
            </div>
          )}
          {(p.link || p.github) && (
            <div className="project-links">
              {p.link && <a href={p.link} target="_blank" rel="noreferrer">Live ↗</a>}
              {p.github && <a href={p.github} target="_blank" rel="noreferrer">GitHub ↗</a>}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

function Experience({ i }) {
  return (
    <Tile i={i} className="t-exp">
      <h4 className="label">Experience</h4>
      <div className="exp-list">
        {experience.map((e) => (
          <div className="exp" key={e.company}>
            <div className="exp-top">
              <b>{e.role}</b>
              <span className="mono-sm">{e.period}</span>
            </div>
            <span className="company">@ {e.company}</span>
            <p>{e.short}</p>
          </div>
        ))}
      </div>
    </Tile>
  )
}

function Skills({ i }) {
  return (
    <Tile i={i} className="t-skills">
      <h4 className="label">Skills</h4>
      <div className="skill-groups">
        {skills.map((g) => (
          <div key={g.title} className="sg">
            <span className="sg-title">{g.title}</span>
            <div className="chips">
              {g.items.map((it) => (
                <span className="chip sm" key={it}>{it}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Tile>
  )
}

function Education({ i }) {
  return (
    <Tile i={i} className="t-edu">
      <h4 className="label">Education</h4>
      <div className="edu-icon">🎓</div>
      <b className="edu-school">{education.school}</b>
      <span className="edu-meta">{education.degree}</span>
      <span className="edu-meta mono-sm">{education.period}</span>
    </Tile>
  )
}

function Languages({ i }) {
  return (
    <Tile i={i} className="t-lang">
      <h4 className="label">Languages</h4>
      {languages.map((l, k) => (
        <div className="lang" key={l.name}>
          <div className="lang-top">
            <span>{l.name}</span>
            <small>{l.level}</small>
          </div>
          <div className="bar">
            <motion.span initial={{ width: 0 }} animate={{ width: `${l.pct}%` }} transition={{ duration: 1.1, delay: 0.5 + k * 0.12, ease }} />
          </div>
        </div>
      ))}
    </Tile>
  )
}

function Contact({ i }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }
  return (
    <Tile i={i} className="t-contact">
      <h4 className="label">Let’s work together</h4>
      <button className="email" onClick={copy}>
        <span>{profile.email}</span>
        <AnimatePresence mode="wait">
          <motion.small key={copied ? 'y' : 'n'} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
            {copied ? '✓ copied' : 'click to copy'}
          </motion.small>
        </AnimatePresence>
      </button>
    </Tile>
  )
}

export default function App() {
  const [open, setOpen] = useState(null)
  return (
    <>
      <Background />
      <CursorGlow />
      <main className="bento">
        <Hero />
        <Monogram />
        {projects.map((p, k) => (
          <ProjectTile key={p.title} p={p} i={2 + k} onOpen={setOpen} />
        ))}
        <Experience i={4} />
        <Skills i={5} />
        <Education i={6} />
        <Languages i={7} />
        <Contact i={8} />
      </main>
      <footer>© {new Date().getFullYear()} {profile.name}</footer>
      <AnimatePresence>{open && <ProjectModal p={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </>
  )
}
