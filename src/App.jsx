import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion'
import Background from './components/Background.jsx'
import { Counter, Magnetic, Reveal, SectionTitle, TiltCard, Typewriter } from './components/ui.jsx'
import { education, experience, languages, profile, skills, stats } from './data.js'
import { projects } from './projects.js'

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

function Loader({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1700)
    return () => clearTimeout(t)
  }, [onDone])
  return (
    <motion.div
      className="loader"
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        className="loader-logo"
        initial={{ scale: 0.6, opacity: 0, rotate: -20 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        RE
      </motion.div>
      <div className="loader-bar">
        <motion.span initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.4, ease: 'easeInOut' }} />
      </div>
    </motion.div>
  )
}

function CursorGlow() {
  const ref = useRef(null)
  useEffect(() => {
    const move = (e) => {
      if (ref.current) ref.current.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return <div ref={ref} className="cursor-glow" aria-hidden />
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30)
    on()
    window.addEventListener('scroll', on)
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <motion.header
      className={`nav ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <a href="#top" className="logo">
        <span>RE</span>
        <i>.</i>
      </a>
      <nav className={open ? 'open' : ''}>
        {NAV.map((n) => (
          <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}>
            {n.label}
          </a>
        ))}
      </nav>
      <button className={`burger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu">
        <span />
        <span />
      </button>
    </motion.header>
  )
}

function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 150])
  const opacity = useTransform(scrollY, [0, 500], [1, 0])
  const name = profile.name.split(' ')

  return (
    <section id="top" className="hero">
      <motion.div className="hero-inner" style={{ y, opacity }}>
        <motion.div
          className="badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <span className="dot" /> Open to work · {profile.location}
        </motion.div>

        <h1>
          {name.map((word, wi) => (
            <span className="line" key={wi}>
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ delay: 2.05 + wi * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className={wi === 1 ? 'grad' : ''}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="hero-role"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.6 }}
        >
          <span className="mono">&gt;</span> <Typewriter words={profile.roles} />
        </motion.p>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.65, duration: 0.7 }}
        >
          I build ML models and reliable backend systems. Turning ideas into products that actually work.
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.7 }}
        >
          <Magnetic href="#projects" className="btn primary">
            View projects <span>→</span>
          </Magnetic>
          <Magnetic href={profile.cv} download className="btn ghost">
            Download CV
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        className="scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
        aria-label="Scroll down"
      >
        <span />
      </motion.a>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section">
      <SectionTitle kicker="01 — about" title="Who I am" />
      <div className="about-grid">
        <Reveal className="about-text">
          <p className="lead">{profile.summary}</p>
          <div className="edu glass">
            <span className="edu-icon">🎓</span>
            <div>
              <b>{education.school}</b>
              <span>
                {education.degree} · {education.period}
              </span>
            </div>
          </div>
        </Reveal>
        <div className="about-side">
          <div className="stats">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <TiltCard className="stat glass">
                  <b>
                    <Counter to={s.value} suffix={s.suffix} />
                  </b>
                  <span>{s.label}</span>
                </TiltCard>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2} className="langs glass">
            <h4>Languages</h4>
            {languages.map((l, i) => (
              <div className="lang" key={l.name}>
                <div className="lang-top">
                  <span>{l.name}</span>
                  <small>{l.level}</small>
                </div>
                <div className="bar">
                  <motion.span
                    initial={{ width: 0 }}
                    whileInView={{ width: `${l.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.3, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Marquee() {
  const items = ['Machine Learning', 'Python', 'Backend', 'APIs', 'Telegram Bots', 'Payments', 'Auth', 'NLP', 'Startups', 'Product Design']
  const row = [...items, ...items]
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {row.map((t, i) => (
          <span key={i}>
            {t} <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  )
}

function Skills() {
  return (
    <section id="skills" className="section">
      <SectionTitle kicker="02 — skills" title="What I do" />
      <div className="skills-grid">
        {skills.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.12}>
            <TiltCard className="skill glass">
              <div className="skill-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <div className="chips">
                {s.items.map((it, j) => (
                  <motion.span
                    key={it}
                    className="chip"
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + j * 0.06, type: 'spring', stiffness: 300 }}
                  >
                    {it}
                  </motion.span>
                ))}
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const h = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <section id="experience" className="section">
      <SectionTitle kicker="03 — experience" title="Where I've worked" />
      <div className="timeline" ref={ref}>
        <div className="tl-line">
          <motion.span style={{ scaleY: h }} />
        </div>
        {experience.map((e, i) => (
          <Reveal key={e.company} delay={0.1} className="tl-item">
            <div className="tl-dot" />
            <div className="tl-card glass">
              <div className="tl-head">
                <div>
                  <h3>{e.role}</h3>
                  <span className="company">@ {e.company}</span>
                </div>
                <span className="period mono">{e.period}</span>
              </div>
              <ul>
                {e.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <small className="place">📍 {e.place}</small>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" className="section">
      <SectionTitle kicker="04 — projects" title="Selected work" />
      <div className="projects-grid">
        {projects.map((p, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <TiltCard className={`project glass ${p.placeholder ? 'placeholder' : ''}`}>
              <div className="project-media">
                {p.image ? (
                  <img src={p.image} alt={p.title} loading="lazy" />
                ) : (
                  <div className="project-art">
                    <span>{p.icon || (p.placeholder ? '{ }' : p.title[0])}</span>
                  </div>
                )}
                {(p.badge || p.placeholder) && <span className={`soon ${p.badge ? 'badge-hl' : ''}`}>{p.badge || 'Coming soon'}</span>}
              </div>
              <div className="project-body">
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                {p.paper && (
                  <div className="paper">
                    <span>📄 Research paper</span>
                    <i>{p.paper}</i>
                  </div>
                )}
                {p.tags?.length > 0 && (
                  <div className="chips">
                    {p.tags.map((t) => (
                      <span className="chip sm" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                {(p.link || p.github) && (
                  <div className="project-links">
                    {p.link && (
                      <a href={p.link} target="_blank" rel="noreferrer">
                        Live ↗
                      </a>
                    )}
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noreferrer">
                        GitHub ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
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
    <section id="contact" className="section contact">
      <SectionTitle kicker="05 — contact" title="Let's work together" />
      <Reveal>
        <p className="contact-sub">Have an idea, a project or a job opening? Drop me a line — I reply fast.</p>
      </Reveal>
      <Reveal delay={0.15}>
        <button className="email" onClick={copy}>
          <span>{profile.email}</span>
          <AnimatePresence mode="wait">
            <motion.small
              key={copied ? 'y' : 'n'}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              {copied ? '✓ copied' : 'click to copy'}
            </motion.small>
          </AnimatePresence>
        </button>
      </Reveal>
      <Reveal delay={0.25} className="socials">
        <Magnetic href={`mailto:${profile.email}`} className="btn primary">
          Email me ✉
        </Magnetic>
        <Magnetic href={profile.linkedin} target="_blank" rel="noreferrer" className="btn ghost">
          LinkedIn ↗
        </Magnetic>
        {profile.github && (
          <Magnetic href={profile.github} target="_blank" rel="noreferrer" className="btn ghost">
            GitHub ↗
          </Magnetic>
        )}
      </Reveal>
    </section>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })

  return (
    <>
      <AnimatePresence>{loading && <Loader onDone={() => setLoading(false)} />}</AnimatePresence>
      <Background />
      <CursorGlow />
      <motion.div className="progress" style={{ scaleX: progress }} />
      <Nav />
      <main>
        <Hero />
        <About />
        <Marquee />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <footer>
        © {new Date().getFullYear()} {profile.name} · built with 💜 in React
      </footer>
    </>
  )
}
