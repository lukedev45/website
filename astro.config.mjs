// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// ⚠️ SET THIS before deploying.
	// • User/org page  → repo named "<username>.github.io":
	//     site: 'https://<username>.github.io'   (leave `base` commented out)
	// • Project page   → any other repo name:
	//     site: 'https://<username>.github.io'   AND  base: '/<repo-name>'
	site: 'https://lukedev45.github.io',
	base: '/website',

	integrations: [mdx(), sitemap()],

	markdown: {
		// Dual-theme syntax highlighting. The light theme is applied by default;
		// global.css swaps to the dark theme when html[data-theme="dark"] is set.
		shikiConfig: {
			themes: { light: 'github-light', dark: 'github-dark' },
			wrap: true,
		},
	},
});
