<script lang="ts">
	import DraftMark from '#lib/components/DraftMark.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import SiteClose from '#lib/components/SiteClose.svelte';
	import SubpageHeader from '#lib/components/SubpageHeader.svelte';
	import TechChip from '#lib/components/TechChip.svelte';
	import { formatMonth } from '#lib/format.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const project = $derived(data.project);
</script>

<Seo
	title="{project.title} · {data.profile.name}"
	description={project.summary}
	image="/og/projects/{project.slug}.png"
	siteUrl={data.profile.siteUrl}
/>

<SubpageHeader profile={data.profile} hasCv={data.hasCv} />

<main>
	<header class="px-4 pt-16 pb-12 sm:px-8 lg:px-16 lg:pt-24 lg:pb-14">
		<a class="link text-[0.9375rem]" href="/#projects">← All projects</a>
		<h1 class="display mt-7 text-[3rem] leading-[0.98] lg:text-[6.5rem]">
			{project.title}{#if project.draft}<DraftMark />{/if}
		</h1>
		<p class="mt-7 max-w-[47.5rem] text-lg leading-normal text-muted lg:text-[1.375rem]">{project.summary}</p>
		<p class="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.9375rem]">
			<time class="text-subtle" datetime={project.date.toISOString()}>{formatMonth(project.date)}</time>
			{#if project.repo}<a class="link" href={project.repo}>Repository ↗</a>{/if}
			{#if project.demo}<a class="link" href={project.demo}>Live demo ↗</a>{/if}
		</p>
		{#if project.techs.length > 0}
			<p class="mt-4 flex flex-wrap gap-1.5 text-[0.9375rem]">
				{#each project.techs as tech (tech.key)}<TechChip {tech} />{/each}
			</p>
		{/if}
	</header>

	{#if project.cover}
		<figure class="cover mx-4 overflow-hidden bg-trail sm:mx-8 lg:mx-16">
			<img src={project.cover} alt="Screenshot of {project.title}" class="aspect-[41/20] w-full object-cover object-top" />
		</figure>
	{/if}

	<article class="px-4 pt-16 pb-24 sm:px-8 lg:grid lg:grid-cols-[18.75rem_1fr] lg:gap-16 lg:px-16 lg:pt-24 lg:pb-30">
		<span></span>
		<div class="prose-dark">{@html project.html}</div>
	</article>

	{#if data.newer || data.older}
		<nav aria-label="More projects" class="flex justify-between gap-6 border-y border-line px-4 py-10 text-lg sm:px-8 lg:px-16 lg:py-14 lg:text-xl">
			{#if data.newer}<a class="link" href="/projects/{data.newer.slug}">← {data.newer.title}</a>{:else}<span></span>{/if}
			{#if data.older}<a class="link text-right" href="/projects/{data.older.slug}">{data.older.title} →</a>{/if}
		</nav>
	{/if}
</main>

<SiteClose profile={data.profile} hasCv={data.hasCv} />

<style>
	/* Duotone: the screenshot keeps its light and shade, the colour comes from the trail blue. */
	.cover img {
		mix-blend-mode: luminosity;
		filter: grayscale(1) brightness(0.55) contrast(1.2);
	}
</style>
