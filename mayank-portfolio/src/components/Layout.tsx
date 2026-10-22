import { MotionConfig } from 'framer-motion';
import { RotateCw } from 'lucide-react';
import { Component, Suspense, useLayoutEffect, type ReactNode } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

function PageLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="container-page flex min-h-[70vh] items-center justify-center pt-16"
    >
      <span className="h-px w-32 overflow-hidden bg-ink-700">
        <span className="block h-full w-1/3 animate-[loading-slide_1s_ease-in-out_infinite] bg-accent motion-reduce:animate-none" />
      </span>
      <span className="sr-only">Loading page…</span>
    </div>
  );
}

/** Catches render errors, including a lazily loaded page whose chunk failed to download. */
class PageErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <section className="container-page flex min-h-[70vh] flex-col items-start justify-center pt-24">
        <p className="eyebrow mb-4">Something went wrong</p>
        <h1 className="text-3xl font-medium tracking-tight text-fg sm:text-4xl">
          This page couldn't be loaded
        </h1>
        <p className="mt-4 max-w-lg text-fg-muted">
          This is usually a network hiccup or a newly deployed version. Reloading should fix it.
        </p>
        <button type="button" onClick={() => window.location.reload()} className="btn-secondary mt-8">
          <RotateCw aria-hidden="true" className="h-4 w-4" />
          Reload page
        </button>
      </section>
    );
  }
}

export function Layout() {
  const { pathname, hash } = useLocation();

  // Runs only when the route changes (not on in-page hash links, which scroll natively):
  // jump to the target section for links like /#contact, otherwise start at the top.
  useLayoutEffect(() => {
    const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
    if (target) target.scrollIntoView({ behavior: 'instant' });
    else window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-ink-950"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <PageErrorBoundary key={pathname}>
          <Suspense fallback={<PageLoading />}>
            <Outlet />
          </Suspense>
        </PageErrorBoundary>
      </main>
      <Footer />
    </MotionConfig>
  );
}
