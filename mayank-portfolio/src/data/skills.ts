import type { SkillCategory } from '../types';

/** Confirmed, established competencies. */
export const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    description: 'Interfaces and client-side application logic.',
    skills: ['React.js', 'JavaScript', 'HTML5', 'CSS3'],
  },
  {
    name: 'Backend',
    description: 'Server-side services and API design.',
    skills: ['Node.js', 'Express.js', 'REST APIs'],
  },
  {
    name: 'Database',
    description: 'Document data modelling and persistence.',
    skills: ['MongoDB'],
  },
  {
    name: 'Additional',
    description: 'Delivery practices around shipping web products.',
    skills: ['SEO optimization', 'Responsive web development', 'Application prototyping'],
  },
];

/** Project-level domain exposure, intentionally kept separate from programming skills. */
export const domainExposure: string[] = [
  'GIS applications',
  'MapViewer',
  'Radar-related systems',
  'AI-enabled AgriTech solutions',
];
