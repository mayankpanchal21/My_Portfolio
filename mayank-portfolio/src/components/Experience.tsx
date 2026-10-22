import { Lock } from 'lucide-react';
import { experience } from '../data/experience';
import { formatDateRange, formatDuration } from '../lib/format';
import type { ExperienceItem } from '../types';
import { PlaceholderBadge, PlaceholderNote } from './ui/Placeholder';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';

function ExperienceCard({ item }: { item: ExperienceItem }) {
  return (
    <article
      className={`card p-6 transition-colors sm:p-7 ${
        item.isPlaceholder ? '!border-dashed !border-ink-600 !bg-transparent' : 'hover:border-ink-600'
      }`}
    >
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className="[overflow-wrap:anywhere] text-lg font-medium leading-snug text-fg">{item.company}</h3>
          <p className="mt-1 text-[15px] text-accent-soft">{item.role}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          {item.employmentType && <span className="tag">{item.employmentType}</span>}
          {item.isPlaceholder && <PlaceholderBadge>Details pending</PlaceholderBadge>}
        </div>
      </header>

      {/* Dates are repeated here for small screens where the timeline column is hidden. */}
      <p className="mt-3 font-mono text-xs text-fg-subtle md:hidden">
        <time dateTime={item.start}>{formatDateRange(item.start, item.end)}</time>
        <span className="mx-2 text-ink-600">/</span>
        {formatDuration(item.start, item.end)}
      </p>

      {item.isPlaceholder ? (
        <div className="mt-5">
          <PlaceholderNote>
            Add responsibilities and technologies for this role in{' '}
            <code className="font-mono text-[13px]">src/data/experience.ts</code>.
          </PlaceholderNote>
        </div>
      ) : (
        <>
          <p className="mt-4 text-pretty leading-relaxed text-fg-muted">{item.summary}</p>
          <ul className="mt-5 space-y-2.5">
            {item.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-[15px] leading-relaxed text-fg-muted">
                <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-ink-600" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      {item.confidentialNote && (
        <p className="mt-5 flex items-start gap-2 text-xs text-fg-subtle">
          <Lock aria-hidden="true" className="mt-px h-3.5 w-3.5 shrink-0" />
          {item.confidentialNote}
        </p>
      )}

      {(item.technologies.length > 0 || item.domains.length > 0) && (
        <div className="mt-6 flex flex-wrap gap-2 border-t border-ink-700 pt-5">
          {item.technologies.map((tech) => (
            <span key={tech} className="tag !text-fg">
              {tech}
            </span>
          ))}
          {item.domains.map((domain) => (
            <span key={domain} className="tag border-dashed">
              {domain}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

export function Experience() {
  return (
    <Section
      id="experience"
      index="03"
      eyebrow="Experience"
      title="Where I've worked"
      intro="Full-time roles and freelance work, most recent first."
    >
      <div className="relative">
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-[11.5rem] top-2 hidden w-px bg-gradient-to-b from-ink-600 via-ink-700 to-transparent md:block"
        />
        <ol className="space-y-6 md:space-y-8">
        {experience.map((item, i) => (
          <li key={`${item.company}-${item.start}`} className="md:grid md:grid-cols-[11.5rem_1fr]">
            <Reveal className="relative hidden pr-8 pt-7 md:block">
              <time dateTime={item.start} className="block font-mono text-xs text-fg-muted">
                {formatDateRange(item.start, item.end)}
              </time>
              <span className="mt-1 block font-mono text-[11px] text-fg-subtle">
                {formatDuration(item.start, item.end)}
              </span>
              <span
                aria-hidden="true"
                className={`absolute -right-[5px] top-[2.05rem] h-2.5 w-2.5 rounded-full border-2 border-ink-950 ${
                  i === 0 ? 'bg-accent' : 'bg-ink-600'
                }`}
              />
            </Reveal>
            <Reveal delay={0.05} className="md:pl-8">
              <ExperienceCard item={item} />
            </Reveal>
          </li>
        ))}
        </ol>
      </div>
    </Section>
  );
}
