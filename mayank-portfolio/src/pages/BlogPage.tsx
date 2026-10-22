import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ALL, FilterChips, tally } from '../components/ui/FilterChips';
import { PageHeader } from '../components/ui/PageHeader';
import { PlaceholderBadge } from '../components/ui/Placeholder';
import { Reveal } from '../components/ui/Reveal';
import { usePageTitle } from '../hooks/usePageTitle';
import { formatPostDate, posts } from '../lib/blog';

const tags = tally(posts.flatMap((post) => post.tags));

export default function BlogPage() {
  usePageTitle('Blog', 'Notes and articles by Mayank Panchal on software engineering and web development.');
  const [tag, setTag] = useState(ALL);
  const visible = tag === ALL ? posts : posts.filter((post) => post.tags.includes(tag));

  return (
    <>
      <PageHeader
        eyebrow="Personal blog"
        title="Notes on building software"
        intro="Write-ups on things I've built, problems I've worked through, and what I'm learning along the way."
        trail={[{ label: 'Blog' }]}
      />

      <section aria-label="Posts" className="border-t border-ink-800 pb-24 pt-10">
        <div className="container-page">
          {tags.values.length > 1 && (
            <div className="mb-10">
              <FilterChips
                label="Filter posts by tag"
                values={tags.values}
                counts={tags.counts}
                selected={tag}
                onChange={setTag}
              />
            </div>
          )}

          {visible.length === 0 ? (
            <p className="card p-8 text-center text-fg-muted">
              No posts yet — the first one is on its way.
            </p>
          ) : (
            <ol className="divide-y divide-ink-800 border-y border-ink-800">
              {visible.map((post, i) => (
                <li key={post.slug}>
                  <Reveal delay={Math.min(i, 4) * 0.05}>
                    <article className="group relative grid gap-3 py-8 md:grid-cols-[10rem_1fr_auto] md:gap-8">
                      <p className="font-mono text-xs text-fg-subtle md:pt-1.5">
                        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                        <span className="mx-2 text-ink-600 md:hidden">/</span>
                        <span className="md:mt-1 md:block">{post.readingMinutes} min read</span>
                      </p>
                      <div className="min-w-0">
                        {post.isPlaceholder && (
                          <div className="mb-3">
                            <PlaceholderBadge />
                          </div>
                        )}
                        <h2 className="text-balance text-xl font-medium leading-snug tracking-tight text-fg [overflow-wrap:anywhere] sm:text-2xl">
                          {/* The stretched link makes the whole row clickable while keeping one link per post. */}
                          <Link
                            to={`/blog/${post.slug}`}
                            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-focus-within:underline group-focus-within:decoration-accent group-focus-within:underline-offset-4"
                          >
                            {post.title}
                          </Link>
                        </h2>
                        {post.summary && (
                          <p className="mt-2 max-w-2xl text-pretty leading-relaxed text-fg-muted">
                            {post.summary}
                          </p>
                        )}
                        {post.tags.length > 0 && (
                          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
                            {post.tags.map((t) => (
                              <li key={t} className="tag">
                                {t}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="hidden h-5 w-5 text-fg-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-soft md:block"
                      />
                    </article>
                  </Reveal>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>
    </>
  );
}
