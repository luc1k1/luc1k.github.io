import { useEffect, useRef, useState } from 'react'
import Background from './components/Background.jsx'
import Pet from './components/Pet.jsx'
import Glass from './components/Glass.jsx'
import HandDemo from './components/HandDemo.jsx'
import { education, experience, languages, profile, skills } from './data.js'
import { projects } from './projects.js'

function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 12 12" aria-hidden>
      <path d="M3.5 8.5l5-5M4.5 3.5h4v4" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Ext({ href, children, className = 'ext' }) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}
      <Arrow />
    </a>
  )
}

function Section({ id, title, compact, children }) {
  return (
    <section id={id} className="section">
      <h2>{title}</h2>
      <div className={`entries${compact ? ' compact' : ''}`}>{children}</div>
    </section>
  )
}

// The focus phrase in the headline gets a YOLO-style detection box
function Headline({ text, focus }) {
  const i = focus ? text.indexOf(focus) : -1
  if (i < 0) return text
  return (
    <>
      {text.slice(0, i)}
      <span className="det">
        {focus}
        <span className="det-box" aria-hidden>
          <span className="det-tag">{focus.replace(/ /g, '_')} 0.98</span>
        </span>
      </span>
      {text.slice(i + focus.length)}
    </>
  )
}

// Counts the leading number of a metric up from 0 the first time it scrolls into view
function CountUp({ value }) {
  const m = /^([\d,.]+)(.*)$/.exec(value)
  const ref = useRef(null)
  const target = m ? parseFloat(m[1].replace(/,/g, '')) : 0
  const canAnimate = m && typeof IntersectionObserver !== 'undefined' && !matchMedia('(prefers-reduced-motion: reduce)').matches
  const [n, setN] = useState(canAnimate ? 0 : target)
  useEffect(() => {
    if (!canAnimate) return
    let raf
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / 1100)
        setN(target * (1 - Math.pow(1 - k, 3)))
        if (k < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    })
    io.observe(ref.current)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [canAnimate, target])
  if (!m) return value
  const shown = m[1].includes(',') ? Math.round(n).toLocaleString('en-US') : Math.round(n)
  return <span ref={ref}>{shown}{m[2]}</span>
}

// Date / label column on the left, content on the right
function Entry({ when, children }) {
  return (
    <div className="entry">
      <div className="when">{when}</div>
      <div className="what">{children}</div>
    </div>
  )
}

function Project({ p }) {
  const [open, setOpen] = useState(false)
  const id = `p-${p.year}`
  return (
    <Entry when={p.year}>
      <h3>{p.title}</h3>
      {p.badge && <p className="sub">{p.badge}</p>}
      <p className="text">{p.summary}</p>

      {p.metrics && (
        <dl className="metrics">
          {p.metrics.map((m) => (
            <div key={m.label}>
              <dt><CountUp value={m.value} /></dt>
              <dd>{m.label}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className={`details${open ? ' open' : ''}`} id={id}>
        <div className="details-inner">
          <p className="text">{p.description}</p>
          {p.tags && <p className="stack">{p.tags.join(' / ')}</p>}
          {(p.link || p.github) && (
            <p className="links">
              {p.link && <Ext href={p.link}>Live</Ext>}
              {p.github && <Ext href={p.github}>Source</Ext>}
            </p>
          )}
        </div>
      </div>

      <button className="toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls={id}>
        {open ? 'Show less' : 'Read more'}
      </button>
    </Entry>
  )
}

export default function App() {
  const year = new Date().getFullYear()
  const [demo, setDemo] = useState(false)
  return (
    <>
      <Background />
      <Pet />
      <Glass />
      {demo && <HandDemo onClose={() => setDemo(false)} />}
      <div className="page">
        <nav className="nav glass">
          <a href="#top" className="brand">{profile.name}</a>
          <div className="nav-links">
            <a href="#research">Research</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <main id="top">
          <header className="intro">
            <p className="status"><span className="dot" />{profile.status}</p>
            <h1><Headline text={profile.headline} focus={profile.focus} /></h1>
            <p className="bio">{profile.summary}</p>
            <p className="actions">
              <a className="btn" href={profile.cv} download>Download résumé</a>
              <a className="pill glass" href={`mailto:${profile.email}`}>Email</a>
              <Ext className="pill glass" href={profile.linkedin}>LinkedIn</Ext>
              <Ext className="pill glass" href={profile.github}>GitHub</Ext>
            </p>
          </header>

          <Section id="research" title="Research">
            {projects.map((p) => (
              <Project key={p.title} p={p} />
            ))}
          </Section>

          <Section id="demo" title="Live demo">
            <Entry when="Try it">
              <h3>Real-time hand tracking</h3>
              <p className="sub">MediaPipe Hands · finger-bend detection · runs in your browser</p>
              <p className="text">
                Tracks up to two hands, detects which fingers are bent from joint angles and lets you draw with your
                index finger. A web port of my Python / OpenCV project.
              </p>
              <p className="actions">
                <button className="btn" onClick={() => setDemo(true)}>Launch demo</button>
                <Ext className="pill glass" href={`${profile.github}/hand-tracking`}>Source</Ext>
              </p>
            </Entry>
          </Section>

          <Section id="experience" title="Experience">
            {experience.map((e) => (
              <Entry key={e.company} when={e.period}>
                <h3>{e.role} <span className="at">· {e.company}</span></h3>
                <p className="text">{e.short}</p>
              </Entry>
            ))}
          </Section>

          <Section id="education" title="Education">
            <Entry when={education.period}>
              <h3>{education.school}</h3>
              <p className="sub">
                {education.degree}
                {education.gpa && <> · GPA {education.gpa}</>}
              </p>
            </Entry>
          </Section>

          <Section id="skills" title="Skills" compact>
            {skills.map((g) => (
              <Entry key={g.title} when={g.title}>
                <p className="text">{g.items.join(', ')}</p>
              </Entry>
            ))}
            <Entry when="Languages">
              <p className="text">{languages.map((l) => `${l.name} (${l.level.toLowerCase()})`).join(', ')}</p>
            </Entry>
          </Section>
        </main>

        <footer className="footer" id="contact">
          <p className="links">
            <a className="ext" href={`mailto:${profile.email}`}>{profile.email}</a>
            <Ext href={profile.linkedin}>LinkedIn</Ext>
            <Ext href={profile.github}>GitHub</Ext>
          </p>
          <span>© {year} {profile.name} · Updated {__BUILD_DATE__}</span>
        </footer>
      </div>
    </>
  )
}
