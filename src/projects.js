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
//   link: 'https://...',      // live demo (optional)
//   github: 'https://...',    // repository (optional)
//   image: 'images/proj.png', // image from the public folder (optional)
// }

export const projects = [
  {
    title: 'Uni Detect',
    badge: 'Research',
    icon: '◉',
    description:
      'Real-time exam-integrity surveillance: a pose-based AI that tracks every student and flags suspicious head movements across hundreds of camera streams. Scaled on an 18-node university HPC cluster with CUDA, MPI and TensorRT; adaptive head-pose analysis cut false alerts 3–4×.',
    paper:
      'High-Performance Computing for Scalable Real-Time Object Detection in Distributed Video Surveillance Networks',
    authors: 'E. Ismayilov, R. Eyvazli, K. Shahmuradov · 2026',
    metrics: [
      { value: '320', label: 'camera streams' },
      { value: '38 ms', label: 'median latency' },
      { value: '9,800', label: 'frames per second' },
      { value: '91.4%', label: 'scaling efficiency' },
    ],
    tags: ['Python', 'YOLOv11-pose', 'TensorRT', 'CUDA', 'MPI / OpenMP', 'ByteTrack', 'Redis'],
  },
  {
    title: 'Eduva',
    description: 'EdTech startup: AI models for learning, backend with authentication and payments.',
    tags: ['ML', 'Backend', 'Payments'],
    placeholder: true,
  },
  { title: 'Coming soon', description: 'A new project will appear here.', tags: [], placeholder: true },
]
