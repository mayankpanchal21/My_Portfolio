import type { Project } from '../types';

/*
 * PLACEHOLDERS: the three entries below are content slots, not real projects.
 * Replace every field with real details, add githubUrl / liveUrl when available,
 * optionally add an `image` (place screenshots in /public/projects/), and remove
 * `isPlaceholder`. Links only render when a URL is supplied.
 */
export const projects: Project[] = [
  {
    id: 'full-stack-app',
    name: 'Full Stack Web Application',
    category: 'Web application',
    description:
      'Placeholder for a full-stack web application. Add a one or two sentence summary of what the product does and who uses it.',
    problem: 'Describe the user or business problem this application addresses.',
    contribution:
      'Describe your role: features you built, APIs you designed, data models you owned.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    visual: 'application',
    featured: true,
    isPlaceholder: true,
  },
  {
    id: 'business-website',
    name: 'Business Website / Digital Product',
    category: 'Website',
    description:
      'Placeholder for a business website or digital product. Summarise the organisation and the purpose of the site.',
    problem: 'Describe what the business needed — visibility, lead generation, content management.',
    contribution: 'Describe your scope: design implementation, SEO work, deployment, content.',
    stack: ['React.js', 'Responsive design', 'SEO'],
    visual: 'website',
    featured: true,
    isPlaceholder: true,
  },
  {
    id: 'gis-agritech',
    name: 'GIS or AgriTech Application',
    category: 'Domain application',
    description:
      'Placeholder for a GIS-enabled or AgriTech application. For confidential work, keep this high level and avoid sensitive specifics.',
    problem: 'Describe the domain problem at a level that is safe to share publicly.',
    contribution: 'Describe the parts you contributed to without disclosing confidential details.',
    stack: ['Add confirmed technologies'],
    visual: 'geospatial',
    featured: true,
    confidential: true,
    isPlaceholder: true,
  },
];
