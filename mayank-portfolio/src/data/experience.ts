import type { ExperienceItem } from '../types';

/** Most recent first. Only list technologies that are confirmed for each role. */
export const experience: ExperienceItem[] = [
  {
    company: 'Tamar Software LLP',
    role: 'Lead Engineer / Full Stack Engineer',
    start: '2026-06',
    end: 'present',
    summary:
      'Leading a 7-member engineering team to build a Learning Management System (LMS) from scratch — a platform that helps students upskill and become industry-ready. 🚀',
    highlights: [
      'Own the end-to-end architecture on the MERN stack: course management, video lessons, quizzes, progress tracking and role-based access for students, mentors and admins.',
      'Lead sprint planning, code reviews and Git workflows, helping the team ship features ~30% faster.',
      '🎤 Tech talks & bootcamps: Delivered technical talks and hands-on MERN bootcamps at DIET college Meerut, training 70+ students in full-stack development',
    ],
    technologies: [],
    domains: ['Technology', 'AI-enabled products', 'Prototyping and development'],
  },
  {
    company: 'BioSanjeevani Sustainable Solutions Pvt. Ltd.',
    role: 'Full Stack Engineer / Consultant & Developer',
    start: '2025-12',
    end: '2026-06',
    summary:
      'Joined an IIT Delhi-incubated AgriTech startup on a mission to make farming smarter and more sustainable 🌱 — turning cow dung into high-quality organic fertilizer with the help of AI and IoT.',
    highlights: [
      'Built AI + IoT prototypes to monitor and optimize the composting process, cutting manual monitoring effort by ~35%',
      'Developed a MERN dashboard showing real-time sensor data across 10+ parameters (temperature, moisture, pH)',
      'Collaborated with stakeholders to shape sustainable agriculture-focused digital solutions.',
    ],
    technologies: [],
    domains: ['AgriTech', 'AI-enabled products', 'Prototyping'],
  },
  {
    company: 'Idyllic Futuristic Technologies LLP',
    role: 'Full Stack Engineer',
    start: '2025-03',
    end: '2025-07',
    summary: 'Got the rare chance to build software for the skies ✈️ — working on a confidential Indian Air Force project alongside senior defence leadership.',
    highlights: [
      'Engineered full-stack modules integrating GIS, GeoServer, MapViewer and radar data, improving map layer load time by ~40%.',
      'Built and launched 2 production websites — Idyllic Futuristic Technologies and Gaekwad Aerospace & Drones Academy — increasing enquiries and leads by ~30%',
      'Designed reusable React components and REST APIs, cutting new-feature development time by ~25%',
    ],
    technologies: [],
    domains: ['GIS', 'MapViewer', 'Radar-related systems', 'Web development'],
    confidentialNote:
      'Defence project details are confidential and described here only at a high level.',
  },
  {
    company: 'Green Vikalp LLP',
    role: 'Freelance Web Developer',
    start: '2024-12',
    end: '2025-02',
    employmentType: 'Freelance',
    summary: 'Took Green Vikalp from a basic online presence to a fast, search-friendly website 🌿 — owning everything from code to growth.',
    highlights: [
      ' Built a scalable MERN website from scratch with a 90+ Lighthouse score and ~50% faster page loads than the previous site.',
      'Applied on-page and technical SEO, growing organic traffic by ~60% within 3 months.',
      'Advised on targeted digital marketing campaigns to support business scalability.',
    ],
    technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    domains: ['SEO', 'Digital marketing'],
  },
  {
    company: 'Tamar Software LLP',
    role: 'Associate Software Engineer',
    start: '2024-07',
    end: '2024-11',
    // PLACEHOLDER: replace with real responsibilities and technologies, then remove isPlaceholder.
    summary: 'Where my professional journey began — straight into live client projects across AI and full-stack development. 💻',
    highlights: [
      'Built a full-stack e-commerce platform on the MERN stack with product catalog, cart, secure checkout, order tracking and an admin dashboard — optimized for ~40% faster page loads',
      'Trained a YOLOv8 model on 2,000+ labelled images for smart dustbin automation, reaching ~92% waste-classification accuracy.',
      'Delivered 4+ responsive client websites using React and modern front-end practices.'
    ],
    technologies: ['YOLOv8', 'Python', 'MongoDB', 'Express.js', 'React.js', 'Node.js'],
    domains: [],
    // isPlaceholder: true,
  },
];
