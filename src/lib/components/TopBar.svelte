<script lang="ts">
	import type { Profile } from '#lib/content/types.ts';
	import Identity from './Identity.svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	let { profile, hasCv }: { profile: Profile; hasCv: boolean } = $props();
</script>

<header class="flex items-center justify-between gap-6 border-b border-line px-4 py-5 sm:px-8 lg:px-16 lg:py-7">
	<Identity name={profile.name} />
	<div class="flex items-center gap-6 font-mono text-sm">
		<span class="hidden items-center gap-6 sm:flex">
			{#if profile.links.email}<a class="link" href="mailto:{profile.links.email}">Email</a>{/if}
			{#if profile.links.linkedin}<a class="link" href={profile.links.linkedin}>LinkedIn</a>{/if}
			{#if hasCv}<a class="link" href="/cv.pdf" download="Naufal-Rizky-Ananda-CV.pdf">CV</a>{/if}
		</span>
		<ThemeToggle />
	</div>
</header>
