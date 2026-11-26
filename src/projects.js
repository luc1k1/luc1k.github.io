// ===== PROJECTS =====
// Each project is a row in “Selected work”; “Read more” expands the details.
//
// {
//   title: 'Name',
//   year: '2026',
//   badge: 'Research paper',    // small label under the title (optional)
//   summary: 'One line for the card',
//   description: 'Full text for the details window',
//   metrics: [{ value: '38 ms', label: 'latency' }],
//   paper: 'Paper title', authors: 'A. B, C. D',   // research paper (optional)
//   tags: ['Python'],
//   link: 'https://...', github: 'https://...',    // (optional)
// }

export const projects = [
  {
    title: 'High-Performance Computing for Scalable Real-Time Object Detection in Distributed Video Surveillance Networks',
    year: '2026',
    badge: 'Research paper · core detection algorithm',
    summary: 'Real-time cheating detection across hundreds of live exam-hall cameras on an 18-node HPC cluster. I designed and built the core detection algorithm: pose-based head tracking, calibration and temporal scoring.',
    description:
      'Real-time exam-integrity surveillance across hundreds of camera streams, scaled on an 18-node university HPC cluster (CUDA, MPI, TensorRT). I single-handedly designed and built the core cheating-detection algorithm: pose-based head tracking on YOLOv11l-pose with per-student calibration, writing-pose suppression and temporal scoring — cutting false alerts 3–4×. The multi-camera prototype runs on Redis producer/worker queues with ByteTrack tracking and a desktop operator dashboard.',
    authors: 'E. Ismayilov, R. Eyvazli, K. Shahmuradov',
    metrics: [
      { value: '320', label: 'camera streams' },
      { value: '38 ms', label: 'median latency' },
      { value: '9,800', label: 'frames / sec' },
      { value: '3–4×', label: 'fewer false alerts' },
    ],
    tags: ['Python', 'YOLOv11-pose', 'TensorRT', 'CUDA', 'MPI / OpenMP', 'ByteTrack', 'Redis'],
  },
]
