import { useEffect } from 'react';

const SITE_TITLE = 'Mayank Panchal | Software Engineer & Full Stack Developer';
const SITE_DESCRIPTION =
  "Explore Mayank Panchal's software engineering experience, full-stack development skills, selected projects, and professional background.";

/** Keeps the tab title and meta description in sync with the current route. */
export function usePageTitle(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} | Mayank Panchal` : SITE_TITLE;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', description ?? SITE_DESCRIPTION);
  }, [title, description]);
}
