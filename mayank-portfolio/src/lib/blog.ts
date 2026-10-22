import type { BlogPost } from '../types';

// Posts are bundled at build time: every .md file in src/content/blog becomes a post.
const files = import.meta.glob<string>('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const WORDS_PER_MINUTE = 220;

/** Minimal frontmatter parser for `key: value` lines; enough for this blog's fields. */
function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!match) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const index = line.indexOf(':');
    if (index === -1) continue;
    const key = line.slice(0, index).trim();
    const value = line
      .slice(index + 1)
      .trim()
      .replace(/^["'](.*)["']$/, '$1');
    if (key) data[key] = value;
  }
  return { data, body: match[2] };
}

function toPost(path: string, raw: string): BlogPost & { draft: boolean } {
  const slug = path.split('/').pop()!.replace(/\.md$/, '');
  const { data, body } = parseFrontmatter(raw);
  const words = body.split(/\s+/).filter(Boolean).length;
  return {
    slug,
    title: data.title || slug,
    date: data.date || '',
    summary: data.summary || '',
    tags: (data.tags || '')
      .replace(/^\[|\]$/g, '')
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean),
    readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    body,
    isPlaceholder: data.placeholder === 'true',
    draft: data.draft === 'true',
  };
}

export const posts: BlogPost[] = Object.entries(files)
  .map(([path, raw]) => toPost(path, raw))
  .filter((post) => import.meta.env.DEV || !post.draft)
  .sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

const dateFormatter = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatPostDate(date: string): string {
  const parsed = new Date(`${date}T00:00:00Z`);
  return Number.isNaN(parsed.getTime()) ? date : dateFormatter.format(parsed);
}
