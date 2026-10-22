import type { MouseEvent, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { NavItem } from '../../types';

interface SiteLinkProps {
  item: NavItem;
  className?: string;
  children?: ReactNode;
  'aria-current'?: 'page' | 'location';
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * Section links use a plain hash anchor while on the home page (native smooth
 * scrolling) and a router link back to `/#section` from any other page.
 */
export function SiteLink({ item, children = item.label, ...rest }: SiteLinkProps) {
  const { pathname } = useLocation();

  if (item.kind === 'page') {
    return (
      <Link to={item.path} {...rest}>
        {children}
      </Link>
    );
  }

  if (pathname === '/') {
    return (
      <a href={`#${item.id}`} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link to={item.id === 'home' ? '/' : { pathname: '/', hash: `#${item.id}` }} {...rest}>
      {children}
    </Link>
  );
}

/** Which nav item is current: a page by its route, or a home section by scroll position. */
export function isNavItemActive(item: NavItem, pathname: string, activeSectionId: string) {
  if (item.kind === 'page') return pathname === item.path || pathname.startsWith(`${item.path}/`);
  return pathname === '/' && item.id === activeSectionId;
}
