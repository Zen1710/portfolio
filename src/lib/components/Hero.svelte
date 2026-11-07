<script lang="ts">
	import exposure1000 from '#lib/assets/exposure-1000.webp';
	import exposure2000 from '#lib/assets/exposure-2000.webp';
	import type { Profile, Tech } from '#lib/content/types.ts';
	import ChipList from './ChipList.svelte';
	import QuickLine from './QuickLine.svelte';

	let {
		profile,
		stack,
		hasCv,
		span
	}: {
		profile: Profile;
		stack: { mostly: Tech[]; frontend: Tech[]; backend: Tech[] };
		hasCv: boolean;
		span: { from: number; to: number };
	} = $props();
</script>

<div class="hero relative isolate flex min-h-[44rem] flex-col overflow-hidden lg:min-h-[max(100svh,46rem)]" data-theme-lock="dark">
	<div class="exposure absolute inset-0 -z-10" aria-hidden="true">
		<img
			src={exposure2000}
			srcset="{exposure1000} 1000w, {exposure2000} 2000w"
			sizes="100vw"
			alt=""
			fetchpriority="high"
			class="size-full object-cover object-[50%_40%]"
		/>
		<div class="absolute inset-0 bg-trail mix-blend-color"></div>
		<div class="wash absolute inset-0"></div>
		<div class="shutter absolute inset-0 bg-night"></div>
	</div>

	<div class="px-4 pt-5 sm:px-8 lg:px-16 lg:pt-7">
		<QuickLine {profile} {hasCv} />
	</div>

	<div class="mt-auto px-4 pb-10 sm:px-8 lg:px-16 lg:pb-12">
		<p class="mb-5 text-[0.75rem] tracking-[0.15em] text-ink uppercase lg:hidden">{profile.role}</p>
		<h1 class="display max-w-[14ch] text-[2.75rem] leading-[1.02] lg:max-w-[22ch] lg:text-[5.5rem] lg:leading-[1]">
			{profile.headline}
		</h1>
		<p class="mt-7 max-w-[46rem] text-base leading-[1.9] text-muted lg:text-[1.1875rem]">
			I work mostly with <ChipList items={stack.mostly} />, plus <ChipList items={stack.frontend} /> on the frontend and
			<ChipList items={stack.backend} /> on the backend.
		</p>
		<p class="mt-4 flex flex-wrap items-center gap-x-2.5 text-[0.9375rem] text-ink lg:text-[1.0625rem]">
			<span class="size-2 rounded-full bg-live" aria-hidden="true"></span>
			{profile.availability}
			<a class="link" href="#contact">Get in touch</a>
		</p>
		<div class="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3 text-[1.0625rem] font-medium lg:text-[1.1875rem]">
			{#if profile.links.email}<a class="link" href="mailto:{profile.links.email}">Email</a>{/if}
			{#if profile.links.linkedin}<a class="link" href={profile.links.linkedin}>LinkedIn</a>{/if}
			{#if hasCv}<a class="link" href="/cv.pdf" download="Naufal-Rizky-Ananda-CV.pdf">Download CV</a>{/if}
		</div>
		<p class="caption mt-10 lg:mt-0 lg:text-right">Exposure {span.from} — {span.to} · Bengkulu, Indonesia</p>
	</div>
</div>

<style>
	.wash {
		background: linear-gradient(
			180deg,
			rgb(7 9 11 / 0.85) 0%,
			rgb(7 9 11 / 0) 16%,
			rgb(7 9 11 / 0.1) 40%,
			rgb(7 9 11 / 0.93) 72%,
			var(--color-night) 100%
		);
	}

	/* The signature moment: the shutter opens once, left to right. Content is never hidden. */
	.shutter {
		transform: translateX(101%);
		animation: shutter 1100ms cubic-bezier(0.16, 1, 0.3, 1) both;
		mask-image: linear-gradient(90deg, transparent 0, black 18%);
	}

	@keyframes shutter {
		from {
			transform: translateX(-18%);
		}
		to {
			transform: translateX(101%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.shutter {
			animation: none;
		}
	}
</style>
