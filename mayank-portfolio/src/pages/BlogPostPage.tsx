import { marked } from 'marked';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PageHeader } from '../components/ui/PageHeader';
import { PlaceholderBadge } from '../components/ui/Placeholder';
import { usePageTitle } from '../hooks/usePageTitle';
import { formatPostDate, getPost, posts } from '../lib/blog';
import NotFoundPage from './NotFoundPage';

export default function BlogPostPage() {
  const { slug = '' } = useParams();
  const post = getPost(slug);
  usePageTitle(post?.title, post?.summary);

  // Posts are Markdown files committed to this repo, so the generated HTML is trusted content.
  const html = useMemo(
    () => (post ? (marked.parse(post.body, { async: false, gfm: true }) as string) : ''),
    [post],
  );

  if (!post) return <NotFoundPage message="That blog post doesn't exist or may have been renamed." />;

  const index = posts.indexOf(post);
  const newer = posts[index - 1];
  const older = posts[index + 1];

  return (
    <article>
      <PageHeader
        eyebrow={`${formatPostDate(post.date)} · ${post.readingMinutes} min read`}
        title={post.title}
        intro={post.summary}
        trail={[{ label: 'Blog', to: '/blog' }, { label: post.title }]}
      />

      <div className="border-t border-ink-800 pb-24 pt-12">
        <div className="container-page">
          <div className="mx-auto max-w-[44rem]">
            {(post.isPlaceholder || post.tags.length > 0) && (
              <div className="mb-10 flex flex-wrap items-center gap-2">
                {post.isPlaceholder && <PlaceholderBadge />}
                {post.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="prose-post" dangerouslySetInnerHTML={{ __html: html }} />

            <nav
              aria-label="More posts"
              className="mt-16 grid gap-4 border-t border-ink-800 pt-8 sm:grid-cols-2"
            >
              {older ? (
                <Link to={`/blog/${older.slug}`} className="card group p-5 transition-colors hover:border-ink-600">
                  <span className="eyebrow flex items-center gap-1.5">
                    <ArrowLeft aria-hidden="true" className="h-3 w-3" /> Older post
                  </span>
                  <span className="mt-2 block text-fg [overflow-wrap:anywhere]">{older.title}</span>
                </Link>
              ) : (
                <Link to="/blog" className="card group p-5 transition-colors hover:border-ink-600">
                  <span className="eyebrow flex items-center gap-1.5">
                    <ArrowLeft aria-hidden="true" className="h-3 w-3" /> Blog
                  </span>
                  <span className="mt-2 block text-fg">All posts</span>
                </Link>
              )}
              {newer && (
                <Link
                  to={`/blog/${newer.slug}`}
                  className="card group p-5 text-right transition-colors hover:border-ink-600"
                >
                  <span className="eyebrow flex items-center justify-end gap-1.5">
                    Newer post <ArrowRight aria-hidden="true" className="h-3 w-3" />
                  </span>
                  <span className="mt-2 block text-fg [overflow-wrap:anywhere]">{newer.title}</span>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>
    </article>
  );
}
