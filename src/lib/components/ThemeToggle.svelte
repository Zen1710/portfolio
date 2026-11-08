<script lang="ts">
	let { onColor = false }: { onColor?: boolean } = $props();
	let light = $state(false);

	$effect(() => {
		light = document.documentElement.dataset.theme === 'light';
	});

	function toggle() {
		light = !light;
		if (light) document.documentElement.dataset.theme = 'light';
		else delete document.documentElement.dataset.theme;
		try {
			localStorage.setItem('theme', light ? 'light' : 'dark');
		} catch {
			// Private mode or blocked storage: the switch still works for this visit.
		}
	}
</script>

<button
	type="button"
	onclick={toggle}
	aria-label={light ? 'Switch to dark theme' : 'Switch to light theme'}
	class="grid size-9 shrink-0 place-items-center rounded border transition-colors duration-200 {onColor
		? 'border-white/40 text-white hover:border-white'
		: 'border-line text-ink hover:border-action'}"
>
	<svg viewBox="0 0 24 24" class="size-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		{#if light}
			<circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
		{:else}
			<path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
		{/if}
	</svg>
</button>
