# Mayank Panchal — Portfolio

Personal portfolio built with React 18, TypeScript, Vite 5, Tailwind CSS 3, Framer Motion, React Router and Lucide icons.

Pages: `/` (home), `/projects` (Our Projects), `/gallery`, `/blog` and `/blog/<post>`.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build into dist/
npm run preview    # serve the production build
```

Requires Node 18+.

## Where the content lives

All content is in typed data files. Components render whatever is in them.

| File | What it controls |
| --- | --- |
| `src/data/profile.ts` | Name, email, GitHub, LinkedIn, resume link, availability badge, education, nav items |
| `src/data/skills.ts` | Skill categories and domain exposure (kept separate on purpose) |
| `src/data/experience.ts` | Work history, most recent first |
| `src/data/projects.ts` | Project cards (home page shows `featured: true`; Our Projects page shows all, filterable by `category`) |
| `src/data/gallery.ts` | Gallery photos and their categories |
| `src/content/blog/*.md` | Blog posts — one Markdown file per post |
| `src/types.ts` | Types for all of the above |

### Still to fill in (shown as amber "Placeholder" markers on the site)

1. **Resume:** put the PDF in `public/resume/` (e.g. `Mayank-Panchal-Resume.pdf`) and set
   `resumeUrl: '/resume/Mayank-Panchal-Resume.pdf'` in `profile.ts`. Until then, resume buttons
   are shown as disabled.
2. **Tamar Software LLP:** add `summary`, `highlights` and `technologies` in `experience.ts`,
   then delete `isPlaceholder: true`.
3. **Projects:** replace the three placeholder entries in `projects.ts`. For each one:
   - set `githubUrl` / `liveUrl` (links show only when a URL is set)
   - optionally add a screenshot in `public/projects/` and set `image: '/projects/name.png'`
     and `imageAlt`. Without one, an abstract illustration is shown (`visual`)
   - keep `confidential: true` for work you can't show; it hides links and shows a lock badge
   - delete `isPlaceholder: true`
4. **Technologies per role:** `technologies` is empty for BioSanjeevani and Idyllic because no
   specific stack was confirmed. Add the ones you actually used.
5. **Availability badge:** set `availability.visible: true` in `profile.ts`, but only while it's true.
6. **Domain & social image:** in `index.html`, replace `YOUR-DOMAIN` and uncomment the canonical /
   `og:url` / `og:image` tags. Add a 1200×630 `public/og-image.png` if you want link previews.

7. **Gallery:** the six entries in `gallery.ts` are empty photo slots. Put photos in
   `public/gallery/`, set `src`, `alt`, `width`, `height`, and remove `isPlaceholder`.
8. **Blog:** `src/content/blog/sample-post-how-this-blog-works.md` explains how to write posts.
   Add your own `.md` files there and delete the sample. Frontmatter: `title`, `date`,
   `summary`, `tags` (comma-separated), optional `draft: true` (hidden in production).

## Intro screen

The "Engineers build world" intro with the loading bar is in `index.html` (inline style and
script), so it shows on the very first paint, before the app's JavaScript loads. Change
`INTRO_MS` in that script to adjust the duration (default 3000 ms). It plays on every full page
load, but not when moving between pages inside the site.

## Contact form

There is no backend. The form validates input, then opens the visitor's email app with a drafted
message, and the UI says so. To send messages directly from the site, connect a service such as
Formspree or Resend in `ContactForm` (`src/components/Contact.tsx`).

## Deploy

It's a static single-page app: `npm run build` and host the `dist/` folder. Because pages like
`/blog` are client-side routes, the host must serve `index.html` for unknown paths. This is
already set up for:

- **Netlify:** `public/_redirects`
- **Vercel:** `vercel.json`
- **GitHub Pages:** the build copies `index.html` to `404.html`

- **Vercel / Netlify:** import the repo. Build command `npm run build`, output directory `dist`.
- **GitHub Pages:** if served from `https://<user>.github.io/<repo>/`, set `base: '/<repo>/'` in
  `vite.config.ts`, build, and publish `dist/` (e.g. with the `actions/deploy-pages` workflow).
  Resume paths in `profile.ts` then need the same prefix, and `<BrowserRouter>` in `src/App.tsx`
  needs `basename="/<repo>"`. A custom domain avoids both changes.

## Structure

```
src/
  pages/       HomePage, ProjectsPage, GalleryPage, BlogPage, BlogPostPage, NotFoundPage
  components/
    Layout, Navbar, Footer, Hero, CodePanel, About, Skills, Experience, Projects,
    ProjectCard, ProjectVisual, EngineeringApproach, Education, Contact
    ui/  Section, PageHeader, Reveal, Placeholder, ResumeLink, SiteLink, FilterChips
  content/blog/  Markdown posts
  data/        profile, skills, experience, projects, gallery
  hooks/       useScrollSpy, usePageTitle
  lib/         format, blog
  App.tsx (routes)  main.tsx  index.css  types.ts
```
