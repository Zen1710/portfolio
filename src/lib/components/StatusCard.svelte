<script lang="ts">
	import type { Profile, Tech } from '#lib/content/types.ts';
	import ChipList from './ChipList.svelte';

	let { profile, stack }: { profile: Profile; stack: { mostly: Tech[]; frontend: Tech[]; backend: Tech[] } } = $props();
	const { links } = $derived(profile);
</script>

<div class="rounded-lg border border-line bg-surface p-6 shadow-[0_2px_6px_rgb(0_0_0/0.2),0_12px_32px_rgb(0_0_0/0.25)]">
	<p class="text-base leading-[2] text-muted lg:text-[1.0625rem]">
		I work mostly with <ChipList items={stack.mostly} />, plus <ChipList items={stack.frontend} /> on the frontend and
		<ChipList items={stack.backend} /> on the backend.
	</p>
	<hr class="my-5 border-line" />
	<p class="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.9375rem] text-ink">
		<span class="size-2 rounded-full bg-live" aria-hidden="true"></span>
		{profile.availability}
		<a class="link font-medium" href="#contact">Get in touch</a>
	</p>
	<p class="mt-3 flex flex-wrap gap-x-6 gap-y-1 font-mono text-sm font-medium">
		{#if links.github}<a class="link" href={links.github}>GitHub</a>{/if}
		{#if links.linkedin}<a class="link" href={links.linkedin}>LinkedIn</a>{/if}
		{#if links.email}<a class="link" href="mailto:{links.email}">Email</a>{/if}
	</p>
</div>
