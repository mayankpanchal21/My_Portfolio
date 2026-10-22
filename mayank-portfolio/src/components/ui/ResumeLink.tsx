import { FileDown } from 'lucide-react';
import { profile } from '../../data/profile';

interface ResumeLinkProps {
  className?: string;
  label?: string;
}

/**
 * Downloads the resume when `profile.resumeUrl` is set. Until then it renders a
 * clearly disabled control rather than a button that silently does nothing.
 */
export function ResumeLink({ className = '', label = 'Resume' }: ResumeLinkProps) {
  if (profile.resumeUrl) {
    return (
      <a
        href={profile.resumeUrl}
        download
        className={className}
        aria-label={`Download ${profile.name}'s resume (PDF)`}
      >
        <FileDown aria-hidden="true" className="h-4 w-4" />
        {label}
      </a>
    );
  }

  return (
    <span
      role="link"
      aria-disabled="true"
      title="Resume file not added yet"
      className={`${className} cursor-not-allowed opacity-50`}
    >
      <FileDown aria-hidden="true" className="h-4 w-4" />
      {label}
      <span className="sr-only">(not yet available)</span>
    </span>
  );
}
