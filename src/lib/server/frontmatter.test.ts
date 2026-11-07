import { describe, expect, it } from 'vitest';
import { splitFrontmatter } from './frontmatter.ts';
import { projectSchema } from '#lib/content/types.ts';

describe('splitFrontmatter', () => {
	it('separates YAML data from the Markdown body', () => {
		const { data, body } = splitFrontmatter('---\ntitle: Hi\ndraft: true\n---\n\n## Body\n');
		expect(data).toEqual({ title: 'Hi', draft: true });
		expect(body.trim()).toBe('## Body');
	});

	it('treats a file without a fence as body only', () => {
		expect(splitFrontmatter('Just text')).toEqual({ data: {}, body: 'Just text' });
	});

	it('feeds a project schema that coerces "YYYY-MM" dates and defaults draft to false', () => {
		const { data } = splitFrontmatter('---\ntitle: A\nsummary: B\ndate: 2025-07\n---\n');
		const project = projectSchema.parse(data);
		expect(project.date.toISOString().slice(0, 7)).toBe('2025-07');
		expect(project.draft).toBe(false);
		expect(project.stack).toEqual([]);
	});
});
