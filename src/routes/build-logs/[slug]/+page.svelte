<script lang="ts">
	import ArticleLayout from '#lib/components/ArticleLayout.svelte';
	import Contact from '#lib/components/Contact.svelte';
	import DraftMark from '#lib/components/DraftMark.svelte';
	import PixelArrow from '#lib/components/PixelArrow.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import TopBar from '#lib/components/TopBar.svelte';
	import { formatDate } from '#lib/format.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const log = $derived(data.log);
</script>

<Seo
	title="{log.title} · {data.profile.name}"
	description={log.summary}
	image="/og/build-logs/{log.slug}.png"
	siteUrl={data.profile.siteUrl}
/>

<TopBar profile={data.profile} hasCv={data.hasCv} />

<main>
	<header class="border-b border-line px-4 pt-14 pb-12 sm:px-8 lg:px-16 lg:pt-18 lg:pb-14">
		<a class="link inline-flex items-center gap-2 font-mono text-sm" href="/#build-logs"><PixelArrow dir="left" />All build logs</a>
		<h1 class="pixel mt-6 max-w-[30ch] text-[1.75rem] leading-[1.15] text-ink lg:text-[2.25rem]">
			{log.title}{#if log.draft}<DraftMark />{/if}
		</h1>
		<p class="mt-6 max-w-[48rem] text-lg leading-normal text-muted lg:text-xl">{log.summary}</p>
		<p class="mt-6 font-mono text-[0.8125rem] text-subtle">
			<time datetime={log.date.toISOString()}>{formatDate(log.date)}</time> · {data.minutes} min read
		</p>
	</header>

	<ArticleLayout headings={log.headings}>
		<div class="prose-dark">{@html log.html}</div>
	</ArticleLayout>
</main>

<div class="flex flex-col gap-12 border-t border-line px-4 pt-18 pb-12 sm:px-8 lg:px-16">
	<Contact profile={data.profile} hasCv={data.hasCv} />
	<SiteFooter sourceRepo={data.profile.sourceRepo} />
</div>
