import { GraduationCap } from 'lucide-react';
import { education } from '../data/profile';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';

export function Education() {
  return (
    <Section id="education" index="06" eyebrow="Education" title="Academic background">
      <Reveal>
        <article className="card flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-start gap-5">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-ink-700 bg-ink-850 text-accent-soft">
              <GraduationCap aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-medium leading-snug text-fg">
                {education.degree}, {education.field}
              </h3>
              <p className="mt-1 text-fg-muted">
                {education.institution}, {education.location}
              </p>
            </div>
          </div>
          <p className="shrink-0 font-mono text-sm text-fg-muted sm:text-right">
            <span className="eyebrow mb-1 block">Graduated</span>
            <time dateTime={String(education.graduationYear)}>{education.graduationYear}</time>
          </p>
        </article>
      </Reveal>
    </Section>
  );
}
