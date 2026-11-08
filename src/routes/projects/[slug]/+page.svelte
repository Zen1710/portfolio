<script lang="ts">
	import ArticleLayout from '#lib/components/ArticleLayout.svelte';
	import Contact from '#lib/components/Contact.svelte';
	import DraftMark from '#lib/components/DraftMark.svelte';
	import PixelArrow from '#lib/components/PixelArrow.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import TechChip from '#lib/components/TechChip.svelte';
	import TopBar from '#lib/components/TopBar.svelte';
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

<TopBar profile={data.profile} hasCv={data.hasCv} />

<main>
	<header class="border-b border-line px-4 pt-14 pb-12 sm:px-8 lg:px-16 lg:pt-18 lg:pb-14">
		<a class="link inline-flex items-center gap-2 font-mono text-sm" href="/#projects"><PixelArrow dir="left" />All projects</a>
		<h1 class="pixel mt-6 max-w-[24ch] text-[2rem] leading-[1.15] text-ink lg:text-[2.75rem]">
			{project.title}{#if project.draft}<DraftMark />{/if}
		</h1>
		<p class="mt-6 max-w-[48rem] text-lg leading-normal text-muted lg:text-xl">{project.summary}</p>
		<p class="mt-6 flex flex-wrap items-center gap-x-7 gap-y-2 font-mono text-[0.8125rem]">
			<time class="text-subtle" datetime={project.date.toISOString()}>{formatMonth(project.date)}</time>
			{#if project.repo}<a class="link inline-flex items-center gap-1.5" href={project.repo}>Repository<PixelArrow dir="out" /></a>{/if}
			{#if project.demo}<a class="link inline-flex items-center gap-1.5" href={project.demo}>Live demo<PixelArrow dir="out" /></a>{/if}
		</p>
		{#if project.techs.length > 0}
			<p class="mt-4 flex flex-wrap gap-1.5">
				{#each project.techs as tech (tech.key)}<TechChip {tech} />{/each}
			</p>
		{/if}
	</header>

	<ArticleLayout headings={project.headings}>
		{#if project.cover}
			<figure class="mb-12">
				<img
					src={project.cover}
					alt="Preview of {project.title}"
					class="aspect-[7/4] w-full rounded-md border border-line object-cover object-top"
				/>
				<figcaption class="caption mt-2.5 tracking-[0.18em]">Preview</figcaption>
			</figure>
		{/if}
		<div class="prose-dark">{@html project.html}</div>
	</ArticleLayout>

	{#if data.newer || data.older}
		<nav aria-label="More projects" class="flex justify-between gap-6 border-y border-line px-4 py-10 font-mono text-sm sm:px-8 lg:px-16 lg:py-11 lg:text-[0.9375rem]">
			{#if data.newer}<a class="link inline-flex items-center gap-2" href="/projects/{data.newer.slug}"><PixelArrow dir="left" />{data.newer.title}</a>{:else}<span></span>{/if}
			{#if data.older}<a class="link inline-flex items-center gap-2 text-right" href="/projects/{data.older.slug}">{data.older.title}<PixelArrow /></a>{/if}
		</nav>
	{/if}
</main>

<div class="flex flex-col gap-12 px-4 pt-18 pb-12 sm:px-8 lg:px-16">
	<Contact profile={data.profile} hasCv={data.hasCv} />
	<SiteFooter sourceRepo={data.profile.sourceRepo} />
</div>
