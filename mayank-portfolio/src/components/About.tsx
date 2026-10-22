import { education } from "../data/profile";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";

const facts = [
  {
    label: "Education",
    value: `B.Tech, Computer Science & Engineering · ${education.graduationYear}`,
  },
  { label: "Current role", value: "Lead Engineer · Tamar Software" },
  { label: "Specialties", value: "Full-stack, GIS, AI-powered products" },
  { label: "Core stack", value: "MongoDB, Express.js, React, Node.js" },
];

export function About() {
  return (
    <Section
      id="about"
      index="01"
      eyebrow="About"
      title={
        <>
          A computer science graduate who likes turning{" "}
          <span className="text-fg-muted">
            real problems into working software.
          </span>
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <Reveal className="space-y-8">
          <div className="space-y-4 text-pretty text-[17px] leading-relaxed text-fg-muted">
            <p className="text-lg leading-relaxed text-fg">
              I turn complex ideas into useful, dependable software—and help
              others grow the skills to build it, too.
            </p>
            <p>
              I’m a full-stack engineer with two years of experience building
              MERN applications, GIS-based systems, and AI-powered products
              across defence, AgriTech, e-commerce, and education. At Tamar
              Software, I lead a seven-person engineering team building a
              Learning Management System from the ground up to help students
              become job-ready.
            </p>
          </div>

          <div>
            <h3 className="eyebrow mb-4">Selected impact</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-[15px] leading-relaxed text-fg-muted">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                Improved map-rendering time by approximately 40% on a
                confidential Indian Air Force project using GIS, MapViewer, and
                radar data.
              </li>
              <li className="flex gap-3 text-[15px] leading-relaxed text-fg-muted">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                Shipped six or more production websites and web apps, with
                Lighthouse performance scores above 90.
              </li>
              <li className="flex gap-3 text-[15px] leading-relaxed text-fg-muted">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                Built an e-commerce platform and a YOLOv8 waste-classification
                model with approximately 92% accuracy.
              </li>
              <li className="flex gap-3 text-[15px] leading-relaxed text-fg-muted">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                Mentored more than 70 students through technical talks and MERN
                bootcamps at DIET and DVSIET colleges.
              </li>
            </ul>
          </div>

          <p className="border-l-2 border-accent/60 pl-4 text-[15px] leading-relaxed text-fg-subtle">
            Earlier, I worked as an Entrepreneur in Residence at an IIT
            Delhi-incubated AgriTech startup, building AI and IoT prototypes,
            and helped a client grow organic traffic by around 60% through
            technical SEO.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="card divide-y divide-ink-700">
            {facts.map((fact) => (
              <div key={fact.label} className="px-5 py-4">
                <dt className="eyebrow mb-1">{fact.label}</dt>
                <dd className="text-[15px] text-fg">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
