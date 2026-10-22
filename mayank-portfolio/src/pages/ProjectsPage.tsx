import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProjectCard } from '../components/ProjectCard';
import { ALL, FilterChips, tally } from '../components/ui/FilterChips';
import { PageHeader } from '../components/ui/PageHeader';
import { Reveal } from '../components/ui/Reveal';
import { projects } from '../data/projects';
import { usePageTitle } from '../hooks/usePageTitle';

const categories = tally(projects.map((project) => project.category));

export default function ProjectsPage() {
  usePageTitle(
    'Our Projects',
    'Web applications, websites and domain projects built by Mayank Panchal, with the problem, role and stack for each.',
  );
  const [category, setCategory] = useState(ALL);
  const visible = category === ALL ? projects : projects.filter((p) => p.category === category);

  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Our Projects"
        intro="Web applications, business websites and domain-focused work. Each entry covers the problem, my contribution, and the technology used."
        trail={[{ label: 'Our Projects' }]}
      />

      <section aria-label="Project list" className="border-t border-ink-800 pb-24 pt-10">
        <div className="container-page">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <FilterChips
              label="Filter projects by category"
              values={categories.values}
              counts={categories.counts}
              selected={category}
              onChange={setCategory}
            />
            <p className="font-mono text-xs text-fg-subtle" aria-live="polite">
              Showing {visible.length} of {projects.length}
            </p>
          </div>

          {visible.length > 0 ? (
            <motion.ul layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout" initial={false}>
                {visible.map((project) => (
                  <motion.li
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                    className="min-w-0"
                  >
                    <ProjectCard project={project} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          ) : (
            <p className="card p-8 text-center text-fg-muted">No projects in this category yet.</p>
          )}

          <Reveal className="mt-20">
            <div className="card flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-medium text-fg">Have a project in mind?</h2>
                <p className="mt-1 text-fg-muted">I'm happy to talk through the problem first.</p>
              </div>
              <Link to={{ pathname: '/', hash: '#contact' }} className="btn-primary group shrink-0">
                Get in Touch
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
