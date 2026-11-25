// All site content lives here — edit this file to update the site.

export const profile = {
  name: 'Rasul Eyvazli',
  role: 'Machine Learning Engineer',
  roles: ['Machine Learning Engineer', 'Backend Developer', 'Founder of Eduva'],
  location: 'Baku, Azerbaijan',
  email: 'leroyceo@yahoo.com',
  linkedin: 'https://www.linkedin.com/in/rasuleyvazli',
  github: 'https://github.com/luc1k1',
  cv: 'Rasul_Eyvazli_CV.pdf',
  summary:
    'Computer Science student at Azerbaijan State University of Oil and Industry. I bring academic knowledge into real-world machine learning and software engineering — building ML models, backend services and whole products from scratch, from architecture to business strategy.',
}

export const stats = [
  { value: 1, suffix: '', label: 'research paper' },
  { value: 1, suffix: '', label: 'startup founded' },
  { value: 320, suffix: '', label: 'camera streams in real time' },
]

export const skills = [
  {
    title: 'AI & Machine Learning',
    icon: '🧠',
    items: ['ML models', 'LLM apps', 'NLP & chatbots', 'Python', 'Data processing'],
  },
  {
    title: 'Computer Vision & HPC',
    icon: '👁️',
    items: ['YOLO / pose estimation', 'Object tracking', 'TensorRT', 'CUDA', 'MPI / OpenMP', 'Redis pipelines'],
  },
  {
    title: 'Backend',
    icon: '⚙️',
    items: ['REST APIs', 'Authentication', 'Payment systems', 'Telegram bots', 'Admin panels', 'SQL'],
  },
  {
    title: 'Product & Leadership',
    icon: '🚀',
    items: ['Startup founding', 'Pricing & unit economics', 'Business strategy', 'UI/UX design', 'Team leadership'],
  },
]

export const languages = [
  { name: 'English', level: 'Native / Bilingual', pct: 100 },
  { name: 'Azerbaijani', level: 'Limited Working', pct: 55 },
]

export const experience = [
  {
    company: 'Eduva',
    role: 'Founder & CEO',
    period: 'Nov 2025 — Jun 2026',
    place: 'Baku, Azerbaijan',
    points: [
      'Founded Eduva, an AI-powered Android reading app where students can select any text and instantly get a plain-language explanation, a real-world example and a difficulty rating.',
      'Led the company as CEO: product vision, business strategy, pricing and full financial model / unit economics.',
      'Worked closely with the CTO on AI features and backend services, including payments and user authentication, and designed the app interface.',
    ],
  },
  {
    company: 'Freelancer.com',
    role: 'Software Engineer',
    period: 'Apr 2020 — Jun 2024',
    place: 'Azerbaijan',
    points: [
      'Developed backend services for a large-scale application, powering Telegram bots and payment systems.',
      'Designed and implemented a robust profile system and admin panel to streamline user management.',
      'Built machine learning models for chatbot functionality, improving user interaction.',
      'Collaborated with cross-functional teams on seamless integration and performance optimization.',
    ],
  },
]

export const education = {
  school: 'Azerbaijan State University of Oil and Industry',
  degree: 'Computer Science',
  period: '2024 — 2029',
}
