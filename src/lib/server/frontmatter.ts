import { parse } from 'yaml';

const FENCE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

/** Splits a Markdown file into its YAML frontmatter and body. A file without a fence has empty data. */
export function splitFrontmatter(source: string): { data: unknown; body: string } {
	const match = source.match(FENCE);
	if (!match) return { data: {}, body: source };
	return { data: parse(match[1]) ?? {}, body: source.slice(match[0].length) };
}
