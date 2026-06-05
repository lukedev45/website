// Global site data. Import from anywhere with the `import` keyword.

export const SITE_TITLE = 'Luke Devlin';
export const SITE_DESCRIPTION =
	'Notes, writing, and projects on software and the things I’m building.';
export const AUTHOR = 'Luke Devlin';

// Used in the header/footer. Set to '' to hide the link.
export const GITHUB_URL = 'https://github.com/lukedev45';

// Primary navigation. `href` values are root-relative; the base path
// (for project-page deploys) is applied automatically via `withBase`.
export const NAV_LINKS: { href: string; label: string }[] = [
	{ href: '/', label: 'Home' },
	{ href: '/blog', label: 'Blog' },
	{ href: '/projects', label: 'Projects' },
	{ href: '/about', label: 'About' },
];
