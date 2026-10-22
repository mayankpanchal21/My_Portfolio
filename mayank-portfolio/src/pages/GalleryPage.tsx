import { ChevronLeft, ChevronRight, ImageIcon, Maximize2, X } from 'lucide-react';
import { useRef, useState, type KeyboardEvent, type MouseEvent } from 'react';
import { ALL, FilterChips, tally } from '../components/ui/FilterChips';
import { PageHeader } from '../components/ui/PageHeader';
import { PlaceholderBadge, PlaceholderNote } from '../components/ui/Placeholder';
import { Reveal } from '../components/ui/Reveal';
import { galleryItems } from '../data/gallery';
import { usePageTitle } from '../hooks/usePageTitle';
import type { GalleryAspect, GalleryItem } from '../types';

const categories = tally(galleryItems.map((item) => item.category));

const aspectClass: Record<GalleryAspect, string> = {
  landscape: 'aspect-[4/3]',
  portrait: 'aspect-[3/4]',
  square: 'aspect-square',
};

function GalleryImage({ item, large = false }: { item: GalleryItem; large?: boolean }) {
  if (item.src) {
    return (
      <img
        src={item.src}
        alt={item.alt ?? item.caption}
        width={item.width}
        height={item.height}
        loading={large ? 'eager' : 'lazy'}
        decoding="async"
        className={`h-full w-full ${large ? 'max-h-[75vh] object-contain' : 'object-cover'}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`Photo placeholder: ${item.caption}`}
      className="flex h-full w-full flex-col items-center justify-center gap-3 bg-ink-900 bg-[radial-gradient(#34343c_1px,transparent_1px)] p-6 text-center [background-size:16px_16px]"
    >
      <span className="grid h-12 w-12 place-items-center rounded-xl border border-dashed border-ink-600 bg-ink-950 text-fg-subtle">
        <ImageIcon aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
      </span>
      <span className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
        Photo placeholder
      </span>
    </div>
  );
}

export default function GalleryPage() {
  usePageTitle('Gallery', 'Photos from the work, projects and events of Mayank Panchal.');
  const [category, setCategory] = useState(ALL);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const visible =
    category === ALL ? galleryItems : galleryItems.filter((item) => item.category === category);
  const current = openIndex === null ? null : visible[openIndex];

  const open = (index: number) => {
    setOpenIndex(index);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = (delta: number) =>
    setOpenIndex((index) => (index === null ? index : (index + delta + visible.length) % visible.length));

  const onDialogKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'ArrowRight') step(1);
    if (event.key === 'ArrowLeft') step(-1);
  };
  // A click that lands on the <dialog> element itself (not its content) is a backdrop click.
  const onDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) close();
  };

  const hasPlaceholders = galleryItems.some((item) => item.isPlaceholder);

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Moments from the work"
        intro="Workspaces, project milestones and events — a less formal look at how I work."
        trail={[{ label: 'Gallery' }]}
      />

      <section aria-label="Photos" className="border-t border-ink-800 pb-24 pt-10">
        <div className="container-page">
          {hasPlaceholders && (
            <div className="mb-8">
              <PlaceholderNote>
                These are empty photo slots. Add real photos in{' '}
                <code className="font-mono text-[13px]">src/data/gallery.ts</code>.
              </PlaceholderNote>
            </div>
          )}

          <div className="mb-10">
            <FilterChips
              label="Filter photos by category"
              values={categories.values}
              counts={categories.counts}
              selected={category}
              onChange={setCategory}
            />
          </div>

          <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {visible.map((item, i) => (
              <li key={item.id} className="mb-5 break-inside-avoid">
                <Reveal delay={(i % 3) * 0.05}>
                  <figure className="card group overflow-hidden">
                    <button
                      type="button"
                      onClick={() => open(i)}
                      className="relative block w-full overflow-hidden text-left focus-visible:outline-offset-[-2px]"
                      aria-label={`Open larger view: ${item.caption}`}
                    >
                      <div
                        className={`${aspectClass[item.aspect]} transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:group-hover:scale-100`}
                      >
                        <GalleryImage item={item} />
                      </div>
                      <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-md border border-ink-600 bg-ink-950/80 text-fg-muted opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                        <Maximize2 aria-hidden="true" className="h-3.5 w-3.5" />
                      </span>
                    </button>
                    <figcaption className="flex items-start justify-between gap-3 border-t border-ink-700 px-4 py-3">
                      <span className="text-sm leading-snug text-fg-muted">{item.caption}</span>
                      <span className="tag shrink-0">{item.category}</span>
                    </figcaption>
                  </figure>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <dialog
        ref={dialogRef}
        onClose={() => setOpenIndex(null)}
        onKeyDown={onDialogKeyDown}
        onClick={onDialogClick}
        aria-label={current ? `Photo: ${current.caption}` : 'Photo viewer'}
        className="m-auto w-[min(64rem,calc(100%-2rem))] max-w-none bg-transparent p-0 text-fg backdrop:bg-ink-950/90 backdrop:backdrop-blur-sm"
      >
        {current && openIndex !== null && (
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between gap-4 border-b border-ink-700 px-4 py-3">
              <p className="font-mono text-xs text-fg-subtle">
                {openIndex + 1} / {visible.length} · {current.category}
              </p>
              <button
                type="button"
                onClick={close}
                className="grid h-9 w-9 place-items-center rounded-md text-fg-muted transition-colors hover:bg-ink-850 hover:text-fg"
                aria-label="Close photo viewer"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
            <div className={`relative bg-ink-950 ${current.src ? 'max-h-[75vh]' : 'h-[min(60vh,32rem)]'} overflow-hidden`}>
              <GalleryImage item={current} large />
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-ink-700 px-4 py-3">
              <button
                type="button"
                onClick={() => step(-1)}
                className="btn-secondary !px-3 !py-1.5"
                aria-label="Previous photo"
              >
                <ChevronLeft aria-hidden="true" className="h-4 w-4" />
              </button>
              <p className="min-w-0 flex-1 text-center text-sm text-fg-muted">
                {current.caption}
                {current.isPlaceholder && (
                  <span className="ml-2 inline-block align-middle">
                    <PlaceholderBadge />
                  </span>
                )}
              </p>
              <button
                type="button"
                onClick={() => step(1)}
                className="btn-secondary !px-3 !py-1.5"
                aria-label="Next photo"
              >
                <ChevronRight aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
