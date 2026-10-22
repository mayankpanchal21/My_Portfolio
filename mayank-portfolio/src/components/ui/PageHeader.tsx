import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from './Reveal';

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Breadcrumb trail after "Home"; the last entry is the current page. */
  trail: { label: string; to?: string }[];
}

export function PageHeader({ eyebrow, title, intro, trail }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden pb-14 pt-32 sm:pb-16 sm:pt-40">
      <div aria-hidden="true" className="bg-grid mask-fade-radial absolute inset-0 -z-10" />
      <div className="container-page">
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-fg-subtle">
              <li>
                <Link to="/" className="transition-colors hover:text-fg">
                  Home
                </Link>
              </li>
              {trail.map((crumb, i) => (
                <li key={crumb.label} className="flex min-w-0 items-center gap-1.5">
                  <ChevronRight aria-hidden="true" className="h-3 w-3 shrink-0" />
                  {crumb.to && i < trail.length - 1 ? (
                    <Link to={crumb.to} className="transition-colors hover:text-fg">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="truncate text-fg-muted">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <p className="eyebrow mb-4 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            {eyebrow}
          </p>
          <h1 className="max-w-3xl text-balance text-4xl font-medium tracking-[-0.03em] text-fg [overflow-wrap:anywhere] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-fg-muted">
              {intro}
            </p>
          )}
        </Reveal>
      </div>
    </header>
  );
}
