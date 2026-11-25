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
      'AI that spots cheating in exam halls across hundreds of live camera streams. I single-handedly built the cheating-detection algorithm — pose-based head tracking with 3–4× fewer false alerts.',
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
    badge: 'Android app',
    art: 'eduva',
    description:
      'Android reading app: highlight any text and the AI explains it, gives an example and rates its difficulty. Founder & CEO — product, pricing and unit economics.',
    metrics: [
      { value: 'Founder', label: '& CEO' },
      { value: '8 mo', label: 'Nov 2025 — Jun 2026' },
    ],
    tags: ['Android', 'EdTech', 'LLM', 'Product', 'Pricing', 'Backend', 'Payments'],
  },
]
