import { Compass } from 'lucide-react';
import { domainExposure, skillCategories } from '../data/skills';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';

export function Skills() {
  return (
    <Section
      id="skills"
      index="02"
      eyebrow="Skills"
      title="Technical toolkit"
      intro="The technologies I work with day to day, kept separate from the domains I've gained project exposure to."
    >
      <ul className="grid gap-px overflow-hidden rounded-2xl border border-ink-700 bg-ink-700 sm:grid-cols-2 lg:grid-cols-4">
        {skillCategories.map((category, i) => (
          <li key={category.name} className="bg-ink-900">
            <Reveal delay={i * 0.06} className="flex h-full flex-col p-6">
              <h3 className="text-base font-medium text-fg">{category.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-subtle">
                {category.description}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${category.name} skills`}>
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-md border border-ink-600 bg-ink-850 px-2.5 py-1 text-[13px] text-fg transition-colors hover:border-accent/50"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal className="mt-6">
        <div className="flex flex-col gap-5 rounded-2xl border border-dashed border-ink-600 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Compass aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent-soft" />
            <div>
              <h3 className="text-base font-medium text-fg">Domain exposure</h3>
              <p className="mt-1 max-w-md text-sm text-fg-subtle">
                Areas I've contributed to through project work — distinct from core programming
                skills.
              </p>
            </div>
          </div>
          <ul className="flex flex-wrap gap-2 sm:max-w-md sm:justify-end" aria-label="Domain exposure">
            {domainExposure.map((domain) => (
              <li key={domain} className="tag">
                {domain}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
