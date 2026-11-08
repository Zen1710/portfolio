<script lang="ts">
	import Contact from '#lib/components/Contact.svelte';
	import DraftMark from '#lib/components/DraftMark.svelte';
	import ExperienceTrail from '#lib/components/ExperienceTrail.svelte';
	import Section from '#lib/components/Section.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import SidePanel from '#lib/components/SidePanel.svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import TechChip from '#lib/components/TechChip.svelte';
	import { formatDayMonth, formatMonth } from '#lib/format.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { profile } = $derived(data);

	// Sections without Published content stay out of the page, the numbering, and the nav.
	const sections = $derived(
		[
			data.about && { id: 'about', label: 'About' },
			data.projects.length > 0 && { id: 'projects', label: 'Projects' },
			data.experience.length > 0 && { id: 'experience', label: 'Experience' },
			data.buildLogs.length > 0 && { id: 'build-logs', label: 'Build Logs' },
			data.changelog.length > 0 && { id: 'changelog', label: 'Changelog' },
			{ id: 'contact', label: 'Contact' }
		].filter((s) => !!s)
	);
	const indexOf = (id: string) => sections.findIndex((s) => s.id === id) + 1;
	const logDate = (d: Date) => d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });
</script>

<Seo title="{profile.name} · {profile.role}" description={profile.headline} image="/og/home.png" siteUrl={profile.siteUrl} />

<div class="mx-auto max-w-[90rem] lg:grid lg:grid-cols-[minmax(0,40fr)_minmax(0,42fr)] lg:gap-16 lg:pr-16">
	<SidePanel {profile} stack={data.stack} hasCv={data.hasCv} nav={sections} />

	<main class="flex flex-col gap-16 px-4 pt-16 pb-12 sm:px-8 lg:gap-24 lg:px-0 lg:pt-24 lg:pb-16">
		{#if data.about}
			<Section id="about" index={indexOf('about')} title="About">
				<div class="about text-base leading-[1.6] text-muted lg:text-[1.0625rem]">{@html data.about}</div>
			</Section>
		{/if}

		{#if data.projects.length > 0}
			<Section id="projects" index={indexOf('projects')} title="Projects">
				<ul class="divide-y divide-line border-y border-line">
					{#each data.projects as project (project.slug)}
						<li>
							<a href="/projects/{project.slug}" class="group block py-7">
								<div class="flex items-baseline justify-between gap-6">
									<h3 class="text-lg font-semibold tracking-[-0.015em] text-ink lg:text-[1.3125rem]">
										<span class="underline decoration-transparent decoration-1 underline-offset-[0.2em] transition-colors duration-200 group-hover:decoration-action">{project.title}</span>{#if project.draft}<DraftMark />{/if}
									</h3>
									<span class="shrink-0 font-mono text-[0.8125rem] text-subtle">{formatMonth(project.date)}</span>
								</div>
								<p class="mt-2.5 leading-[1.55] text-muted transition-colors duration-200 group-hover:text-ink lg:text-[1.0625rem]">
									{project.summary}
								</p>
								{#if project.techs.length > 0}
									<p class="mt-4 flex flex-wrap gap-1.5">
										{#each project.techs as tech (tech.key)}<TechChip {tech} />{/each}
									</p>
								{/if}
							</a>
						</li>
					{/each}
				</ul>
			</Section>
		{/if}

		{#if data.experience.length > 0}
			<Section id="experience" index={indexOf('experience')} title="Experience">
				<ExperienceTrail items={data.experience} now={data.now} />
			</Section>
		{/if}

		{#if data.buildLogs.length > 0}
			<Section id="build-logs" index={indexOf('build-logs')} title="Build Logs">
				<ul class="flex flex-col gap-8">
					{#each data.buildLogs as log (log.slug)}
						<li>
							<a href="/build-logs/{log.slug}" class="group block">
								<time class="caption" datetime={log.date.toISOString()}>{logDate(log.date)}</time>
								<span class="mt-2 block text-xl font-semibold tracking-[-0.015em] text-ink lg:text-[1.375rem]"
									><span class="underline decoration-transparent decoration-1 underline-offset-[0.2em] transition-colors duration-200 group-hover:decoration-action">{log.title}</span>{#if log.draft}<DraftMark />{/if}</span
								>
								<span class="mt-2.5 block leading-[1.55] text-muted lg:text-[1.0625rem]">{log.summary}</span>
							</a>
						</li>
					{/each}
				</ul>
			</Section>
		{/if}

		{#if data.changelog.length > 0}
			<Section id="changelog" index={indexOf('changelog')} title="Changelog">
				<ol class="font-mono">
					{#each data.changelog as change (change.sha)}
						<li class="grid grid-cols-[4.5rem_1fr] gap-x-6 border-b border-line py-3.5 lg:grid-cols-[4.5rem_9rem_1fr]">
							<time class="pt-0.5 text-xs tracking-[0.04em] text-subtle uppercase" datetime={change.date.toISOString()}>{formatDayMonth(change.date)}</time>
							<span class="hidden truncate text-[0.8125rem] text-muted lg:block">{change.source}</span>
							<a href={change.url} class="text-sm text-ink hover:text-action">{change.message}</a>
						</li>
					{/each}
				</ol>
				<p class="mt-5 font-mono text-xs text-subtle">Pulled from GitHub at build, refreshed daily.</p>
			</Section>
		{/if}

		<Contact {profile} hasCv={data.hasCv} index={indexOf('contact')} />
		<SiteFooter sourceRepo={profile.sourceRepo} />
	</main>
</div>

<style>
	.about :global(p:first-child) {
		font-size: clamp(1.25rem, 1.1rem + 0.4vw, 1.375rem);
		line-height: 1.45;
		letter-spacing: -0.01em;
		color: var(--color-ink);
	}
	.about :global(p + p) {
		margin-top: 1.5rem;
	}
</style>
