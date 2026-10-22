import { Github, Linkedin } from 'lucide-react';
import { navItems, profile } from '../data/profile';
import { SiteLink } from './ui/SiteLink';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-800 py-12">
      <div className="container-page flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-medium text-fg">{profile.name}</p>
          <p className="mt-1 text-sm text-fg-subtle">Software Engineer · Full Stack Developer</p>
          <p className="mt-6 font-mono text-xs text-fg-subtle">
            {year} · Designed and built with care
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:grid-cols-4">
            {navItems.map((item) => (
              <li key={item.kind === 'page' ? item.path : item.id}>
                <SiteLink item={item} className="text-fg-muted transition-colors hover:text-fg" />
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex gap-2" aria-label="Social profiles">
          {[
            { href: profile.githubUrl, label: 'GitHub', Icon: Github },
            { href: profile.linkedinUrl, label: 'LinkedIn', Icon: Linkedin },
          ]
            .filter((link) => link.href)
            .map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${profile.name} on ${label} (opens in a new tab)`}
                  className="grid h-10 w-10 place-items-center rounded-lg border border-ink-700 text-fg-muted transition-colors hover:border-ink-600 hover:text-fg"
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                </a>
              </li>
            ))}
        </ul>
      </div>
    </footer>
  );
}
