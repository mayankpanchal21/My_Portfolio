import type { YearMonth } from '../types';

const monthFormatter = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' });

export function formatYearMonth(value: YearMonth | 'present'): string {
  if (value === 'present') return 'Present';
  const [year, month] = value.split('-').map(Number);
  return monthFormatter.format(new Date(year, month - 1));
}

export function formatDateRange(start: YearMonth, end: YearMonth | 'present'): string {
  return `${formatYearMonth(start)} — ${formatYearMonth(end)}`;
}

/** Inclusive month count, e.g. Mar 2025 → Jul 2025 = 5 mos. */
export function formatDuration(start: YearMonth, end: YearMonth | 'present'): string {
  const [sy, sm] = start.split('-').map(Number);
  const now = new Date();
  const [ey, em] =
    end === 'present' ? [now.getFullYear(), now.getMonth() + 1] : end.split('-').map(Number);
  const months = (ey - sy) * 12 + (em - sm) + 1;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (rest) parts.push(`${rest} mo${rest > 1 ? 's' : ''}`);
  return parts.join(' ');
}
