<script lang="ts">
	import type { Tech } from '#lib/content/types.ts';

	let { tech }: { tech: Tech } = $props();
</script>

<span
	class="inline-flex items-center gap-[0.38em] rounded-md border border-line bg-wash px-[0.45em] py-[0.08em] align-[0.05em] text-[0.92em] leading-[1.45] font-medium whitespace-nowrap text-ink"
>
	{#if tech.path}
		<svg
			viewBox={tech.viewBox ?? '0 0 24 24'}
			class="shrink-0 fill-action {tech.viewBox ? 'h-[0.62em] w-auto' : 'size-[0.9em]'}"
			aria-hidden="true"><path d={tech.path} /></svg
		>
	{/if}{tech.label}</span
>
