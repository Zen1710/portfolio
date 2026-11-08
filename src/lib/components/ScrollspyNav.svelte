<script lang="ts" module>
	export type NavItem = { id: string; label: string };
</script>

<script lang="ts">
	let { items }: { items: NavItem[] } = $props();
	let active = $state<string | undefined>(undefined);

	$effect(() => {
		const sections = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => el !== null);
		const update = () => {
			// A section is current once its top passes 40% of the viewport; the last one wins at the bottom.
			const line = window.innerHeight * 0.4;
			const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
			let current = sections[0]?.id;
			for (const s of sections) if (s.getBoundingClientRect().top <= line) current = s.id;
			active = atBottom ? sections.at(-1)?.id : current;
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

<nav aria-label="Sections">
	<ul class="flex flex-col gap-3.5">
		{#each items as item (item.id)}
			{@const on = item.id === (active ?? items[0]?.id)}
			<li>
				<a href="#{item.id}" aria-current={on ? 'true' : undefined} class="group flex items-center gap-4 font-mono text-xs tracking-[0.08em] uppercase">
					<span class="trail block transition-all duration-300 {on ? 'is-on' : 'group-hover:w-12 group-hover:bg-muted'}"></span>
					<span class="transition-colors {on ? 'font-semibold text-ink' : 'text-subtle group-hover:text-ink'}">{item.label}</span>
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	.trail {
		width: 1.75rem;
		height: 1px;
		background: var(--color-subtle);
	}
	.trail.is-on {
		width: 4rem;
		height: 3px;
		border-radius: 2px;
		background: linear-gradient(90deg, rgb(10 120 180 / 0), var(--color-trail-bright));
	}
</style>
