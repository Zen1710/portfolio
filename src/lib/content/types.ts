import { z } from 'zod';

// YAML turns unquoted dates into Date objects, so accept both forms.
const date = z.coerce.date();

export const projectSchema = z.object({
	title: z.string().min(1),
	summary: z.string().min(1),
	date,
	stack: z.array(z.string()).default([]),
	repo: z.url().optional(),
	demo: z.url().optional(),
	cover: z.string().startsWith('/').optional(),
	draft: z.boolean().default(false)
});

export const buildLogSchema = z.object({
	title: z.string().min(1),
	summary: z.string().min(1),
	date,
	draft: z.boolean().default(false)
});

export const aboutSchema = z.object({
	draft: z.boolean().default(false)
});

export type ProjectMeta = z.infer<typeof projectSchema>;
export type BuildLogMeta = z.infer<typeof buildLogSchema>;

export type ExperienceKind = 'work' | 'internship' | 'education' | 'course' | 'self-taught';

export type Experience = {
	title: string;
	org: string;
	kind: ExperienceKind;
	/** "YYYY-MM" */
	start: string;
	/** "YYYY-MM", or omit while it is ongoing. */
	end?: string;
	summary?: string;
	stack?: string[];
	draft?: boolean;
};

export type Profile = {
	name: string;
	role: string;
	/** The big sentence at the top of the side panel. */
	headline: string;
	/** What the site says about Naufal in search results and link previews (meta description, home OG image). */
	description: string;
	stack: { mostly: string[]; frontend: string[]; backend: string[] };
	availability: string;
	/** Kept for parity with v1; v2 imports the photo from src/lib/assets. */
	photo: string;
	siteUrl: string;
	/** This site's own GitHub repo, linked from the footer. Leave empty until it exists. */
	sourceRepo: string;
	/** Leave a value empty to hide that link. */
	links: { github: string; linkedin: string; email: string };
};

/** A tech chip as the page renders it: the SVG path travels as data, so no icon set ships to the browser. */
export type Tech = { key: string; label: string; path?: string; viewBox?: string };
