// ===== PROJECTS =====
// To add a project, copy an object and fill in the fields.
// placeholder: true shows a "Coming soon" card.
//
// {
//   title: 'Name',
//   description: 'Short project description',
//   tags: ['Python', 'FastAPI'],
//   badge: 'Research',        // highlighted label on the card (optional)
//   paper: 'Paper title',     // linked research paper (optional)
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
      'Real-time AI surveillance that monitors up to 8 camera streams at once and flags cheating during exams. Distributed producer/worker pipeline on Redis, Faster R-CNN detection, person tracking, walking detection to skip unnecessary inference, and a desktop viewer with a live warnings feed.',
    paper:
      'High-Performance Computing for Scalable Real-Time Object Detection in Distributed Video Surveillance Networks',
    tags: ['Python', 'Computer Vision', 'Faster R-CNN', 'Redis', 'Multithreading', 'Streamlit'],
  },
  {
    title: 'Eduva',
    description: 'EdTech startup: AI models for learning, backend with authentication and payments.',
    tags: ['ML', 'Backend', 'Payments'],
    placeholder: true,
  },
  { title: 'Coming soon', description: 'A new project will appear here.', tags: [], placeholder: true },
]
