<script lang="ts">
	import type { Snippet } from 'svelte';
	import SectionHeading from './SectionHeading.svelte';

	let { id, index, title, children }: { id: string; index: number; title: string; children: Snippet } = $props();
</script>

<section {id} aria-labelledby="{id}-title" class="scroll-mt-16">
	<SectionHeading {id} {index} {title} />
	<div class="mt-7">{@render children()}</div>
</section>
