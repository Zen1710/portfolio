import { getBuildLogs, getProjects } from '#lib/server/content.ts';
import { site } from '#lib/server/site.ts';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = () => {
	const base = site.profile.siteUrl;
	const paths = ['/', ...getProjects().map((p) => `/projects/${p.slug}`), ...getBuildLogs().map((l) => `/build-logs/${l.slug}`)];
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `\t<url><loc>${new URL(p, base).href}</loc></url>`).join('\n')}
</urlset>
`;
	return new Response(body, { headers: { 'content-type': 'application/xml' } });
};
