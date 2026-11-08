<script lang="ts">
	import type { Profile, Tech } from '#lib/content/types.ts';
	import Identity from './Identity.svelte';
	import PixelDecor from './PixelDecor.svelte';
	import ScrollspyNav, { type NavItem } from './ScrollspyNav.svelte';
	import StatusCard from './StatusCard.svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	let {
		profile,
		stack,
		hasCv,
		nav
	}: { profile: Profile; stack: { mostly: Tech[]; frontend: Tech[]; backend: Tech[] }; hasCv: boolean; nav: NavItem[] } =
		$props();
</script>

<header class="relative lg:sticky lg:top-0 lg:h-svh lg:overflow-y-auto lg:[scrollbar-width:thin]">
	<!-- The colour field: a fixed band on desktop that the status card straddles. -->
	<div class="absolute inset-x-0 top-0 hidden h-[27.5rem] overflow-hidden bg-trail lg:block"><PixelDecor /></div>

	<div class="relative flex min-h-full flex-col justify-between gap-12 lg:px-12 lg:py-18 xl:px-16">
		<div>
			<div class="relative overflow-hidden bg-trail px-4 pt-5 pb-10 sm:px-8 lg:overflow-visible lg:bg-transparent lg:p-0">
				<div class="lg:hidden"><PixelDecor compact /></div>
				<div class="relative flex items-center justify-between gap-4">
					<Identity name={profile.name} onColor />
					<ThemeToggle onColor />
				</div>
				<h1 class="pixel relative mt-7 pr-12 text-2xl [text-wrap:wrap] text-white lg:mt-9 lg:pr-0 lg:text-[2.125rem]">{profile.headline}</h1>
			</div>

			<div class="px-4 pt-6 sm:px-8 lg:px-0"><StatusCard {profile} {stack} /></div>

			<div class="mt-12 hidden lg:block"><ScrollspyNav items={nav} /></div>
		</div>

		{#if hasCv}
			<a
				href="/cv.pdf"
				download="Naufal-Rizky-Ananda-CV.pdf"
				class="hidden w-fit items-center gap-2 rounded border border-line px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-action lg:inline-flex"
			>
				<svg viewBox="0 0 24 24" class="size-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11m-5-5 5 5 5-5M5 20h14" /></svg>
				Download CV
			</a>
		{/if}
	</div>
</header>
