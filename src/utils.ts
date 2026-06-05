import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * Prefix a root-relative path with the configured `base` so links work both on
 * a user page (base "/") and a project page (base "/repo/").
 */
export function withBase(path: string): string {
	const base = import.meta.env.BASE_URL.replace(/\/$/, ''); // normalize: no trailing slash
	const rel = path.replace(/^\//, ''); // normalize: no leading slash
	return `${base}/${rel}`.replace(/\/{2,}/g, '/');
}

/** Convert a tag into a URL-safe slug, e.g. "Web Dev" → "web-dev". */
export function slugifyTag(tag: string): string {
	return tag
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

/** Published blog posts, newest first. Drafts are hidden in production builds. */
export async function getPublishedPosts(): Promise<CollectionEntry<'blog'>[]> {
	const posts = await getCollection('blog', ({ data }) =>
		import.meta.env.PROD ? !data.draft : true,
	);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** All projects: featured first, then by `order`, then alphabetically. */
export async function getProjects(): Promise<CollectionEntry<'projects'>[]> {
	const projects = await getCollection('projects');
	return projects.sort((a, b) => {
		if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1;
		if (a.data.order !== b.data.order) return a.data.order - b.data.order;
		return a.data.title.localeCompare(b.data.title);
	});
}

/**
 * Unique tags across both published posts and projects, with counts, sorted by
 * frequency. Tags are de-duplicated by slug so every tag link has a page.
 */
export async function getAllTags(): Promise<{ tag: string; slug: string; count: number }[]> {
	const [posts, projects] = await Promise.all([getPublishedPosts(), getProjects()]);
	const counts = new Map<string, { tag: string; count: number }>();
	const add = (tag: string) => {
		const slug = slugifyTag(tag);
		const existing = counts.get(slug);
		if (existing) existing.count += 1;
		else counts.set(slug, { tag, count: 1 });
	};
	for (const post of posts) for (const tag of post.data.tags) add(tag);
	for (const project of projects) for (const tag of project.data.tags) add(tag);
	return [...counts.entries()]
		.map(([slug, { tag, count }]) => ({ tag, slug, count }))
		.sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
