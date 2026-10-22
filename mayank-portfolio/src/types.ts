export interface Profile {
  name: string;
  title: string;
  /** Leave empty until real values are supplied; the UI renders a clear placeholder state. */
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  /** Path to a file in /public (e.g. '/resume/Mayank-Panchal-Resume.pdf') or an absolute URL. */
  resumeUrl: string;
  availability: {
    /** Only enable when the statement is currently true. */
    visible: boolean;
    label: string;
  };
}

/** Sections scroll within the home page; pages are separate routes. */
export type NavItem =
  | { kind: 'section'; id: string; label: string }
  | { kind: 'page'; path: string; label: string };

export interface SkillCategory {
  name: string;
  description: string;
  skills: string[];
}

/** Year-month in ISO form, e.g. '2025-03'. Used for display and <time dateTime>. */
export type YearMonth = `${number}-${number}`;

export interface ExperienceItem {
  company: string;
  role: string;
  start: YearMonth;
  end: YearMonth | 'present';
  employmentType?: string;
  summary: string;
  highlights: string[];
  /** Technologies confirmed for this role only. */
  technologies: string[];
  domains: string[];
  confidentialNote?: string;
  /** True when details are still missing and must be supplied. */
  isPlaceholder?: boolean;
}

export type ProjectVisual = 'application' | 'website' | 'geospatial';

export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  problem: string;
  contribution: string;
  stack: string[];
  /** Screenshot path in /public or imported asset. Omit to use the abstract illustration. */
  image?: string;
  imageAlt?: string;
  visual: ProjectVisual;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  confidential?: boolean;
  isPlaceholder?: boolean;
}

export interface Education {
  degree: string;
  field: string;
  institution: string;
  location: string;
  graduationYear: number;
}

export type GalleryAspect = 'landscape' | 'portrait' | 'square';

export interface GalleryItem {
  id: string;
  category: string;
  caption: string;
  /** Path in /public (e.g. '/gallery/workspace.jpg'). Omit to show a placeholder frame. */
  src?: string;
  alt?: string;
  /** Intrinsic size of the image, used to reserve space and avoid layout shift. */
  width?: number;
  height?: number;
  aspect: GalleryAspect;
  isPlaceholder?: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  /** ISO date, e.g. '2026-10-19'. */
  date: string;
  summary: string;
  tags: string[];
  readingMinutes: number;
  /** Markdown body (without frontmatter). */
  body: string;
  isPlaceholder: boolean;
}
