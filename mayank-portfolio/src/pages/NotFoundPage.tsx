import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';

export default function NotFoundPage({ message }: { message?: string }) {
  usePageTitle('Page not found');

  return (
    <section className="container-page flex min-h-[70vh] flex-col items-start justify-center pb-20 pt-32">
      <p className="eyebrow mb-4">Error 404</p>
      <h1 className="text-4xl font-medium tracking-tight text-fg sm:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-lg text-fg-muted">
        {message ?? "The page you're looking for doesn't exist or may have moved."}
      </p>
      <Link to="/" className="btn-secondary mt-8">
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        Back to home
      </Link>
    </section>
  );
}
