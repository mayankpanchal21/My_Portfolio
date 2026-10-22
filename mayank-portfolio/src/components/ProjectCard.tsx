import { ArrowUpRight, Github, Lock } from 'lucide-react';
import type { Project } from '../types';
import { ProjectVisual } from './ProjectVisual';
import { PlaceholderBadge } from './ui/Placeholder';

export function ProjectCard({ project }: { project: Project }) {
  const hasLinks = Boolean(project.githubUrl || project.liveUrl);

  return (
    <article className="card group flex h-full flex-col overflow-hidden transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-ink-600 motion-reduce:hover:translate-y-0">
      <div className="relative aspect-[20/11] overflow-hidden border-b border-ink-700">
        {project.image ? (
          <img
            src={project.image}
            alt={project.imageAlt ?? `Screenshot of ${project.name}`}
            loading="lazy"
            decoding="async"
            width={800}
            height={440}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:group-hover:scale-100">
            <ProjectVisual kind={project.visual} />
          </div>
        )}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {project.isPlaceholder && <PlaceholderBadge />}
          {project.confidential && (
            <span className="inline-flex items-center gap-1.5 rounded-md border border-ink-600 bg-ink-950/80 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-fg-muted backdrop-blur">
              <Lock aria-hidden="true" className="h-3 w-3" />
              Confidential
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow">{project.category}</p>
        <h3 className="mt-2 [overflow-wrap:anywhere] text-xl font-medium leading-snug tracking-tight text-fg">
          {project.name}
        </h3>
        <p className="mt-3 text-pretty text-[15px] leading-relaxed text-fg-muted [overflow-wrap:anywhere]">
          {project.description}
        </p>

        <dl className="mt-5 space-y-3 text-sm">
          <div>
            <dt className="font-medium text-fg">Problem</dt>
            <dd className="mt-0.5 leading-relaxed text-fg-subtle">{project.problem}</dd>
          </div>
          <div>
            <dt className="font-medium text-fg">My contribution</dt>
            <dd className="mt-0.5 leading-relaxed text-fg-subtle">{project.contribution}</dd>
          </div>
        </dl>

        <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${project.name} technology stack`}>
          {project.stack.map((tech) => (
            <li key={tech} className="tag">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-4 pt-6 text-sm">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-fg transition-colors hover:text-accent-soft"
            >
              Live demo
              <span className="sr-only"> of {project.name} (opens in a new tab)</span>
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-fg-muted transition-colors hover:text-fg"
            >
              <Github aria-hidden="true" className="h-4 w-4" />
              Source
              <span className="sr-only"> code for {project.name} on GitHub (opens in a new tab)</span>
            </a>
          )}
          {!hasLinks && (
            <span className="font-mono text-xs text-fg-subtle">
              {project.confidential ? 'No public links · confidential' : 'Links to be added'}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
