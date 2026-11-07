export type Change = {
	sha: string;
	message: string;
	date: Date;
	url: string;
	/** Where it happened: "This site" or the Project's title. */
	source: string;
};

export type RawCommit = {
	sha: string;
	html_url: string;
	parents: unknown[];
	commit: { message: string; committer: { date: string } | null; author: { date: string } | null };
};

/** "https://github.com/owner/name(.git)" → "owner/name"; anything else → null. */
export function repoSlug(url: string | undefined): string | null {
	const match = url?.match(/^https?:\/\/(?:www\.)?github\.com\/([\w.-]+)\/([\w.-]+?)(?:\.git)?\/?$/);
	return match ? `${match[1]}/${match[2]}` : null;
}

/** Commits that only note AI tool runs say nothing about the work. */
const HIDDEN_MESSAGE = /\bclaude\b/i;

/** Keeps the first line of each commit and drops merge commits and commits that mention Claude. */
export function toChanges(commits: RawCommit[], source: string): Change[] {
	return commits
		.filter((c) => c.parents.length <= 1)
		.map((c) => ({
			sha: c.sha,
			message: c.commit.message.split('\n')[0].trim(),
			date: new Date(c.commit.committer?.date ?? c.commit.author?.date ?? 0),
			url: c.html_url,
			source
		}))
		.filter((c) => c.message !== '' && !HIDDEN_MESSAGE.test(c.message));
}

type Fetch = typeof fetch;

async function fetchCommits(fetchFn: Fetch, slug: string, token?: string): Promise<RawCommit[]> {
	const response = await fetchFn(`https://api.github.com/repos/${slug}/commits?per_page=30`, {
		headers: { Accept: 'application/vnd.github+json', ...(token && { Authorization: `Bearer ${token}` }) }
	});
	// An empty repo answers 409, a private or missing one 404: both mean nothing to show.
	if (!response.ok) {
		if (response.status !== 409) console.warn(`[changelog] ${slug}: GitHub responded ${response.status}`);
		return [];
	}
	return response.json();
}

/**
 * Latest commits from the given repos, newest first. Fetched once per build (the site is
 * rebuilt daily, ADR 0004). A repo that cannot be read is skipped so the build never fails on GitHub.
 */
export async function getChangelog(
	sources: Map<string, string>,
	limit: number,
	options: { fetch: Fetch; token?: string }
): Promise<Change[]> {
	const lists = await Promise.all(
		[...sources].map(async ([slug, source]) => {
			try {
				return toChanges(await fetchCommits(options.fetch, slug, options.token), source);
			} catch (error) {
				console.warn(`[changelog] ${slug}:`, error);
				return [];
			}
		})
	);
	return lists
		.flat()
		.sort((a, b) => b.date.getTime() - a.date.getTime())
		.slice(0, limit);
}
