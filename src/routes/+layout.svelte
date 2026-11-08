<script lang="ts">
	import './layout.css';
	import { PUBLIC_CF_BEACON_TOKEN } from '$app/env/public';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	// Cloudflare Web Analytics on workers.dev needs the manual snippet; it only loads when a token is set.
	const beacon = PUBLIC_CF_BEACON_TOKEN ? JSON.stringify({ token: PUBLIC_CF_BEACON_TOKEN }) : null;
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	{#if beacon}
		<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon={beacon}></script>
	{/if}
</svelte:head>

{@render children()}
