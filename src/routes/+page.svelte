<script lang="ts">
	import ExperienceTrail from '#lib/components/ExperienceTrail.svelte';
	import DraftMark from '#lib/components/DraftMark.svelte';
	import Hero from '#lib/components/Hero.svelte';
	import Section from '#lib/components/Section.svelte';
	import SiteClose from '#lib/components/SiteClose.svelte';
	import TechChip from '#lib/components/TechChip.svelte';
	import { formatDate, formatDayMonth, formatMonth } from '#lib/format.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { profile } = $derived(data);
</script>

<svelte:head>
	<title>{profile.name} · {profile.role}</title>
	<meta name="description" content={profile.headline} />
</svelte:head>

<Hero {profile} stack={data.stack} hasCv={data.hasCv} span={data.span} />

<main>
	{#if data.about}
		<Section id="about" title="About">
			<div class="about max-w-[47.5rem] text-[1.1875rem] leading-[1.65] text-muted">{@html data.about}</div>
		</Section>
	{/if}

	{#if data.projects.length > 0}
		<Section id="projects" title="Projects">
			<ul class="divide-y divide-line border-y border-line">
				{#each data.projects as project (project.slug)}
					<li>
						<a href="/projects/{project.slug}" class="group block py-7">
							<div class="flex items-baseline justify-between gap-6">
								<h3 class="text-[1.3125rem] font-semibold tracking-[-0.02em] text-ink lg:text-[1.625rem]">
									<span class="underline decoration-transparent decoration-1 underline-offset-[0.2em] transition-colors duration-200 group-hover:decoration-action">{project.title}</span>{#if project.draft}<DraftMark />{/if}
								</h3>
								<span class="shrink-0 text-sm text-subtle tabular-nums">{formatMonth(project.date)}</span>
							</div>
							<p class="mt-2.5 max-w-[45rem] leading-relaxed text-muted transition-colors duration-200 group-hover:text-ink lg:text-[1.0625rem]">
								{project.summary}
							</p>
							{#if project.techs.length > 0}
								<p class="mt-3.5 flex flex-wrap gap-1.5 text-sm">
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
		<Section id="experience" title="Experience">
			<ExperienceTrail items={data.experience} now={data.now} />
		</Section>
	{/if}

	{#if data.buildLogs.length > 0}
		<Section id="build-logs" title="Build Logs">
			<ul class="divide-y divide-line">
				{#each data.buildLogs as log (log.slug)}
					<li class="py-2 first:pt-0">
						<a href="/build-logs/{log.slug}" class="group grid gap-2 lg:grid-cols-[10rem_1fr] lg:gap-10">
							<time class="caption pt-2" datetime={log.date.toISOString()}>{formatDate(log.date)}</time>
							<span>
								<span class="block text-[1.375rem] font-semibold tracking-[-0.02em] text-ink lg:text-[1.75rem]"
									><span class="underline decoration-transparent decoration-1 underline-offset-[0.2em] transition-colors duration-200 group-hover:decoration-action">{log.title}</span>{#if log.draft}<DraftMark />{/if}</span
								>
								<span class="mt-2 block leading-relaxed text-muted lg:text-[1.0625rem]">{log.summary}</span>
							</span>
						</a>
					</li>
				{/each}
			</ul>
		</Section>
	{/if}

	{#if data.changelog.length > 0}
		<Section id="changelog" title="Changelog">
			<ol>
				{#each data.changelog as change (change.sha)}
					<li class="grid grid-cols-[4.5rem_1fr] gap-x-6 border-b border-line py-3.5 lg:grid-cols-[4.5rem_10rem_1fr]">
						<time class="caption pt-1" datetime={change.date.toISOString()}>{formatDayMonth(change.date)}</time>
						<span class="hidden text-sm text-muted lg:block">{change.source}</span>
						<a href={change.url} class="text-[0.9375rem] text-ink hover:text-action">{change.message}</a>
					</li>
				{/each}
			</ol>
			<p class="mt-5 text-[0.8125rem] text-subtle">Pulled from GitHub at build, refreshed daily.</p>
		</Section>
	{/if}
</main>

<SiteClose {profile} hasCv={data.hasCv} />

<style>
	.about :global(p:first-child) {
		font-size: clamp(1.3125rem, 1.1rem + 0.6vw, 1.625rem);
		line-height: 1.4;
		letter-spacing: -0.01em;
		color: var(--color-ink);
	}
	.about :global(p + p) {
		margin-top: 1.5rem;
		max-width: 42.5rem;
	}
</style>
