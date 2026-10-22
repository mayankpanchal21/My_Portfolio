import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';

export function Projects() {
  const featured = projects.filter((project) => project.featured);

  return (
    <Section
      id="projects"
      index="04"
      eyebrow="Projects"
      title="Selected work"
      intro="A curated set of projects. Each card covers the problem, my role, and the stack used."
    >
      {featured.length > 0 ? (
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <li key={project.id} className="min-w-0">
              <Reveal delay={i * 0.08} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-fg-muted">Projects are being documented and will appear here soon.</p>
      )}
      <Reveal className="mt-10">
        <Link to="/projects" className="btn-secondary group">
          View all projects
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </Reveal>
    </Section>
  );
}
