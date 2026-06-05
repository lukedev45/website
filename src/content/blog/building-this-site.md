---
title: 'Building this site with Astro'
description: 'How this site is put together: Astro content collections, Markdown, and zero client JavaScript by default.'
pubDate: 2026-05-28
tags: ['astro', 'web', 'tutorial']
---

This site is built with [Astro](https://astro.build). Posts are plain Markdown
files in `src/content/blog/`, validated by a typed schema so a typo in the
frontmatter fails the build instead of shipping broken.

Adding a post is just creating a file:

```md
---
title: 'My new post'
description: 'A one-line summary.'
pubDate: 2026-06-01
tags: ['notes']
---

Write the body in **Markdown**.
```

The schema that checks it lives in `src/content.config.ts`:

```ts
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      heroImage: z.optional(image()),
    }),
});
```

Because Astro renders to static HTML and ships no JavaScript unless you ask for
it, pages load fast. The only script on most pages is a tiny inline snippet that
sets the color theme before the first paint.
