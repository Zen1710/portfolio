<script lang="ts">
	import type { Profile } from '#lib/content/types.ts';
	import Identity from './Identity.svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	let { profile, hasCv }: { profile: Profile; hasCv: boolean } = $props();
	const label = 'text-[0.8125rem] tracking-[0.15em] uppercase';
</script>

<header class="flex items-center gap-8">
	<Identity name={profile.name} />
	<span class="{label} hidden text-muted lg:inline">{profile.role}</span>
	<span class="{label} hidden text-muted xl:inline">{profile.availability.replace(/\.$/, '')}</span>
	<nav aria-label="Contact" class="ml-auto hidden items-center gap-6 text-sm sm:flex">
		{#if profile.links.email}<a class="link" href="mailto:{profile.links.email}">Email</a>{/if}
		{#if profile.links.linkedin}<a class="link" href={profile.links.linkedin}>LinkedIn</a>{/if}
		{#if hasCv}<a class="link" href="/cv.pdf" download="Naufal-Rizky-Ananda-CV.pdf">CV</a>{/if}
	</nav>
	<span class="ml-auto sm:ml-0"><ThemeToggle /></span>
</header>
