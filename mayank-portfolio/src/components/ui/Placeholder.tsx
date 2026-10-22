import { PencilLine } from 'lucide-react';
import type { ReactNode } from 'react';

/** Visible marker for content that still needs real information. */
export function PlaceholderBadge({ children = 'Placeholder' }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-pending/50 bg-pending-dim px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-pending">
      <PencilLine aria-hidden="true" className="h-3 w-3" />
      {children}
    </span>
  );
}

export function PlaceholderNote({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-lg border border-dashed border-pending/40 bg-pending-dim px-3 py-2 text-sm text-pending/90">
      {children}
    </p>
  );
}
