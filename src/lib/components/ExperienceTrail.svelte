<script lang="ts">
	import type { Experience } from '#lib/content/types.ts';
	import { formatRange } from '#lib/format.ts';
	import DraftMark from './DraftMark.svelte';

	let { items, now }: { items: Experience[]; now: string } = $props();

	const month = (ym: string) => {
		const [y, m] = ym.split('-').map(Number);
		return y * 12 + (m - 1);
	};

	const firstYear = $derived(Math.min(...items.map((i) => Number(i.start.slice(0, 4)))));
	const start = $derived(firstYear * 12);
	const end = $derived(month(now) + 1);
	const pct = (ym: string) => ((month(ym) - start) / (end - start)) * 100;
	const years = $derived(
		Array.from({ length: Math.floor((Number(now.slice(0, 4)) - firstYear) / 2) }, (_, i) => firstYear + i * 2)
	);
</script>

<ol class="border-t border-line">
	{#each items as item (`${item.org}-${item.start}`)}
		{@const left = pct(item.start)}
		{@const right = item.end ? Math.max(pct(item.end), left + 1) : 100}
		<li class="grid gap-3 border-b border-line py-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-center lg:gap-10">
			<div>
				<h3 class="text-[1.1875rem] leading-snug font-medium text-ink">
					{item.title}{#if item.draft}<DraftMark />{/if}
				</h3>
				<p class="mt-1 text-[0.9375rem] text-muted">{item.org}</p>
				<p class="sr-only">{formatRange(item.start, item.end)}</p>
			</div>
			<div class="relative h-6" aria-hidden="true">
				<span class="absolute inset-x-0 top-1/2 h-px bg-line"></span>
				<span class="trail absolute top-[calc(50%-2.5px)] h-[5px] rounded-full" style:left="{left}%" style:width="{right - left}%"></span>
				{#if !item.end}<span class="absolute top-[calc(50%-6.5px)] h-[13px] w-0.5 bg-ink" style:left="calc({right}% - 2px)"></span>{/if}
			</div>
		</li>
	{/each}
</ol>
<div class="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-10" aria-hidden="true">
	<span></span>
	<div class="caption relative mt-3.5 h-4">
		{#each years as y (y)}<span class="absolute" style:left="{((y * 12 - start) / (end - start)) * 100}%">{y}</span>{/each}
		<span class="absolute right-0 font-semibold text-ink">Now</span>
	</div>
</div>

<style>
	.trail {
		background: linear-gradient(90deg, rgb(10 120 180 / 0), var(--color-trail) 25%, var(--color-trail-bright));
		transform-origin: left;
	}

	/* The trail draws as it enters the viewport; no JavaScript, and fully drawn where unsupported. */
	@supports (animation-timeline: view()) {
		@media (prefers-reduced-motion: no-preference) {
			.trail {
				animation: draw linear both;
				animation-timeline: view();
				animation-range: entry 10% cover 35%;
			}
		}
	}

	@keyframes draw {
		from {
			transform: scaleX(0);
		}
		to {
			transform: scaleX(1);
		}
	}
</style>
