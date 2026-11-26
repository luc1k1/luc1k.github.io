import { useEffect, useRef, useState } from 'react'

// In-browser port of github.com/luc1k1/hand-tracking (Python · MediaPipe + OpenCV).
// Same MediaPipe Hands model, run on-device with WebAssembly — no video leaves the browser.
const VERSION = '0.10.21' // keep in sync with package.json
const WASM = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${VERSION}/wasm`
const MODEL = 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task'

const FINGERS = [
  ['Thumb', [1, 2, 3, 4], 45],
  ['Index', [5, 6, 7, 8], 70],
  ['Middle', [9, 10, 11, 12], 70],
  ['Ring', [13, 14, 15, 16], 70],
  ['Pinky', [17, 18, 19, 20], 70],
]
const TIPS = new Set([4, 8, 12, 16, 20])

const sub = (a, b) => [a.x - b.x, a.y - b.y, (a.z - b.z)]
function angle(u, v) {
  const d = u[0] * v[0] + u[1] * v[1] + u[2] * v[2]
  const n = Math.hypot(...u) * Math.hypot(...v) || 1
  return (Math.acos(Math.max(-1, Math.min(1, d / n))) * 180) / Math.PI
}
// A finger is bent when its joints turn by more than the threshold in total
function fingerStates(lm) {
  return FINGERS.map(([name, [a, b, c, d], limit]) => {
    const v1 = sub(lm[b], lm[a])
    const v2 = sub(lm[c], lm[b])
    const v3 = sub(lm[d], lm[c])
    return { name, bent: angle(v1, v2) + angle(v2, v3) > limit }
  })
}

export default function HandDemo({ onClose }) {
  const video = useRef(null)
  const canvas = useRef(null)
  const ink = useRef(null)
  const [status, setStatus] = useState('loading') // loading | running | error
  const [error, setError] = useState('')
  const [stats, setStats] = useState({ ms: 0, fps: 0, hands: 0 })
  const [fingers, setFingers] = useState(null)
  const [draw, setDraw] = useState(false)
  const drawRef = useRef(false)
  drawRef.current = draw

  useEffect(() => {
    let stream, landmarker, raf, alive = true
    let last = -1, frames = 0, fpsT = performance.now(), fps = 0, prevTip = null

    const start = async () => {
      try {
        const [{ FilesetResolver, HandLandmarker }, media] = await Promise.all([
          import('@mediapipe/tasks-vision'),
          navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: 640, height: 480 }, audio: false }),
        ])
        stream = media
        if (!alive) return stream.getTracks().forEach((t) => t.stop())
        const files = await FilesetResolver.forVisionTasks(WASM)
        const opts = (delegate) => ({
          baseOptions: { modelAssetPath: MODEL, delegate },
          runningMode: 'VIDEO',
          numHands: 2,
          minHandDetectionConfidence: 0.7,
          minHandPresenceConfidence: 0.7,
          minTrackingConfidence: 0.7,
        })
        try {
          landmarker = await HandLandmarker.createFromOptions(files, opts('GPU'))
        } catch {
          landmarker = await HandLandmarker.createFromOptions(files, opts('CPU'))
        }
        if (!alive) return
        const v = video.current
        v.srcObject = stream
        await v.play()
        const w = v.videoWidth, h = v.videoHeight
        for (const c of [canvas.current, ink.current]) { c.width = w; c.height = h }
        setStatus('running')
        loop(HandLandmarker.HAND_CONNECTIONS, w, h)
      } catch (e) {
        if (!alive) return
        setStatus('error')
        setError(
          e?.name === 'NotAllowedError' ? 'Camera access was blocked. Allow it in the browser and try again.'
          : e?.name === 'NotFoundError' ? 'No camera found on this device.'
          : 'Could not start the model. Check your connection and try again.'
        )
      }
    }

    const loop = (connections, w, h) => {
      const ctx = canvas.current.getContext('2d')
      const ictx = ink.current.getContext('2d')
      const tick = () => {
        if (!alive) return
        const v = video.current
        if (v.currentTime !== last) {
          last = v.currentTime
          const t0 = performance.now()
          const res = landmarker.detectForVideo(v, t0)
          const ms = performance.now() - t0
          frames++
          if (t0 - fpsT > 500) { fps = (frames * 1000) / (t0 - fpsT); frames = 0; fpsT = t0 }

          ctx.clearRect(0, 0, w, h)
          ctx.lineCap = 'round'
          let first = null
          for (const lm of res.landmarks) {
            ctx.strokeStyle = 'rgba(255,255,255,0.85)'
            ctx.lineWidth = 2.5
            ctx.beginPath()
            for (const { start, end } of connections) {
              ctx.moveTo(lm[start].x * w, lm[start].y * h)
              ctx.lineTo(lm[end].x * w, lm[end].y * h)
            }
            ctx.stroke()
            lm.forEach((p, i) => {
              ctx.fillStyle = TIPS.has(i) ? '#4ade80' : '#ffffff'
              ctx.beginPath()
              ctx.arc(p.x * w, p.y * h, TIPS.has(i) ? 5 : 3, 0, Math.PI * 2)
              ctx.fill()
            })
            first ??= lm
          }

          const fs = first ? fingerStates(first) : null
          // Draw mode: point with the index finger (middle finger down) to paint
          if (drawRef.current && first && fs && !fs[1].bent && fs[2].bent) {
            const tip = { x: first[8].x * w, y: first[8].y * h }
            ictx.strokeStyle = '#4ade80'
            ictx.lineWidth = 5
            ictx.lineCap = 'round'
            ictx.beginPath()
            ictx.moveTo((prevTip ?? tip).x, (prevTip ?? tip).y)
            ictx.lineTo(tip.x, tip.y)
            ictx.stroke()
            prevTip = tip
          } else prevTip = null

          setFingers(fs)
          setStats({ ms, fps, hands: res.landmarks.length })
        }
        raf = requestAnimationFrame(tick)
      }
      tick()
    }

    start()
    return () => {
      alive = false
      cancelAnimationFrame(raf)
      stream?.getTracks().forEach((t) => t.stop())
      landmarker?.close()
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const clear = () => ink.current?.getContext('2d').clearRect(0, 0, ink.current.width, ink.current.height)
  const up = fingers ? fingers.filter((f) => !f.bent).length : 0

  return (
    <div className="demo" role="dialog" aria-label="Hand tracking demo">
      <div className="demo-bar">
        <span className="demo-title">hand-tracking <i>· MediaPipe, on-device</i></span>
        <button className="demo-x" onClick={onClose} aria-label="Close demo">×</button>
      </div>

      <div className="demo-view">
        <video ref={video} playsInline muted />
        <canvas ref={ink} />
        <canvas ref={canvas} />
        {status === 'loading' && <div className="demo-msg">Loading model and camera…</div>}
        {status === 'error' && <div className="demo-msg">{error}</div>}
        {status === 'running' && stats.hands === 0 && <div className="demo-msg soft">Show your hand to the camera</div>}
      </div>

      <div className="demo-fingers">
        {FINGERS.map(([name], i) => (
          <span key={name} className={fingers && !fingers[i].bent ? 'on' : ''}>{name}</span>
        ))}
      </div>

      <div className="demo-foot">
        <span className="demo-stats">
          {stats.hands} hand{stats.hands === 1 ? '' : 's'} · {up} up · {stats.ms.toFixed(1)} ms · {Math.round(stats.fps)} fps
        </span>
        <span className="demo-tools">
          <button className={draw ? 'active' : ''} onClick={() => setDraw(!draw)} aria-pressed={draw}>Draw</button>
          <button onClick={clear}>Clear</button>
        </span>
      </div>
      <p className="demo-note">Video stays on your device. {draw && 'Point with your index finger to draw.'}</p>
    </div>
  )
}
