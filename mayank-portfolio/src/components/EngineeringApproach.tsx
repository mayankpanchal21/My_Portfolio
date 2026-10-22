import { Boxes, RefreshCw, Search, ShieldCheck, type LucideIcon } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';

interface Principle {
  icon: LucideIcon;
  title: string;
  body: string;
}

const principles: Principle[] = [
  {
    icon: Search,
    title: 'Understand the problem before writing code',
    body: 'Clarify who the software is for, what success looks like, and which constraints matter before choosing an implementation.',
  },
  {
    icon: Boxes,
    title: 'Build maintainable and reusable solutions',
    body: 'Prefer clear structure, sensible naming, and components that the next person can read, extend, and trust.',
  },
  {
    icon: ShieldCheck,
    title: 'Consider usability, edge cases, and reliability',
    body: 'Think through empty states, bad input, slow networks, and different screen sizes — not just the happy path.',
  },
  {
    icon: RefreshCw,
    title: 'Iterate through feedback and continuous improvement',
    body: 'Ship in small steps, listen to users and teammates, and treat every review as a chance to make the work better.',
  },
];

export function EngineeringApproach() {
  return (
    <Section id="approach" index="05" eyebrow="Principles" title="How I Approach Engineering">
      <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
        {principles.map(({ icon: Icon, title, body }, i) => (
          <li key={title}>
            <Reveal delay={i * 0.06} className="flex gap-5">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-ink-700 bg-ink-900 text-accent-soft">
                <Icon aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="text-pretty font-medium leading-snug text-fg">{title}</h3>
                <p className="mt-2 text-pretty text-[15px] leading-relaxed text-fg-subtle">
                  {body}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
