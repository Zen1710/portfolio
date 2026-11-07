<script lang="ts">
	import type { Tech } from '#lib/content/types.ts';
	import TechChip from './TechChip.svelte';

	let { items }: { items: Tech[] } = $props();

	// "A, B, and C" with each item as a chip, using English list rules.
	const parts = $derived(new Intl.ListFormat('en', { type: 'conjunction' }).formatToParts(items.map((t) => t.key)));
</script>

{#each parts as part, i (i)}{#if part.type === 'element'}<TechChip
			tech={items.find((t) => t.key === part.value)!}
		/>{:else}{part.value}{/if}{/each}
