<script lang="ts">
	// compact: the narrow mobile header, where only the right edge is free of text.
	let { compact = false }: { compact?: boolean } = $props();

	// Pixel glyphs from the Code Bridge design, drawn on an 8×8 grid. Decoration only.
	const shapes = {
		heart: 'M1 0h2v1H1zM5 0h2v1H5zM0 1h8v3H0zM1 4h6v1H1zM2 5h4v1H2zM3 6h2v1H3z',
		arrow: 'M3 0h1v1H3zM3 1h2v1H3zM0 2h6v1H0zM0 3h7v1H0zM0 4h6v1H0zM3 5h2v1H3zM3 6h1v1H3z',
		plus: 'M3 0h2v2H3zM0 2h8v2H0zM3 4h2v2H3z',
		star: 'M3 0h1v2H3zM1 2h1v1H1zM3 2h1v1H3zM5 2h1v1H5zM2 3h3v1H2zM0 4h7v1H0zM2 5h3v1H2zM1 6h1v1H1zM3 6h1v1H3zM5 6h1v1H5zM3 7h1v1H3z'
	} as const;

	// Positions as a share of the 640×440 colour field the design draws them on.
	const items: { shape: keyof typeof shapes; x: number; y: number; size: number }[] = [
		{ shape: 'heart', x: 408, y: 22, size: 32 },
		{ shape: 'arrow', x: 470, y: 110, size: 32 },
		{ shape: 'plus', x: 598, y: 170, size: 24 },
		{ shape: 'star', x: 492, y: 240, size: 32 },
		{ shape: 'plus', x: 22, y: 330, size: 24 },
		{ shape: 'heart', x: 598, y: 392, size: 24 }
	];
	const compactItems: { shape: keyof typeof shapes; right: number; top?: number; bottom?: number; size: number }[] = [
		{ shape: 'plus', right: 14, top: 104, size: 18 },
		{ shape: 'star', right: 40, top: 150, size: 20 },
		{ shape: 'heart', right: 14, bottom: 14, size: 20 }
	];
</script>

<div class="pointer-events-none absolute inset-0" aria-hidden="true">
	{#if compact}
		{#each compactItems as item, i (i)}
			<svg
				viewBox="0 0 8 8"
				class="absolute fill-white"
				style:right="{item.right}px"
				style:top={item.top === undefined ? undefined : `${item.top}px`}
				style:bottom={item.bottom === undefined ? undefined : `${item.bottom}px`}
				style:width="{item.size}px"
				style:height="{item.size}px"
				shape-rendering="crispEdges"><path d={shapes[item.shape]} /></svg
			>
		{/each}
	{:else}
	{#each items as item, i (i)}
		<svg
			viewBox="0 0 8 8"
			class="absolute fill-white"
			style:left="{(item.x / 640) * 100}%"
			style:top="{(item.y / 440) * 100}%"
			style:width="{item.size}px"
			style:height="{item.size}px"
			shape-rendering="crispEdges"><path d={shapes[item.shape]} /></svg
		>
	{/each}
	{/if}
</div>
