import { describe, expect, it } from 'vitest';
import { headingsOf, renderMarkdown } from './markdown.ts';

describe('markdown', () => {
	it('gives second-level headings ids that match the section index', () => {
		const body = '## What it is\n\nText\n\n## How it is built\n\n### Detail';
		expect(headingsOf(body)).toEqual([
			{ id: 'what-it-is', text: 'What it is' },
			{ id: 'how-it-is-built', text: 'How it is built' }
		]);
		const html = renderMarkdown(body);
		expect(html).toContain('<h2 id="what-it-is">What it is</h2>');
		expect(html).toContain('<h3>Detail</h3>');
	});
});
