import { useEffect, useRef, useState } from 'react'

// "Tensor" — a tiny model that lives in the corner. Feed it data to train it.
const KEY = 'tensor-pet'
const HUNGRY_AFTER = 40_000 // ms after a meal before it gets hungry again

function load() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY))
    if (v && typeof v.epochs === 'number') return v
  } catch {}
  return { epochs: 0, fedAt: 0 }
}
function save(v) {
  try { localStorage.setItem(KEY, JSON.stringify(v)) } catch {}
}

const lossFor = (epochs) => (2.3 / (1 + epochs * 0.35)).toFixed(3)

export default function Pet() {
  const [state, setState] = useState(load)
  const [now, setNow] = useState(Date.now())
  const [open, setOpen] = useState(false)
  const [blink, setBlink] = useState(false)
  const [eating, setEating] = useState(false)
  const [chew, setChew] = useState(false)
  const [petted, setPetted] = useState(false)
  const [pops, setPops] = useState([])
  const [eye, setEye] = useState({ x: 0, y: 0 })
  const [greet, setGreet] = useState(false)
  const root = useRef(null)
  const svg = useRef(null)

  const hungry = now - state.fedAt > HUNGRY_AFTER

  // say hi once per visit
  useEffect(() => {
    let seen = false
    try { seen = sessionStorage.getItem('tensor-hi') === '1'; sessionStorage.setItem('tensor-hi', '1') } catch {}
    if (seen) return
    const a = setTimeout(() => setGreet(true), 1800)
    const b = setTimeout(() => setGreet(false), 9000)
    return () => { clearTimeout(a); clearTimeout(b) }
  }, [])

  // clock for hunger
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 5000)
    return () => clearInterval(t)
  }, [])

  // random blinking
  useEffect(() => {
    let t
    const loop = () => {
      t = setTimeout(() => {
        setBlink(true)
        setTimeout(() => setBlink(false), 140)
        loop()
      }, 2200 + Math.random() * 3200)
    }
    loop()
    return () => clearTimeout(t)
  }, [])

  // eyes follow the cursor
  useEffect(() => {
    let raf = 0
    const onMove = (e) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const r = svg.current?.getBoundingClientRect()
        if (!r) return
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height / 2)
        const d = Math.hypot(dx, dy) || 1
        const k = Math.min(1, d / 220)
        setEye({ x: (dx / d) * 2.2 * k, y: (dy / d) * 1.8 * k })
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  // close the card on outside click / Esc
  useEffect(() => {
    if (!open) return
    const onDown = (e) => !root.current?.contains(e.target) && setOpen(false)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const feed = () => {
    if (eating) return
    setEating(true)
    // pellet falls (~550ms), then a few chews
    setTimeout(() => {
      let n = 0
      const c = setInterval(() => {
        setChew((v) => !v)
        if (++n >= 6) {
          clearInterval(c)
          setChew(false)
          setEating(false)
          const next = { epochs: state.epochs + 1, fedAt: Date.now() }
          setState(next)
          save(next)
          setNow(Date.now())
          const id = Math.random()
          setPops((p) => [...p, id])
          setTimeout(() => setPops((p) => p.filter((x) => x !== id)), 1200)
        }
      }, 110)
    }, 550)
  }

  const pet = () => {
    setPetted(true)
    setTimeout(() => setPetted(false), 900)
    setGreet(false)
    setOpen((v) => !v)
  }

  const mood = eating ? 'eating…' : hungry ? 'hungry for data' : 'well fed'
  const happy = petted || (!hungry && !eating)
  const mouthOpen = eating && !chew

  return (
    <div className={`pet${hungry && !eating ? ' is-hungry' : ''}`} ref={root}>
      {open && (
        <div className="pet-card" role="dialog" aria-label="Tensor, a tiny model">
          <div className="pet-card-head">
            <b>Tensor</b>
            <span className={`pet-mood${hungry && !eating ? ' warn' : ''}`}>{mood}</span>
          </div>
          <p>A tiny model that lives here. Feed it data to train it.</p>
          <dl className="pet-stats">
            <div><dt>{state.epochs}</dt><dd>epochs</dd></div>
            <div><dt>{lossFor(state.epochs)}</dt><dd>loss</dd></div>
          </dl>
          <button className="pet-feed" onClick={feed} disabled={eating}>
            {eating ? 'Training…' : 'Feed data'}
          </button>
        </div>
      )}

      {pops.map((id) => (
        <span key={id} className="pet-pop" aria-hidden>+1 epoch</span>
      ))}

      <button className="pet-btn" onClick={pet} aria-label="Tensor the pet — open to feed" aria-expanded={open}>
        <svg ref={svg} viewBox="0 0 64 64" width="76" height="76" aria-hidden>
          {/* data pellet */}
          {eating && <rect className="pet-pellet" x="29" y="0" width="6" height="6" rx="1.5" />}
          {/* antenna — lights up when fed */}
          <path d="M32 14 V7" className="pet-line" />
          <circle cx="32" cy="6" r="2.8" className={`pet-node${!hungry || eating ? ' on' : ' alert'}`} />
          {/* body */}
          <g className={`pet-body${eating ? ' squish' : ''}`}>
            <rect x="9" y="14" width="46" height="40" rx="15" className="pet-shell" />
            {/* eyes */}
            {happy && !eating ? (
              <>
                <path d="M20.5 33.5 q3.5 -4 7 0" className="pet-eye-line" />
                <path d="M36.5 33.5 q3.5 -4 7 0" className="pet-eye-line" />
              </>
            ) : (
              <g transform={`translate(${eye.x} ${eye.y})`}>
                <ellipse cx="24" cy="32" rx="3.2" ry={blink ? 0.4 : hungry ? 2.6 : 3.8} className="pet-eye" />
                <ellipse cx="40" cy="32" rx="3.2" ry={blink ? 0.4 : hungry ? 2.6 : 3.8} className="pet-eye" />
              </g>
            )}
            {/* mouth */}
            {mouthOpen ? (
              <ellipse cx="32" cy="43" rx="4" ry="3.4" className="pet-eye" />
            ) : hungry && !eating ? (
              <path d="M28.5 44 q3.5 -2 7 0" className="pet-eye-line" />
            ) : (
              <path d="M28.5 42 q3.5 3 7 0" className="pet-eye-line" />
            )}
          </g>
        </svg>
        {greet && !open ? (
          <span className="pet-hint pet-hi" aria-hidden>
            <b>Hi, I’m Tensor.</b> I’m a tiny model — click to feed me some data.
          </span>
        ) : (
          hungry && !open && <span className="pet-hint" aria-hidden>feed me</span>
        )}
      </button>
    </div>
  )
}
