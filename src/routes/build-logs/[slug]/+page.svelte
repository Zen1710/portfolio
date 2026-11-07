<script lang="ts">
	import DraftMark from '#lib/components/DraftMark.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import SiteClose from '#lib/components/SiteClose.svelte';
	import SubpageHeader from '#lib/components/SubpageHeader.svelte';
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

<SubpageHeader profile={data.profile} hasCv={data.hasCv} />

<main class="lg:grid lg:grid-cols-[18.75rem_1fr] lg:gap-16 lg:px-16">
	<span></span>
	<div>
		<header class="px-4 pt-16 pb-12 sm:px-8 lg:px-0 lg:pt-28 lg:pb-16">
			<a class="link text-[0.9375rem]" href="/#build-logs">← All build logs</a>
			<p class="caption mt-7">
				<time datetime={log.date.toISOString()}>{formatDate(log.date)}</time> · {data.minutes} min read
			</p>
			<h1 class="display mt-4 max-w-[18ch] text-[2.5rem] leading-[1.02] lg:text-[4rem]">
				{log.title}{#if log.draft}<DraftMark />{/if}
			</h1>
			<p class="mt-6 max-w-[43.75rem] text-lg leading-normal text-muted lg:text-[1.375rem]">{log.summary}</p>
		</header>
		<article class="prose-dark border-t border-line px-4 pt-12 pb-24 sm:px-8 lg:px-0 lg:pb-30">{@html log.html}</article>
	</div>
</main>

<SiteClose profile={data.profile} hasCv={data.hasCv} />
