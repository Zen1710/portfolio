<script lang="ts">
	import type { Profile } from '#lib/content/types.ts';

	let { profile, hasCv }: { profile: Profile; hasCv: boolean } = $props();
</script>

<footer id="contact" class="border-t border-line px-4 pt-24 pb-10 sm:px-8 lg:px-16 lg:pt-40 lg:pb-16">
	<h2 class="display max-w-[20ch] text-[2.75rem] leading-[1] lg:text-[5.5rem]">{profile.availability}</h2>
	<div class="mt-10 flex flex-col gap-4 text-2xl font-medium sm:flex-row sm:flex-wrap sm:gap-x-11 lg:mt-12 lg:text-[1.75rem]">
		{#if profile.links.email}<a class="link" href="mailto:{profile.links.email}">Email</a>{/if}
		{#if profile.links.linkedin}<a class="link" href={profile.links.linkedin}>LinkedIn</a>{/if}
		{#if profile.links.github}<a class="link" href={profile.links.github}>GitHub</a>{/if}
		{#if hasCv}<a class="link" href="/cv.pdf" download="Naufal-Rizky-Ananda-CV.pdf">Download CV</a>{/if}
	</div>
	<div class="caption mt-16 flex flex-col gap-2.5 lg:mt-24 lg:flex-row lg:justify-between">
		<span>{profile.name} · {new Date().getUTCFullYear()}</span>
		<span>
			Built with SvelteKit · Served by Cloudflare{#if profile.sourceRepo}
				· <a class="hover:text-ink" href={profile.sourceRepo}>Source on GitHub</a>{/if}
		</span>
	</div>
</footer>
