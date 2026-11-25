import { motion } from 'framer-motion'

// Camera viewfinder: pose skeleton inside a detection box with a scanning line
function CameraArt() {
  const joints = [
    [100, 52], // head
    [82, 78], [118, 78], // shoulders
    [74, 108], [126, 108], // elbows
    [90, 124], [112, 124], // hands on desk
    [86, 132], [114, 132], // hips
  ]
  const bones = [[1, 2], [1, 3], [2, 4], [3, 5], [4, 6], [1, 7], [2, 8], [7, 8]]
  return (
    <svg viewBox="0 0 200 160" className="art-svg" aria-hidden>
      <defs>
        <linearGradient id="cg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#c4b5fd" />
          <stop offset="1" stopColor="#e879f9" />
        </linearGradient>
        <linearGradient id="scan" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#e879f9" stopOpacity="0" />
          <stop offset="1" stopColor="#e879f9" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* viewfinder corners */}
      {[
        'M14 34 V18 H30', 'M186 34 V18 H170', 'M14 126 V142 H30', 'M186 126 V142 H170',
      ].map((d) => (
        <path key={d} d={d} fill="none" stroke="#c4b5fd" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      ))}

      {/* REC indicator */}
      <motion.circle
        cx="160" cy="151" r="3.5" fill="#f43f5e"
        animate={{ opacity: [1, 0.15, 1] }} transition={{ duration: 1.2, repeat: Infinity }}
      />
      <text x="167" y="154" fontSize="8" fill="#ece6ff" fontFamily="JetBrains Mono, monospace">REC</text>
      <text x="22" y="154" fontSize="7" fill="#a89cc8" fontFamily="JetBrains Mono, monospace">CAM 04 · 38ms</text>

      {/* detection box */}
      <motion.rect
        x="58" y="36" width="84" height="106" rx="6" fill="rgba(232,121,249,0.06)"
        stroke="url(#cg)" strokeWidth="1.8" strokeDasharray="6 4"
        animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
      <rect x="58" y="26" width="58" height="11" rx="3" fill="url(#cg)" />
      <text x="62" y="34" fontSize="7" fill="#1a0b2e" fontWeight="700" fontFamily="JetBrains Mono, monospace">ID 17 · 0.94</text>

      {/* skeleton */}
      <circle cx="100" cy="52" r="11" fill="none" stroke="#ece6ff" strokeWidth="1.6" opacity="0.9" />
      {bones.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={joints[a][0]} y1={joints[a][1]} x2={joints[b][0]} y2={joints[b][1]}
          stroke="#ece6ff" strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />
      ))}
      <line x1="100" y1="63" x2="100" y2="78" stroke="#ece6ff" strokeWidth="1.6" opacity="0.85" />
      {joints.map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r="2.6" fill="#e879f9"
          animate={{ r: [2.4, 3.4, 2.4] }} transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.12 }} />
      ))}

      {/* head-pose vector */}
      <motion.line x1="100" y1="52" y2="46" stroke="#facc15" strokeWidth="1.8" strokeLinecap="round"
        animate={{ x2: [116, 124, 108, 116] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />

      {/* scan line */}
      <motion.rect x="14" width="172" height="26" fill="url(#scan)"
        animate={{ y: [10, 122, 10] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }} />
    </svg>
  )
}

// Eduva: glowing gradient monogram "E" with orbiting sparks
function EduvaArt() {
  return (
    <svg viewBox="0 0 200 160" className="art-svg" aria-hidden>
      <defs>
        <linearGradient id="eg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#c4b5fd" />
          <stop offset="0.55" stopColor="#d946ef" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
        <filter id="eglow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* orbit rings */}
      <motion.g style={{ originX: '100px', originY: '80px' }} animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}>
        <ellipse cx="100" cy="80" rx="74" ry="28" fill="none" stroke="#c4b5fd" strokeOpacity="0.25" />
        <circle cx="174" cy="80" r="3" fill="#e879f9" />
      </motion.g>
      <motion.g style={{ originX: '100px', originY: '80px' }} animate={{ rotate: -360 }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}>
        <ellipse cx="100" cy="80" rx="58" ry="58" fill="none" stroke="#a78bfa" strokeOpacity="0.18" strokeDasharray="2 6" />
        <circle cx="100" cy="22" r="2.5" fill="#c4b5fd" />
      </motion.g>

      {/* monogram tile */}
      <motion.g
        animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="68" y="48" width="64" height="64" rx="18" fill="rgba(26,11,46,0.85)" stroke="url(#eg)" strokeWidth="2" />
        <g filter="url(#eglow)">
          <path d="M88 62 H113 M88 62 V98 H113 M88 80 H108"
            fill="none" stroke="url(#eg)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </motion.g>

      {/* highlighted-text hint */}
      <motion.g animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2.6, repeat: Infinity }}>
        <rect x="24" y="130" width="40" height="5" rx="2.5" fill="#a89cc8" opacity="0.4" />
        <rect x="68" y="130" width="46" height="5" rx="2.5" fill="#e879f9" opacity="0.8" />
        <rect x="118" y="130" width="58" height="5" rx="2.5" fill="#a89cc8" opacity="0.4" />
      </motion.g>
      <text x="140" y="124" fontSize="9" fill="#e879f9" fontFamily="JetBrains Mono, monospace">✦ AI</text>
    </svg>
  )
}

const ARTS = { camera: CameraArt, eduva: EduvaArt }

export default function ProjectArt({ name }) {
  const Art = ARTS[name]
  return Art ? <Art /> : null
}
