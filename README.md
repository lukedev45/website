# Personal site

A minimalist blog and projects site built with [Astro](https://astro.build).

- Markdown/MDX posts with typed frontmatter (content collections)
- Projects showcase, tag pages, RSS feed, and sitemap
- Dark/light mode with no flash on load
- Near-zero client JavaScript

## Develop

```sh
npm install     # once
npm run dev     # http://localhost:4321
npm run build   # output to ./dist
npm run preview # serve the production build locally
```

## Writing content

- **Blog post** — add a Markdown file to `src/content/blog/`:

  ```md
  ---
  title: 'My post'
  description: 'One-line summary (used in listings and meta tags).'
  pubDate: 2026-06-01
  tags: ['notes']
  draft: false # set true to hide from production builds
  ---

  Body in Markdown.
  ```

- **Project** — add a Markdown file to `src/content/projects/`. Frontmatter:
  `title`, `description`, `tags`, optional `repo` / `demo` URLs, `featured`
  (surfaces on the home page), and `order` (sort within its group). Body is
  optional; when present, the project gets its own detail page.

## Configure

- `src/consts.ts` — site title, description, author, GitHub URL, nav links.
- `astro.config.mjs` — **set `site`** (and `base` for a project-page deploy)
  before deploying. See comments in that file.
- Theme colors and typography live in `src/styles/global.css` (CSS variables).

## Deploy (GitHub Pages)

1. Push this repo to GitHub.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Set `site` in `astro.config.mjs`:
   - User page (repo named `<username>.github.io`): `site: 'https://<username>.github.io'`, no `base`.
   - Project page (any other repo): also set `base: '/<repo-name>'`.
4. Push to `main` — `.github/workflows/deploy.yml` builds and deploys automatically.
