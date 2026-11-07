<script lang="ts">
	import { page } from '$app/state';
	import exposure1000 from '#lib/assets/exposure-1000.webp';
</script>

<svelte:head>
	<title>{page.status === 404 ? 'Page not found' : 'Something went wrong'} · Naufal Rizky Ananda</title>
</svelte:head>

<main class="relative isolate grid min-h-svh content-end px-4 pb-16 sm:px-8 lg:px-16 lg:pb-24" data-theme-lock="dark">
	<div class="absolute inset-0 -z-10" aria-hidden="true">
		<img src={exposure1000} alt="" class="size-full object-cover opacity-35" />
		<div class="absolute inset-0 bg-trail mix-blend-color"></div>
		<div class="absolute inset-0 bg-night/70"></div>
	</div>
	<p class="caption">{page.status}</p>
	<h1 class="display mt-5 max-w-[16ch] text-[2.75rem] leading-[1.02] lg:text-[4.5rem]">
		{page.status === 404 ? 'This page was never captured.' : 'Something went wrong on this page.'}
	</h1>
	<a class="link mt-6 text-lg" href="/">Back to the home page</a>
</main>
