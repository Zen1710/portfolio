import { GITHUB_TOKEN } from '$app/env/private';
import { getChangelog, repoSlug } from '#lib/server/changelog.ts';
import { getAbout, getBuildLogs, getExperience, getProjects } from '#lib/server/content.ts';
import { site } from '#lib/server/site.ts';
import { getTechs } from '#lib/server/tech.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const { profile } = site;
	const projects = getProjects();
	const now = new Date();
	const nowYm = now.toISOString().slice(0, 7);

	// The Changelog follows the site's own repo and every visible Project's repo (ADR 0004).
	const sources = new Map<string, string>();
	const siteSlug = repoSlug(profile.sourceRepo);
	if (siteSlug) sources.set(siteSlug, 'This site');
	for (const p of projects) {
		const slug = repoSlug(p.repo);
		if (slug && !sources.has(slug)) sources.set(slug, p.title);
	}

	const experience = getExperience();
	const firstYear = Math.min(...experience.map((e) => Number(e.start.slice(0, 4))), now.getUTCFullYear());

	return {
		...site,
		stack: {
			mostly: getTechs(profile.stack.mostly),
			frontend: getTechs(profile.stack.frontend),
			backend: getTechs(profile.stack.backend)
		},
		about: getAbout(),
		projects: projects.map(({ html: _html, ...p }) => ({ ...p, techs: getTechs(p.stack) })),
		experience,
		now: nowYm,
		span: { from: firstYear, to: now.getUTCFullYear() },
		buildLogs: getBuildLogs().map(({ html: _html, ...l }) => l),
		changelog: await getChangelog(sources, 8, { fetch, token: GITHUB_TOKEN })
	};
};
