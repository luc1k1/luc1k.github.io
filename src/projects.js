// ===== PROJECTS =====
// Each project is a card on the main page; clicking it opens the details.
//
// {
//   title: 'Name',
//   badge: 'Research',          // highlighted label (optional)
//   art: 'camera',              // animated cover from components/ProjectArt.jsx (optional)
//   image: 'images/proj.png',   // or an image from /public (optional)
//   summary: 'One line for the card',
//   description: 'Full text for the details window',
//   metrics: [{ value: '38 ms', label: 'latency' }],
//   paper: 'Paper title', authors: 'A. B, C. D',   // research paper (optional)
//   tags: ['Python'],
//   link: 'https://...', github: 'https://...',    // (optional)
// }

export const projects = [
  {
    title: 'Uni Detect',
    badge: 'Research',
    art: 'camera',
    summary: 'AI that spots cheating in exam halls across hundreds of live cameras. I built the detection algorithm solo.',
    description:
      'Real-time exam-integrity surveillance across hundreds of camera streams, scaled on an 18-node university HPC cluster (CUDA, MPI, TensorRT). I single-handedly designed and built the core cheating-detection algorithm: pose-based head tracking on YOLOv11l-pose with per-student calibration, writing-pose suppression and temporal scoring — cutting false alerts 3–4×. The multi-camera prototype runs on Redis producer/worker queues with ByteTrack tracking and a desktop operator dashboard.',
    paper:
      'High-Performance Computing for Scalable Real-Time Object Detection in Distributed Video Surveillance Networks',
    authors: 'E. Ismayilov, R. Eyvazli, K. Shahmuradov · 2026',
    metrics: [
      { value: '320', label: 'camera streams' },
      { value: '38 ms', label: 'median latency' },
      { value: '9,800', label: 'frames / sec' },
      { value: '3–4×', label: 'fewer false alerts' },
    ],
    tags: ['Python', 'YOLOv11-pose', 'TensorRT', 'CUDA', 'MPI / OpenMP', 'ByteTrack', 'Redis'],
  },
  {
    title: 'Eduva',
    badge: 'Android app',
    art: 'eduva',
    summary: 'Highlight any text — AI explains it, gives an example and rates its difficulty. Founder & CEO.',
    description:
      'AI-powered Android reading app for students: select any passage at any moment and the AI explains it in plain words, gives a real-world example and rates how difficult the concept is. I founded the company and ran it as CEO — product vision, business strategy, pricing and the full financial model / unit economics — and worked hands-on with the CTO on the AI features and backend, including payments and authentication.',
    metrics: [
      { value: 'Founder', label: '& CEO' },
      { value: '8 mo', label: 'Nov 2025 — Jun 2026' },
    ],
    tags: ['Android', 'EdTech', 'LLM', 'Product', 'Pricing', 'Backend', 'Payments'],
  },
]
