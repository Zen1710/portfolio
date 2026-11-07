import { error } from '@sveltejs/kit';
import { getProjects } from '#lib/server/content.ts';
import { site } from '#lib/server/site.ts';
import { getTechs } from '#lib/server/tech.ts';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = () => getProjects().map((p) => ({ slug: p.slug }));

export const load: PageServerLoad = ({ params }) => {
	const projects = getProjects();
	const index = projects.findIndex((p) => p.slug === params.slug);
	if (index === -1) error(404, 'Project not found');

	const project = projects[index];
	const link = (p: (typeof projects)[number] | undefined) => (p ? { slug: p.slug, title: p.title } : null);

	return {
		...site,
		project: { ...project, techs: getTechs(project.stack) },
		// Newer to the left, older to the right, matching the home list order.
		newer: link(projects[index - 1]),
		older: link(projects[index + 1])
	};
};
