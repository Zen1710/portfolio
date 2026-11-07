import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

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
