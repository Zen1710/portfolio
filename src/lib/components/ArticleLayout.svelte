<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Heading } from '#lib/server/markdown.ts';

	let { headings, children }: { headings: Heading[]; children: Snippet } = $props();
	let active = $state<string | undefined>(undefined);

	// Same rule as the home scrollspy: a heading is current once it passes 40% of the viewport.
	$effect(() => {
		const els = headings.map((h) => document.getElementById(h.id)).filter((el): el is HTMLElement => el !== null);
		const update = () => {
			const line = window.innerHeight * 0.4;
			let current = els[0]?.id;
			for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id;
			active = current;
		};
		update();
		window.addEventListener('scroll', update, { passive: true });
		window.addEventListener('resize', update);
		return () => {
			window.removeEventListener('scroll', update);
			window.removeEventListener('resize', update);
		};
	});
</script>

<div class="px-4 pt-12 pb-20 sm:px-8 lg:grid lg:grid-cols-[18.75rem_minmax(0,44rem)] lg:gap-16 lg:px-16 lg:pt-16 lg:pb-26">
	<nav aria-label="On this page" class="hidden lg:block">
		{#if headings.length > 1}
			<ol class="sticky top-10 flex flex-col gap-3.5 font-mono text-xs tracking-[0.12em] uppercase">
				{#each headings as h, i (h.id)}
					{@const on = h.id === (active ?? headings[0]?.id)}
					<li>
						<a href="#{h.id}" aria-current={on ? 'location' : undefined} class="group flex items-center gap-3">
							<span class="trail block shrink-0 transition-all duration-300 {on ? 'is-on' : 'group-hover:bg-muted'}"></span>
							<span class="text-action">{String(i + 1).padStart(2, '0')}</span>
							<span class="transition-colors {on ? 'font-semibold text-ink' : 'text-subtle group-hover:text-ink'}">{h.text}</span>
						</a>
					</li>
				{/each}
			</ol>
		{/if}
	</nav>
	<div>{@render children()}</div>
</div>

<style>
	.trail {
		width: 1rem;
		height: 1px;
		background: var(--color-subtle);
	}
	.trail.is-on {
		width: 2.5rem;
		height: 3px;
		border-radius: 2px;
		background: linear-gradient(90deg, rgb(10 120 180 / 0), var(--color-trail-bright));
	}
</style>
