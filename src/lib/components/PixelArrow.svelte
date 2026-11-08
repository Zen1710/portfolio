<script lang="ts">
	// Arrows from the Code Bridge pixel set, so links don't fall back to Unicode glyphs.
	let { dir = 'right' }: { dir?: 'right' | 'left' | 'out' } = $props();

	const right = 'M3 0h1v1H3zM3 1h2v1H3zM0 2h6v1H0zM0 3h7v1H0zM0 4h6v1H0zM3 5h2v1H3zM3 6h1v1H3z';
	const out = 'M3 0h5v1H3zM7 1h1v4H7zM6 1h1v1H6zM5 2h1v1H5zM4 3h1v1H4zM3 4h1v1H3zM2 5h1v1H2zM1 6h1v1H1zM0 7h1v1H0z';
</script>

<svg
	viewBox={dir === 'out' ? '0 0 8 8' : '0 0 7 7'}
	class="inline-block size-[0.62em] shrink-0 fill-current align-[0.02em] {dir === 'left' ? '-scale-x-100' : ''}"
	shape-rendering="crispEdges"
	aria-hidden="true"><path d={dir === 'out' ? out : right} /></svg
>
