export const ALL = 'All';

interface FilterChipsProps {
  /** Accessible name for the group, e.g. "Filter projects by category". */
  label: string;
  values: string[];
  /** Number of items per value, shown next to each chip. `ALL` is counted automatically. */
  counts: Record<string, number>;
  selected: string;
  onChange: (value: string) => void;
}

export function FilterChips({ label, values, counts, selected, onChange }: FilterChipsProps) {
  const total = Object.values(counts).reduce((sum, n) => sum + n, 0);
  const options = [ALL, ...values];

  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((value) => {
        const active = value === selected;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(value)}
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
              active
                ? 'border-fg bg-fg text-ink-950'
                : 'border-ink-700 text-fg-muted hover:border-ink-600 hover:text-fg'
            }`}
          >
            {value}
            <span className={`font-mono text-[11px] ${active ? 'text-ink-700' : 'text-fg-subtle'}`}>
              {value === ALL ? total : counts[value]}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/** Unique values in first-seen order, with how often each appears. */
export function tally(values: string[]) {
  const counts: Record<string, number> = {};
  for (const value of values) counts[value] = (counts[value] ?? 0) + 1;
  return { values: Object.keys(counts), counts };
}
