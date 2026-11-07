import { describe, expect, it } from 'vitest';
import { getChangelog, repoSlug, toChanges, type RawCommit } from './changelog.ts';

const commit = (sha: string, message: string, date: string, parents = 1): RawCommit => ({
	sha,
	html_url: `https://github.com/o/r/commit/${sha}`,
	parents: Array.from({ length: parents }),
	commit: { message, committer: { date }, author: null }
});

describe('repoSlug', () => {
	it('reads owner/name from GitHub URLs', () => {
		expect(repoSlug('https://github.com/Zen1710/KatalogWeb')).toBe('Zen1710/KatalogWeb');
		expect(repoSlug('https://github.com/Zen1710/repo.git')).toBe('Zen1710/repo');
		expect(repoSlug('https://gitlab.com/a/b')).toBeNull();
		expect(repoSlug(undefined)).toBeNull();
	});
});

describe('toChanges', () => {
	it('keeps first lines and drops merges and Claude notes', () => {
		const changes = toChanges(
			[
				commit('a', 'feat: add thing\n\nbody', '2026-11-01T00:00:00Z'),
				commit('b', 'Merge branch develop', '2026-11-02T00:00:00Z', 2),
				commit('c', 'claude code changes', '2026-11-03T00:00:00Z')
			],
			'This site'
		);
		expect(changes.map((c) => c.message)).toEqual(['feat: add thing']);
	});
});

describe('getChangelog', () => {
	it('merges repos newest first and skips a repo GitHub refuses', async () => {
		const fake = (async (url: string) => {
			if (url.includes('o/broken')) return new Response('nope', { status: 404 });
			const day = url.includes('o/a') ? '01' : '02';
			return Response.json([commit(day, `fix: ${day}`, `2026-11-${day}T00:00:00Z`)]);
		}) as typeof fetch;
		const sources = new Map([
			['o/a', 'A'],
			['o/b', 'B'],
			['o/broken', 'Broken']
		]);
		const list = await getChangelog(sources, 10, { fetch: fake });
		expect(list.map((c) => c.source)).toEqual(['B', 'A']);
	});
});
