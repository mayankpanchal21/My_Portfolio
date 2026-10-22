---
title: "Sample post: how this blog works"
date: 2026-10-19
summary: A placeholder that shows how to publish posts and what formatting is supported. Replace or delete it once your first real post is ready.
tags: guide, markdown
placeholder: true
---

This is a **placeholder post**. It exists so the blog has something to render and so you can see every supported style in one place. Delete this file once you've published your first real article.

## Adding a post

1. Create a new file in `src/content/blog/`, for example `building-a-mern-website.md`.
2. The file name becomes the URL: `/blog/building-a-mern-website`.
3. Start the file with a frontmatter block like the one below, then write in Markdown.

```md
---
title: Your post title
date: 2026-11-01
summary: One or two sentences shown on the blog index.
tags: react, node
---

Your article starts here.
```

Set `draft: true` in the frontmatter to hide a post from the production build while you work on it. It still appears in `npm run dev`.

## Supported formatting

Paragraphs, *emphasis*, **bold**, `inline code`, and [links](https://react.dev) all work as you'd expect.

### Lists

- Unordered lists
- With as many items as you need

### Quotes

> Block quotes are useful for highlighting a key idea or citing a source.

### Code

```js
// Fenced code blocks keep their formatting and scroll horizontally on small screens.
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
```

### Images

Put images in `public/blog/` and reference them with `![Descriptive alt text](/blog/image.png)`.

---

Reading time is calculated automatically from the word count.
