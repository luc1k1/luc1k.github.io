import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ProjectArt from './components/ProjectArt.jsx'
import { education, experience, languages, profile, skills } from './data.js'
import { projects } from './projects.js'

const ease = [0.22, 1, 0.36, 1]

// Quiet fade-up as each block enters the viewport
function Fade({ children, delay = 0, className, as = "div", now = false }) {
  const M = motion[as]
  const show = { opacity: 1, y: 0 }
  return (
    <M
      className={className}
      initial={{ opacity: 0, y: 14 }}
      {...(now ? { animate: show } : { whileInView: show, viewport: { once: true, margin: "-40px" } })}
      transition={{ duration: 0.6, delay, ease }}
    >
      {children}
    </M>
  )
}

function Section({ id, title, children }) {
  return (
    <section className="section" id={id}>
      <Fade as="h2" className="section-label">{title}</Fade>
      <div className="section-body">{children}</div>
    </section>
  )
}

function Hero() {
  return (
    <header className="hero">
      <Fade now className="status">
        <span className="dot" /> Open to work
      </Fade>
      <Fade now as="h1" delay={0.05}>{profile.name}</Fade>
      <Fade now as="p" delay={0.1} className="hero-role">{profile.roles.join(' · ')}</Fade>
      <Fade now as="p" delay={0.15} className="hero-sub">{profile.summary}</Fade>
      <Fade now delay={0.2} className="hero-links">
        <a href={profile.cv} download className="btn">Download CV ↓</a>
        <a href={`mailto:${profile.email}`} className="link">Email</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link">LinkedIn ↗</a>
        <a href={profile.github} target="_blank" rel="noreferrer" className="link">GitHub ↗</a>
      </Fade>
    </header>
  )
}

function ProjectRow({ p, i, onOpen }) {
  return (
    <Fade delay={i * 0.05}>
      <button className="project" onClick={() => onOpen(p)} aria-label={`${p.title} — details`}>
        <div className="project-text">
          <div className="project-head">
            <h3>{p.title}</h3>
            {p.badge && <span className="tag">{p.badge}</span>}
          </div>
          <p>{p.summary}</p>
          {p.metrics && (
            <dl className="figures">
              {p.metrics.slice(0, 4).map((m) => (
                <div key={m.label}>
                  <dt>{m.value}</dt>
                  <dd>{m.label}</dd>
                </div>
              ))}
            </dl>
          )}
          <span className="more">Read more →</span>
        </div>
        <div className="project-media" aria-hidden>
          {p.image ? <img src={p.image} alt="" loading="lazy" /> : <ProjectArt name={p.art} />}
        </div>
      </button>
    </Fade>
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
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={p.title}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.3, ease }}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        <div className="modal-media">
          {p.image ? <img src={p.image} alt="" /> : <ProjectArt name={p.art} />}
        </div>
        <div className="modal-body">
          <div className="project-head">
            <h3>{p.title}</h3>
            {p.badge && <span className="tag">{p.badge}</span>}
          </div>
          <p>{p.description}</p>
          {p.metrics && (
            <dl className="figures">
              {p.metrics.map((m) => (
                <div key={m.label}>
                  <dt>{m.value}</dt>
                  <dd>{m.label}</dd>
                </div>
              ))}
            </dl>
          )}
          {(p.paper || p.authors) && (
            <div className="paper">
              <span>Research paper</span>
              {p.paper && <i>{p.paper}</i>}
              {p.authors && <small>{p.authors}</small>}
            </div>
          )}
          {p.tags && <p className="stack">{p.tags.join(' · ')}</p>}
          {(p.link || p.github) && (
            <div className="hero-links">
              {p.link && <a className="link" href={p.link} target="_blank" rel="noreferrer">Live ↗</a>}
              {p.github && <a className="link" href={p.github} target="_blank" rel="noreferrer">GitHub ↗</a>}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

function Contact() {
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
    <Fade>
      <p className="muted">Open to ML / computer-vision and backend roles. The fastest way to reach me:</p>
      <button className="email" onClick={copy}>
        <span>{profile.email}</span>
        <small>{copied ? '✓ copied' : 'click to copy'}</small>
      </button>
    </Fade>
  )
}

export default function App() {
  const [open, setOpen] = useState(null)
  return (
    <>
      <div className="bg-glow" aria-hidden />
      <main className="page">
        <Hero />

        <Section id="work" title="Selected work">
          {projects.map((p, k) => (
            <ProjectRow key={p.title} p={p} i={k} onOpen={setOpen} />
          ))}
        </Section>

        <Section id="experience" title="Experience">
          {experience.map((e) => (
            <Fade className="row" key={e.company}>
              <div className="row-head">
                <h3>{e.role} <span className="at">· {e.company}</span></h3>
                <span className="date">{e.period}</span>
              </div>
              <p>{e.short}</p>
            </Fade>
          ))}
        </Section>

        <Section id="skills" title="Skills">
          <dl className="kv">
            {skills.map((g) => (
              <Fade className="kv-row" key={g.title}>
                <dt>{g.title}</dt>
                <dd>{g.items.join(', ')}</dd>
              </Fade>
            ))}
          </dl>
        </Section>

        <Section id="education" title="Education">
          <Fade className="row">
            <div className="row-head">
              <h3>{education.school}</h3>
              <span className="date">{education.period}</span>
            </div>
            <p>{education.degree}{education.gpa && <> · GPA {education.gpa}</>}</p>
          </Fade>
        </Section>

        <Section id="languages" title="Languages">
          <dl className="kv">
            {languages.map((l) => (
              <Fade className="kv-row" key={l.name}>
                <dt>{l.name}</dt>
                <dd>{l.level}</dd>
              </Fade>
            ))}
          </dl>
        </Section>

        <Section id="contact" title="Contact">
          <Contact />
        </Section>
      </main>
      <footer>© {new Date().getFullYear()} {profile.name}</footer>
      <AnimatePresence>{open && <ProjectModal p={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </>
  )
}
