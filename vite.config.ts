import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';

// The theme script in app.html runs before paint, so it cannot carry a nonce on a prerendered page.
// Hash it from the file itself so editing the script can never leave the CSP stale.
const themeScript = readFileSync('src/app.html', 'utf8').match(/<script>([\s\S]*?)<\/script>/)?.[1];
if (!themeScript) throw new Error('Theme script not found in src/app.html');
const themeHash = `sha256-${createHash('sha256').update(themeScript).digest('base64')}` as const;

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// Every page is prerendered; Cloudflare Workers serves ./build as static assets (ADR 0001, 0002).
			// 404.html is the shell Workers serves for unknown paths (not_found_handling: 404-page).
			adapter: adapter({ pages: 'build', assets: 'build', fallback: '404.html', strict: true }),

			// Prerendered pages get this policy as a <meta> tag; SvelteKit adds hashes for its own inline scripts.
			// frame-ancestors is ignored in <meta>, so static/_headers sends it as a header instead.
			csp: {
				mode: 'hash',
				directives: {
					'default-src': ['self'],
					'script-src': ['self', themeHash, 'https://static.cloudflareinsights.com'],
					'connect-src': ['self', 'https://cloudflareinsights.com'],
					'style-src': ['self'],
					// Svelte's style: directives (Experience trail positions) write inline style attributes.
					'style-src-attr': ['unsafe-inline'],
					'img-src': ['self', 'data:'],
					'font-src': ['self', 'data:'],
					'object-src': ['none'],
					'base-uri': ['self'],
					'form-action': ['none'],
					'upgrade-insecure-requests': true
				}
			},

			prerender: {
				// Detail routes are empty while nothing is Published (the launch state); anything else unseen is a bug.
				handleUnseenRoutes: ({ routes, message }) => {
					const expected = ['/projects/[slug]', '/build-logs/[slug]'];
					if (routes.some((r) => !expected.includes(r))) throw new Error(message);
				}
			}
		})
	]
});
