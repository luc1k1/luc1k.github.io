// All site content lives here — edit this file to update the site.

export const profile = {
  name: 'Rasul Eyvazli',
  status: 'Open to Machine Learning Engineer roles',
  email: 'leroyceo@yahoo.com',
  linkedin: 'https://www.linkedin.com/in/rasuleyvazli',
  github: 'https://github.com/luc1k1',
  cv: 'Rasul_Eyvazli_CV.pdf',
  headline: 'Machine learning engineer focused on computer vision.',
  focus: 'computer vision', // part of the headline that gets the detection box
  summary:
    'I build real-time detection systems that run at scale. Co-author of an HPC research paper on object detection across 320 live camera streams at 38 ms latency. B.S. Computer Science student, GPA 3.6 / 4.0.',
}

export const skills = [
  { title: 'Machine learning', items: ['Python', 'ML models', 'LLM apps', 'NLP'] },
  { title: 'Computer vision & HPC', items: ['YOLO / pose estimation', 'ByteTrack', 'TensorRT', 'CUDA', 'MPI / OpenMP'] },
  { title: 'Engineering', items: ['REST APIs', 'Redis', 'SQL', 'Auth & payments'] },
]

export const languages = [
  { name: 'English', level: 'Native / Bilingual', pct: 100 },
  { name: 'Russian', level: 'Native / Bilingual', pct: 100 },
  { name: 'Azerbaijani', level: 'Limited Working', pct: 55 },
]

export const experience = [
  {
    company: 'Eduva',
    role: 'Founder & CEO',
    period: 'Nov 2025 — Jun 2026',
    short: 'LLM-powered reading app for Android: highlight any text and the AI explains it. Led the product and built the AI features with the CTO.',
  },
  {
    company: 'Freelancer.com',
    role: 'Software Engineer',
    period: 'Apr 2020 — Jun 2024',
    short: 'ML models for chatbots, plus backends for Telegram bots, payments and admin panels.',
  },
]

export const education = {
  school: 'Azerbaijan State University of Oil and Industry',
  degree: 'B.S. Computer Science',
  period: '2024 — 2028',
  gpa: '3.6 / 4.0',
}
