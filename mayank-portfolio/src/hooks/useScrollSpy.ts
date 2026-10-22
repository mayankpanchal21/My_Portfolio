import { useEffect, useState } from 'react';

/**
 * Returns the id of the last section whose top has passed the given offset,
 * plus whether the page has scrolled at all. A rAF-throttled scroll listener is
 * used instead of IntersectionObserver so sections of very different heights
 * resolve predictably. Pass a stable `ids` array (e.g. a module constant).
 */
export function useScrollSpy(ids: string[], offset = 120) {
  const [activeId, setActiveId] = useState(ids[0]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) {
        setActiveId(ids[ids.length - 1]);
        return;
      }

      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - offset <= 0) current = id;
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids, offset]);

  return { activeId, scrolled };
}
