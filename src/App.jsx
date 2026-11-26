import { useState } from 'react'
import Background from './components/Background.jsx'
import Pet from './components/Pet.jsx'
import { education, experience, languages, profile, skills } from './data.js'
import { projects } from './projects.js'

function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 12 12" aria-hidden>
      <path d="M3.5 8.5l5-5M4.5 3.5h4v4" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Ext({ href, children }) {
  return (
    <a className="ext" href={href} target="_blank" rel="noreferrer">
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

// Author list with my own name highlighted, as in an academic CV
function Authors({ list }) {
  const me = `${profile.name[0]}. ${profile.name.split(' ').pop()}`
  return list.split(me).flatMap((part, i) => (i ? [<b key={i}>{me}</b>, part] : [part]))
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
      {p.authors && <p className="sub authors"><Authors list={p.authors} /></p>}
      {p.badge && <p className="venue">{p.badge}</p>}
      <p className="text">{p.summary}</p>

      {p.metrics && (
        <dl className="metrics">
          {p.metrics.map((m) => (
            <div key={m.label}>
              <dt>{m.value}</dt>
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
  return (
    <>
      <Background />
      <Pet />
      <div className="page">
        <nav className="nav">
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
            <h1>{profile.headline}</h1>
            <p className="bio">{profile.summary}</p>
            <p className="actions">
              <a className="btn" href={profile.cv} download>Download résumé</a>
              <a className="ext" href={`mailto:${profile.email}`}>Email</a>
              <Ext href={profile.linkedin}>LinkedIn</Ext>
              <Ext href={profile.github}>GitHub</Ext>
            </p>
          </header>

          <Section id="research" title="Research">
            {projects.map((p) => (
              <Project key={p.title} p={p} />
            ))}
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
