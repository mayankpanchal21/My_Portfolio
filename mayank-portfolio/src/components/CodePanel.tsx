import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { education, profile } from '../data/profile';
import { domainExposure, skillCategories } from '../data/skills';

type TokenKind = 'keyword' | 'name' | 'key' | 'string' | 'punct' | 'comment';
type Token = [TokenKind, string];
type Line = Token[];

// Arrays longer than this are written one item per line so the panel never clips.
const MAX_INLINE_ARRAY = 34;

const tokenClass: Record<TokenKind, string> = {
  keyword: 'text-[#c792ea]',
  name: 'text-fg',
  key: 'text-[#8fb3ff]',
  string: 'text-[#b5d99c]',
  punct: 'text-fg-subtle',
  comment: 'text-fg-subtle/80 italic',
};

/** Renders a plain object as highlighted TypeScript, so the panel always mirrors the real data files. */
function toLines(comment: string, name: string, data: Record<string, string | string[]>): Line[] {
  const lines: Line[] = [
    [['comment', `// ${comment}`]],
    [
      ['keyword', 'export const '],
      ['name', name],
      ['punct', ' = {'],
    ],
  ];
  for (const [key, value] of Object.entries(data)) {
    const line: Line = [['key', `  ${key}`], ['punct', ': ']];
    if (Array.isArray(value) && value.join("', '").length > MAX_INLINE_ARRAY) {
      line.push(['punct', '[']);
      lines.push(line);
      value.forEach((item) => lines.push([['string', `    '${item}'`], ['punct', ',']]));
      lines.push([['punct', '  ],']]);
      continue;
    } else if (Array.isArray(value)) {
      line.push(['punct', '[']);
      value.forEach((item, i) => {
        line.push(['string', `'${item}'`]);
        if (i < value.length - 1) line.push(['punct', ', ']);
      });
      line.push(['punct', '],']);
    } else {
      line.push(['string', `'${value}'`], ['punct', ',']);
    }
    lines.push(line);
  }
  lines.push([['punct', '} '], ['keyword', 'as const'], ['punct', ';']]);
  return lines;
}

const skillsFor = (name: string) => skillCategories.find((c) => c.name === name)?.skills ?? [];

const files = [
  {
    filename: 'profile.ts',
    lines: toLines('who I am', 'engineer', {
      name: profile.name,
      role: 'Software Engineer',
      focus: ['Full-stack web apps', 'MERN stack', 'Digital products'],
      education: `B.Tech CSE · AKTU, ${education.graduationYear}`,
      exposure: ['GIS', 'AgriTech'],
    }),
  },
  {
    filename: 'stack.ts',
    lines: toLines('what I build with', 'stack', {
      frontend: skillsFor('Frontend'),
      backend: skillsFor('Backend'),
      database: skillsFor('Database'),
    }),
  },
  {
    filename: 'domains.ts',
    lines: toLines('where I have applied it', 'domains', {
      exposure: domainExposure,
    }),
  },
];

const maxLines = Math.max(...files.map((f) => f.lines.length));

export function CodePanel() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (active + delta + files.length) % files.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const file = files[active];

  return (
    <div className="card relative overflow-hidden">
      <div
        role="tablist"
        aria-label="Profile source files"
        className="flex overflow-x-auto border-b border-ink-700 bg-ink-850/80"
      >
        {files.map((f, i) => {
          const selected = i === active;
          return (
            <button
              key={f.filename}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`${baseId}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onTabKeyDown}
              className={`relative shrink-0 border-r border-ink-700 px-4 py-2.5 font-mono text-xs transition-colors ${
                selected ? 'bg-ink-900 text-fg' : 'text-fg-subtle hover:text-fg-muted'
              }`}
            >
              {selected && (
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-accent" />
              )}
              {f.filename}
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        tabIndex={0}
        // Reserve the tallest file's height so switching tabs causes no layout shift.
        style={{ minHeight: `${maxLines * 1.5 + 2}rem` }}
        className="overflow-x-auto px-1 py-4 font-mono text-[12px] leading-6 sm:text-[13px]"
      >
        <pre className="font-mono">
          {file.lines.map((line, i) => (
            <div key={i} className="flex">
              <span
                aria-hidden="true"
                className="w-9 shrink-0 select-none pr-4 text-right text-ink-600"
              >
                {i + 1}
              </span>
              <code className="whitespace-pre pr-4">
                {line.map(([kind, text], j) => (
                  <span key={j} className={tokenClass[kind]}>
                    {text}
                  </span>
                ))}
              </code>
            </div>
          ))}
        </pre>
      </div>

      <div className="flex items-center justify-between border-t border-ink-700 bg-ink-850/60 px-4 py-2 font-mono text-[10.5px] text-fg-subtle">
        <span>TypeScript</span>
        <span className="truncate pl-4">rendered from src/data</span>
      </div>
    </div>
  );
}
