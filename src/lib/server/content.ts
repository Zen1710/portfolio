import type { z } from 'zod';
import { dev } from '$app/env';
import { experience } from '#content/experience.ts';
import {
	aboutSchema,
	buildLogSchema,
	projectSchema,
	type BuildLogMeta,
	type Experience,
	type ProjectMeta
} from '#lib/content/types.ts';
import { splitFrontmatter } from './frontmatter.ts';
import { renderMarkdown } from './markdown.ts';
import { isVisible } from './visibility.ts';

// Read at build time; the raw Markdown never reaches the browser.
const projectFiles = import.meta.glob('/content/projects/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const logFiles = import.meta.glob('/content/build-logs/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const aboutFiles = import.meta.glob('/content/about.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

export type Entry<T> = T & { slug: string; html: string };

const slugOf = (file: string) => file.split('/').pop()!.replace(/\.md$/, '');

export function readCollection<S extends z.ZodType<object>>(files: Record<string, string>, schema: S): Entry<z.output<S>>[] {
	return Object.entries(files).map(([file, source]) => {
		const { data, body } = splitFrontmatter(source);
		const result = schema.safeParse(data);
		if (!result.success) {
			// Fail the build instead of shipping a half-filled entry.
			throw new Error(`Invalid frontmatter in ${file}:\n${result.error.message}`);
		}
		return { ...result.data, slug: slugOf(file), html: renderMarkdown(body) };
	});
}

const byDateDesc = (a: { date: Date }, b: { date: Date }) => b.date.getTime() - a.date.getTime();

export function getProjects(includeDrafts = dev): Entry<ProjectMeta>[] {
	return readCollection(projectFiles, projectSchema)
		.filter((p) => isVisible(p, includeDrafts))
		.sort(byDateDesc);
}

export type BuildLog = Entry<BuildLogMeta> & { number: number };

export function getBuildLogs(includeDrafts = dev): BuildLog[] {
	// Oldest first so each log keeps a stable number in the series.
	const all = readCollection(logFiles, buildLogSchema).sort((a, b) => -byDateDesc(a, b));
	return all
		.map((log, i) => ({ ...log, number: i + 1 }))
		.filter((log) => isVisible(log, includeDrafts))
		.reverse();
}

export function getExperience(includeDrafts = dev): Experience[] {
	return experience.filter((e) => isVisible(e, includeDrafts)).sort((a, b) => b.start.localeCompare(a.start));
}

export function getAbout(includeDrafts = dev): string | null {
	const source = Object.values(aboutFiles)[0];
	if (!source) return null;
	const { data, body } = splitFrontmatter(source);
	const meta = aboutSchema.parse(data);
	return isVisible(meta, includeDrafts) ? renderMarkdown(body) : null;
}
