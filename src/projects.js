// ===== PROJECTS =====
// To add a project, copy an object and fill in the fields.
// placeholder: true shows a "Coming soon" card.
//
// {
//   title: 'Name',
//   description: 'Short project description',
//   tags: ['Python', 'FastAPI'],
//   badge: 'Research',        // highlighted label on the card (optional)
//   paper: 'Paper title',     // research paper (optional)
//   authors: 'A. B, C. D',    // paper authors (optional)
//   metrics: [{ value: '38 ms', label: 'latency' }], // key numbers (optional)
//   icon: '◉',                // symbol shown on the card art (optional)
//   art: 'camera',            // custom animated cover from components/ProjectArt.jsx (optional)
//   link: 'https://...',      // live demo (optional)
//   github: 'https://...',    // repository (optional)
//   image: 'images/proj.png', // image from the public folder (optional)
// }

export const projects = [
  {
    title: 'Uni Detect',
    badge: 'Research',
    art: 'camera',
    description:
      'Real-time exam-integrity surveillance across hundreds of camera streams, scaled on an 18-node university HPC cluster (CUDA, MPI, TensorRT). I single-handedly designed and built the core cheating-detection algorithm: pose-based head tracking with per-student calibration, writing-pose suppression and temporal scoring — cutting false alerts 3–4×.',
    paper:
      'High-Performance Computing for Scalable Real-Time Object Detection in Distributed Video Surveillance Networks',
    authors: 'E. Ismayilov, R. Eyvazli, K. Shahmuradov · 2026',
    metrics: [
      { value: '320', label: 'camera streams' },
      { value: '38 ms', label: 'median latency' },
      { value: '9,800', label: 'frames per second' },
      { value: '3–4×', label: 'fewer false alerts' },
    ],
    tags: ['Python', 'YOLOv11-pose', 'TensorRT', 'CUDA', 'MPI / OpenMP', 'ByteTrack', 'Redis'],
  },
  {
    title: 'Eduva',
    badge: 'Startup',
    art: 'eduva',
    description:
      'AI-powered reading app for students: select any passage at any moment and the AI explains it in plain words, gives a real example and rates how difficult the concept is. I founded it and ran it as CEO — product vision, pricing and unit economics — and worked hands-on with the CTO on the AI and backend.',
    metrics: [
      { value: 'Founder', label: '& CEO' },
      { value: '8 mo', label: 'Nov 2025 — Jun 2026' },
    ],
    tags: ['EdTech', 'LLM', 'Product', 'Pricing', 'Backend', 'Payments'],
  },
  { title: 'Coming soon', description: 'A new project will appear here.', tags: [], placeholder: true },
]
