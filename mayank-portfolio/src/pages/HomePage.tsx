import { About } from '../components/About';
import { Contact } from '../components/Contact';
import { EngineeringApproach } from '../components/EngineeringApproach';
import { Education } from '../components/Education';
import { Experience } from '../components/Experience';
import { Hero } from '../components/Hero';
import { Projects } from '../components/Projects';
import { Skills } from '../components/Skills';
import { usePageTitle } from '../hooks/usePageTitle';

export default function HomePage() {
  usePageTitle();

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <EngineeringApproach />
      <Education />
      <Contact />
    </>
  );
}
