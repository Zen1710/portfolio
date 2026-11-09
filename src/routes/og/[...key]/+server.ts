import { error } from '@sveltejs/kit';
import { formatMonth, formatDate } from '#lib/format.ts';
import { getBuildLogs, getProjects } from '#lib/server/content.ts';
import { renderOgImage } from '#lib/server/og.ts';
import { site } from '#lib/server/site.ts';
import type { EntryGenerator, RequestHandler } from './$types';

const byline = `${site.profile.name} · ${site.profile.role}`;

/** Every card the site links to, keyed by its path under /og/. */
function cards() {
	const list = new Map<string, { kicker: string; title: string; byline: string }>();
	list.set('home.png', { kicker: site.profile.role, title: site.profile.description, byline: site.profile.name });
	for (const p of getProjects()) list.set(`projects/${p.slug}.png`, { kicker: `Project · ${formatMonth(p.date)}`, title: p.title, byline });
	for (const l of getBuildLogs()) list.set(`build-logs/${l.slug}.png`, { kicker: `Build Log · ${formatDate(l.date)}`, title: l.title, byline });
	return list;
}

export const prerender = true;

export const entries: EntryGenerator = () => [...cards().keys()].map((key) => ({ key }));

export const GET: RequestHandler = async ({ params }) => {
	const card = cards().get(params.key);
	if (!card) error(404, 'No such card');
	const png = await renderOgImage(card);
	return new Response(png as BodyInit, { headers: { 'content-type': 'image/png' } });
};
