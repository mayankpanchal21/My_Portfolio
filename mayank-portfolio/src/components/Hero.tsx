import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { profile } from '../data/profile';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

export function Hero() {
  const [photoAvailable, setPhotoAvailable] = useState(true);
  const initials = profile.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');

  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40"
    >
      <div aria-hidden="true" className="bg-grid mask-fade-radial absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 h-[420px] w-[720px] max-w-full -translate-x-1/2 rounded-full bg-accent/[0.07] blur-3xl"
      />

      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <motion.p {...fadeUp(0)} className="eyebrow mb-6 flex flex-wrap items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            Software Engineer · Full Stack Development
          </motion.p>

          <motion.h1
            id="home-heading"
            {...fadeUp(0.08)}
            className="text-balance text-[2.6rem] font-medium leading-[1.05] tracking-[-0.03em] text-fg sm:text-6xl lg:text-[4.1rem]"
          >
            Building thoughtful digital experiences{' '}
            <span className="font-serif text-[1.08em] font-normal italic tracking-normal text-accent-soft">
              through code.
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.16)}
            className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-fg-muted"
          >
            I'm {profile.name}, a software engineer focused on building useful web applications,
            full-stack products, and technology-driven solutions.
          </motion.p>

          <motion.div {...fadeUp(0.24)} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn-primary group">
              Explore My Work
              <ArrowDownRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              />
            </a>
            <a href="#contact" className="btn-secondary group">
              Get in Touch
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              />
            </a>
          </motion.div>

          {profile.availability.visible && (
            <motion.p
              {...fadeUp(0.32)}
              className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-ink-700 bg-ink-900/70 px-3 py-1.5 text-xs text-fg-muted"
            >
              <span aria-hidden="true" className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/60 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {profile.availability.label}
            </motion.p>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="relative min-w-0"
        >
          <div className="relative mx-auto w-full max-w-[27rem] lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute inset-x-7 top-7 bottom-2 rotate-3 rounded-[2rem] border border-accent/30 bg-accent/[0.04]"
            />
            <div
              aria-hidden="true"
              className="absolute -inset-8 -z-10 rounded-full bg-accent/[0.12] blur-3xl"
            />

            <div className="relative overflow-hidden rounded-[1.75rem] border border-ink-600 bg-ink-900 shadow-[0_32px_90px_-36px_rgba(124,134,255,0.45)]">
              {photoAvailable ? (
                <img
                  src="/mayank.png"
                  alt={`Portrait of ${profile.name}`}
                  className="aspect-[4/5] w-full object-cover object-center"
                  onError={() => setPhotoAvailable(false)}
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="flex aspect-[4/5] items-center justify-center bg-[radial-gradient(ellipse_at_50%_38%,rgba(124,134,255,0.3),transparent_52%),linear-gradient(145deg,#18181d,#09090b)]"
                >
                  <span className="font-serif text-[8rem] italic tracking-[-0.08em] text-accent-soft/80">
                    {initials}
                  </span>
                </div>
              )}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/10"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="eyebrow mb-2 text-accent-soft">Software Engineer</p>
                <p className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
                  {profile.name}
                </p>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/70">
                  Building useful products with thoughtful code and a focus on the details.
                </p>
              </div>
            </div>

            <div className="absolute -left-2 top-12 rounded-full border border-ink-600 bg-ink-900/90 px-4 py-2.5 shadow-xl backdrop-blur sm:-left-5">
              <span className="flex items-center gap-2.5 text-xs font-medium text-fg">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgba(124,134,255,0.9)]" />
                Full-stack developer
              </span>
            </div>
            <div className="absolute -right-2 bottom-24 rounded-full border border-ink-600 bg-ink-900/90 px-4 py-2.5 shadow-xl backdrop-blur sm:-right-5">
              <span className="text-xs text-fg-muted">Thoughtful by design</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
