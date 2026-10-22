import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { navItems } from '../data/profile';
import { useScrollSpy } from '../hooks/useScrollSpy';
import type { NavItem } from '../types';
import { ResumeLink } from './ui/ResumeLink';
import { isNavItemActive, SiteLink } from './ui/SiteLink';

/** Every section on the home page, in order, so the spy also knows when none of the nav sections is current. */
const homeSectionIds = [
  'home',
  'about',
  'skills',
  'experience',
  'projects',
  'approach',
  'education',
  'contact',
];

const itemKey = (item: NavItem) => (item.kind === 'page' ? item.path : item.id);

export function Navbar() {
  const { activeId, scrolled } = useScrollSpy(homeSectionIds);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  // Scrolling while the menu's collapse animation runs gets cancelled, so mobile
  // section links queue their target and scroll once the exit animation has finished.
  const pendingTarget = useRef<string | null>(null);

  const scrollToPending = () => {
    const id = pendingTarget.current;
    pendingTarget.current = null;
    if (!id) return;
    document.getElementById(id)?.scrollIntoView();
    navigate({ hash: `#${id}` });
  };

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onBreakpoint = () => desktop.matches && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onBreakpoint);
    return () => {
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onBreakpoint);
    };
  }, [menuOpen]);

  const isActive = (item: NavItem) => isNavItemActive(item, pathname, activeId);
  const currentFor = (item: NavItem) =>
    isActive(item) ? (item.kind === 'page' ? 'page' : 'location') : undefined;
  const elevated = scrolled || menuOpen || pathname !== '/';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        elevated
          ? 'border-b border-ink-800 bg-ink-950/80 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between">
        <Link
          to="/"
          className="group flex items-center gap-2.5 text-[15px] font-medium tracking-tight text-fg"
          onClick={() => {
            setMenuOpen(false);
            if (pathname === '/') window.scrollTo({ top: 0 });
          }}
        >
          <span
            aria-hidden="true"
            className="grid h-7 w-7 place-items-center rounded-md border border-ink-600 bg-ink-850 font-mono text-[11px] text-fg transition-colors group-hover:border-accent/60"
          >
            MP
          </span>
          {/* {profile.name} */}
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <li key={itemKey(item)}>
                <SiteLink
                  item={item}
                  aria-current={currentFor(item)}
                  className={`relative whitespace-nowrap rounded-md px-2.5 py-2 text-sm transition-colors ${
                    active ? 'text-fg' : 'text-fg-subtle hover:text-fg'
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden="true"
                      className="absolute inset-x-2.5 -bottom-px h-px bg-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </SiteLink>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <ResumeLink className="btn-secondary !py-1.5" />
        </div>

        <button
          type="button"
          className="-mr-2 grid h-10 w-10 place-items-center rounded-md text-fg lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence onExitComplete={scrollToPending}>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-ink-800 lg:hidden"
          >
            <ul className="container-page flex flex-col py-3">
              {navItems.map((item) => {
                const active = isActive(item);
                return (
                  <li key={itemKey(item)}>
                    <SiteLink
                      item={item}
                      aria-current={currentFor(item)}
                      onClick={(event) => {
                        if (item.kind === 'section' && pathname === '/') {
                          event.preventDefault();
                          pendingTarget.current = item.id;
                        }
                        setMenuOpen(false);
                      }}
                      className={`flex items-center justify-between rounded-md px-2 py-3 text-base ${
                        active ? 'text-fg' : 'text-fg-muted'
                      }`}
                    >
                      {item.label}
                      {active && (
                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                      )}
                    </SiteLink>
                  </li>
                );
              })}
              <li className="mt-2 border-t border-ink-800 pt-4">
                <ResumeLink className="btn-secondary w-full" label="Download resume" />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
