import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	GITHUB_TOKEN: {
		description: 'Optional. Raises the GitHub API rate limit for the Changelog at build time (ADR 0004).',
		schema: (value) => value || undefined
	},
	PUBLIC_CF_BEACON_TOKEN: {
		description:
			'Optional. Cloudflare Web Analytics site token (public by design). Without it, no analytics script is added (ADR 0002).',
		public: true,
		static: true,
		schema: (value) => value || undefined
	}
});
