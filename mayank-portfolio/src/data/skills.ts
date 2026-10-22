import type { SkillCategory } from '../types';

/** Confirmed, established competencies. */
export const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    description: 'Interfaces and client-side application logic.',
    skills: [
      'React.js',
      'JavaScript',
      'TypeScript',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'Next.js',
      'Redux',
      'React Query',
      'Framer Motion',
      'D3.js',
      'Three.js',
    ],
  },
  {
    name: 'Backend',
    description: 'Server-side services and API design.',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'Socket.IO', 'JWT'],
  },
  {
    name: 'Database',
    description: 'Document data modelling and persistence.',
    skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis'],
  },
  {
    name: 'Tools & Practices',
    description: 'Team workflows and practical techniques for shipping web products.',
    skills: [
      'Git',
      'GitHub',
      'Code reviews',
      'AI-assisted development',
      'Technical SEO',
      'Responsive design',
      'Application prototyping',
    ],
  },
];

/** Project-level domain exposure, intentionally kept separate from programming skills. */
export const domainExposure: string[] = [
  'GIS applications',
  'MapViewer',
  'Radar-related systems',
  'AI-enabled AgriTech solutions',
];
