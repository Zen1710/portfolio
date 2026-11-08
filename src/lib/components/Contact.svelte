<script lang="ts">
	import type { Profile } from '#lib/content/types.ts';
	import SectionHeading from './SectionHeading.svelte';

	let { profile, hasCv, index }: { profile: Profile; hasCv: boolean; index?: number } = $props();
	const { links } = $derived(profile);
</script>

<section id="contact" aria-labelledby="contact-title" class="scroll-mt-16">
	<SectionHeading id="contact" {index} title="Contact" />
	<p class="mt-5 max-w-[42rem] text-xl leading-snug text-ink lg:text-[1.375rem]">
		{profile.availability} The fastest way to reach me is email.
	</p>
	<p class="mt-5 flex flex-col gap-3 text-lg font-medium sm:flex-row sm:flex-wrap sm:gap-x-8 lg:text-xl">
		{#if links.email}<a class="link" href="mailto:{links.email}">Email</a>{/if}
		{#if links.linkedin}<a class="link" href={links.linkedin}>LinkedIn</a>{/if}
		{#if links.github}<a class="link" href={links.github}>GitHub</a>{/if}
		{#if hasCv}<a class="link" href="/cv.pdf" download="Naufal-Rizky-Ananda-CV.pdf">Download CV</a>{/if}
	</p>
</section>
