import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in `src/content/blog/`.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			tags: z.array(z.string()).default([]),
			draft: z.boolean().default(false),
			heroImage: z.optional(image()),
		}),
});

const projects = defineCollection({
	// Load Markdown and MDX files in `src/content/projects/`.
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()).default([]),
		repo: z.string().url().optional(),
		demo: z.string().url().optional(),
		// Featured projects surface on the home page and sort first.
		featured: z.boolean().default(false),
		// Lower numbers sort first within their featured/non-featured group.
		order: z.number().default(0),
	}),
});

export const collections = { blog, projects };
