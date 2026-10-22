import type { ExperienceItem } from '../types';

/** Most recent first. Only list technologies that are confirmed for each role. */
export const experience: ExperienceItem[] = [
  {
    company: 'BioSanjeevani Sustainable Solutions Pvt. Ltd.',
    role: 'Full Stack Engineer / Consultant & Developer',
    start: '2025-12',
    end: '2026-06',
    summary:
      'Digital and AI-enabled AgriTech initiatives focused on sustainable agriculture.',
    highlights: [
      'Contributed to digital and AI-enabled AgriTech product initiatives.',
      'Contributed to product prototypes for AgriTech initiatives.',
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
    summary: 'Full-stack web development alongside GIS-enabled defence project work.',
    highlights: [
      'Contributed to a confidential Indian Air Force project involving GIS, MapViewer, and radar-related systems.',
      'Developed the company website for Idyllic Futuristic Technologies LLP.',
      'Developed the website for Gaekwad Aerospace and Drones Academy using full-stack web development technologies.',
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
    summary: 'Freelance engagement covering a MERN-stack business website, SEO, and marketing support.',
    highlights: [
      'Developed the business website using the MERN stack.',
      'Supported SEO optimization for the site.',
      'Recommended digital marketing strategies and collaborated on marketing content.',
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
    summary: 'Responsibilities and technologies for this role will be added soon.',
    highlights: [],
    technologies: [],
    domains: [],
    isPlaceholder: true,
  },
];
