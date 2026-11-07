import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	GITHUB_TOKEN: {
		description: 'Optional. Raises the GitHub API rate limit for the Changelog at build time (ADR 0004).',
		schema: (value) => value || undefined
	}
});
