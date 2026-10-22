import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface SectionProps {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Section({ id, index, eyebrow, title, intro, children, className = '' }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`border-t border-ink-800 py-20 sm:py-28 ${className}`}
    >
      <div className="container-page">
        <Reveal className="mb-12 max-w-2xl sm:mb-16">
          <p className="eyebrow mb-4 flex items-center gap-3">
            <span className="text-accent-soft">{index}</span>
            <span aria-hidden="true" className="h-px w-8 bg-ink-600" />
            {eyebrow}
          </p>
          <h2
            id={headingId}
            className="text-balance text-3xl font-medium tracking-tight text-fg sm:text-4xl"
          >
            {title}
          </h2>
          {intro && <p className="mt-4 text-pretty leading-relaxed text-fg-muted">{intro}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
