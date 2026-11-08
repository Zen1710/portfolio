<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Heading } from '#lib/server/markdown.ts';

	let { headings, children }: { headings: Heading[]; children: Snippet } = $props();
</script>

<div class="px-4 pt-12 pb-20 sm:px-8 lg:grid lg:grid-cols-[18.75rem_minmax(0,44rem)] lg:gap-16 lg:px-16 lg:pt-16 lg:pb-26">
	<nav aria-label="On this page" class="hidden lg:block">
		{#if headings.length > 1}
			<ol class="sticky top-10 flex flex-col gap-3 font-mono text-xs tracking-[0.12em] uppercase">
				{#each headings as h, i (h.id)}
					<li>
						<a href="#{h.id}" class="flex gap-3 text-subtle transition-colors hover:text-ink"
							><span class="text-action">{String(i + 1).padStart(2, '0')}</span>{h.text}</a
						>
					</li>
				{/each}
			</ol>
		{/if}
	</nav>
	<div>{@render children()}</div>
</div>
