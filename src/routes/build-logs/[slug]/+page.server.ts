import { error } from '@sveltejs/kit';
import { getBuildLogs } from '#lib/server/content.ts';
import { site } from '#lib/server/site.ts';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = () => getBuildLogs().map((l) => ({ slug: l.slug }));

const WORDS_PER_MINUTE = 220;

export const load: PageServerLoad = ({ params }) => {
	const log = getBuildLogs().find((l) => l.slug === params.slug);
	if (!log) error(404, 'Build Log not found');

	const words = log.html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
	return { ...site, log, minutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)) };
};
