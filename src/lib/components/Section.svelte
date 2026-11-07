<script lang="ts">
	import type { Snippet } from 'svelte';

	let { id, title, children }: { id: string; title: string; children: Snippet } = $props();
</script>

<section {id} aria-labelledby="{id}-title" class="border-t border-line px-4 py-16 sm:px-8 lg:grid lg:grid-cols-[18.75rem_1fr] lg:gap-16 lg:px-16 lg:py-30">
	<h2 id="{id}-title" class="display mb-8 text-[2rem] lg:mb-0 lg:text-[2.75rem]">{title}</h2>
	<div class="min-w-0">{@render children()}</div>
</section>
